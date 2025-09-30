
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import openDB from './DB';
import Sound from 'react-native-sound';
import DateTimePicker from '@react-native-community/datetimepicker';

Sound.setCategory('Playback');

const Favorites = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingAyat, setPlayingAyat] = useState(null);
    const [showEnglish, setShowEnglish] = useState(true);
    const [showUrdu, setShowUrdu] = useState(true);

    // Filter states
    const [moods, setMoods] = useState([]);
    const [days, setDays] = useState([]);
    const [surahs, setSurahs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // Dropdown filters
    const [selectedMood, setSelectedMood] = useState('all');
    const [selectedDay, setSelectedDay] = useState('all');
    const [selectedSurah, setSelectedSurah] = useState('all');

    // Date filters
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    useEffect(() => {
        loadFavorites();
        loadLanguageSettings();
        loadFilterData();

        return () => {
            if (sound) {
                sound.release();
            }
        };
    }, []);

    useEffect(() => {
        filterFavorites();
    }, [favorites, selectedMood, selectedDay, selectedSurah, fromDate, toDate]);

    const loadLanguageSettings = async () => {
        try {
            const englishSetting = await AsyncStorage.getItem('showEnglish');
            const urduSetting = await AsyncStorage.getItem('showUrdu');

            if (englishSetting !== null) {
                setShowEnglish(JSON.parse(englishSetting));
            }

            if (urduSetting !== null) {
                setShowUrdu(JSON.parse(urduSetting));
            }
        } catch (error) {
            console.error('Error loading language settings:', error);
        }
    };

    const loadFilterData = async () => {
        try {
            const db = await openDB();

            // Load moods
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM Mood',
                    [],
                    (_, { rows }) => setMoods(rows.raw()),
                    (_, error) => console.log('Error loading moods:', error)
                );
            });

            // Load days
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM Day',
                    [],
                    (_, { rows }) => setDays(rows.raw()),
                    (_, error) => console.log('Error loading days:', error)
                );
            });

            // Load surahs
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM Surahs',
                    [],
                    (_, { rows }) => setSurahs(rows.raw()),
                    (_, error) => console.log('Error loading surahs:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const loadFavorites = async () => {
        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT f.*, q.Arabic, q.Urdu, q.English, q.ayah_location, s.EnglishName, s.ArabicName,
                     d.name as day_name, m.name as mood_name
                     FROM favorite_ayat f
                     JOIN Quran q ON f.surah_id = q.surah_id AND f.ayat_id = q.ayah_Id
                     JOIN Surahs s ON f.surah_id = s.surah_id
                     LEFT JOIN Day d ON f.day_id = d.day_id
                     LEFT JOIN Mood m ON f.mood_id = m.mood_id
                     ORDER BY f.date_added DESC`,
                    [],
                    (_, { rows }) => {
                        setFavorites(rows.raw());
                    },
                    (_, error) => {
                        console.log('Error loading favorites:', error);
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const filterFavorites = () => {
        let filtered = [...favorites];

        // Mood filter
        if (selectedMood !== 'all') {
            filtered = filtered.filter(item => item.mood_id == selectedMood);
        }

        // Day filter
        if (selectedDay !== 'all') {
            filtered = filtered.filter(item => item.day_id == selectedDay);
        }

        // Surah filter
        if (selectedSurah !== 'all') {
            filtered = filtered.filter(item => item.surah_id == selectedSurah);
        }

        // Date range filter
        if (fromDate) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.date_added);
                return itemDate >= new Date(fromDate);
            });
        }

        if (toDate) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.date_added);
                itemDate.setHours(23, 59, 59); // End of day
                return itemDate <= new Date(toDate);
            });
        }

        setFilteredFavorites(filtered);
    };

    const removeFavorite = async (surahId, ayatId) => {
        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
                    [surahId, ayatId],
                    () => {
                        loadFavorites(); // Reload the list
                    },
                    (_, error) => {
                        console.log('Error removing favorite:', error);
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const playAyahAudio = async (ayat) => {
        if (sound) {
            sound.release();
        }

        const surahId = String(ayat.surah_id).padStart(3, '0');
        const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
        const fileName = `a${surahId}${ayahLoc}.mp3`;

        const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Audio load failed:', error);
                return;
            }

            setPlayingAyat(ayat);
            setIsPlaying(true);

            newSound.play((success) => {
                if (success) {
                    console.log('Playback finished');
                } else {
                    console.log('Audio playback failed');
                }
                newSound.release();
                setIsPlaying(false);
                setPlayingAyat(null);
            });
        });

        setSound(newSound);
    };

    const stopAudio = () => {
        if (sound) {
            sound.stop(() => {
                sound.release();
                setIsPlaying(false);
                setPlayingAyat(null);
            });
        }
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return 'Select Date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const clearAllFilters = () => {
        setSelectedMood('all');
        setSelectedDay('all');
        setSelectedSurah('all');
        setFromDate(null);
        setToDate(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Favorites Ayats</Text>
                <View style={styles.headerSpacer} />
            </View>

            {/* Filter Button */}
            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowFilters(true)}
            >
                <Text style={styles.filterButtonText}>🔍 Advanced Filters</Text>
            </TouchableOpacity>

            {/* Active Filters Indicator */}
            {(selectedMood !== 'all' || selectedDay !== 'all' || selectedSurah !== 'all' || fromDate || toDate) && (
                <View style={styles.activeFilters}>
                    <Text style={styles.activeFiltersText}>Active Filters:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
                        {selectedMood !== 'all' && (
                            <View style={styles.filterChip}>
                                <Text style={styles.filterChipText}>
                                    Mood: {moods.find(m => m.mood_id == selectedMood)?.name}
                                </Text>
                            </View>
                        )}
                        {selectedDay !== 'all' && (
                            <View style={styles.filterChip}>
                                <Text style={styles.filterChipText}>
                                    Day: {days.find(d => d.day_id == selectedDay)?.name}
                                </Text>
                            </View>
                        )}
                        {selectedSurah !== 'all' && (
                            <View style={styles.filterChip}>
                                <Text style={styles.filterChipText}>
                                    Surah: {surahs.find(s => s.surah_id == selectedSurah)?.EnglishName}
                                </Text>
                            </View>
                        )}
                        {fromDate && (
                            <View style={styles.filterChip}>
                                <Text style={styles.filterChipText}>
                                    From: {formatDateForDisplay(fromDate)}
                                </Text>
                            </View>
                        )}
                        {toDate && (
                            <View style={styles.filterChip}>
                                <Text style={styles.filterChipText}>
                                    To: {formatDateForDisplay(toDate)}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.clearAllButton}
                            onPress={clearAllFilters}
                        >
                            <Text style={styles.clearAllText}>Clear All</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredFavorites.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No favorite ayat found</Text>
                        <Text style={styles.emptySubText}>
                            {(selectedMood !== 'all' || selectedDay !== 'all' || selectedSurah !== 'all' || fromDate || toDate) ?
                                'No records match your filters' :
                                'Your favorite ayat will appear here after you add them'
                            }
                        </Text>
                    </View>
                ) : (
                    filteredFavorites.map((item, index) => (
                        <View key={index} style={styles.favoriteCard}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.surahName}>
                                    {item.EnglishName} ({item.ArabicName})
                                </Text>
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeFavorite(item.surah_id, item.ayat_id)}
                                >
                                    <Text style={styles.removeButtonText}>❤️</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.arabicText}>{item.Arabic}</Text>

                            {showUrdu && (
                                <>
                                    <Text style={styles.translationLabel}>Urdu Translation:</Text>
                                    <Text style={styles.translationText}>{item.Urdu}</Text>
                                </>
                            )}

                            {showEnglish && (
                                <>
                                    <Text style={styles.translationLabel}>English Translation:</Text>
                                    <Text style={styles.translationText}>{item.English}</Text>
                                </>
                            )}

                            <View style={styles.infoContainer}>
                                <Text style={styles.ayahInfo}>Ayah {item.ayah_location}</Text>
                                {item.day_name && (
                                    <Text style={styles.infoText}>Day: {item.day_name}</Text>
                                )}
                                {item.mood_name && (
                                    <Text style={styles.infoText}>Mood: {item.mood_name}</Text>
                                )}
                                <Text style={styles.dateText}>
                                    Added on: {new Date(item.date_added).toLocaleDateString()}
                                </Text>
                            </View>

                            <View style={styles.audioContainer}>
                                {isPlaying && playingAyat && playingAyat.surah_id === item.surah_id && playingAyat.ayat_id === item.ayat_id ? (
                                    <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
                                        <Text style={styles.audioButtonText}>⏹ Stop</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => playAyahAudio(item)} style={styles.audioButton}>
                                        <Text style={styles.audioButtonText}>▶️ Play</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Advanced Filter Modal */}
            <Modal
                visible={showFilters}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilters(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>🔍 Advanced Filters</Text>

                        <ScrollView>
                            {/* Mood Filter */}
                            <Text style={styles.filterLabel}>Mood:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedMood}
                                    onValueChange={setSelectedMood}
                                    style={styles.picker}
                                    dropdownIconColor="#000"
                                >
                                    <Picker.Item label="All Moods" value="all" color="#000" />
                                    {moods.map(mood => (
                                        <Picker.Item
                                            key={mood.mood_id}
                                            label={mood.name}
                                            value={mood.mood_id}
                                            color="#000"
                                        />
                                    ))}
                                </Picker>
                            </View>

                            {/* Day Filter */}
                            <Text style={styles.filterLabel}>Day:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedDay}
                                    onValueChange={setSelectedDay}
                                    style={styles.picker}
                                    dropdownIconColor="#000"
                                >
                                    <Picker.Item label="All Days" value="all" color="#000" />
                                    {days.map(day => (
                                        <Picker.Item
                                            key={day.day_id}
                                            label={day.name}
                                            value={day.day_id}
                                            color="#000"
                                        />
                                    ))}
                                </Picker>
                            </View>

                            {/* Surah Filter */}
                            <Text style={styles.filterLabel}>Surah:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedSurah}
                                    onValueChange={setSelectedSurah}
                                    style={styles.picker}
                                    dropdownIconColor="#000"
                                >
                                    <Picker.Item label="All Surahs" value="all" color="#000" />
                                    {surahs.map(surah => (
                                        <Picker.Item
                                            key={surah.surah_id}
                                            label={surah.EnglishName}
                                            value={surah.surah_id}
                                            color="#000"
                                        />
                                    ))}
                                </Picker>
                            </View>

                            {/* Date Range Filter */}
                            <Text style={styles.filterLabel}>Date Range:</Text>
                            <View style={styles.dateInputsContainer}>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowFromDatePicker(true)}
                                >
                                    <Text style={styles.dateInputText}>
                                        📅 From: {formatDateForDisplay(fromDate)}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowToDatePicker(true)}
                                >
                                    <Text style={styles.dateInputText}>
                                        📅 To: {formatDateForDisplay(toDate)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowFilters(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setShowFilters(false)}
                            >
                                <Text style={styles.modalButtonText}>Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Date Pickers */}
            {showFromDatePicker && (
                <DateTimePicker
                    value={fromDate ? new Date(fromDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowFromDatePicker(false);
                        if (selectedDate) {
                            setFromDate(selectedDate.toISOString().split('T')[0]);
                        }
                    }}
                />
            )}

            {showToDatePicker && (
                <DateTimePicker
                    value={toDate ? new Date(toDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowToDatePicker(false);
                        if (selectedDate) {
                            setToDate(selectedDate.toISOString().split('T')[0]);
                        }
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EDF9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 40,
    },
    backButton: {
        fontSize: 24,
        color: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    headerSpacer: {
        width: 24,
    },
    scrollContainer: {
        padding: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 20,
        color: '#7f8c8d',
        marginBottom: 10,
    },
    emptySubText: {
        fontSize: 14,
        color: '#95a5a6',
        textAlign: 'center',
    },
    favoriteCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    surahName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        flex: 1,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    arabicText: {
        fontSize: 18,
        textAlign: 'right',
        marginBottom: 10,
        lineHeight: 30,
        color: '#34495e',
    },
    translationLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#7f8c8d',
    },
    translationText: {
        fontSize: 14,
        marginBottom: 10,
        lineHeight: 20,
        color: '#34495e',
    },
    infoContainer: {
        marginBottom: 10,
    },
    ayahInfo: {
        fontSize: 12,
        textAlign: 'right',
        color: '#7f8c8d',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 12,
        color: '#7f8c8d',
        marginBottom: 2,
    },
    dateText: {
        fontSize: 12,
        color: '#95a5a6',
        marginTop: 5,
    },
    audioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    audioButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    audioButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    filterButton: {
        backgroundColor: '#8E44AD',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    filterButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeFilters: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 20,
        marginBottom: 15,
    },
    activeFiltersText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2c3e50',
    },
    filtersScroll: {
        flexGrow: 0,
    },
    filterChip: {
        backgroundColor: '#E0D5E1',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 5,
    },
    filterChipText: {
        fontSize: 12,
        color: '#2c3e50',
    },
    clearAllButton: {
        backgroundColor: '#ffebee',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginLeft: 8,
    },
    clearAllText: {
        fontSize: 12,
        color: '#c62828',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2c3e50',
    },
    filterLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#34495e',
        fontWeight: '500',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#000',
    },
    dateInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dateInput: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    dateInputText: {
        color: '#34495e',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        backgroundColor: '#8E44AD',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#95a5a6',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Favorites;