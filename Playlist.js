import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    Modal,
    TextInput,
    SafeAreaView
} from 'react-native';
import Sound from 'react-native-sound';
import openDB from './DB';

Sound.setCategory('Playback');

const Playlist = ({ navigation }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlistItems, setPlaylistItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlayingAyat, setCurrentlyPlayingAyat] = useState(null);

    useEffect(() => {
        loadPlaylists();
    }, []);

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

    const loadPlaylistItems = async (playlistId) => {
        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT pi.*, q.Arabic, q.English, q.Urdu, q.ayah_location, 
                            apc.play_count as global_play_count
                     FROM playlist_items pi
                     JOIN Quran q ON pi.surah_id = q.surah_id AND pi.ayah_id = q.ayah_Id
                     LEFT JOIN ayah_play_counts apc ON pi.surah_id = apc.surah_id AND pi.ayah_id = apc.ayah_id
                     WHERE pi.playlist_id = ?
                     ORDER BY pi.added_at DESC`,
                    [playlistId],
                    (_, { rows }) => {
                        setPlaylistItems(rows.raw());
                        setSelectedPlaylist(playlistId);
                    },
                    (_, error) => console.log('Error loading playlist items:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const createPlaylist = async () => {
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
                        setModalVisible(false);
                        setNewPlaylistName('');
                        loadPlaylists();
                        Alert.alert('Success', 'Playlist created successfully');
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

    const deletePlaylist = async (playlistId) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this playlist?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const db = await openDB();
                            db.transaction(tx => {
                                tx.executeSql(
                                    'DELETE FROM playlists WHERE id = ?',
                                    [playlistId],
                                    (_, result) => {
                                        loadPlaylists();
                                        if (selectedPlaylist === playlistId) {
                                            setSelectedPlaylist(null);
                                            setPlaylistItems([]);
                                        }
                                        Alert.alert('Success', 'Playlist deleted successfully');
                                    },
                                    (_, error) => {
                                        console.log('Error deleting playlist:', error);
                                        Alert.alert('Error', 'Failed to delete playlist');
                                    }
                                );
                            });
                        } catch (error) {
                            console.error('Database error:', error);
                            Alert.alert('Error', 'Failed to delete playlist');
                        }
                    }
                }
            ]
        );
    };

    const removeFromPlaylist = async (itemId, surahId, ayahId) => {
        Alert.alert(
            'Confirm Remove',
            'Are you sure you want to remove this ayah from the playlist?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const db = await openDB();
                            db.transaction(tx => {
                                tx.executeSql(
                                    'DELETE FROM playlist_items WHERE id = ?',
                                    [itemId],
                                    (_, result) => {
                                        loadPlaylistItems(selectedPlaylist);
                                        Alert.alert('Success', 'Ayah removed from playlist');
                                    },
                                    (_, error) => {
                                        console.log('Error removing from playlist:', error);
                                        Alert.alert('Error', 'Failed to remove ayah from playlist');
                                    }
                                );
                            });
                        } catch (error) {
                            console.error('Database error:', error);
                            Alert.alert('Error', 'Failed to remove ayah from playlist');
                        }
                    }
                }
            ]
        );
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

        setCurrentlyPlayingAyat(ayah.id);

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
                // Update global play count
                tx.executeSql(
                    'INSERT OR REPLACE INTO ayah_play_counts (surah_id, ayah_id, play_count) VALUES (?, ?, COALESCE((SELECT play_count FROM ayah_play_counts WHERE surah_id = ? AND ayah_id = ?), 0) + 1)',
                    [ayah.surah_id, ayah.ayah_id, ayah.surah_id, ayah.ayah_id],
                    () => console.log('Global play count updated'),
                    (_, error) => console.log('Error updating global play count:', error)
                );

                // Update playlist-specific play count
                tx.executeSql(
                    'UPDATE playlist_items SET play_count = play_count + 1 WHERE id = ?',
                    [ayah.id],
                    () => {
                        console.log('Playlist play count updated');
                        loadPlaylistItems(selectedPlaylist);
                    },
                    (_, error) => console.log('Error updating playlist play count:', error)
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

    const renderPlaylistItem = ({ item }) => (
        <View style={styles.playlistItem}>
            <Text style={styles.arabicText}>{item.Arabic}</Text>
            <Text style={styles.translationText}>{item.English}</Text>
            <Text style={styles.urduText}>{item.Urdu}</Text>

            <View style={styles.itemFooter}>
                <View>
                    <Text style={styles.ayahInfo}>Surah {item.surah_id}, Ayah {item.ayah_location}</Text>
                    <Text style={styles.playCount}>
                        Played: {item.play_count || 0} times (in playlist)
                    </Text>
                    <Text style={styles.playCount}>
                        Global plays: {item.global_play_count || 0}
                    </Text>
                </View>

                <View style={styles.itemActions}>
                    {currentlyPlayingAyat === item.id ? (
                        <TouchableOpacity
                            onPress={stopAudio}
                            style={[styles.audioButton, styles.stopButton]}
                        >
                            <Text style={styles.emojiIcon}>⏹️</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => playAyahAudio(item)}
                            style={styles.audioButton}
                        >
                            <Text style={styles.emojiIcon}>▶️</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => removeFromPlaylist(item.id, item.surah_id, item.ayah_id)}
                        style={styles.removeButton}
                    >
                        <Text style={styles.emojiIcon}>❌</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderPlaylist = ({ item }) => (
        <TouchableOpacity
            style={styles.playlistCard}
            onPress={() => loadPlaylistItems(item.id)}
        >
            <Text style={styles.playlistName}>{item.name}</Text>
            <Text style={styles.playlistDate}>
                Created: {new Date(item.created_at).toLocaleDateString()}
            </Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePlaylist(item.id)}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Playlists</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+ New Playlist</Text>
                </TouchableOpacity>
            </View>

            {selectedPlaylist ? (
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setSelectedPlaylist(null)}
                    >
                        <Text style={styles.backText}>← Back to Playlists</Text>
                    </TouchableOpacity>

                    {playlistItems.length > 0 ? (
                        <FlatList
                            data={playlistItems}
                            renderItem={renderPlaylistItem}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
                        />
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>This playlist is empty</Text>
                        </View>
                    )}
                </View>
            ) : (
                <FlatList
                    data={playlists}
                    renderItem={renderPlaylist}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No playlists yet</Text>
                            <Text style={styles.emptySubText}>
                                Create your first playlist to get started
                            </Text>
                        </View>
                    }
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Create New Playlist</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Playlist name"
                            value={newPlaylistName}
                            onChangeText={setNewPlaylistName}
                            autoFocus={true}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.createButton]}
                                onPress={createPlaylist}
                            >
                                <Text style={styles.createButtonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EDF9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    addButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    backButton: {
        marginBottom: 16,
        padding: 8,
    },
    backText: {
        color: '#8A2BE2',
        fontSize: 16,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 30,
    },
    playlistCard: {
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
    playlistName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    playlistDate: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 4,
    },
    deleteText: {
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    playlistItem: {
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
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
        marginTop: 8,
    },
    ayahInfo: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    playCount: {
        fontSize: 12,
        color: '#8A2BE2',
        marginTop: 4,
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    audioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8A2BE2',
        padding: 8,
        borderRadius: 20,
        marginLeft: 8,
    },
    stopButton: {
        backgroundColor: '#e74c3c',
    },
    removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 20,
        marginLeft: 8,
    },
    emojiIcon: {
        fontSize: 16,
        color: 'white',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 18,
        color: '#777',
        marginBottom: 8,
    },
    emptySubText: {
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
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    cancelButtonText: {
        color: '#333',
    },
    createButton: {
        backgroundColor: '#8A2BE2',
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Playlist;