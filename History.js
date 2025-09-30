
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, SectionList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import openDB from './DB';

const History = () => {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [moods, setMoods] = useState([]);
    const [days, setDays] = useState([]);
    const [surahs, setSurahs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [groupedHistory, setGroupedHistory] = useState([]);

    // New state variables for additional functionalities
    const [averageMood, setAverageMood] = useState(null);
    const [mostPlayedAyats, setMostPlayedAyats] = useState([]);
    const [showStats, setShowStats] = useState(false);

    // Dropdown filters (like Settings screen)
    const [selectedMood, setSelectedMood] = useState('all');
    const [selectedDay, setSelectedDay] = useState('all');
    const [selectedSurah, setSelectedSurah] = useState('all');

    // Date filters
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    useEffect(() => {
        loadHistory();
        loadFilterData();
    }, []);

    useEffect(() => {
        filterHistory();
    }, [history, selectedMood, selectedDay, selectedSurah, fromDate, toDate]);

    useEffect(() => {
        groupHistoryByDate();
        calculateAverageMood();
        loadMostPlayedAyats();
    }, [filteredHistory]);

    useFocusEffect(
        React.useCallback(() => {
            loadHistory();
        }, [])
    );

    const loadHistory = async () => {
        try {
            const db = await openDB();

            const query = `
                SELECT 
                    h.*,
                    q.Arabic, q.Urdu, q.English, q.ayah_location,
                    s.EnglishName, s.ArabicName,
                    m.name as mood_name, m.mood_id,
                    d.name as day_name,
                    COUNT(p.id) as play_count
                FROM daily_ayat_history h
                LEFT JOIN Quran q ON h.ayah_id = q.ayah_Id AND h.surah_id = q.surah_id
                LEFT JOIN Surahs s ON h.surah_id = s.surah_id
                LEFT JOIN Mood m ON h.mood_id = m.mood_id
                LEFT JOIN Day d ON h.day_id = d.day_id
                LEFT JOIN ayat_play_history p ON h.id = p.history_id
                GROUP BY h.id
                ORDER BY h.date DESC, h.created_at DESC
            `;

            db.transaction(tx => {
                tx.executeSql(
                    query,
                    [],
                    (_, { rows }) => {
                        const historyData = rows.raw();
                        setHistory(historyData);
                    },
                    (_, error) => console.log('Error loading history:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
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

    const filterHistory = () => {
        let filtered = [...history];

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
                const itemDate = new Date(item.date);
                return itemDate >= new Date(fromDate);
            });
        }

        if (toDate) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.date);
                itemDate.setHours(23, 59, 59); // End of day
                return itemDate <= new Date(toDate);
            });
        }

        setFilteredHistory(filtered);
    };

    const groupHistoryByDate = () => {
        const grouped = filteredHistory.reduce((acc, item) => {
            const date = item.date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {});

        const sections = Object.keys(grouped).map(date => ({
            title: formatDate(date),
            data: grouped[date]
        }));

        setGroupedHistory(sections);
    };

    const calculateAverageMood = () => {
        if (filteredHistory.length === 0) {
            setAverageMood(null);
            return;
        }

        // Count occurrences of each mood
        const moodCounts = {};
        filteredHistory.forEach(item => {
            if (item.mood_id) {
                moodCounts[item.mood_id] = (moodCounts[item.mood_id] || 0) + 1;
            }
        });

        // Find the mood with the highest count
        let maxCount = 0;
        let mostFrequentMoodId = null;

        Object.keys(moodCounts).forEach(moodId => {
            if (moodCounts[moodId] > maxCount) {
                maxCount = moodCounts[moodId];
                mostFrequentMoodId = moodId;
            }
        });

        if (mostFrequentMoodId) {
            const mood = moods.find(m => m.mood_id == mostFrequentMoodId);
            setAverageMood(mood ? mood.name : null);
        } else {
            setAverageMood(null);
        }
    };

    const loadMostPlayedAyats = async () => {
        try {
            const db = await openDB();

            // Build date filter for the query
            let dateFilter = '';
            if (fromDate && toDate) {
                dateFilter = `AND h.date BETWEEN '${fromDate}' AND '${toDate}'`;
            } else if (fromDate) {
                dateFilter = `AND h.date >= '${fromDate}'`;
            } else if (toDate) {
                dateFilter = `AND h.date <= '${toDate}'`;
            }

            const query = `
                SELECT 
                    h.surah_id,
                    h.ayah_id,
                    s.EnglishName as surah_name,
                    s.ArabicName as surah_arabic_name,
                    q.ayah_location,
                    SUM(p.play_count) as total_plays
                FROM daily_ayat_history h
                JOIN (
                    SELECT history_id, COUNT(id) as play_count 
                    FROM ayat_play_history 
                    GROUP BY history_id
                ) p ON h.id = p.history_id
                JOIN Quran q ON h.ayah_id = q.ayah_Id AND h.surah_id = q.surah_id
                JOIN Surahs s ON h.surah_id = s.surah_id
                WHERE 1=1 ${dateFilter}
                GROUP BY h.surah_id, h.ayah_id
                ORDER BY total_plays DESC
                LIMIT 5
            `;

            db.transaction(tx => {
                tx.executeSql(
                    query,
                    [],
                    (_, { rows }) => {
                        setMostPlayedAyats(rows.raw());
                    },
                    (_, error) => console.log('Error loading most played ayats:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return 'Select Date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const getMoodEmoji = (moodName) => {
        const emojiMap = {
            'Happy': '😊',
            'Sad': '😢',
            'Angry': '😠',
            'Fearful': '😨',
            'Surprised': '😲',
            'Neutral': '😐',
            'Excited': '🤩',
            'Tired': '😴'
        };
        return emojiMap[moodName] || '📖';
    };

    const clearAllFilters = () => {
        setSelectedMood('all');
        setSelectedDay('all');
        setSelectedSurah('all');
        setFromDate(null);
        setToDate(null);
    };

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyItem}>
            <View style={styles.itemHeader}>
                <Text style={styles.surahName}>
                    {item.EnglishName} ({item.ArabicName}) - Ayah {item.ayah_location}
                </Text>
                <View style={styles.playCount}>
                    <Text style={styles.playCountText}>▶️ {item.play_count || 0}</Text>
                </View>
            </View>

            <Text style={styles.arabicText}>{item.Arabic}</Text>

            <View style={styles.itemMeta}>
                {item.mood_name && (
                    <Text style={styles.moodText}>
                        {getMoodEmoji(item.mood_name)} {item.mood_name}
                    </Text>
                )}
                {item.day_name && (
                    <Text style={styles.dayText}>📅 {item.day_name}</Text>
                )}
            </View>

            <Text style={styles.dateText}>
                {new Date(item.created_at).toLocaleTimeString()}
            </Text>
        </View>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    const renderMostPlayedItem = ({ item, index }) => (
        <View style={styles.mostPlayedItem}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <View style={styles.mostPlayedDetails}>
                <Text style={styles.mostPlayedSurah}>
                    {item.surah_name} - Ayah {item.ayah_location}
                </Text>
                <Text style={styles.playCount}>Plays: {item.total_plays}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📜 History</Text>

            {/* Stats Button */}
            <TouchableOpacity
                style={styles.statsButton}
                onPress={() => setShowStats(true)}
            >
                <Text style={styles.statsButtonText}>📊 View Statistics</Text>
            </TouchableOpacity>

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
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

            {/* History List */}
            {groupedHistory.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No history found</Text>
                    <Text style={styles.emptySubText}>
                        {selectedMood !== 'all' || selectedDay !== 'all' || selectedSurah !== 'all' || fromDate || toDate ?
                            'No records match your filters' :
                            'Your ayat history will appear here after you use the app'
                        }
                    </Text>
                </View>
            ) : (
                <SectionList
                    sections={groupedHistory}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderHistoryItem}
                    renderSectionHeader={renderSectionHeader}
                    stickySectionHeadersEnabled={true}
                />
            )}

            {/* Statistics Modal */}
            <Modal
                visible={showStats}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowStats(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>📊 Statistics</Text>

                        <ScrollView>
                            {/* Average Mood */}
                            <View style={styles.statCard}>
                                <Text style={styles.statTitle}>Average Mood</Text>
                                {averageMood ? (
                                    <View style={styles.moodStat}>
                                        <Text style={styles.moodEmoji}>
                                            {getMoodEmoji(averageMood)}
                                        </Text>
                                        <Text style={styles.moodName}>{averageMood}</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.noDataText}>No mood data available</Text>
                                )}
                            </View>

                            {/* Date Range */}
                            <View style={styles.statCard}>
                                <Text style={styles.statTitle}>Date Range</Text>
                                <View style={styles.dateRange}>
                                    <Text style={styles.dateRangeText}>
                                        From: {fromDate ? formatDateForDisplay(fromDate) : 'Beginning'}
                                    </Text>
                                    <Text style={styles.dateRangeText}>
                                        To: {toDate ? formatDateForDisplay(toDate) : 'Today'}
                                    </Text>
                                </View>
                            </View>

                            {/* Most Played Ayats */}
                            <View style={styles.statCard}>
                                <Text style={styles.statTitle}>Most Played Ayats</Text>
                                {mostPlayedAyats.length > 0 ? (
                                    <FlatList
                                        data={mostPlayedAyats}
                                        renderItem={renderMostPlayedItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        scrollEnabled={false}
                                    />
                                ) : (
                                    <Text style={styles.noDataText}>No play data available</Text>
                                )}
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setShowStats(false)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#000',
    },
    statsButton: {
        backgroundColor: '#27ae60',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    statsButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterButton: {
        backgroundColor: '#8E44AD',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
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
        marginBottom: 15,
    },
    activeFiltersText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2c3e50',
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
    historyItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        elevation: 2,
    },
    itemHeader: {
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
    playCount: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    playCountText: {
        fontSize: 12,
        color: '#666',
    },
    arabicText: {
        fontSize: 18,
        textAlign: 'right',
        marginBottom: 10,
        lineHeight: 30,
        color: '#34495e',
    },
    itemMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    moodText: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    dayText: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    dateText: {
        fontSize: 12,
        color: '#95a5a6',
        textAlign: 'right',
    },
    sectionHeader: {
        backgroundColor: '#E0D5E1',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
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
    statCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    statTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    moodStat: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moodEmoji: {
        fontSize: 30,
        marginRight: 10,
    },
    moodName: {
        fontSize: 16,
        color: '#34495e',
    },
    dateRange: {
        marginVertical: 5,
    },
    dateRangeText: {
        fontSize: 14,
        color: '#34495e',
        marginBottom: 5,
    },
    mostPlayedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
    rank: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8E44AD',
        marginRight: 10,
    },
    mostPlayedDetails: {
        flex: 1,
    },
    mostPlayedSurah: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2c3e50',
    },
    noDataText: {
        fontSize: 14,
        color: '#95a5a6',
        textAlign: 'center',
        padding: 10,
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

export default History;