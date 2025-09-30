

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    FlatList,
    Modal
} from 'react-native';
import Sound from 'react-native-sound';
import openDB from './DB';
import AsyncStorage from '@react-native-async-storage/async-storage';

Sound.setCategory('Playback');

const { width, height } = Dimensions.get('window');

const Search = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [surahs, setSurahs] = useState([]);
    const [filteredSurahs, setFilteredSurahs] = useState([]);
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [ayat, setAyat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlayingAyat, setCurrentlyPlayingAyat] = useState(null);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [ayatCache, setAyatCache] = useState({});
    const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
    const [currentAyah, setCurrentAyah] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    // Load surahs and search history on component mount
    useEffect(() => {
        loadSurahs();
        loadSearchHistory();
        loadPlaylists();
    }, []);

    // Filter surahs when search query or surahs change
    useEffect(() => {
        filterSurahs();
    }, [searchQuery, surahs]);

    // Load ayat when selectedSurah changes
    useEffect(() => {
        if (selectedSurah) {
            loadAyatForSurah(selectedSurah);
        } else {
            setAyat([]);
        }
    }, [selectedSurah]);

    const loadSearchHistory = async () => {
        try {
            const history = await AsyncStorage.getItem('searchHistory');
            if (history) {
                setSearchHistory(JSON.parse(history));
            }
        } catch (error) {
            console.error('Error loading search history:', error);
        }
    };

    const loadPlaylists = async () => {
        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM playlists ORDER BY created_at DESC',
                    [],
                    (_, { rows }) => {
                        setPlaylists(rows.raw());
                    },
                    (_, error) => console.log('Error loading playlists:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const saveToSearchHistory = async (surah) => {
        try {
            const newHistory = [
                { id: Date.now(), name: surah.EnglishName, surahId: surah.surah_id },
                ...searchHistory.filter(item => item.surahId !== surah.surah_id).slice(0, 4)
            ];
            setSearchHistory(newHistory);
            await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
        } catch (error) {
            console.error('Error saving search history:', error);
        }
    };

    const removeFromSearchHistory = async (itemId) => {
        try {
            const newHistory = searchHistory.filter(item => item.id !== itemId);
            setSearchHistory(newHistory);
            await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
        } catch (error) {
            console.error('Error removing from search history:', error);
        }
    };

    const clearAllSearchHistory = async () => {
        try {
            setSearchHistory([]);
            await AsyncStorage.removeItem('searchHistory');
        } catch (error) {
            console.error('Error clearing search history:', error);
        }
    };

    const filterSurahs = useCallback(() => {
        if (searchQuery.trim() === '') {
            setFilteredSurahs(surahs);
            setShowHistory(true);
        } else {
            const filtered = surahs.filter(surah =>
                surah.EnglishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                surah.ArabicName.includes(searchQuery) ||
                surah.surah_id.toString() === searchQuery
            );
            setFilteredSurahs(filtered);
            setShowHistory(false);
        }
    }, [searchQuery, surahs]);

    const loadSurahs = async () => {
        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT surah_id, EnglishName, ArabicName FROM Surahs ORDER BY surah_id',
                    [],
                    (_, { rows }) => {
                        const surahsData = rows.raw();
                        setSurahs(surahsData);
                        setFilteredSurahs(surahsData);
                    },
                    (_, error) => console.log('Error loading surahs:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const loadAyatForSurah = async (surah) => {
        setLoading(true);
        Keyboard.dismiss();

        // Check cache first
        if (ayatCache[surah.surah_id]) {
            setAyat(ayatCache[surah.surah_id]);
            setLoading(false);
            saveToSearchHistory(surah);
            return;
        }

        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT ayah_Id, surah_id, ayah_location, Arabic, English, Urdu FROM Quran WHERE surah_id = ? ORDER BY ayah_Id',
                    [surah.surah_id],
                    (_, { rows }) => {
                        const ayatData = rows.raw();
                        setAyat(ayatData);
                        // Cache the ayat
                        setAyatCache(prev => ({ ...prev, [surah.surah_id]: ayatData }));
                        setLoading(false);
                        saveToSearchHistory(surah);
                    },
                    (_, error) => {
                        console.log('Error loading ayat:', error);
                        setLoading(false);
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
            setLoading(false);
        }
    };

    const playAyahAudio = async (ayah) => {
        if (sound) {
            sound.stop(() => {
                sound.release();
                setIsPlaying(false);
            });
        }

        const surahId = String(ayah.surah_id).padStart(3, '0');
        const ayahLoc = String(ayah.ayah_location).padStart(3, '0');
        const fileName = `a${surahId}${ayahLoc}.mp3`;

        setCurrentlyPlayingAyat(ayah.ayah_Id);

        const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                Alert.alert('Error', 'Audio file not found: ' + fileName);
                setCurrentlyPlayingAyat(null);
                return;
            }

            newSound.play((success) => {
                if (success) {
                    console.log('Playback finished');
                    // Update play count
                    updateAyahPlayCount(ayah);
                } else {
                    Alert.alert('Error', 'Audio playback failed');
                }
                newSound.release();
                setIsPlaying(false);
                setCurrentlyPlayingAyat(null);
            });
        });

        setSound(newSound);
        setIsPlaying(true);
    };

    const updateAyahPlayCount = async (ayah) => {
        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT OR REPLACE INTO ayah_play_counts (surah_id, ayah_id, play_count) VALUES (?, ?, COALESCE((SELECT play_count FROM ayah_play_counts WHERE surah_id = ? AND ayah_id = ?), 0) + 1)',
                    [ayah.surah_id, ayah.ayah_Id, ayah.surah_id, ayah.ayah_Id],
                    () => console.log('Play count updated'),
                    (_, error) => console.log('Error updating play count:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const stopAudio = () => {
        if (sound) {
            sound.stop(() => {
                sound.release();
                setIsPlaying(false);
                setCurrentlyPlayingAyat(null);
            });
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setShowCancelButton(false);
        Keyboard.dismiss();
    };

    const clearSelectedSurah = () => {
        setSelectedSurah(null);
        setAyat([]);
    };

    const formatSurahName = (surah) => {
        return `${surah.EnglishName} (${surah.ArabicName})`;
    };

    const openAddToPlaylistModal = (ayah) => {
        setCurrentAyah(ayah);
        setPlaylistModalVisible(true);
    };

    const addToPlaylist = async (playlistId) => {
        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO playlist_items (playlist_id, surah_id, ayah_id) VALUES (?, ?, ?)',
                    [playlistId, currentAyah.surah_id, currentAyah.ayah_Id],
                    () => {
                        Alert.alert('Success', 'Ayah added to playlist');
                        setPlaylistModalVisible(false);
                    },
                    (_, error) => {
                        if (error.message.includes('UNIQUE constraint failed')) {
                            Alert.alert('Info', 'This ayah is already in the playlist');
                        } else {
                            Alert.alert('Error', 'Failed to add to playlist');
                            console.log('Error adding to playlist:', error);
                        }
                        setPlaylistModalVisible(false);
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
            Alert.alert('Error', 'Failed to add to playlist');
            setPlaylistModalVisible(false);
        }
    };

    const createNewPlaylist = async () => {
        if (!newPlaylistName.trim()) {
            Alert.alert('Error', 'Please enter a playlist name');
            return;
        }

        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO playlists (name) VALUES (?)',
                    [newPlaylistName],
                    (_, result) => {
                        const newPlaylistId = result.insertId;
                        addToPlaylist(newPlaylistId);
                        setNewPlaylistName('');
                        loadPlaylists();
                    },
                    (_, error) => {
                        console.log('Error creating playlist:', error);
                        Alert.alert('Error', 'Failed to create playlist');
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
            Alert.alert('Error', 'Failed to create playlist');
        }
    };

    const renderSurahItem = ({ item }) => (
        <TouchableOpacity
            style={styles.surahItem}
            onPress={() => setSelectedSurah(item)}
        >
            <View style={styles.surahNumber}>
                <Text style={styles.surahNumberText}>{item.surah_id}</Text>
            </View>
            <View style={styles.surahInfo}>
                <Text style={styles.surahName}>{item.EnglishName}</Text>
                <Text style={styles.surahArabicName}>{item.ArabicName}</Text>
            </View>
            <Text style={styles.emojiIcon}>→</Text>
        </TouchableOpacity>
    );

    const renderAyahItem = ({ item }) => (
        <View style={styles.ayahCard}>
            <Text style={styles.arabicText}>{item.Arabic}</Text>
            <Text style={styles.translationText}>{item.English}</Text>
            <Text style={styles.urduText}>{item.Urdu}</Text>

            <View style={styles.ayahFooter}>
                <Text style={styles.ayahNumber}>Ayah {item.ayah_location}</Text>

                <View style={styles.ayahActions}>
                    {currentlyPlayingAyat === item.ayah_Id ? (
                        <TouchableOpacity
                            onPress={stopAudio}
                            style={[styles.audioButton, styles.stopButton]}
                        >
                            <Text style={styles.emojiIcon}>⏹️</Text>
                            <Text style={styles.audioButtonText}> Stop</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => playAyahAudio(item)}
                            style={styles.audioButton}
                        >
                            <Text style={styles.emojiIcon}>▶️</Text>
                            <Text style={styles.audioButtonText}> Play</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => openAddToPlaylistModal(item)}
                        style={styles.playlistButton}
                    >
                        <Text style={styles.emojiIcon}>➕</Text>
                        <Text style={styles.playlistButtonText}> Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyItemContainer}>
            <TouchableOpacity
                style={styles.historyItem}
                onPress={() => {
                    const surah = surahs.find(s => s.surah_id === item.surahId);
                    if (surah) setSelectedSurah(surah);
                }}
            >
                <Text style={styles.emojiIcon}>🕒</Text>
                <Text style={styles.historyText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.removeHistoryButton}
                onPress={() => removeFromSearchHistory(item.id)}
            >
                <Text style={styles.removeIcon}>×</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPlaylistItem = ({ item }) => (
        <TouchableOpacity
            style={styles.playlistItem}
            onPress={() => addToPlaylist(item.id)}
        >
            <Text style={styles.playlistName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.emojiIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Search Quran</Text>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Text style={styles.emojiIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by Surah name or number..."
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                setShowCancelButton(text.length > 0);
                            }}
                            onFocus={() => setShowHistory(true)}
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                                <Text style={styles.emojiIcon}>×</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {selectedSurah ? (
                    <View style={styles.content}>
                        <View style={styles.surahHeader}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => setSelectedSurah(null)}
                            >
                                <Text style={styles.emojiIcon}>←</Text>
                            </TouchableOpacity>
                            <Text style={styles.surahTitle} numberOfLines={1}>
                                {formatSurahName(selectedSurah)}
                            </Text>
                        </View>

                        {loading ? (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color="#8A2BE2" />
                                <Text style={styles.loaderText}>Loading Ayat...</Text>
                            </View>
                        ) : ayat.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Text style={styles.emojiIconLarge}>🚫</Text>
                                <Text style={styles.emptyStateText}>No Ayat Found</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={ayat}
                                renderItem={renderAyahItem}
                                keyExtractor={item => item.ayah_Id.toString()}
                                contentContainerStyle={styles.ayatContainer}
                                showsVerticalScrollIndicator={false}
                            />
                        )}
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        {showHistory && searchHistory.length > 0 && searchQuery === '' && (
                            <View style={styles.historySection}>
                                <View style={styles.historyHeader}>
                                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                                    <TouchableOpacity
                                        onPress={clearAllSearchHistory}
                                        style={styles.clearHistoryButton}
                                    >
                                        <Text style={styles.clearHistoryText}>Clear All</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={searchHistory}
                                    renderItem={renderHistoryItem}
                                    keyExtractor={item => item.id.toString()}
                                    scrollEnabled={false}
                                />
                            </View>
                        )}

                        <Text style={styles.sectionTitle}>
                            {searchQuery ? 'Search Results' : 'All Surahs'}
                        </Text>

                        <FlatList
                            data={filteredSurahs}
                            renderItem={renderSurahItem}
                            keyExtractor={item => item.surah_id.toString()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View style={styles.emptyState}>
                                    <Text style={styles.emojiIconLarge}>🚫</Text>
                                    <Text style={styles.emptyStateText}>No Surahs found</Text>
                                    <Text style={styles.emptyStateSubText}>
                                        Try searching with different keywords
                                    </Text>
                                </View>
                            }
                        />
                    </View>
                )}

                {/* Add to Playlist Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={playlistModalVisible}
                    onRequestClose={() => setPlaylistModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add to Playlist</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="New playlist name"
                                value={newPlaylistName}
                                onChangeText={setNewPlaylistName}
                                placeholderTextColor="#999"
                            />
                            <TouchableOpacity
                                style={styles.createPlaylistButton}
                                onPress={createNewPlaylist}
                            >
                                <Text style={styles.createPlaylistButtonText}>Create New Playlist</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalSubtitle}>Or select existing playlist:</Text>

                            <FlatList
                                data={playlists}
                                renderItem={renderPlaylistItem}
                                keyExtractor={item => item.id.toString()}
                                style={styles.playlistList}
                                ListEmptyComponent={
                                    <Text style={styles.noPlaylistsText}>No playlists yet</Text>
                                }
                            />

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setPlaylistModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    headerSpacer: {
        width: 32,
    },
    searchContainer: {
        padding: 16,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 16,
    },
    emojiIcon: {
        fontSize: 20,
        color: '#777',
        marginRight: 8,
    },
    emojiIconLarge: {
        fontSize: 50,
        color: '#ccc',
    },
    searchInput: {
        flex: 1,
        height: 45,
        fontSize: 16,
        color: '#000',
    },
    clearButton: {
        padding: 4,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    content: {
        flex: 1,
    },
    surahHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    surahTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    historySection: {
        marginBottom: 20,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    clearHistoryButton: {
        padding: 4,
    },
    clearHistoryText: {
        color: '#8A2BE2',
        fontSize: 14,
        fontWeight: '500',
    },
    historyItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        flex: 1,
    },
    historyText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    removeHistoryButton: {
        padding: 8,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
    },
    removeIcon: {
        fontSize: 18,
        color: '#888',
        fontWeight: 'bold',
    },
    surahItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    surahNumber: {
        backgroundColor: '#8A2BE2',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    surahNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    surahInfo: {
        flex: 1,
    },
    surahName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    surahArabicName: {
        fontSize: 14,
        color: '#666',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    ayatContainer: {
        padding: 16,
        paddingBottom: 30,
    },
    ayahCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    arabicText: {
        fontSize: 20,
        textAlign: 'right',
        marginBottom: 12,
        lineHeight: 32,
        color: '#34495e',
        fontFamily: 'ScheherazadeNew-Regular',
    },
    translationText: {
        fontSize: 15,
        marginBottom: 8,
        lineHeight: 22,
        color: '#2c3e50',
    },
    urduText: {
        fontSize: 15,
        marginBottom: 12,
        lineHeight: 22,
        color: '#2c3e50',
    },
    ayahFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    ayahActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ayahNumber: {
        fontSize: 14,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    audioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8A2BE2',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginLeft: 8,
    },
    stopButton: {
        backgroundColor: '#e74c3c',
    },
    audioButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 4,
    },
    playlistButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#27ae60',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginLeft: 8,
    },
    playlistButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 4,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyStateText: {
        fontSize: 18,
        color: '#777',
        marginTop: 12,
        marginBottom: 6,
    },
    emptyStateSubText: {
        fontSize: 14,
        color: '#999',
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
        borderRadius: 12,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    createPlaylistButton: {
        backgroundColor: '#8A2BE2',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    createPlaylistButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    playlistList: {
        maxHeight: 200,
        marginBottom: 16,
    },
    playlistItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    playlistName: {
        fontSize: 16,
    },
    noPlaylistsText: {
        textAlign: 'center',
        color: '#999',
        padding: 16,
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Search;