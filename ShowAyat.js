

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// // // // // import { Picker } from '@react-native-picker/picker';
// // // // // import openDB from './DB';

// // // // // const ShowAyat = ({ navigation }) => {
// // // // //     const [days, setDays] = useState([]);
// // // // //     const [moods, setMoods] = useState([]);
// // // // //     const [selectedDay, setSelectedDay] = useState(null);
// // // // //     const [selectedMood, setSelectedMood] = useState(null);
// // // // //     const [ayat, setAyat] = useState(null);
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
// // // // //     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');

// // // // //     useEffect(() => {
// // // // //         loadInitialData();
// // // // //     }, []);

// // // // //     const loadInitialData = async () => {
// // // // //         try {
// // // // //             const db = await openDB();

// // // // //             // Load days
// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     'SELECT * FROM Day',
// // // // //                     [],
// // // // //                     (_, { rows }) => setDays(rows.raw()),
// // // // //                     (_, error) => console.log('Error loading days:', error)
// // // // //                 );
// // // // //             });

// // // // //             // Load moods
// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     'SELECT * FROM Mood',
// // // // //                     [],
// // // // //                     (_, { rows }) => setMoods(rows.raw()),
// // // // //                     (_, error) => console.log('Error loading moods:', error)
// // // // //                 );
// // // // //             });
// // // // //         } catch (error) {
// // // // //             console.error('Database error:', error);
// // // // //         }
// // // // //     };

// // // // //     const handleDayChange = (itemValue, itemIndex) => {
// // // // //         setSelectedDay(itemValue);
// // // // //         if (itemValue === null) {
// // // // //             setSelectedDayLabel('Select a day');
// // // // //         } else {
// // // // //             const selected = days.find(day => day.day_id === itemValue);
// // // // //             setSelectedDayLabel(selected ? selected.name : 'Select a day');
// // // // //         }
// // // // //     };

// // // // //     const handleMoodChange = (itemValue, itemIndex) => {
// // // // //         setSelectedMood(itemValue);
// // // // //         if (itemValue === null) {
// // // // //             setSelectedMoodLabel('Select a mood');
// // // // //         } else {
// // // // //             const selected = moods.find(mood => mood.mood_id === itemValue);
// // // // //             setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
// // // // //         }
// // // // //     };

// // // // //     const handleShowAyat = async () => {
// // // // //         if (!selectedDay && !selectedMood) {
// // // // //             Alert.alert('Error', 'Please select at least a day or a mood');
// // // // //             return;
// // // // //         }

// // // // //         setLoading(true);
// // // // //         setAyat(null);

// // // // //         try {
// // // // //             const db = await openDB();

// // // // //             let query = '';
// // // // //             let params = [];

// // // // //             if (selectedDay && selectedMood) {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.day_id = ? AND m.mood_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedDay, selectedMood];
// // // // //             } else if (selectedDay) {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.day_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedDay];
// // // // //             } else {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.mood_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedMood];
// // // // //             }

// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     query,
// // // // //                     params,
// // // // //                     (_, { rows }) => {
// // // // //                         setLoading(false);
// // // // //                         if (rows.length > 0) {
// // // // //                             setAyat(rows.raw()[0]);
// // // // //                         } else {
// // // // //                             Alert.alert('Info', 'No ayat found for the selected criteria');
// // // // //                         }
// // // // //                     },
// // // // //                     (_, error) => {
// // // // //                         setLoading(false);
// // // // //                         console.log('Error fetching ayat:', error);
// // // // //                         Alert.alert('Error', 'Failed to fetch ayat');
// // // // //                     }
// // // // //                 );
// // // // //             });
// // // // //         } catch (error) {
// // // // //             setLoading(false);
// // // // //             console.error('Database error:', error);
// // // // //         }
// // // // //     };

// // // // //     return (
// // // // //         <ScrollView contentContainerStyle={styles.container}>
// // // // //             <View style={styles.header}>
// // // // //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// // // // //                     <Text style={styles.backButton}>←</Text>
// // // // //                 </TouchableOpacity>
// // // // //                 <Text style={styles.title}>Daily Quran Reciter</Text>
// // // // //                 <View style={styles.headerSpacer} />
// // // // //             </View>

// // // // //             <Text style={styles.label}>Today is:</Text>
// // // // //             <View style={styles.pickerContainer}>
// // // // //                 <Picker
// // // // //                     selectedValue={selectedDay}
// // // // //                     onValueChange={handleDayChange}
// // // // //                     style={styles.picker}
// // // // //                     dropdownIconColor="#000"
// // // // //                 >
// // // // //                     <Picker.Item label="Select a day" value={null} />
// // // // //                     {days.map(day => (
// // // // //                         <Picker.Item
// // // // //                             key={day.day_id}
// // // // //                             label={day.name}
// // // // //                             value={day.day_id}
// // // // //                             color={selectedDay === day.day_id ? '#000' : '#666'}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </Picker>
// // // // //                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
// // // // //             </View>

// // // // //             <Text style={styles.label}>I'm feeling:</Text>
// // // // //             <View style={styles.pickerContainer}>
// // // // //                 <Picker
// // // // //                     selectedValue={selectedMood}
// // // // //                     onValueChange={handleMoodChange}
// // // // //                     style={styles.picker}
// // // // //                     dropdownIconColor="#000"
// // // // //                 >
// // // // //                     <Picker.Item label="Select a mood" value={null} />
// // // // //                     {moods.map(mood => (
// // // // //                         <Picker.Item
// // // // //                             key={mood.mood_id}
// // // // //                             label={mood.name}
// // // // //                             value={mood.mood_id}
// // // // //                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </Picker>
// // // // //                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
// // // // //             </View>

// // // // //             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
// // // // //                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
// // // // //             </TouchableOpacity>

// // // // //             {ayat && (
// // // // //                 <View style={styles.ayatCard}>
// // // // //                     <Text style={styles.surahName}>
// // // // //                         {ayat.EnglishName} ({ayat.ArabicName})
// // // // //                     </Text>
// // // // //                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>
// // // // //                     <Text style={styles.translationLabel}>Urdu Translation:</Text>
// // // // //                     <Text style={styles.translationText}>{ayat.Urdu}</Text>
// // // // //                     <Text style={styles.translationLabel}>English Translation:</Text>
// // // // //                     <Text style={styles.translationText}>{ayat.English}</Text>
// // // // //                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>
// // // // //                 </View>
// // // // //             )}
// // // // //         </ScrollView>
// // // // //     );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //     container: {
// // // // //         flexGrow: 1,
// // // // //         padding: 20,
// // // // //         backgroundColor: '#F8EDF9',
// // // // //     },
// // // // //     header: {
// // // // //         flexDirection: 'row',
// // // // //         alignItems: 'center',
// // // // //         justifyContent: 'space-between',
// // // // //         marginBottom: 30,
// // // // //     },
// // // // //     backButton: {
// // // // //         fontSize: 24,
// // // // //         padding: 10,
// // // // //         color: '#000',
// // // // //     },
// // // // //     title: {
// // // // //         fontSize: 24,
// // // // //         fontWeight: 'bold',
// // // // //         color: '#000',
// // // // //         textAlign: 'center',
// // // // //         flex: 1,
// // // // //     },
// // // // //     headerSpacer: {
// // // // //         width: 40,
// // // // //     },
// // // // //     label: {
// // // // //         fontSize: 16,
// // // // //         marginBottom: 5,
// // // // //         color: '#000',
// // // // //         fontWeight: '500',
// // // // //     },
// // // // //     pickerContainer: {
// // // // //         borderWidth: 1,
// // // // //         borderColor: '#bdc3c7',
// // // // //         borderRadius: 5,
// // // // //         marginBottom: 20,
// // // // //         backgroundColor: 'white',
// // // // //         position: 'relative',
// // // // //     },
// // // // //     picker: {
// // // // //         height: 50,
// // // // //         width: '100%',
// // // // //         opacity: 0, // Hide the default picker but keep it functional
// // // // //     },
// // // // //     selectedValue: {
// // // // //         position: 'absolute',
// // // // //         left: 15,
// // // // //         top: 15,
// // // // //         fontSize: 16,
// // // // //         color: '#000',
// // // // //     },
// // // // //     button: {
// // // // //         backgroundColor: '#C5A4F7',
// // // // //         padding: 15,
// // // // //         borderRadius: 30,
// // // // //         alignItems: 'center',
// // // // //         marginBottom: 30,
// // // // //         elevation: 5,
// // // // //     },
// // // // //     buttonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 18,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // //     ayatCard: {
// // // // //         backgroundColor: 'white',
// // // // //         borderRadius: 10,
// // // // //         padding: 20,
// // // // //         shadowColor: '#000',
// // // // //         shadowOffset: { width: 0, height: 2 },
// // // // //         shadowOpacity: 0.1,
// // // // //         shadowRadius: 5,
// // // // //         elevation: 3,
// // // // //     },
// // // // //     surahName: {
// // // // //         fontSize: 18,
// // // // //         fontWeight: 'bold',
// // // // //         textAlign: 'center',
// // // // //         marginBottom: 15,
// // // // //         color: '#2c3e50',
// // // // //     },
// // // // //     arabicText: {
// // // // //         fontSize: 22,
// // // // //         textAlign: 'right',
// // // // //         marginBottom: 20,
// // // // //         lineHeight: 35,
// // // // //         color: '#34495e',
// // // // //     },
// // // // //     translationLabel: {
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //         marginTop: 10,
// // // // //         color: '#7f8c8d',
// // // // //     },
// // // // //     translationText: {
// // // // //         fontSize: 16,
// // // // //         marginBottom: 10,
// // // // //         lineHeight: 24,
// // // // //         color: '#34495e',
// // // // //     },
// // // // //     ayahInfo: {
// // // // //         fontSize: 14,
// // // // //         textAlign: 'right',
// // // // //         color: '#7f8c8d',
// // // // //         marginTop: 10,
// // // // //     },
// // // // // });

// // // // // export default ShowAyat;



// // // // ////////////////////

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// // // // // import { Picker } from '@react-native-picker/picker';
// // // // // import Sound from 'react-native-sound';
// // // // // import openDB from './DB';

// // // // // Sound.setCategory('Playback');

// // // // // const ShowAyat = ({ navigation }) => {
// // // // //     const [days, setDays] = useState([]);
// // // // //     const [moods, setMoods] = useState([]);
// // // // //     const [selectedDay, setSelectedDay] = useState(null);
// // // // //     const [selectedMood, setSelectedMood] = useState(null);
// // // // //     const [ayat, setAyat] = useState(null);
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
// // // // //     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
// // // // //     const [sound, setSound] = useState(null);
// // // // //     const [isPlaying, setIsPlaying] = useState(false);

// // // // //     useEffect(() => {
// // // // //         loadInitialData();
// // // // //     }, []);

// // // // //     const loadInitialData = async () => {
// // // // //         try {
// // // // //             const db = await openDB();

// // // // //             // Load days
// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     'SELECT * FROM Day',
// // // // //                     [],
// // // // //                     (_, { rows }) => setDays(rows.raw()),
// // // // //                     (_, error) => console.log('Error loading days:', error)
// // // // //                 );
// // // // //             });

// // // // //             // Load moods
// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     'SELECT * FROM Mood',
// // // // //                     [],
// // // // //                     (_, { rows }) => setMoods(rows.raw()),
// // // // //                     (_, error) => console.log('Error loading moods:', error)
// // // // //                 );
// // // // //             });
// // // // //         } catch (error) {
// // // // //             console.error('Database error:', error);
// // // // //         }
// // // // //     };

// // // // //     const handleDayChange = (itemValue) => {
// // // // //         setSelectedDay(itemValue);
// // // // //         const selected = days.find(day => day.day_id === itemValue);
// // // // //         setSelectedDayLabel(selected ? selected.name : 'Select a day');
// // // // //     };

// // // // //     const handleMoodChange = (itemValue) => {
// // // // //         setSelectedMood(itemValue);
// // // // //         const selected = moods.find(mood => mood.mood_id === itemValue);
// // // // //         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
// // // // //     };

// // // // //     const handleShowAyat = async () => {
// // // // //         if (!selectedDay && !selectedMood) {
// // // // //             Alert.alert('Error', 'Please select at least a day or a mood');
// // // // //             return;
// // // // //         }

// // // // //         setLoading(true);
// // // // //         setAyat(null);

// // // // //         try {
// // // // //             const db = await openDB();

// // // // //             let query = '';
// // // // //             let params = [];

// // // // //             if (selectedDay && selectedMood) {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.day_id = ? AND m.mood_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedDay, selectedMood];
// // // // //             } else if (selectedDay) {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.day_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedDay];
// // // // //             } else {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.mood_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedMood];
// // // // //             }

// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     query,
// // // // //                     params,
// // // // //                     (_, { rows }) => {
// // // // //                         setLoading(false);
// // // // //                         if (rows.length > 0) {
// // // // //                             setAyat(rows.raw()[0]);
// // // // //                         } else {
// // // // //                             Alert.alert('Info', 'No ayat found for the selected criteria');
// // // // //                         }
// // // // //                     },
// // // // //                     (_, error) => {
// // // // //                         setLoading(false);
// // // // //                         console.log('Error fetching ayat:', error);
// // // // //                         Alert.alert('Error', 'Failed to fetch ayat');
// // // // //                     }
// // // // //                 );
// // // // //             });
// // // // //         } catch (error) {
// // // // //             setLoading(false);
// // // // //             console.error('Database error:', error);
// // // // //         }
// // // // //     };

// // // // //     const playAyahAudio = () => {
// // // // //         if (!ayat) return;

// // // // //         const surahId = String(ayat.surah_id).padStart(3, '0');
// // // // //         const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
// // // // //         const fileName = `a${surahId}${ayahLoc}.mp3`;

// // // // //         if (sound) {
// // // // //             sound.release();
// // // // //         }

// // // // //         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
// // // // //             if (error) {
// // // // //                 Alert.alert('Error', 'Audio load failed: ' + error.message);
// // // // //                 return;
// // // // //             }
// // // // //             newSound.play((success) => {
// // // // //                 if (success) {
// // // // //                     console.log('Playback finished');
// // // // //                 } else {
// // // // //                     Alert.alert('Error', 'Audio playback failed');
// // // // //                 }
// // // // //                 newSound.release();
// // // // //                 setIsPlaying(false);
// // // // //             });
// // // // //         });

// // // // //         setSound(newSound);
// // // // //         setIsPlaying(true);
// // // // //     };

// // // // //     const stopAudio = () => {
// // // // //         if (sound) {
// // // // //             sound.stop(() => {
// // // // //                 sound.release();
// // // // //                 setIsPlaying(false);
// // // // //             });
// // // // //         }
// // // // //     };

// // // // //     return (
// // // // //         <ScrollView contentContainerStyle={styles.container}>
// // // // //             <View style={styles.header}>
// // // // //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// // // // //                     <Text style={styles.backButton}>←</Text>
// // // // //                 </TouchableOpacity>
// // // // //                 <Text style={styles.title}>Daily Quran Reciter</Text>
// // // // //                 <View style={styles.headerSpacer} />
// // // // //             </View>

// // // // //             <Text style={styles.label}>Today is:</Text>
// // // // //             <View style={styles.pickerContainer}>
// // // // //                 <Picker
// // // // //                     selectedValue={selectedDay}
// // // // //                     onValueChange={handleDayChange}
// // // // //                     style={styles.picker}
// // // // //                     dropdownIconColor="#000"
// // // // //                 >
// // // // //                     <Picker.Item label="Select a day" value={null} />
// // // // //                     {days.map(day => (
// // // // //                         <Picker.Item
// // // // //                             key={day.day_id}
// // // // //                             label={day.name}
// // // // //                             value={day.day_id}
// // // // //                             color={selectedDay === day.day_id ? '#000' : '#666'}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </Picker>
// // // // //                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
// // // // //             </View>

// // // // //             <Text style={styles.label}>I'm feeling:</Text>
// // // // //             <View style={styles.pickerContainer}>
// // // // //                 <Picker
// // // // //                     selectedValue={selectedMood}
// // // // //                     onValueChange={handleMoodChange}
// // // // //                     style={styles.picker}
// // // // //                     dropdownIconColor="#000"
// // // // //                 >
// // // // //                     <Picker.Item label="Select a mood" value={null} />
// // // // //                     {moods.map(mood => (
// // // // //                         <Picker.Item
// // // // //                             key={mood.mood_id}
// // // // //                             label={mood.name}
// // // // //                             value={mood.mood_id}
// // // // //                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </Picker>
// // // // //                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
// // // // //             </View>

// // // // //             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
// // // // //                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
// // // // //             </TouchableOpacity>

// // // // //             {ayat && (
// // // // //                 <View style={styles.ayatCard}>
// // // // //                     <Text style={styles.surahName}>
// // // // //                         {ayat.EnglishName} ({ayat.ArabicName})
// // // // //                     </Text>
// // // // //                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>
// // // // //                     <Text style={styles.translationLabel}>Urdu Translation:</Text>
// // // // //                     <Text style={styles.translationText}>{ayat.Urdu}</Text>
// // // // //                     <Text style={styles.translationLabel}>English Translation:</Text>
// // // // //                     <Text style={styles.translationText}>{ayat.English}</Text>
// // // // //                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

// // // // //                     {/* Play / Stop Buttons */}
// // // // //                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
// // // // //                         {!isPlaying ? (
// // // // //                             <TouchableOpacity onPress={playAyahAudio} style={styles.audioButton}>
// // // // //                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
// // // // //                             </TouchableOpacity>
// // // // //                         ) : (
// // // // //                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
// // // // //                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
// // // // //                             </TouchableOpacity>
// // // // //                         )}
// // // // //                     </View>
// // // // //                 </View>
// // // // //             )}
// // // // //         </ScrollView>
// // // // //     );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //     container: {
// // // // //         flexGrow: 1,
// // // // //         padding: 20,
// // // // //         backgroundColor: '#F8EDF9',
// // // // //     },
// // // // //     header: {
// // // // //         flexDirection: 'row',
// // // // //         alignItems: 'center',
// // // // //         justifyContent: 'space-between',
// // // // //         marginBottom: 30,
// // // // //     },
// // // // //     backButton: {
// // // // //         fontSize: 24,
// // // // //         padding: 10,
// // // // //         color: '#000',
// // // // //     },
// // // // //     title: {
// // // // //         fontSize: 24,
// // // // //         fontWeight: 'bold',
// // // // //         color: '#000',
// // // // //         textAlign: 'center',
// // // // //         flex: 1,
// // // // //     },
// // // // //     headerSpacer: {
// // // // //         width: 40,
// // // // //     },
// // // // //     label: {
// // // // //         fontSize: 16,
// // // // //         marginBottom: 5,
// // // // //         color: '#000',
// // // // //         fontWeight: '500',
// // // // //     },
// // // // //     pickerContainer: {
// // // // //         borderWidth: 1,
// // // // //         borderColor: '#bdc3c7',
// // // // //         borderRadius: 5,
// // // // //         marginBottom: 20,
// // // // //         backgroundColor: 'white',
// // // // //         position: 'relative',
// // // // //     },
// // // // //     picker: {
// // // // //         height: 50,
// // // // //         width: '100%',
// // // // //         opacity: 0,
// // // // //     },
// // // // //     selectedValue: {
// // // // //         position: 'absolute',
// // // // //         left: 15,
// // // // //         top: 15,
// // // // //         fontSize: 16,
// // // // //         color: '#000',
// // // // //     },
// // // // //     button: {
// // // // //         backgroundColor: '#C5A4F7',
// // // // //         padding: 15,
// // // // //         borderRadius: 30,
// // // // //         alignItems: 'center',
// // // // //         marginBottom: 30,
// // // // //         elevation: 5,
// // // // //     },
// // // // //     buttonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 18,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // //     ayatCard: {
// // // // //         backgroundColor: 'white',
// // // // //         borderRadius: 10,
// // // // //         padding: 20,
// // // // //         shadowColor: '#000',
// // // // //         shadowOffset: { width: 0, height: 2 },
// // // // //         shadowOpacity: 0.1,
// // // // //         shadowRadius: 5,
// // // // //         elevation: 3,
// // // // //     },
// // // // //     surahName: {
// // // // //         fontSize: 18,
// // // // //         fontWeight: 'bold',
// // // // //         textAlign: 'center',
// // // // //         marginBottom: 15,
// // // // //         color: '#2c3e50',
// // // // //     },
// // // // //     arabicText: {
// // // // //         fontSize: 22,
// // // // //         textAlign: 'right',
// // // // //         marginBottom: 20,
// // // // //         lineHeight: 35,
// // // // //         color: '#34495e',
// // // // //     },
// // // // //     translationLabel: {
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //         marginTop: 10,
// // // // //         color: '#7f8c8d',
// // // // //     },
// // // // //     translationText: {
// // // // //         fontSize: 16,
// // // // //         marginBottom: 10,
// // // // //         lineHeight: 24,
// // // // //         color: '#34495e',
// // // // //     },
// // // // //     ayahInfo: {
// // // // //         fontSize: 14,
// // // // //         textAlign: 'right',
// // // // //         color: '#7f8c8d',
// // // // //         marginTop: 10,
// // // // //     },
// // // // //     audioButton: {
// // // // //         backgroundColor: '#2ecc71',
// // // // //         paddingVertical: 10,
// // // // //         paddingHorizontal: 30,
// // // // //         borderRadius: 25,
// // // // //         elevation: 3,
// // // // //     },
// // // // //     audioButtonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // // });

// // // // // export default ShowAyat;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, SafeAreaView } from 'react-native';
// // // // // import { Picker } from '@react-native-picker/picker';
// // // // // import Sound from 'react-native-sound';
// // // // // import openDB from './DB';

// // // // // Sound.setCategory('Playback');

// // // // // const questions = [
// // // // //     "How happy are you feeling?",
// // // // //     "How sad are you feeling?",
// // // // //     "How energetic are you?",
// // // // //     "How tired do you feel?",
// // // // //     "How stressed are you?",
// // // // //     "How calm do you feel?",
// // // // //     "How focused are you?",
// // // // //     "How distracted do you feel?",
// // // // //     "How anxious are you?",
// // // // //     "How relaxed do you feel?",
// // // // // ];

// // // // // // const questions = [
// // // // // //     "I feel energetic today.",
// // // // // //     "How sad are you feeling?",
// // // // // //     "I am enjoying the things I do.",
// // // // // //     "I feel stressed or anxious.",
// // // // // //     "I am feeling socially connected.",
// // // // // //     "How calm do you feel?",
// // // // // //     "I am productive and focused.",
// // // // // //     "I feel tired or exhausted.",
// // // // // //     "I feel emotionally balanced.",
// // // // // //     "I feel appreciated by others.",
// // // // // // ];

// // // // // const moodEmojis = {
// // // // //     Happy: "😊",
// // // // //     Sad: "😢",
// // // // //     Angry: "😠",
// // // // //     Fearful: "😨",
// // // // //     Surprised: "😲",
// // // // //     Neutral: "😐",
// // // // //     Excited: "🤩",
// // // // //     Tired: "😴",
// // // // // };

// // // // // const ShowAyat = ({ navigation }) => {
// // // // //     const [days, setDays] = useState([]);
// // // // //     const [moods, setMoods] = useState([]);
// // // // //     const [selectedDay, setSelectedDay] = useState(null);
// // // // //     const [selectedMood, setSelectedMood] = useState(null);
// // // // //     const [ayat, setAyat] = useState(null);
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
// // // // //     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
// // // // //     const [sound, setSound] = useState(null);
// // // // //     const [isPlaying, setIsPlaying] = useState(false);

// // // // //     // Mood prediction modal states
// // // // //     const [showMoodModal, setShowMoodModal] = useState(false);
// // // // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // // // //     const [answers, setAnswers] = useState([]);
// // // // //     const [inputValue, setInputValue] = useState("");
// // // // //     const [predictedMood, setPredictedMood] = useState(null);

// // // // //     useEffect(() => {
// // // // //         loadInitialData();
// // // // //     }, []);

// // // // //     const loadInitialData = async () => {
// // // // //         try {
// // // // //             const db = await openDB();

// // // // //             // Load days
// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     'SELECT * FROM Day',
// // // // //                     [],
// // // // //                     (_, { rows }) => setDays(rows.raw()),
// // // // //                     (_, error) => console.log('Error loading days:', error)
// // // // //                 );
// // // // //             });

// // // // //             // Load moods
// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     'SELECT * FROM Mood',
// // // // //                     [],
// // // // //                     (_, { rows }) => setMoods(rows.raw()),
// // // // //                     (_, error) => console.log('Error loading moods:', error)
// // // // //                 );
// // // // //             });
// // // // //         } catch (error) {
// // // // //             console.error('Database error:', error);
// // // // //         }
// // // // //     };

// // // // //     const handleDayChange = (itemValue) => {
// // // // //         setSelectedDay(itemValue);
// // // // //         const selected = days.find(day => day.day_id === itemValue);
// // // // //         setSelectedDayLabel(selected ? selected.name : 'Select a day');
// // // // //     };

// // // // //     const handleMoodChange = (itemValue) => {
// // // // //         setSelectedMood(itemValue);
// // // // //         const selected = moods.find(mood => mood.mood_id === itemValue);
// // // // //         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
// // // // //     };

// // // // //     const handleShowAyat = async () => {
// // // // //         if (!selectedDay && !selectedMood) {
// // // // //             Alert.alert('Error', 'Please select at least a day or a mood');
// // // // //             return;
// // // // //         }

// // // // //         setLoading(true);
// // // // //         setAyat(null);

// // // // //         try {
// // // // //             const db = await openDB();

// // // // //             let query = '';
// // // // //             let params = [];

// // // // //             if (selectedDay && selectedMood) {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.day_id = ? AND m.mood_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedDay, selectedMood];
// // // // //             } else if (selectedDay) {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.day_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedDay];
// // // // //             } else {
// // // // //                 query = `
// // // // //           SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //           FROM Quran q
// // // // //           JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //           JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //           WHERE m.mood_id = ?
// // // // //           ORDER BY RANDOM() LIMIT 1
// // // // //         `;
// // // // //                 params = [selectedMood];
// // // // //             }

// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     query,
// // // // //                     params,
// // // // //                     (_, { rows }) => {
// // // // //                         setLoading(false);
// // // // //                         if (rows.length > 0) {
// // // // //                             setAyat(rows.raw()[0]);
// // // // //                         } else {
// // // // //                             Alert.alert('Info', 'No ayat found for the selected criteria');
// // // // //                         }
// // // // //                     },
// // // // //                     (_, error) => {
// // // // //                         setLoading(false);
// // // // //                         console.log('Error fetching ayat:', error);
// // // // //                         Alert.alert('Error', 'Failed to fetch ayat');
// // // // //                     }
// // // // //                 );
// // // // //             });
// // // // //         } catch (error) {
// // // // //             setLoading(false);
// // // // //             console.error('Database error:', error);
// // // // //         }
// // // // //     };

// // // // //     const playAyahAudio = () => {
// // // // //         if (!ayat) return;

// // // // //         const surahId = String(ayat.surah_id).padStart(3, '0');
// // // // //         const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
// // // // //         const fileName = `a${surahId}${ayahLoc}.mp3`;

// // // // //         if (sound) {
// // // // //             sound.release();
// // // // //         }

// // // // //         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
// // // // //             if (error) {
// // // // //                 Alert.alert('Error', 'Audio load failed: ' + error.message);
// // // // //                 return;
// // // // //             }
// // // // //             newSound.play((success) => {
// // // // //                 if (success) {
// // // // //                     console.log('Playback finished');
// // // // //                 } else {
// // // // //                     Alert.alert('Error', 'Audio playback failed');
// // // // //                 }
// // // // //                 newSound.release();
// // // // //                 setIsPlaying(false);
// // // // //             });
// // // // //         });

// // // // //         setSound(newSound);
// // // // //         setIsPlaying(true);
// // // // //     };

// // // // //     const stopAudio = () => {
// // // // //         if (sound) {
// // // // //             sound.stop(() => {
// // // // //                 sound.release();
// // // // //                 setIsPlaying(false);
// // // // //             });
// // // // //         }
// // // // //     };

// // // // //     // Mood prediction functions
// // // // //     const handleMoodPrediction = async () => {
// // // // //         const value = parseInt(inputValue);

// // // // //         if (isNaN(value) || value < 1 || value > 5) {
// // // // //             Alert.alert("Please enter a number between 1 to 5.");
// // // // //             return;
// // // // //         }

// // // // //         const updatedAnswers = [...answers, value];
// // // // //         setAnswers(updatedAnswers);
// // // // //         setInputValue("");

// // // // //         if (currentQuestionIndex < questions.length - 1) {
// // // // //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// // // // //         } else {
// // // // //             // Send to server for prediction
// // // // //             try {
// // // // //                 const response = await fetch("http://192.168.130.1:5000/predict", {
// // // // //                     method: "POST",
// // // // //                     headers: {
// // // // //                         "Content-Type": "application/json",
// // // // //                     },
// // // // //                     body: JSON.stringify({ answers: updatedAnswers }),
// // // // //                 });

// // // // //                 const data = await response.json();
// // // // //                 const mood = data.mood;
// // // // //                 setPredictedMood(mood);

// // // // //                 // Find the mood_id for the predicted mood
// // // // //                 const predictedMoodObj = moods.find(m => m.name === mood);
// // // // //                 if (predictedMoodObj) {
// // // // //                     setSelectedMood(predictedMoodObj.mood_id);
// // // // //                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
// // // // //                 }

// // // // //                 // Close the modal after a short delay
// // // // //                 setTimeout(() => {
// // // // //                     setShowMoodModal(false);
// // // // //                     resetMoodPrediction();
// // // // //                 }, 1500);
// // // // //             } catch (error) {
// // // // //                 setPredictedMood("Server error. Try again later ❌");
// // // // //             }
// // // // //         }
// // // // //     };

// // // // //     const resetMoodPrediction = () => {
// // // // //         setCurrentQuestionIndex(0);
// // // // //         setAnswers([]);
// // // // //         setInputValue("");
// // // // //         setPredictedMood(null);
// // // // //     };

// // // // //     const openMoodModal = () => {
// // // // //         resetMoodPrediction();
// // // // //         setShowMoodModal(true);
// // // // //     };

// // // // //     return (
// // // // //         <ScrollView contentContainerStyle={styles.container}>
// // // // //             <View style={styles.header}>
// // // // //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// // // // //                     <Text style={styles.backButton}>←</Text>
// // // // //                 </TouchableOpacity>
// // // // //                 <Text style={styles.title}>Daily Quran Reciter</Text>
// // // // //                 <View style={styles.headerSpacer} />
// // // // //             </View>

// // // // //             <Text style={styles.label}>Today is:</Text>
// // // // //             <View style={styles.pickerContainer}>
// // // // //                 <Picker
// // // // //                     selectedValue={selectedDay}
// // // // //                     onValueChange={handleDayChange}
// // // // //                     style={styles.picker}
// // // // //                     dropdownIconColor="#000"
// // // // //                 >
// // // // //                     <Picker.Item label="Select a day" value={null} />
// // // // //                     {days.map(day => (
// // // // //                         <Picker.Item
// // // // //                             key={day.day_id}
// // // // //                             label={day.name}
// // // // //                             value={day.day_id}
// // // // //                             color={selectedDay === day.day_id ? '#000' : '#666'}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </Picker>
// // // // //                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
// // // // //             </View>

// // // // //             <Text style={styles.label}>I'm feeling:</Text>
// // // // //             <View style={styles.pickerContainer}>
// // // // //                 <Picker
// // // // //                     selectedValue={selectedMood}
// // // // //                     onValueChange={handleMoodChange}
// // // // //                     style={styles.picker}
// // // // //                     dropdownIconColor="#000"
// // // // //                 >
// // // // //                     <Picker.Item label="Select a mood" value={null} />
// // // // //                     {moods.map(mood => (
// // // // //                         <Picker.Item
// // // // //                             key={mood.mood_id}
// // // // //                             label={mood.name}
// // // // //                             value={mood.mood_id}
// // // // //                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </Picker>
// // // // //                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
// // // // //             </View>

// // // // //             {/* AI Mood Prediction Button */}
// // // // //             <TouchableOpacity
// // // // //                 style={styles.aiButton}
// // // // //                 onPress={openMoodModal}
// // // // //             >
// // // // //                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
// // // // //             </TouchableOpacity>

// // // // //             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
// // // // //                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
// // // // //             </TouchableOpacity>

// // // // //             {ayat && (
// // // // //                 <View style={styles.ayatCard}>
// // // // //                     <Text style={styles.surahName}>
// // // // //                         {ayat.EnglishName} ({ayat.ArabicName})
// // // // //                     </Text>
// // // // //                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>
// // // // //                     <Text style={styles.translationLabel}>Urdu Translation:</Text>
// // // // //                     <Text style={styles.translationText}>{ayat.Urdu}</Text>
// // // // //                     <Text style={styles.translationLabel}>English Translation:</Text>
// // // // //                     <Text style={styles.translationText}>{ayat.English}</Text>
// // // // //                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

// // // // //                     {/* Play / Stop Buttons */}
// // // // //                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
// // // // //                         {!isPlaying ? (
// // // // //                             <TouchableOpacity onPress={playAyahAudio} style={styles.audioButton}>
// // // // //                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
// // // // //                             </TouchableOpacity>
// // // // //                         ) : (
// // // // //                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
// // // // //                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
// // // // //                             </TouchableOpacity>
// // // // //                         )}
// // // // //                     </View>
// // // // //                 </View>
// // // // //             )}

// // // // //             {/* Mood Prediction Modal */}
// // // // //             <Modal
// // // // //                 visible={showMoodModal}
// // // // //                 animationType="slide"
// // // // //                 transparent={false}
// // // // //                 onRequestClose={() => setShowMoodModal(false)}
                
// // // // //             >

// // // // //                 <View style={{
                   
// // // // //                     padding: 25,
                   
// // // // //                     alignItems: 'center',
// // // // //                     justifyContent: 'center',
                    
                    
// // // // //                 }}>
// // // // //                     <Text style={{
// // // // //                         color: '#000',
// // // // //                         fontSize: 24,
// // // // //                         fontWeight: 'bold'
// // // // //                     }}>🤖 AI MOOD PREDICTION</Text>
// // // // //                 </View>
// // // // //                 <SafeAreaView style={styles.modalContainer}>
// // // // //                     {predictedMood ? (
                      
// // // // //                         <View style={styles.card}>
// // // // //                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
// // // // //                             <Text style={styles.resultText}>
// // // // //                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
// // // // //                             </Text>
// // // // //                             <TouchableOpacity
// // // // //                                 style={styles.modalButton}
// // // // //                                 onPress={() => setShowMoodModal(false)}
// // // // //                             >
// // // // //                                 <Text style={styles.modalButtonText}>OK</Text>
// // // // //                             </TouchableOpacity>
// // // // //                         </View>
                        
// // // // //                     ) : (
// // // // //                         <View style={styles.card}>
// // // // //                             <Text style={styles.counter}>
// // // // //                                 Question {currentQuestionIndex + 1}/{questions.length}
// // // // //                             </Text>
// // // // //                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
// // // // //                             <TextInput
// // // // //                                 style={styles.input}
// // // // //                                 keyboardType="numeric"
// // // // //                                 maxLength={1}
// // // // //                                 placeholder="Enter 1-5"
// // // // //                                 placeholderTextColor="#666"
// // // // //                                 value={inputValue}
// // // // //                                 onChangeText={setInputValue}
// // // // //                             />
// // // // //                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
// // // // //                                 <Text style={styles.modalButtonText}>
// // // // //                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
// // // // //                                 </Text>
// // // // //                             </TouchableOpacity>
// // // // //                         </View>
// // // // //                     )}
// // // // //                 </SafeAreaView>
// // // // //             </Modal>
// // // // //         </ScrollView>
// // // // //     );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //     container: {
// // // // //         flexGrow: 1,
// // // // //         padding: 20,
// // // // //         backgroundColor: '#F8EDF9',
// // // // //     },
// // // // //     header: {
// // // // //         flexDirection: 'row',
// // // // //         alignItems: 'center',
// // // // //         justifyContent: 'space-between',
// // // // //         marginBottom: 30,
// // // // //     },
// // // // //     backButton: {
// // // // //         fontSize: 24,
// // // // //         padding: 10,
// // // // //         color: '#000',
// // // // //     },
// // // // //     title: {
// // // // //         fontSize: 24,
// // // // //         fontWeight: 'bold',
// // // // //         color: '#000',
// // // // //         textAlign: 'center',
// // // // //         flex: 1,
// // // // //     },
// // // // //     headerSpacer: {
// // // // //         width: 40,
// // // // //     },
// // // // //     label: {
// // // // //         fontSize: 16,
// // // // //         marginBottom: 5,
// // // // //         color: '#000',
// // // // //         fontWeight: '500',
// // // // //     },
// // // // //     pickerContainer: {
// // // // //         borderWidth: 1,
// // // // //         borderColor: '#bdc3c7',
// // // // //         borderRadius: 5,
// // // // //         marginBottom: 20,
// // // // //         backgroundColor: 'white',
// // // // //         position: 'relative',
// // // // //     },
// // // // //     picker: {
// // // // //         height: 50,
// // // // //         width: '100%',
// // // // //         opacity: 0,
// // // // //     },
// // // // //     selectedValue: {
// // // // //         position: 'absolute',
// // // // //         left: 15,
// // // // //         top: 15,
// // // // //         fontSize: 16,
// // // // //         color: '#000',
// // // // //     },
// // // // //     button: {
// // // // //         backgroundColor: '#C5A4F7',
// // // // //         padding: 15,
// // // // //         borderRadius: 30,
// // // // //         alignItems: 'center',
// // // // //         marginBottom: 30,
// // // // //         elevation: 5,
// // // // //     },
// // // // //     buttonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 18,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // //     aiButton: {
// // // // //         backgroundColor: '#4CAF50',
// // // // //         padding: 15,
// // // // //         borderRadius: 30,
// // // // //         alignItems: 'center',
// // // // //         marginBottom: 15,
// // // // //         elevation: 5,
// // // // //     },
// // // // //     aiButtonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // //     ayatCard: {
// // // // //         backgroundColor: 'white',
// // // // //         borderRadius: 10,
// // // // //         padding: 20,
// // // // //         shadowColor: '#000',
// // // // //         shadowOffset: { width: 0, height: 2 },
// // // // //         shadowOpacity: 0.1,
// // // // //         shadowRadius: 5,
// // // // //         elevation: 3,
// // // // //     },
// // // // //     surahName: {
// // // // //         fontSize: 18,
// // // // //         fontWeight: 'bold',
// // // // //         textAlign: 'center',
// // // // //         marginBottom: 15,
// // // // //         color: '#2c3e50',
// // // // //     },
// // // // //     arabicText: {
// // // // //         fontSize: 22,
// // // // //         textAlign: 'right',
// // // // //         marginBottom: 20,
// // // // //         lineHeight: 35,
// // // // //         color: '#34495e',
// // // // //     },
// // // // //     translationLabel: {
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //         marginTop: 10,
// // // // //         color: '#7f8c8d',
// // // // //     },
// // // // //     translationText: {
// // // // //         fontSize: 16,
// // // // //         marginBottom: 10,
// // // // //         lineHeight: 24,
// // // // //         color: '#34495e',
// // // // //     },
// // // // //     ayahInfo: {
// // // // //         fontSize: 14,
// // // // //         textAlign: 'right',
// // // // //         color: '#7f8c8d',
// // // // //         marginTop: 10,
// // // // //     },
// // // // //     audioButton: {
// // // // //         backgroundColor: '#2ecc71',
// // // // //         paddingVertical: 10,
// // // // //         paddingHorizontal: 30,
// // // // //         borderRadius: 25,
// // // // //         elevation: 3,
// // // // //     },
// // // // //     audioButtonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // //     // Modal styles
// // // // //     modalContainer: {
// // // // //         flex: 1,
// // // // //         backgroundColor: '#F8EDF9',
// // // // //         justifyContent: 'center',
// // // // //         padding: 20,
// // // // //     },
// // // // //     card: {
// // // // //         backgroundColor: '#fff',
// // // // //         borderRadius: 16,
// // // // //         padding: 25,
// // // // //         elevation: 6,
// // // // //         alignItems: 'center',
// // // // //     },
// // // // //     counter: {
// // // // //         fontSize: 14,
// // // // //         color: '#888',
// // // // //         alignSelf: 'flex-end',
// // // // //     },
// // // // //     question: {
// // // // //         fontSize: 20,
// // // // //         fontWeight: 'bold',
// // // // //         color: '#333',
// // // // //         textAlign: 'center',
// // // // //         marginVertical: 20,
// // // // //     },
// // // // //     input: {
// // // // //         width: '50%',
// // // // //         borderColor: '#aaa',
// // // // //         borderWidth: 1,
// // // // //         borderRadius: 10,
// // // // //         paddingVertical: 10,
// // // // //         paddingHorizontal: 12,
// // // // //         fontSize: 18,
// // // // //         textAlign: 'center',
// // // // //         color: '#000',
// // // // //         backgroundColor: '#fff',
// // // // //     },
// // // // //     modalButton: {
// // // // //         marginTop: 25,
// // // // //         backgroundColor: '#C5A4F7',
// // // // //         paddingVertical: 12,
// // // // //         paddingHorizontal: 35,
// // // // //         borderRadius: 30,
// // // // //         elevation: 4,
// // // // //     },
// // // // //     modalButtonText: {
// // // // //         color: '#fff',
// // // // //         fontWeight: 'bold',
// // // // //         fontSize: 16,
// // // // //     },
// // // // //     resultTitle: {
// // // // //         fontSize: 22,
// // // // //         fontWeight: 'bold',
// // // // //         marginBottom: 15,
// // // // //         color: '#0056b3',
// // // // //     },
// // // // //     resultText: {
// // // // //         fontSize: 26,
// // // // //         fontWeight: 'bold',
// // // // //         color: '#0f5132',
// // // // //     },
// // // // // });

// // // // // export default ShowAyat;

// // // // //////////////////////auto day

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, SafeAreaView } from 'react-native';
// // // // // import { Picker } from '@react-native-picker/picker';
// // // // // import Sound from 'react-native-sound';
// // // // // import openDB from './DB';

// // // // // Sound.setCategory('Playback');

// // // // // const questions = [
// // // // //     "How happy are you feeling?",
// // // // //     "How sad are you feeling?",
// // // // //     "How energetic are you?",
// // // // //     "How tired do you feel?",
// // // // //     "How stressed are you?",
// // // // //     "How calm do you feel?",
// // // // //     "How focused are you?",
// // // // //     "How distracted do you feel?",
// // // // //     "How anxious are you?",
// // // // //     "How relaxed do you feel?",
// // // // // ];

// // // // // const moodEmojis = {
// // // // //     Happy: "😊",
// // // // //     Sad: "😢",
// // // // //     Angry: "😠",
// // // // //     Fearful: "😨",
// // // // //     Surprised: "😲",
// // // // //     Neutral: "😐",
// // // // //     Excited: "🤩",
// // // // //     Tired: "😴",
// // // // // };

// // // // // const ShowAyat = ({ navigation }) => {
// // // // //     const [days, setDays] = useState([]);
// // // // //     const [moods, setMoods] = useState([]);
// // // // //     const [selectedDay, setSelectedDay] = useState(null);
// // // // //     const [selectedMood, setSelectedMood] = useState(null);
// // // // //     const [ayat, setAyat] = useState(null);
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
// // // // //     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
// // // // //     const [sound, setSound] = useState(null);
// // // // //     const [isPlaying, setIsPlaying] = useState(false);

// // // // //     // Mood prediction modal states
// // // // //     const [showMoodModal, setShowMoodModal] = useState(false);
// // // // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // // // //     const [answers, setAnswers] = useState([]);
// // // // //     const [inputValue, setInputValue] = useState("");
// // // // //     const [predictedMood, setPredictedMood] = useState(null);

// // // // //     useEffect(() => {
// // // // //         loadInitialData();
// // // // //     }, []);

// // // // //     const loadInitialData = async () => {
// // // // //         try {
// // // // //             const db = await openDB();

// // // // //             // Load days
// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     'SELECT * FROM Day',
// // // // //                     [],
// // // // //                     (_, { rows }) => {
// // // // //                         const daysData = rows.raw();
// // // // //                         setDays(daysData);

// // // // //                         // Get current day name (e.g., "Monday")
// // // // //                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// // // // //                         const today = new Date().getDay(); // 0-6 (Sunday-Saturday)
// // // // //                         const currentDayName = daysOfWeek[today];

// // // // //                         // Find matching day in the database
// // // // //                         const currentDay = daysData.find(day =>
// // // // //                             day.name.toLowerCase() === currentDayName.toLowerCase()
// // // // //                         );

// // // // //                         if (currentDay) {
// // // // //                             setSelectedDay(currentDay.day_id);
// // // // //                             setSelectedDayLabel(currentDay.name);
// // // // //                         }
// // // // //                     },
// // // // //                     (_, error) => console.log('Error loading days:', error)
// // // // //                 );
// // // // //             });

// // // // //             // Load moods
// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     'SELECT * FROM Mood',
// // // // //                     [],
// // // // //                     (_, { rows }) => setMoods(rows.raw()),
// // // // //                     (_, error) => console.log('Error loading moods:', error)
// // // // //                 );
// // // // //             });
// // // // //         } catch (error) {
// // // // //             console.error('Database error:', error);
// // // // //         }
// // // // //     };

// // // // //     const handleDayChange = (itemValue) => {
// // // // //         setSelectedDay(itemValue);
// // // // //         const selected = days.find(day => day.day_id === itemValue);
// // // // //         setSelectedDayLabel(selected ? selected.name : 'Select a day');
// // // // //     };

// // // // //     const handleMoodChange = (itemValue) => {
// // // // //         setSelectedMood(itemValue);
// // // // //         const selected = moods.find(mood => mood.mood_id === itemValue);
// // // // //         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
// // // // //     };

// // // // //     const handleShowAyat = async () => {
// // // // //         if (!selectedDay && !selectedMood) {
// // // // //             Alert.alert('Error', 'Please select at least a day or a mood');
// // // // //             return;
// // // // //         }

// // // // //         setLoading(true);
// // // // //         setAyat(null);

// // // // //         try {
// // // // //             const db = await openDB();

// // // // //             let query = '';
// // // // //             let params = [];

// // // // //             if (selectedDay && selectedMood) {
// // // // //                 query = `
// // // // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //                     FROM Quran q
// // // // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //                     WHERE m.day_id = ? AND m.mood_id = ?
// // // // //                     ORDER BY RANDOM() LIMIT 1
// // // // //                 `;
// // // // //                 params = [selectedDay, selectedMood];
// // // // //             } else if (selectedDay) {
// // // // //                 query = `
// // // // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //                     FROM Quran q
// // // // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //                     WHERE m.day_id = ?
// // // // //                     ORDER BY RANDOM() LIMIT 1
// // // // //                 `;
// // // // //                 params = [selectedDay];
// // // // //             } else {
// // // // //                 query = `
// // // // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // // // //                     FROM Quran q
// // // // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // // // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // // //                     WHERE m.mood_id = ?
// // // // //                     ORDER BY RANDOM() LIMIT 1
// // // // //                 `;
// // // // //                 params = [selectedMood];
// // // // //             }

// // // // //             db.transaction(tx => {
// // // // //                 tx.executeSql(
// // // // //                     query,
// // // // //                     params,
// // // // //                     (_, { rows }) => {
// // // // //                         setLoading(false);
// // // // //                         if (rows.length > 0) {
// // // // //                             setAyat(rows.raw()[0]);
// // // // //                         } else {
// // // // //                             Alert.alert('Info', 'No ayat found for the selected criteria');
// // // // //                         }
// // // // //                     },
// // // // //                     (_, error) => {
// // // // //                         setLoading(false);
// // // // //                         console.log('Error fetching ayat:', error);
// // // // //                         Alert.alert('Error', 'Failed to fetch ayat');
// // // // //                     }
// // // // //                 );
// // // // //             });
// // // // //         } catch (error) {
// // // // //             setLoading(false);
// // // // //             console.error('Database error:', error);
// // // // //         }
// // // // //     };

// // // // //     const playAyahAudio = () => {
// // // // //         if (!ayat) return;

// // // // //         const surahId = String(ayat.surah_id).padStart(3, '0');
// // // // //         const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
// // // // //         const fileName = `a${surahId}${ayahLoc}.mp3`;

// // // // //         if (sound) {
// // // // //             sound.release();
// // // // //         }

// // // // //         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
// // // // //             if (error) {
// // // // //                 Alert.alert('Error', 'Audio load failed: ' + error.message);
// // // // //                 return;
// // // // //             }
// // // // //             newSound.play((success) => {
// // // // //                 if (success) {
// // // // //                     console.log('Playback finished');
// // // // //                 } else {
// // // // //                     Alert.alert('Error', 'Audio playback failed');
// // // // //                 }
// // // // //                 newSound.release();
// // // // //                 setIsPlaying(false);
// // // // //             });
// // // // //         });

// // // // //         setSound(newSound);
// // // // //         setIsPlaying(true);
// // // // //     };

// // // // //     const stopAudio = () => {
// // // // //         if (sound) {
// // // // //             sound.stop(() => {
// // // // //                 sound.release();
// // // // //                 setIsPlaying(false);
// // // // //             });
// // // // //         }
// // // // //     };

// // // // //     // Mood prediction functions
// // // // //     const handleMoodPrediction = async () => {
// // // // //         const value = parseInt(inputValue);

// // // // //         if (isNaN(value) || value < 1 || value > 5) {
// // // // //             Alert.alert("Please enter a number between 1 to 5.");
// // // // //             return;
// // // // //         }

// // // // //         const updatedAnswers = [...answers, value];
// // // // //         setAnswers(updatedAnswers);
// // // // //         setInputValue("");

// // // // //         if (currentQuestionIndex < questions.length - 1) {
// // // // //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// // // // //         } else {
// // // // //             // Send to server for prediction
// // // // //             try {
// // // // //                 const response = await fetch("http://192.168.110.3:5000/predict", {
// // // // //                     method: "POST",
// // // // //                     headers: {
// // // // //                         "Content-Type": "application/json",
// // // // //                     },
// // // // //                     body: JSON.stringify({ answers: updatedAnswers }),
// // // // //                 });

// // // // //                 const data = await response.json();
// // // // //                 const mood = data.mood;
// // // // //                 setPredictedMood(mood);

// // // // //                 // Find the mood_id for the predicted mood
// // // // //                 const predictedMoodObj = moods.find(m => m.name === mood);
// // // // //                 if (predictedMoodObj) {
// // // // //                     setSelectedMood(predictedMoodObj.mood_id);
// // // // //                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
// // // // //                 }

// // // // //                 // Close the modal after a short delay
// // // // //                 setTimeout(() => {
// // // // //                     setShowMoodModal(false);
// // // // //                     resetMoodPrediction();
// // // // //                 }, 1500);
// // // // //             } catch (error) {
// // // // //                 setPredictedMood("Server error. Try again later ❌");
// // // // //             }
// // // // //         }
// // // // //     };

// // // // //     const resetMoodPrediction = () => {
// // // // //         setCurrentQuestionIndex(0);
// // // // //         setAnswers([]);
// // // // //         setInputValue("");
// // // // //         setPredictedMood(null);
// // // // //     };

// // // // //     const openMoodModal = () => {
// // // // //         resetMoodPrediction();
// // // // //         setShowMoodModal(true);
// // // // //     };

// // // // //     return (
// // // // //         <ScrollView contentContainerStyle={styles.container}>
// // // // //             <View style={styles.header}>
// // // // //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// // // // //                     <Text style={styles.backButton}>←</Text>
// // // // //                 </TouchableOpacity>
// // // // //                 <Text style={styles.title}>Daily Quran Reciter</Text>
// // // // //                 <View style={styles.headerSpacer} />
// // // // //             </View>

// // // // //             <Text style={styles.label}>Today is:</Text>
// // // // //             <View style={styles.pickerContainer}>
// // // // //                 <Picker
// // // // //                     selectedValue={selectedDay}
// // // // //                     onValueChange={handleDayChange}
// // // // //                     style={styles.picker}
// // // // //                     dropdownIconColor="#000"
// // // // //                 >
// // // // //                     <Picker.Item label="Select a day" value={null} />
// // // // //                     {days.map(day => (
// // // // //                         <Picker.Item
// // // // //                             key={day.day_id}
// // // // //                             label={day.name}
// // // // //                             value={day.day_id}
// // // // //                             color={selectedDay === day.day_id ? '#000' : '#666'}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </Picker>
// // // // //                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
// // // // //             </View>

// // // // //             <Text style={styles.label}>I'm feeling:</Text>
// // // // //             <View style={styles.pickerContainer}>
// // // // //                 <Picker
// // // // //                     selectedValue={selectedMood}
// // // // //                     onValueChange={handleMoodChange}
// // // // //                     style={styles.picker}
// // // // //                     dropdownIconColor="#000"
// // // // //                 >
// // // // //                     <Picker.Item label="Select a mood" value={null} />
// // // // //                     {moods.map(mood => (
// // // // //                         <Picker.Item
// // // // //                             key={mood.mood_id}
// // // // //                             label={mood.name}
// // // // //                             value={mood.mood_id}
// // // // //                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </Picker>
// // // // //                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
// // // // //             </View>

// // // // //             {/* AI Mood Prediction Button */}
// // // // //             <TouchableOpacity
// // // // //                 style={styles.aiButton}
// // // // //                 onPress={openMoodModal}
// // // // //             >
// // // // //                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
// // // // //             </TouchableOpacity>

// // // // //             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
// // // // //                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
// // // // //             </TouchableOpacity>

// // // // //             {ayat && (
// // // // //                 <View style={styles.ayatCard}>
// // // // //                     <Text style={styles.surahName}>
// // // // //                         {ayat.EnglishName} ({ayat.ArabicName})
// // // // //                     </Text>
// // // // //                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>
// // // // //                     <Text style={styles.translationLabel}>Urdu Translation:</Text>
// // // // //                     <Text style={styles.translationText}>{ayat.Urdu}</Text>
// // // // //                     <Text style={styles.translationLabel}>English Translation:</Text>
// // // // //                     <Text style={styles.translationText}>{ayat.English}</Text>
// // // // //                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

// // // // //                     {/* Play / Stop Buttons */}
// // // // //                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
// // // // //                         {!isPlaying ? (
// // // // //                             <TouchableOpacity onPress={playAyahAudio} style={styles.audioButton}>
// // // // //                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
// // // // //                             </TouchableOpacity>
// // // // //                         ) : (
// // // // //                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
// // // // //                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
// // // // //                             </TouchableOpacity>
// // // // //                         )}
// // // // //                     </View>
// // // // //                 </View>
// // // // //             )}

// // // // //             {/* Mood Prediction Modal */}
// // // // //             <Modal
// // // // //                 visible={showMoodModal}
// // // // //                 animationType="slide"
// // // // //                 transparent={false}
// // // // //                 onRequestClose={() => setShowMoodModal(false)}
// // // // //             >
// // // // //                 <View style={{
// // // // //                     padding: 25,
// // // // //                     alignItems: 'center',
// // // // //                     justifyContent: 'center',
// // // // //                 }}>
// // // // //                     <Text style={{
// // // // //                         color: '#000',
// // // // //                         fontSize: 24,
// // // // //                         fontWeight: 'bold'
// // // // //                     }}>🤖 AI MOOD PREDICTION</Text>
// // // // //                 </View>
// // // // //                 <SafeAreaView style={styles.modalContainer}>
// // // // //                     {predictedMood ? (
// // // // //                         <View style={styles.card}>
// // // // //                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
// // // // //                             <Text style={styles.resultText}>
// // // // //                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
// // // // //                             </Text>
// // // // //                             <TouchableOpacity
// // // // //                                 style={styles.modalButton}
// // // // //                                 onPress={() => setShowMoodModal(false)}
// // // // //                             >
// // // // //                                 <Text style={styles.modalButtonText}>OK</Text>
// // // // //                             </TouchableOpacity>
// // // // //                         </View>
// // // // //                     ) : (
// // // // //                         <View style={styles.card}>
// // // // //                             <Text style={styles.counter}>
// // // // //                                 Question {currentQuestionIndex + 1}/{questions.length}
// // // // //                             </Text>
// // // // //                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
// // // // //                             <TextInput
// // // // //                                 style={styles.input}
// // // // //                                 keyboardType="numeric"
// // // // //                                 maxLength={1}
// // // // //                                 placeholder="Enter 1-5"
// // // // //                                 placeholderTextColor="#666"
// // // // //                                 value={inputValue}
// // // // //                                 onChangeText={setInputValue}
// // // // //                             />
// // // // //                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
// // // // //                                 <Text style={styles.modalButtonText}>
// // // // //                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
// // // // //                                 </Text>
// // // // //                             </TouchableOpacity>
// // // // //                         </View>
// // // // //                     )}
// // // // //                 </SafeAreaView>
// // // // //             </Modal>
// // // // //         </ScrollView>
// // // // //     );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //     container: {
// // // // //         flexGrow: 1,
// // // // //         padding: 20,
// // // // //         backgroundColor: '#F8EDF9',
// // // // //     },
// // // // //     header: {
// // // // //         flexDirection: 'row',
// // // // //         alignItems: 'center',
// // // // //         justifyContent: 'space-between',
// // // // //         marginBottom: 30,
// // // // //     },
// // // // //     backButton: {
// // // // //         fontSize: 24,
// // // // //         padding: 10,
// // // // //         color: '#000',
// // // // //     },
// // // // //     title: {
// // // // //         fontSize: 24,
// // // // //         fontWeight: 'bold',
// // // // //         color: '#000',
// // // // //         textAlign: 'center',
// // // // //         flex: 1,
// // // // //     },
// // // // //     headerSpacer: {
// // // // //         width: 40,
// // // // //     },
// // // // //     label: {
// // // // //         fontSize: 16,
// // // // //         marginBottom: 5,
// // // // //         color: '#000',
// // // // //         fontWeight: '500',
// // // // //     },
// // // // //     pickerContainer: {
// // // // //         borderWidth: 1,
// // // // //         borderColor: '#bdc3c7',
// // // // //         borderRadius: 5,
// // // // //         marginBottom: 20,
// // // // //         backgroundColor: 'white',
// // // // //         position: 'relative',
// // // // //     },
// // // // //     picker: {
// // // // //         height: 50,
// // // // //         width: '100%',
// // // // //         opacity: 0,
// // // // //     },
// // // // //     selectedValue: {
// // // // //         position: 'absolute',
// // // // //         left: 15,
// // // // //         top: 15,
// // // // //         fontSize: 16,
// // // // //         color: '#000',
// // // // //     },
// // // // //     button: {
// // // // //         backgroundColor: '#C5A4F7',
// // // // //         padding: 15,
// // // // //         borderRadius: 30,
// // // // //         alignItems: 'center',
// // // // //         marginBottom: 30,
// // // // //         elevation: 5,
// // // // //     },
// // // // //     buttonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 18,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // //     aiButton: {
// // // // //         backgroundColor: '#4CAF50',
// // // // //         padding: 15,
// // // // //         borderRadius: 30,
// // // // //         alignItems: 'center',
// // // // //         marginBottom: 15,
// // // // //         elevation: 5,
// // // // //     },
// // // // //     aiButtonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // //     ayatCard: {
// // // // //         backgroundColor: 'white',
// // // // //         borderRadius: 10,
// // // // //         padding: 20,
// // // // //         shadowColor: '#000',
// // // // //         shadowOffset: { width: 0, height: 2 },
// // // // //         shadowOpacity: 0.1,
// // // // //         shadowRadius: 5,
// // // // //         elevation: 3,
// // // // //     },
// // // // //     surahName: {
// // // // //         fontSize: 18,
// // // // //         fontWeight: 'bold',
// // // // //         textAlign: 'center',
// // // // //         marginBottom: 15,
// // // // //         color: '#2c3e50',
// // // // //     },
// // // // //     arabicText: {
// // // // //         fontSize: 22,
// // // // //         textAlign: 'right',
// // // // //         marginBottom: 20,
// // // // //         lineHeight: 35,
// // // // //         color: '#34495e',
// // // // //     },
// // // // //     translationLabel: {
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //         marginTop: 10,
// // // // //         color: '#7f8c8d',
// // // // //     },
// // // // //     translationText: {
// // // // //         fontSize: 16,
// // // // //         marginBottom: 10,
// // // // //         lineHeight: 24,
// // // // //         color: '#34495e',
// // // // //     },
// // // // //     ayahInfo: {
// // // // //         fontSize: 14,
// // // // //         textAlign: 'right',
// // // // //         color: '#7f8c8d',
// // // // //         marginTop: 10,
// // // // //     },
// // // // //     audioButton: {
// // // // //         backgroundColor: '#2ecc71',
// // // // //         paddingVertical: 10,
// // // // //         paddingHorizontal: 30,
// // // // //         borderRadius: 25,
// // // // //         elevation: 3,
// // // // //     },
// // // // //     audioButtonText: {
// // // // //         color: 'white',
// // // // //         fontSize: 16,
// // // // //         fontWeight: 'bold',
// // // // //     },
// // // // //     // Modal styles
// // // // //     modalContainer: {
// // // // //         flex: 1,
// // // // //         backgroundColor: '#F8EDF9',
// // // // //         justifyContent: 'center',
// // // // //         padding: 20,
// // // // //     },
// // // // //     card: {
// // // // //         backgroundColor: '#fff',
// // // // //         borderRadius: 16,
// // // // //         padding: 25,
// // // // //         elevation: 6,
// // // // //         alignItems: 'center',
// // // // //     },
// // // // //     counter: {
// // // // //         fontSize: 14,
// // // // //         color: '#888',
// // // // //         alignSelf: 'flex-end',
// // // // //     },
// // // // //     question: {
// // // // //         fontSize: 20,
// // // // //         fontWeight: 'bold',
// // // // //         color: '#333',
// // // // //         textAlign: 'center',
// // // // //         marginVertical: 20,
// // // // //     },
// // // // //     input: {
// // // // //         width: '50%',
// // // // //         borderColor: '#aaa',
// // // // //         borderWidth: 1,
// // // // //         borderRadius: 10,
// // // // //         paddingVertical: 10,
// // // // //         paddingHorizontal: 12,
// // // // //         fontSize: 18,
// // // // //         textAlign: 'center',
// // // // //         color: '#000',
// // // // //         backgroundColor: '#fff',
// // // // //     },
// // // // //     modalButton: {
// // // // //         marginTop: 25,
// // // // //         backgroundColor: '#C5A4F7',
// // // // //         paddingVertical: 12,
// // // // //         paddingHorizontal: 35,
// // // // //         borderRadius: 30,
// // // // //         elevation: 4,
// // // // //     },
// // // // //     modalButtonText: {
// // // // //         color: '#fff',
// // // // //         fontWeight: 'bold',
// // // // //         fontSize: 16,
// // // // //     },
// // // // //     resultTitle: {
// // // // //         fontSize: 22,
// // // // //         fontWeight: 'bold',
// // // // //         marginBottom: 15,
// // // // //         color: '#0056b3',
// // // // //     },
// // // // //     resultText: {
// // // // //         fontSize: 26,
// // // // //         fontWeight: 'bold',
// // // // //         color: '#0f5132',
// // // // //     },
// // // // // });

// // // // // export default ShowAyat;

// // // // ////////////radio button wala
// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView } from 'react-native';
// // // // import { Picker } from '@react-native-picker/picker';
// // // // import Sound from 'react-native-sound';
// // // // import openDB from './DB';

// // // // Sound.setCategory('Playback');

// // // // const questions = [
// // // //     "How happy are you feeling?",
// // // //     "How sad are you feeling?",
// // // //     "How energetic are you?",
// // // //     "How tired do you feel?",
// // // //     "How stressed are you?",
// // // //     "How calm do you feel?",
// // // //     "How focused are you?",
// // // //     "How distracted do you feel?",
// // // //     "How anxious are you?",
// // // //     "How relaxed do you feel?",
// // // // ];

// // // // const moodEmojis = {
// // // //     Happy: "😊",
// // // //     Sad: "😢",
// // // //     Angry: "😠",
// // // //     Fearful: "😨",
// // // //     Surprised: "😲",
// // // //     Neutral: "😐",
// // // //     Excited: "🤩",
// // // //     Tired: "😴",
// // // // };

// // // // const ShowAyat = ({ navigation }) => {
// // // //     const [days, setDays] = useState([]);
// // // //     const [moods, setMoods] = useState([]);
// // // //     const [selectedDay, setSelectedDay] = useState(null);
// // // //     const [selectedMood, setSelectedMood] = useState(null);
// // // //     const [ayat, setAyat] = useState(null);
// // // //     const [loading, setLoading] = useState(false);
// // // //     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
// // // //     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
// // // //     const [sound, setSound] = useState(null);
// // // //     const [isPlaying, setIsPlaying] = useState(false);

// // // //     // Mood prediction modal states
// // // //     const [showMoodModal, setShowMoodModal] = useState(false);
// // // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // // //     const [answers, setAnswers] = useState([]);
// // // //     const [inputValue, setInputValue] = useState("");
// // // //     const [predictedMood, setPredictedMood] = useState(null);

// // // //     useEffect(() => {
// // // //         loadInitialData();
// // // //     }, []);

// // // //     const loadInitialData = async () => {
// // // //         try {
// // // //             const db = await openDB();

// // // //             // Load days
// // // //             db.transaction(tx => {
// // // //                 tx.executeSql(
// // // //                     'SELECT * FROM Day',
// // // //                     [],
// // // //                     (_, { rows }) => {
// // // //                         const daysData = rows.raw();
// // // //                         setDays(daysData);

// // // //                         // Get current day name (e.g., "Monday")
// // // //                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// // // //                         const today = new Date().getDay(); // 0-6 (Sunday-Saturday)
// // // //                         const currentDayName = daysOfWeek[today];

// // // //                         // Find matching day in the database
// // // //                         const currentDay = daysData.find(day =>
// // // //                             day.name.toLowerCase() === currentDayName.toLowerCase()
// // // //                         );

// // // //                         if (currentDay) {
// // // //                             setSelectedDay(currentDay.day_id);
// // // //                             setSelectedDayLabel(currentDay.name);
// // // //                         }
// // // //                     },
// // // //                     (_, error) => console.log('Error loading days:', error)
// // // //                 );
// // // //             });

// // // //             // Load moods
// // // //             db.transaction(tx => {
// // // //                 tx.executeSql(
// // // //                     'SELECT * FROM Mood',
// // // //                     [],
// // // //                     (_, { rows }) => setMoods(rows.raw()),
// // // //                     (_, error) => console.log('Error loading moods:', error)
// // // //                 );
// // // //             });
// // // //         } catch (error) {
// // // //             console.error('Database error:', error);
// // // //         }
// // // //     };

// // // //     const handleDayChange = (itemValue) => {
// // // //         setSelectedDay(itemValue);
// // // //         const selected = days.find(day => day.day_id === itemValue);
// // // //         setSelectedDayLabel(selected ? selected.name : 'Select a day');
// // // //     };

// // // //     const handleMoodChange = (itemValue) => {
// // // //         setSelectedMood(itemValue);
// // // //         const selected = moods.find(mood => mood.mood_id === itemValue);
// // // //         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
// // // //     };

// // // //     const handleShowAyat = async () => {
// // // //         if (!selectedDay && !selectedMood) {
// // // //             Alert.alert('Error', 'Please select at least a day or a mood');
// // // //             return;
// // // //         }

// // // //         setLoading(true);
// // // //         setAyat(null);

// // // //         try {
// // // //             const db = await openDB();

// // // //             let query = '';
// // // //             let params = [];

// // // //             if (selectedDay && selectedMood) {
// // // //                 query = `
// // // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // // //                     FROM Quran q
// // // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // //                     WHERE m.day_id = ? AND m.mood_id = ?
// // // //                     ORDER BY RANDOM() LIMIT 1
// // // //                 `;
// // // //                 params = [selectedDay, selectedMood];
// // // //             } else if (selectedDay) {
// // // //                 query = `
// // // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // // //                     FROM Quran q
// // // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // //                     WHERE m.day_id = ?
// // // //                     ORDER BY RANDOM() LIMIT 1
// // // //                 `;
// // // //                 params = [selectedDay];
// // // //             } else {
// // // //                 query = `
// // // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // // //                     FROM Quran q
// // // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // // //                     WHERE m.mood_id = ?
// // // //                     ORDER BY RANDOM() LIMIT 1
// // // //                 `;
// // // //                 params = [selectedMood];
// // // //             }

// // // //             db.transaction(tx => {
// // // //                 tx.executeSql(
// // // //                     query,
// // // //                     params,
// // // //                     (_, { rows }) => {
// // // //                         setLoading(false);
// // // //                         if (rows.length > 0) {
// // // //                             setAyat(rows.raw()[0]);
// // // //                         } else {
// // // //                             Alert.alert('Info', 'No ayat found for the selected criteria');
// // // //                         }
// // // //                     },
// // // //                     (_, error) => {
// // // //                         setLoading(false);
// // // //                         console.log('Error fetching ayat:', error);
// // // //                         Alert.alert('Error', 'Failed to fetch ayat');
// // // //                     }
// // // //                 );
// // // //             });
// // // //         } catch (error) {
// // // //             setLoading(false);
// // // //             console.error('Database error:', error);
// // // //         }
// // // //     };

// // // //     const playAyahAudio = () => {
// // // //         if (!ayat) return;

// // // //         const surahId = String(ayat.surah_id).padStart(3, '0');
// // // //         const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
// // // //         const fileName = `a${surahId}${ayahLoc}.mp3`;

// // // //         if (sound) {
// // // //             sound.release();
// // // //         }

// // // //         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
// // // //             if (error) {
// // // //                 Alert.alert('Error', 'Audio load failed: ' + error.message);
// // // //                 return;
// // // //             }
// // // //             newSound.play((success) => {
// // // //                 if (success) {
// // // //                     console.log('Playback finished');
// // // //                 } else {
// // // //                     Alert.alert('Error', 'Audio playback failed');
// // // //                 }
// // // //                 newSound.release();
// // // //                 setIsPlaying(false);
// // // //             });
// // // //         });

// // // //         setSound(newSound);
// // // //         setIsPlaying(true);
// // // //     };

// // // //     const stopAudio = () => {
// // // //         if (sound) {
// // // //             sound.stop(() => {
// // // //                 sound.release();
// // // //                 setIsPlaying(false);
// // // //             });
// // // //         }
// // // //     };

// // // //     // Mood prediction functions
// // // //     const handleMoodPrediction = async () => {
// // // //         const value = parseInt(inputValue);

// // // //         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
// // // //             Alert.alert("Error", "Please select a number between 1 to 5.");
// // // //             return;
// // // //         }

// // // //         const updatedAnswers = [...answers, value];
// // // //         setAnswers(updatedAnswers);
// // // //         setInputValue(""); // Reset selection

// // // //         if (currentQuestionIndex < questions.length - 1) {
// // // //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// // // //         } else {
// // // //             // Send to server for prediction
// // // //             try {
// // // //                 const response = await fetch("http://192.168.130.1:5000/predict", {
// // // //                     method: "POST",
// // // //                     headers: {
// // // //                         "Content-Type": "application/json",
// // // //                     },
// // // //                     body: JSON.stringify({ answers: updatedAnswers }),
// // // //                 });

// // // //                 const data = await response.json();
// // // //                 const mood = data.mood;
// // // //                 setPredictedMood(mood);

// // // //                 // Find the mood_id for the predicted mood
// // // //                 const predictedMoodObj = moods.find(m => m.name === mood);
// // // //                 if (predictedMoodObj) {
// // // //                     setSelectedMood(predictedMoodObj.mood_id);
// // // //                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
// // // //                 }

// // // //                 // Close the modal after a short delay
// // // //                 setTimeout(() => {
// // // //                     setShowMoodModal(false);
// // // //                     resetMoodPrediction();
// // // //                 }, 1500);
// // // //             } catch (error) {
// // // //                 setPredictedMood("Server error. Try again later ❌");
// // // //             }
// // // //         }
// // // //     };

// // // //     const resetMoodPrediction = () => {
// // // //         setCurrentQuestionIndex(0);
// // // //         setAnswers([]);
// // // //         setInputValue("");
// // // //         setPredictedMood(null);
// // // //     };

// // // //     const openMoodModal = () => {
// // // //         resetMoodPrediction();
// // // //         setShowMoodModal(true);
// // // //     };

// // // //     return (
// // // //         <ScrollView contentContainerStyle={styles.container}>
// // // //             <View style={styles.header}>
// // // //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// // // //                     <Text style={styles.backButton}>←</Text>
// // // //                 </TouchableOpacity>
// // // //                 <Text style={styles.title}>Daily Quran Reciter</Text>
// // // //                 <View style={styles.headerSpacer} />
// // // //             </View>

// // // //             <Text style={styles.label}>Today is:</Text>
// // // //             <View style={styles.pickerContainer}>
// // // //                 <Picker
// // // //                     selectedValue={selectedDay}
// // // //                     onValueChange={handleDayChange}
// // // //                     style={styles.picker}
// // // //                     dropdownIconColor="#000"
// // // //                 >
// // // //                     <Picker.Item label="Select a day" value={null} />
// // // //                     {days.map(day => (
// // // //                         <Picker.Item
// // // //                             key={day.day_id}
// // // //                             label={day.name}
// // // //                             value={day.day_id}
// // // //                             color={selectedDay === day.day_id ? '#000' : '#666'}
// // // //                         />
// // // //                     ))}
// // // //                 </Picker>
// // // //                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
// // // //             </View>

// // // //             <Text style={styles.label}>I'm feeling:</Text>
// // // //             <View style={styles.pickerContainer}>
// // // //                 <Picker
// // // //                     selectedValue={selectedMood}
// // // //                     onValueChange={handleMoodChange}
// // // //                     style={styles.picker}
// // // //                     dropdownIconColor="#000"
// // // //                 >
// // // //                     <Picker.Item label="Select a mood" value={null} />
// // // //                     {moods.map(mood => (
// // // //                         <Picker.Item
// // // //                             key={mood.mood_id}
// // // //                             label={mood.name}
// // // //                             value={mood.mood_id}
// // // //                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
// // // //                         />
// // // //                     ))}
// // // //                 </Picker>
// // // //                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
// // // //             </View>

// // // //             {/* AI Mood Prediction Button */}
// // // //             <TouchableOpacity
// // // //                 style={styles.aiButton}
// // // //                 onPress={openMoodModal}
// // // //             >
// // // //                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
// // // //             </TouchableOpacity>

// // // //             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
// // // //                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
// // // //             </TouchableOpacity>

// // // //             {ayat && (
// // // //                 <View style={styles.ayatCard}>
// // // //                     <Text style={styles.surahName}>
// // // //                         {ayat.EnglishName} ({ayat.ArabicName})
// // // //                     </Text>
// // // //                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>
// // // //                     <Text style={styles.translationLabel}>Urdu Translation:</Text>
// // // //                     <Text style={styles.translationText}>{ayat.Urdu}</Text>
// // // //                     <Text style={styles.translationLabel}>English Translation:</Text>
// // // //                     <Text style={styles.translationText}>{ayat.English}</Text>
// // // //                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

// // // //                     {/* Play / Stop Buttons */}
// // // //                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
// // // //                         {!isPlaying ? (
// // // //                             <TouchableOpacity onPress={playAyahAudio} style={styles.audioButton}>
// // // //                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
// // // //                             </TouchableOpacity>
// // // //                         ) : (
// // // //                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
// // // //                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
// // // //                             </TouchableOpacity>
// // // //                         )}
// // // //                     </View>
// // // //                 </View>
// // // //             )}

// // // //             {/* Mood Prediction Modal */}
// // // //             <Modal
// // // //                 visible={showMoodModal}
// // // //                 animationType="slide"
// // // //                 transparent={false}
// // // //                 onRequestClose={() => setShowMoodModal(false)}
// // // //             >
// // // //                 <View style={{
// // // //                     padding: 25,
// // // //                     alignItems: 'center',
// // // //                     justifyContent: 'center',
// // // //                 }}>
// // // //                     <Text style={{
// // // //                         color: '#000',
// // // //                         fontSize: 24,
// // // //                         fontWeight: 'bold'
// // // //                     }}>🤖 AI MOOD PREDICTION</Text>
// // // //                 </View>
// // // //                 <SafeAreaView style={styles.modalContainer}>
// // // //                     {predictedMood ? (
// // // //                         <View style={styles.card}>
// // // //                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
// // // //                             <Text style={styles.resultText}>
// // // //                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
// // // //                             </Text>
// // // //                             <TouchableOpacity
// // // //                                 style={styles.modalButton}
// // // //                                 onPress={() => setShowMoodModal(false)}
// // // //                             >
// // // //                                 <Text style={styles.modalButtonText}>OK</Text>
// // // //                             </TouchableOpacity>
// // // //                         </View>
// // // //                     ) : (
// // // //                         <View style={styles.card}>
// // // //                             <Text style={styles.counter}>
// // // //                                 Question {currentQuestionIndex + 1}/{questions.length}
// // // //                             </Text>
// // // //                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
// // // //                             <View style={styles.radioContainer}>
// // // //                                 {[1, 2, 3, 4, 5].map((value) => (
// // // //                                     <TouchableOpacity
// // // //                                         key={value}
// // // //                                         style={[
// // // //                                             styles.radioButton,
// // // //                                             inputValue === value.toString() && styles.radioButtonSelected,
// // // //                                         ]}
// // // //                                         onPress={() => setInputValue(value.toString())}
// // // //                                     >
// // // //                                         <Text style={[
// // // //                                             styles.radioText,
// // // //                                             inputValue === value.toString() && styles.radioTextSelected,
// // // //                                         ]}>
// // // //                                             {value}
// // // //                                         </Text>
// // // //                                     </TouchableOpacity>
// // // //                                 ))}
// // // //                             </View>
// // // //                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
// // // //                                 <Text style={styles.modalButtonText}>
// // // //                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
// // // //                                 </Text>
// // // //                             </TouchableOpacity>
// // // //                         </View>
// // // //                     )}
// // // //                 </SafeAreaView>
// // // //             </Modal>
// // // //         </ScrollView>
// // // //     );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //     container: {
// // // //         flexGrow: 1,
// // // //         padding: 20,
// // // //         backgroundColor: '#F8EDF9',
// // // //     },
// // // //     header: {
// // // //         flexDirection: 'row',
// // // //         alignItems: 'center',
// // // //         justifyContent: 'space-between',
// // // //         marginBottom: 30,
// // // //     },
// // // //     backButton: {
// // // //         fontSize: 24,
// // // //         padding: 10,
// // // //         color: '#000',
// // // //     },
// // // //     title: {
// // // //         fontSize: 24,
// // // //         fontWeight: 'bold',
// // // //         color: '#000',
// // // //         textAlign: 'center',
// // // //         flex: 1,
// // // //     },
// // // //     headerSpacer: {
// // // //         width: 40,
// // // //     },
// // // //     label: {
// // // //         fontSize: 16,
// // // //         marginBottom: 5,
// // // //         color: '#000',
// // // //         fontWeight: '500',
// // // //     },
// // // //     pickerContainer: {
// // // //         borderWidth: 1,
// // // //         borderColor: '#bdc3c7',
// // // //         borderRadius: 5,
// // // //         marginBottom: 20,
// // // //         backgroundColor: 'white',
// // // //         position: 'relative',
// // // //     },
// // // //     picker: {
// // // //         height: 50,
// // // //         width: '100%',
// // // //         opacity: 0,
// // // //     },
// // // //     selectedValue: {
// // // //         position: 'absolute',
// // // //         left: 15,
// // // //         top: 15,
// // // //         fontSize: 16,
// // // //         color: '#000',
// // // //     },
// // // //     button: {
// // // //         backgroundColor: '#C5A4F7',
// // // //         padding: 15,
// // // //         borderRadius: 30,
// // // //         alignItems: 'center',
// // // //         marginBottom: 30,
// // // //         elevation: 5,
// // // //     },
// // // //     buttonText: {
// // // //         color: 'white',
// // // //         fontSize: 18,
// // // //         fontWeight: 'bold',
// // // //     },
// // // //     aiButton: {
// // // //         backgroundColor: '#4CAF50',
// // // //         padding: 15,
// // // //         borderRadius: 30,
// // // //         alignItems: 'center',
// // // //         marginBottom: 15,
// // // //         elevation: 5,
// // // //     },
// // // //     aiButtonText: {
// // // //         color: 'white',
// // // //         fontSize: 16,
// // // //         fontWeight: 'bold',
// // // //     },
// // // //     ayatCard: {
// // // //         backgroundColor: 'white',
// // // //         borderRadius: 10,
// // // //         padding: 20,
// // // //         shadowColor: '#000',
// // // //         shadowOffset: { width: 0, height: 2 },
// // // //         shadowOpacity: 0.1,
// // // //         shadowRadius: 5,
// // // //         elevation: 3,
// // // //     },
// // // //     surahName: {
// // // //         fontSize: 18,
// // // //         fontWeight: 'bold',
// // // //         textAlign: 'center',
// // // //         marginBottom: 15,
// // // //         color: '#2c3e50',
// // // //     },
// // // //     arabicText: {
// // // //         fontSize: 22,
// // // //         textAlign: 'right',
// // // //         marginBottom: 20,
// // // //         lineHeight: 35,
// // // //         color: '#34495e',
// // // //     },
// // // //     translationLabel: {
// // // //         fontSize: 16,
// // // //         fontWeight: 'bold',
// // // //         marginTop: 10,
// // // //         color: '#7f8c8d',
// // // //     },
// // // //     translationText: {
// // // //         fontSize: 16,
// // // //         marginBottom: 10,
// // // //         lineHeight: 24,
// // // //         color: '#34495e',
// // // //     },
// // // //     ayahInfo: {
// // // //         fontSize: 14,
// // // //         textAlign: 'right',
// // // //         color: '#7f8c8d',
// // // //         marginTop: 10,
// // // //     },
// // // //     audioButton: {
// // // //         backgroundColor: '#2ecc71',
// // // //         paddingVertical: 10,
// // // //         paddingHorizontal: 30,
// // // //         borderRadius: 25,
// // // //         elevation: 3,
// // // //     },
// // // //     audioButtonText: {
// // // //         color: 'white',
// // // //         fontSize: 16,
// // // //         fontWeight: 'bold',
// // // //     },
// // // //     // Modal styles
// // // //     modalContainer: {
// // // //         flex: 1,
// // // //         backgroundColor: '#F8EDF9',
// // // //         justifyContent: 'center',
// // // //         padding: 20,
// // // //     },
// // // //     card: {
// // // //         backgroundColor: '#fff',
// // // //         borderRadius: 16,
// // // //         padding: 25,
// // // //         elevation: 6,
// // // //         alignItems: 'center',
// // // //     },
// // // //     counter: {
// // // //         fontSize: 14,
// // // //         color: '#888',
// // // //         alignSelf: 'flex-end',
// // // //     },
// // // //     question: {
// // // //         fontSize: 20,
// // // //         fontWeight: 'bold',
// // // //         color: '#333',
// // // //         textAlign: 'center',
// // // //         marginVertical: 20,
// // // //     },
// // // //     radioContainer: {
// // // //         flexDirection: 'row',
// // // //         justifyContent: 'space-between',
// // // //         width: '80%',
// // // //         marginVertical: 20,
// // // //     },
// // // //     radioButton: {
// // // //         width: 50,
// // // //         height: 50,
// // // //         borderRadius: 25,
// // // //         borderWidth: 2,
// // // //         borderColor: '#aaa',
// // // //         alignItems: 'center',
// // // //         justifyContent: 'center',
// // // //         backgroundColor: '#fff',
// // // //     },
// // // //     radioButtonSelected: {
// // // //         borderColor: '#C5A4F7',
// // // //         backgroundColor: '#C5A4F7',
// // // //     },
// // // //     radioText: {
// // // //         fontSize: 18,
// // // //         color: '#333',
// // // //     },
// // // //     radioTextSelected: {
// // // //         color: '#fff',
// // // //         fontWeight: 'bold',
// // // //     },
// // // //     modalButton: {
// // // //         marginTop: 25,
// // // //         backgroundColor: '#C5A4F7',
// // // //         paddingVertical: 12,
// // // //         paddingHorizontal: 35,
// // // //         borderRadius: 30,
// // // //         elevation: 4,
// // // //     },
// // // //     modalButtonText: {
// // // //         color: '#fff',
// // // //         fontWeight: 'bold',
// // // //         fontSize: 16,
// // // //     },
// // // //     resultTitle: {
// // // //         fontSize: 22,
// // // //         fontWeight: 'bold',
// // // //         marginBottom: 15,
// // // //         color: '#0056b3',
// // // //     },
// // // //     resultText: {
// // // //         fontSize: 26,
// // // //         fontWeight: 'bold',
// // // //         color: '#0f5132',
// // // //     },
// // // // });

// // // // export default ShowAyat;

// // // // ////////////AsyncStorage wala


// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView } from 'react-native';
// // // import { Picker } from '@react-native-picker/picker';
// // // import Sound from 'react-native-sound';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import { useFocusEffect } from '@react-navigation/native';
// // // import openDB from './DB';

// // // Sound.setCategory('Playback');

// // // const questions = [
// // //     "How happy are you feeling?",
// // //     "How sad are you feeling?",
// // //     "How energetic are you?",
// // //     "How tired do you feel?",
// // //     "How stressed are you?",
// // //     "How calm do you feel?",
// // //     "How focused are you?",
// // //     "How distracted do you feel?",
// // //     "How anxious are you?",
// // //     "How relaxed do you feel?",
// // // ];

// // // const moodEmojis = {
// // //     Happy: "😊",
// // //     Sad: "😢",
// // //     Angry: "😠",
// // //     Fearful: "😨",
// // //     Surprised: "😲",
// // //     Neutral: "😐",
// // //     Excited: "🤩",
// // //     Tired: "😴",
// // // };

// // // const ShowAyat = ({ navigation }) => {
// // //     const [days, setDays] = useState([]);
// // //     const [moods, setMoods] = useState([]);
// // //     const [selectedDay, setSelectedDay] = useState(null);
// // //     const [selectedMood, setSelectedMood] = useState(null);
// // //     const [ayat, setAyat] = useState(null);
// // //     const [loading, setLoading] = useState(false);
// // //     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
// // //     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
// // //     const [sound, setSound] = useState(null);
// // //     const [isPlaying, setIsPlaying] = useState(false);
// // //     const [showEnglish, setShowEnglish] = useState(true);
// // //     const [showUrdu, setShowUrdu] = useState(true);

// // //     // Mood prediction modal states
// // //     const [showMoodModal, setShowMoodModal] = useState(false);
// // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // //     const [answers, setAnswers] = useState([]);
// // //     const [inputValue, setInputValue] = useState("");
// // //     const [predictedMood, setPredictedMood] = useState(null);

// // //     useEffect(() => {
// // //         loadInitialData();
// // //     }, []);

// // //     // Load language settings when screen comes into focus
// // //     useFocusEffect(
// // //         React.useCallback(() => {
// // //             const loadLanguageSettings = async () => {
// // //                 try {
// // //                     const englishSetting = await AsyncStorage.getItem('showEnglish');
// // //                     const urduSetting = await AsyncStorage.getItem('showUrdu');

// // //                     if (englishSetting !== null) {
// // //                         setShowEnglish(JSON.parse(englishSetting));
// // //                     }

// // //                     if (urduSetting !== null) {
// // //                         setShowUrdu(JSON.parse(urduSetting));
// // //                     }
// // //                 } catch (error) {
// // //                     console.error('Error loading language settings:', error);
// // //                 }
// // //             };

// // //             loadLanguageSettings();
// // //         }, [])
// // //     );

// // //     const loadInitialData = async () => {
// // //         try {
// // //             const db = await openDB();

// // //             // Load days
// // //             db.transaction(tx => {
// // //                 tx.executeSql(
// // //                     'SELECT * FROM Day',
// // //                     [],
// // //                     (_, { rows }) => {
// // //                         const daysData = rows.raw();
// // //                         setDays(daysData);

// // //                         // Get current day name (e.g., "Monday")
// // //                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// // //                         const today = new Date().getDay(); // 0-6 (Sunday-Saturday)
// // //                         const currentDayName = daysOfWeek[today];

// // //                         // Find matching day in the database
// // //                         const currentDay = daysData.find(day =>
// // //                             day.name.toLowerCase() === currentDayName.toLowerCase()
// // //                         );

// // //                         if (currentDay) {
// // //                             setSelectedDay(currentDay.day_id);
// // //                             setSelectedDayLabel(currentDay.name);
// // //                         }
// // //                     },
// // //                     (_, error) => console.log('Error loading days:', error)
// // //                 );
// // //             });

// // //             // Load moods
// // //             db.transaction(tx => {
// // //                 tx.executeSql(
// // //                     'SELECT * FROM Mood',
// // //                     [],
// // //                     (_, { rows }) => setMoods(rows.raw()),
// // //                     (_, error) => console.log('Error loading moods:', error)
// // //                 );
// // //             });
// // //         } catch (error) {
// // //             console.error('Database error:', error);
// // //         }
// // //     };

// // //     const handleDayChange = (itemValue) => {
// // //         setSelectedDay(itemValue);
// // //         const selected = days.find(day => day.day_id === itemValue);
// // //         setSelectedDayLabel(selected ? selected.name : 'Select a day');
// // //     };

// // //     const handleMoodChange = (itemValue) => {
// // //         setSelectedMood(itemValue);
// // //         const selected = moods.find(mood => mood.mood_id === itemValue);
// // //         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
// // //     };

// // //     const handleShowAyat = async () => {
// // //         if (!selectedDay && !selectedMood) {
// // //             Alert.alert('Error', 'Please select at least a day or a mood');
// // //             return;
// // //         }

// // //         setLoading(true);
// // //         setAyat(null);

// // //         try {
// // //             const db = await openDB();

// // //             let query = '';
// // //             let params = [];

// // //             if (selectedDay && selectedMood) {
// // //                 query = `
// // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // //                     FROM Quran q
// // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // //                     WHERE m.day_id = ? AND m.mood_id = ?
// // //                     ORDER BY RANDOM() LIMIT 1
// // //                 `;
// // //                 params = [selectedDay, selectedMood];
// // //             } else if (selectedDay) {
// // //                 query = `
// // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // //                     FROM Quran q
// // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // //                     WHERE m.day_id = ?
// // //                     ORDER BY RANDOM() LIMIT 1
// // //                 `;
// // //                 params = [selectedDay];
// // //             } else {
// // //                 query = `
// // //                     SELECT q.*, s.EnglishName, s.ArabicName 
// // //                     FROM Quran q
// // //                     JOIN Surahs s ON q.surah_id = s.surah_id
// // //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// // //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// // //                     WHERE m.mood_id = ?
// // //                     ORDER BY RANDOM() LIMIT 1
// // //                 `;
// // //                 params = [selectedMood];
// // //             }

// // //             db.transaction(tx => {
// // //                 tx.executeSql(
// // //                     query,
// // //                     params,
// // //                     (_, { rows }) => {
// // //                         setLoading(false);
// // //                         if (rows.length > 0) {
// // //                             setAyat(rows.raw()[0]);
// // //                         } else {
// // //                             Alert.alert('Info', 'No ayat found for the selected criteria');
// // //                         }
// // //                     },
// // //                     (_, error) => {
// // //                         setLoading(false);
// // //                         console.log('Error fetching ayat:', error);
// // //                         Alert.alert('Error', 'Failed to fetch ayat');
// // //                     }
// // //                 );
// // //             });
// // //         } catch (error) {
// // //             setLoading(false);
// // //             console.error('Database error:', error);
// // //         }
// // //     };

// // //     const playAyahAudio = () => {
// // //         if (!ayat) return;

// // //         const surahId = String(ayat.surah_id).padStart(3, '0');
// // //         const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
// // //         const fileName = `a${surahId}${ayahLoc}.mp3`;

// // //         if (sound) {
// // //             sound.release();
// // //         }

// // //         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
// // //             if (error) {
// // //                 Alert.alert('Error', 'Audio load failed: ' + error.message);
// // //                 return;
// // //             }
// // //             newSound.play((success) => {
// // //                 if (success) {
// // //                     console.log('Playback finished');
// // //                 } else {
// // //                     Alert.alert('Error', 'Audio playback failed');
// // //                 }
// // //                 newSound.release();
// // //                 setIsPlaying(false);
// // //             });
// // //         });

// // //         setSound(newSound);
// // //         setIsPlaying(true);
// // //     };

// // //     const stopAudio = () => {
// // //         if (sound) {
// // //             sound.stop(() => {
// // //                 sound.release();
// // //                 setIsPlaying(false);
// // //             });
// // //         }
// // //     };

// // //     // Mood prediction functions
// // //     const handleMoodPrediction = async () => {
// // //         const value = parseInt(inputValue);

// // //         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
// // //             Alert.alert("Error", "Please select a number between 1 to 5.");
// // //             return;
// // //         }

// // //         const updatedAnswers = [...answers, value];
// // //         setAnswers(updatedAnswers);
// // //         setInputValue(""); // Reset selection

// // //         if (currentQuestionIndex < questions.length - 1) {
// // //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// // //         } else {
// // //             // Send to server for prediction
// // //             try {
// // //                 const response = await fetch("http://192.168.130.1:5000/predict", {
// // //                     method: "POST",
// // //                     headers: {
// // //                         "Content-Type": "application/json",
// // //                     },
// // //                     body: JSON.stringify({ answers: updatedAnswers }),
// // //                 });

// // //                 const data = await response.json();
// // //                 const mood = data.mood;
// // //                 setPredictedMood(mood);

// // //                 // Find the mood_id for the predicted mood
// // //                 const predictedMoodObj = moods.find(m => m.name === mood);
// // //                 if (predictedMoodObj) {
// // //                     setSelectedMood(predictedMoodObj.mood_id);
// // //                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
// // //                 }

// // //                 // Close the modal after a short delay
// // //                 setTimeout(() => {
// // //                     setShowMoodModal(false);
// // //                     resetMoodPrediction();
// // //                 }, 1500);
// // //             } catch (error) {
// // //                 setPredictedMood("Server error. Try again later ❌");
// // //             }
// // //         }
// // //     };

// // //     const resetMoodPrediction = () => {
// // //         setCurrentQuestionIndex(0);
// // //         setAnswers([]);
// // //         setInputValue("");
// // //         setPredictedMood(null);
// // //     };

// // //     const openMoodModal = () => {
// // //         resetMoodPrediction();
// // //         setShowMoodModal(true);
// // //     };

// // //     return (
// // //         <ScrollView contentContainerStyle={styles.container}>
// // //             <View style={styles.header}>
// // //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// // //                     <Text style={styles.backButton}>←</Text>
// // //                 </TouchableOpacity>
// // //                 <Text style={styles.title}>Daily Quran Reciter</Text>
// // //                 <View style={styles.headerSpacer} />
// // //             </View>

// // //             <Text style={styles.label}>Today is:</Text>
// // //             <View style={styles.pickerContainer}>
// // //                 <Picker
// // //                     selectedValue={selectedDay}
// // //                     onValueChange={handleDayChange}
// // //                     style={styles.picker}
// // //                     dropdownIconColor="#000"
// // //                 >
// // //                     <Picker.Item label="Select a day" value={null} />
// // //                     {days.map(day => (
// // //                         <Picker.Item
// // //                             key={day.day_id}
// // //                             label={day.name}
// // //                             value={day.day_id}
// // //                             color={selectedDay === day.day_id ? '#000' : '#666'}
// // //                         />
// // //                     ))}
// // //                 </Picker>
// // //                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
// // //             </View>

// // //             <Text style={styles.label}>I'm feeling:</Text>
// // //             <View style={styles.pickerContainer}>
// // //                 <Picker
// // //                     selectedValue={selectedMood}
// // //                     onValueChange={handleMoodChange}
// // //                     style={styles.picker}
// // //                     dropdownIconColor="#000"
// // //                 >
// // //                     <Picker.Item label="Select a mood" value={null} />
// // //                     {moods.map(mood => (
// // //                         <Picker.Item
// // //                             key={mood.mood_id}
// // //                             label={mood.name}
// // //                             value={mood.mood_id}
// // //                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
// // //                         />
// // //                     ))}
// // //                 </Picker>
// // //                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
// // //             </View>

// // //             {/* AI Mood Prediction Button */}
// // //             <TouchableOpacity
// // //                 style={styles.aiButton}
// // //                 onPress={openMoodModal}
// // //             >
// // //                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
// // //             </TouchableOpacity>

// // //             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
// // //                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
// // //             </TouchableOpacity>

// // //             {ayat && (
// // //                 <View style={styles.ayatCard}>
// // //                     <Text style={styles.surahName}>
// // //                         {ayat.EnglishName} ({ayat.ArabicName})
// // //                     </Text>
// // //                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>

// // //                     {showUrdu && (
// // //                         <>
// // //                             <Text style={styles.translationLabel}>Urdu Translation:</Text>
// // //                             <Text style={styles.translationText}>{ayat.Urdu}</Text>
// // //                         </>
// // //                     )}

// // //                     {showEnglish && (
// // //                         <>
// // //                             <Text style={styles.translationLabel}>English Translation:</Text>
// // //                             <Text style={styles.translationText}>{ayat.English}</Text>
// // //                         </>
// // //                     )}

// // //                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

// // //                     {/* Play / Stop Buttons */}
// // //                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
// // //                         {!isPlaying ? (
// // //                             <TouchableOpacity onPress={playAyahAudio} style={styles.audioButton}>
// // //                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
// // //                             </TouchableOpacity>
// // //                         ) : (
// // //                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
// // //                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
// // //                             </TouchableOpacity>
// // //                         )}
// // //                     </View>
// // //                 </View>
// // //             )}

// // //             {/* Mood Prediction Modal */}
// // //             <Modal
// // //                 visible={showMoodModal}
// // //                 animationType="slide"
// // //                 transparent={false}
// // //                 onRequestClose={() => setShowMoodModal(false)}
// // //             >
// // //                 <View style={{
// // //                     padding: 25,
// // //                     alignItems: 'center',
// // //                     justifyContent: 'center',
// // //                 }}>
// // //                     <Text style={{
// // //                         color: '#000',
// // //                         fontSize: 24,
// // //                         fontWeight: 'bold'
// // //                     }}>🤖 AI MOOD PREDICTION</Text>
// // //                 </View>
// // //                 <SafeAreaView style={styles.modalContainer}>
// // //                     {predictedMood ? (
// // //                         <View style={styles.card}>
// // //                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
// // //                             <Text style={styles.resultText}>
// // //                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
// // //                             </Text>
// // //                             <TouchableOpacity
// // //                                 style={styles.modalButton}
// // //                                 onPress={() => setShowMoodModal(false)}
// // //                             >
// // //                                 <Text style={styles.modalButtonText}>OK</Text>
// // //                             </TouchableOpacity>
// // //                         </View>
// // //                     ) : (
// // //                         <View style={styles.card}>
// // //                             <Text style={styles.counter}>
// // //                                 Question {currentQuestionIndex + 1}/{questions.length}
// // //                             </Text>
// // //                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
// // //                             <View style={styles.radioContainer}>
// // //                                 {[1, 2, 3, 4, 5].map((value) => (
// // //                                     <TouchableOpacity
// // //                                         key={value}
// // //                                         style={[
// // //                                             styles.radioButton,
// // //                                             inputValue === value.toString() && styles.radioButtonSelected,
// // //                                         ]}
// // //                                         onPress={() => setInputValue(value.toString())}
// // //                                     >
// // //                                         <Text style={[
// // //                                             styles.radioText,
// // //                                             inputValue === value.toString() && styles.radioTextSelected,
// // //                                         ]}>
// // //                                             {value}
// // //                                         </Text>
// // //                                     </TouchableOpacity>
// // //                                 ))}
// // //                             </View>
// // //                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
// // //                                 <Text style={styles.modalButtonText}>
// // //                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
// // //                                 </Text>
// // //                             </TouchableOpacity>
// // //                         </View>
// // //                     )}
// // //                 </SafeAreaView>
// // //             </Modal>
// // //         </ScrollView>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flexGrow: 1,
// // //         padding: 20,
// // //         backgroundColor: '#F8EDF9',
// // //     },
// // //     header: {
// // //         flexDirection: 'row',
// // //         alignItems: 'center',
// // //         justifyContent: 'space-between',
// // //         marginBottom: 30,
// // //     },
// // //     backButton: {
// // //         fontSize: 24,
// // //         padding: 10,
// // //         color: '#000',
// // //     },
// // //     title: {
// // //         fontSize: 24,
// // //         fontWeight: 'bold',
// // //         color: '#000',
// // //         textAlign: 'center',
// // //         flex: 1,
// // //     },
// // //     headerSpacer: {
// // //         width: 40,
// // //     },
// // //     label: {
// // //         fontSize: 16,
// // //         marginBottom: 5,
// // //         color: '#000',
// // //         fontWeight: '500',
// // //     },
// // //     pickerContainer: {
// // //         borderWidth: 1,
// // //         borderColor: '#bdc3c7',
// // //         borderRadius: 5,
// // //         marginBottom: 20,
// // //         backgroundColor: 'white',
// // //         position: 'relative',
// // //     },
// // //     picker: {
// // //         height: 50,
// // //         width: '100%',
// // //         opacity: 0,
// // //     },
// // //     selectedValue: {
// // //         position: 'absolute',
// // //         left: 15,
// // //         top: 15,
// // //         fontSize: 16,
// // //         color: '#000',
// // //     },
// // //     button: {
// // //         backgroundColor: '#C5A4F7',
// // //         padding: 15,
// // //         borderRadius: 30,
// // //         alignItems: 'center',
// // //         marginBottom: 30,
// // //         elevation: 5,
// // //     },
// // //     buttonText: {
// // //         color: 'white',
// // //         fontSize: 18,
// // //         fontWeight: 'bold',
// // //     },
// // //     aiButton: {
// // //         backgroundColor: '#4CAF50',
// // //         padding: 15,
// // //         borderRadius: 30,
// // //         alignItems: 'center',
// // //         marginBottom: 15,
// // //         elevation: 5,
// // //     },
// // //     aiButtonText: {
// // //         color: 'white',
// // //         fontSize: 16,
// // //         fontWeight: 'bold',
// // //     },
// // //     ayatCard: {
// // //         backgroundColor: 'white',
// // //         borderRadius: 10,
// // //         padding: 20,
// // //         shadowColor: '#000',
// // //         shadowOffset: { width: 0, height: 2 },
// // //         shadowOpacity: 0.1,
// // //         shadowRadius: 5,
// // //         elevation: 3,
// // //     },
// // //     surahName: {
// // //         fontSize: 18,
// // //         fontWeight: 'bold',
// // //         textAlign: 'center',
// // //         marginBottom: 15,
// // //         color: '#2c3e50',
// // //     },
// // //     arabicText: {
// // //         fontSize: 22,
// // //         textAlign: 'right',
// // //         marginBottom: 20,
// // //         lineHeight: 35,
// // //         color: '#34495e',
// // //     },
// // //     translationLabel: {
// // //         fontSize: 16,
// // //         fontWeight: 'bold',
// // //         marginTop: 10,
// // //         color: '#7f8c8d',
// // //     },
// // //     translationText: {
// // //         fontSize: 16,
// // //         marginBottom: 10,
// // //         lineHeight: 24,
// // //         color: '#34495e',
// // //     },
// // //     ayahInfo: {
// // //         fontSize: 14,
// // //         textAlign: 'right',
// // //         color: '#7f8c8d',
// // //         marginTop: 10,
// // //     },
// // //     audioButton: {
// // //         backgroundColor: '#2ecc71',
// // //         paddingVertical: 10,
// // //         paddingHorizontal: 30,
// // //         borderRadius: 25,
// // //         elevation: 3,
// // //     },
// // //     audioButtonText: {
// // //         color: 'white',
// // //         fontSize: 16,
// // //         fontWeight: 'bold',
// // //     },
// // //     // Modal styles
// // //     modalContainer: {
// // //         flex: 1,
// // //         backgroundColor: '#F8EDF9',
// // //         justifyContent: 'center',
// // //         padding: 20,
// // //     },
// // //     card: {
// // //         backgroundColor: '#fff',
// // //         borderRadius: 16,
// // //         padding: 25,
// // //         elevation: 6,
// // //         alignItems: 'center',
// // //     },
// // //     counter: {
// // //         fontSize: 14,
// // //         color: '#888',
// // //         alignSelf: 'flex-end',
// // //     },
// // //     question: {
// // //         fontSize: 20,
// // //         fontWeight: 'bold',
// // //         color: '#333',
// // //         textAlign: 'center',
// // //         marginVertical: 20,
// // //     },
// // //     radioContainer: {
// // //         flexDirection: 'row',
// // //         justifyContent: 'space-between',
// // //         width: '80%',
// // //         marginVertical: 20,
// // //     },
// // //     radioButton: {
// // //         width: 50,
// // //         height: 50,
// // //         borderRadius: 25,
// // //         borderWidth: 2,
// // //         borderColor: '#aaa',
// // //         alignItems: 'center',
// // //         justifyContent: 'center',
// // //         backgroundColor: '#fff',
// // //     },
// // //     radioButtonSelected: {
// // //         borderColor: '#C5A4F7',
// // //         backgroundColor: '#C5A4F7',
// // //     },
// // //     radioText: {
// // //         fontSize: 18,
// // //         color: '#333',
// // //     },
// // //     radioTextSelected: {
// // //         color: '#fff',
// // //         fontWeight: 'bold',
// // //     },
// // //     modalButton: {
// // //         marginTop: 25,
// // //         backgroundColor: '#C5A4F7',
// // //         paddingVertical: 12,
// // //         paddingHorizontal: 35,
// // //         borderRadius: 30,
// // //         elevation: 4,
// // //     },
// // //     modalButtonText: {
// // //         color: '#fff',
// // //         fontWeight: 'bold',
// // //         fontSize: 16,
// // //     },
// // //     resultTitle: {
// // //         fontSize: 22,
// // //         fontWeight: 'bold',
// // //         marginBottom: 15,
// // //         color: '#0056b3',
// // //     },
// // //     resultText: {
// // //         fontSize: 26,
// // //         fontWeight: 'bold',
// // //         color: '#0f5132',
// // //     },
// // // });

// // // export default ShowAyat;

// // ///sara din same ayat
// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import Sound from 'react-native-sound';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useFocusEffect } from '@react-navigation/native';
// // import openDB from './DB';

// // Sound.setCategory('Playback');

// // const questions = [
// //     "How happy are you feeling?",
// //     "How sad are you feeling?",
// //     "How energetic are you?",
// //     "How tired do you feel?",
// //     "How stressed are you?",
// //     "How calm do you feel?",
// //     "How focused are you?",
// //     "How distracted do you feel?",
// //     "How anxious are you?",
// //     "How relaxed do you feel?",
// // ];

// // const moodEmojis = {
// //     Happy: "😊",
// //     Sad: "😢",
// //     Angry: "😠",
// //     Fearful: "😨",
// //     Surprised: "😲",
// //     Neutral: "😐",
// //     Excited: "🤩",
// //     Tired: "😴",
// // };

// // const ShowAyat = ({ navigation }) => {
// //     const [days, setDays] = useState([]);
// //     const [moods, setMoods] = useState([]);
// //     const [selectedDay, setSelectedDay] = useState(null);
// //     const [selectedMood, setSelectedMood] = useState(null);
// //     const [ayat, setAyat] = useState(null);
// //     const [loading, setLoading] = useState(false);
// //     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
// //     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
// //     const [sound, setSound] = useState(null);
// //     const [isPlaying, setIsPlaying] = useState(false);
// //     const [showEnglish, setShowEnglish] = useState(true);
// //     const [showUrdu, setShowUrdu] = useState(true);

// //     // Mood prediction modal states
// //     const [showMoodModal, setShowMoodModal] = useState(false);
// //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //     const [answers, setAnswers] = useState([]);
// //     const [inputValue, setInputValue] = useState("");
// //     const [predictedMood, setPredictedMood] = useState(null);

// //     useEffect(() => {
// //         loadInitialData();
// //     }, []);

// //     // Load language settings when screen comes into focus
// //     useFocusEffect(
// //         React.useCallback(() => {
// //             const loadLanguageSettings = async () => {
// //                 try {
// //                     const englishSetting = await AsyncStorage.getItem('showEnglish');
// //                     const urduSetting = await AsyncStorage.getItem('showUrdu');

// //                     if (englishSetting !== null) {
// //                         setShowEnglish(JSON.parse(englishSetting));
// //                     }

// //                     if (urduSetting !== null) {
// //                         setShowUrdu(JSON.parse(urduSetting));
// //                     }
// //                 } catch (error) {
// //                     console.error('Error loading language settings:', error);
// //                 }
// //             };

// //             loadLanguageSettings();
// //         }, [])
// //     );

// //     const getCurrentDate = () => {
// //         const now = new Date();
// //         return now.toISOString().split('T')[0]; // Returns YYYY-MM-DD
// //     };

// //     const loadInitialData = async () => {
// //         try {
// //             const db = await openDB();

// //             // Load days
// //             db.transaction(tx => {
// //                 tx.executeSql(
// //                     'SELECT * FROM Day',
// //                     [],
// //                     (_, { rows }) => {
// //                         const daysData = rows.raw();
// //                         setDays(daysData);

// //                         // Get current day name (e.g., "Monday")
// //                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// //                         const today = new Date().getDay(); // 0-6 (Sunday-Saturday)
// //                         const currentDayName = daysOfWeek[today];

// //                         // Find matching day in the database
// //                         const currentDay = daysData.find(day =>
// //                             day.name.toLowerCase() === currentDayName.toLowerCase()
// //                         );

// //                         if (currentDay) {
// //                             setSelectedDay(currentDay.day_id);
// //                             setSelectedDayLabel(currentDay.name);
// //                         }
// //                     },
// //                     (_, error) => console.log('Error loading days:', error)
// //                 );
// //             });

// //             // Load moods
// //             db.transaction(tx => {
// //                 tx.executeSql(
// //                     'SELECT * FROM Mood',
// //                     [],
// //                     (_, { rows }) => setMoods(rows.raw()),
// //                     (_, error) => console.log('Error loading moods:', error)
// //                 );
// //             });
// //         } catch (error) {
// //             console.error('Database error:', error);
// //         }
// //     };

// //     const checkForExistingAyat = async () => {
// //         if (!selectedDay && !selectedMood) return null;

// //         try {
// //             const db = await openDB();
// //             const currentDate = getCurrentDate();

// //             let query = '';
// //             let params = [];

// //             if (selectedDay && selectedMood) {
// //                 query = `
// //                     SELECT q.*, s.EnglishName, s.ArabicName 
// //                     FROM daily_ayat_history d
// //                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
// //                     JOIN Surahs s ON d.surah_id = s.surah_id
// //                     WHERE d.day_id = ? AND d.mood_id = ? AND d.date = ?
// //                 `;
// //                 params = [selectedDay, selectedMood, currentDate];
// //             } else if (selectedDay) {
// //                 query = `
// //                     SELECT q.*, s.EnglishName, s.ArabicName 
// //                     FROM daily_ayat_history d
// //                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
// //                     JOIN Surahs s ON d.surah_id = s.surah_id
// //                     WHERE d.day_id = ? AND d.date = ?
// //                 `;
// //                 params = [selectedDay, currentDate];
// //             } else {
// //                 query = `
// //                     SELECT q.*, s.EnglishName, s.ArabicName 
// //                     FROM daily_ayat_history d
// //                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
// //                     JOIN Surahs s ON d.surah_id = s.surah_id
// //                     WHERE d.mood_id = ? AND d.date = ?
// //                 `;
// //                 params = [selectedMood, currentDate];
// //             }

// //             return new Promise((resolve) => {
// //                 db.transaction(tx => {
// //                     tx.executeSql(
// //                         query,
// //                         params,
// //                         (_, { rows }) => {
// //                             if (rows.length > 0) {
// //                                 resolve(rows.raw()[0]);
// //                             } else {
// //                                 resolve(null);
// //                             }
// //                         },
// //                         (_, error) => {
// //                             console.log('Error checking for existing ayat:', error);
// //                             resolve(null);
// //                         }
// //                     );
// //                 });
// //             });
// //         } catch (error) {
// //             console.error('Database error:', error);
// //             return null;
// //         }
// //     };

// //     const saveAyatToHistory = async (ayat) => {
// //         if (!selectedDay && !selectedMood) return;

// //         try {
// //             const db = await openDB();
// //             const currentDate = getCurrentDate();

// //             // First, delete any existing entry for this day/mood combination for today
// //             let deleteQuery = '';
// //             let deleteParams = [];

// //             if (selectedDay && selectedMood) {
// //                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
// //                 deleteParams = [selectedDay, selectedMood, currentDate];
// //             } else if (selectedDay) {
// //                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND date = ?';
// //                 deleteParams = [selectedDay, currentDate];
// //             } else {
// //                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
// //                 deleteParams = [selectedMood, currentDate];
// //             }

// //             // Then insert the new one
// //             const insertQuery = `
// //                 INSERT INTO daily_ayat_history (day_id, mood_id, surah_id, ayah_id, date)
// //                 VALUES (?, ?, ?, ?, ?)
// //             `;
// //             const insertParams = [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate];

// //             db.transaction(tx => {
// //                 tx.executeSql(
// //                     deleteQuery,
// //                     deleteParams,
// //                     () => {
// //                         tx.executeSql(
// //                             insertQuery,
// //                             insertParams,
// //                             () => console.log('Ayat saved to history'),
// //                             (_, error) => console.log('Error saving ayat to history:', error)
// //                         );
// //                     },
// //                     (_, error) => console.log('Error deleting old history:', error)
// //                 );
// //             });
// //         } catch (error) {
// //             console.error('Database error:', error);
// //         }
// //     };

// //     const handleDayChange = (itemValue) => {
// //         setSelectedDay(itemValue);
// //         const selected = days.find(day => day.day_id === itemValue);
// //         setSelectedDayLabel(selected ? selected.name : 'Select a day');
// //     };

// //     const handleMoodChange = (itemValue) => {
// //         setSelectedMood(itemValue);
// //         const selected = moods.find(mood => mood.mood_id === itemValue);
// //         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
// //     };

// //     const handleShowAyat = async () => {
// //         if (!selectedDay && !selectedMood) {
// //             Alert.alert('Error', 'Please select at least a day or a mood');
// //             return;
// //         }

// //         setLoading(true);
// //         setAyat(null);

// //         try {
// //             // First check if we already have an ayat for today
// //             const existingAyat = await checkForExistingAyat();

// //             if (existingAyat) {
// //                 setAyat(existingAyat);
// //                 setLoading(false);
// //                 return;
// //             }

// //             const db = await openDB();

// //             let query = '';
// //             let params = [];

// //             if (selectedDay && selectedMood) {
// //                 query = `
// //                     SELECT q.*, s.EnglishName, s.ArabicName 
// //                     FROM Quran q
// //                     JOIN Surahs s ON q.surah_id = s.surah_id
// //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// //                     WHERE m.day_id = ? AND m.mood_id = ?
// //                     ORDER BY RANDOM() LIMIT 1
// //                 `;
// //                 params = [selectedDay, selectedMood];
// //             } else if (selectedDay) {
// //                 query = `
// //                     SELECT q.*, s.EnglishName, s.ArabicName 
// //                     FROM Quran q
// //                     JOIN Surahs s ON q.surah_id = s.surah_id
// //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// //                     WHERE m.day_id = ?
// //                     ORDER BY RANDOM() LIMIT 1
// //                 `;
// //                 params = [selectedDay];
// //             } else {
// //                 query = `
// //                     SELECT q.*, s.EnglishName, s.ArabicName 
// //                     FROM Quran q
// //                     JOIN Surahs s ON q.surah_id = s.surah_id
// //                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
// //                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// //                     WHERE m.mood_id = ?
// //                     ORDER BY RANDOM() LIMIT 1
// //                 `;
// //                 params = [selectedMood];
// //             }

// //             db.transaction(tx => {
// //                 tx.executeSql(
// //                     query,
// //                     params,
// //                     (_, { rows }) => {
// //                         setLoading(false);
// //                         if (rows.length > 0) {
// //                             const selectedAyat = rows.raw()[0];
// //                             setAyat(selectedAyat);
// //                             saveAyatToHistory(selectedAyat);
// //                         } else {
// //                             Alert.alert('Info', 'No ayat found for the selected criteria');
// //                         }
// //                     },
// //                     (_, error) => {
// //                         setLoading(false);
// //                         console.log('Error fetching ayat:', error);
// //                         Alert.alert('Error', 'Failed to fetch ayat');
// //                     }
// //                 );
// //             });
// //         } catch (error) {
// //             setLoading(false);
// //             console.error('Database error:', error);
// //         }
// //     };

// //     // Add this useEffect to load the ayat automatically when day/mood changes
// //     useEffect(() => {
// //         const loadAyatForCurrentSelection = async () => {
// //             if (selectedDay || selectedMood) {
// //                 const existingAyat = await checkForExistingAyat();
// //                 if (existingAyat) {
// //                     setAyat(existingAyat);
// //                 }
// //             }
// //         };

// //         loadAyatForCurrentSelection();
// //     }, [selectedDay, selectedMood]);

// //     // const playAyahAudio = () => {
// //     //     if (!ayat) return;

// //     //     const surahId = String(ayat.surah_id).padStart(3, '0');
// //     //     const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
// //     //     const fileName = `a${surahId}${ayahLoc}.mp3`;

        

// //     //     if (sound) {
// //     //         sound.release();
// //     //     }

// //     //     const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
// //     //         if (error) {
// //     //             Alert.alert('Error', 'Audio load failed: ' + error.message);
// //     //             return;
// //     //         }
// //     //         newSound.play((success) => {
// //     //             if (success) {
// //     //                 console.log('Playback finished');
// //     //             } else {
// //     //                 Alert.alert('Error', 'Audio playback failed');
// //     //             }
// //     //             newSound.release();
// //     //             setIsPlaying(false);
// //     //         });
// //     //     });

        

// //     //     setSound(newSound);
// //     //     setIsPlaying(true);

// //     // };

// //     const playAyahAudio = async () => {
// //         if (!ayat) return;

// //         const surahId = String(ayat.surah_id).padStart(3, '0');
// //         const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
// //         const fileName = `a${surahId}${ayahLoc}.mp3`;

// //         if (sound) {
// //             sound.release();
// //         }

// //         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
// //             if (error) {
// //                 Alert.alert('Error', 'Audio load failed: ' + error.message);
// //                 return;
// //             }

// //             // Audio successfully loaded, now play it
// //             newSound.play(async (success) => {
// //                 if (success) {
// //                     console.log('Playback finished');

// //                     // After successful playback, record in history
// //                     try {
// //                         const db = await openDB();
// //                         const currentDate = getCurrentDate();

// //                         // Find the history entry for today
// //                         let query = '';
// //                         let params = [];

// //                         if (selectedDay && selectedMood) {
// //                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
// //                             params = [selectedDay, selectedMood, currentDate];
// //                         } else if (selectedDay) {
// //                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND date = ?';
// //                             params = [selectedDay, currentDate];
// //                         } else if (selectedMood) {
// //                             query = 'SELECT id FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
// //                             params = [selectedMood, currentDate];
// //                         } else {
// //                             console.log('No day or mood selected, skipping play recording');
// //                             return;
// //                         }

// //                         db.transaction(tx => {
// //                             tx.executeSql(
// //                                 query,
// //                                 params,
// //                                 (_, { rows }) => {
// //                                     if (rows.length > 0) {
// //                                         const historyId = rows.raw()[0].id;
// //                                         // Record the play
// //                                         tx.executeSql(
// //                                             'INSERT INTO ayat_play_history (history_id) VALUES (?)',
// //                                             [historyId],
// //                                             () => console.log('Play recorded successfully'),
// //                                             (_, error) => console.log('Error recording play:', error)
// //                                         );
// //                                     } else {
// //                                         console.log('No history entry found for recording play');
// //                                     }
// //                                 },
// //                                 (_, error) => console.log('Error finding history:', error)
// //                             );
// //                         });
// //                     } catch (error) {
// //                         console.error('Database error:', error);
// //                     }
// //                 } else {
// //                     Alert.alert('Error', 'Audio playback failed');
// //                 }
// //                 newSound.release();
// //                 setIsPlaying(false);
// //             });
// //         });

// //         setSound(newSound);
// //         setIsPlaying(true);
// //     };


// //     const stopAudio = () => {
// //         if (sound) {
// //             sound.stop(() => {
// //                 sound.release();
// //                 setIsPlaying(false);
// //             });
// //         }
// //     };

    

// //     // Mood prediction functions
// //     const handleMoodPrediction = async () => {
// //         const value = parseInt(inputValue);

// //         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
// //             Alert.alert("Error", "Please select a number between 1 to 5.");
// //             return;
// //         }

// //         const updatedAnswers = [...answers, value];
// //         setAnswers(updatedAnswers);
// //         setInputValue(""); // Reset selection

// //         if (currentQuestionIndex < questions.length - 1) {
// //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// //         } else {
// //             // Send to server for prediction
// //             try {
// //                 const response = await fetch("http://192.168.130.1:5000/predict", {
// //                     method: "POST",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     },
// //                     body: JSON.stringify({ answers: updatedAnswers }),
// //                 });

// //                 const data = await response.json();
// //                 const mood = data.mood;
// //                 setPredictedMood(mood);

// //                 // Find the mood_id for the predicted mood
// //                 const predictedMoodObj = moods.find(m => m.name === mood);
// //                 if (predictedMoodObj) {
// //                     setSelectedMood(predictedMoodObj.mood_id);
// //                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
// //                 }

// //                 // Close the modal after a short delay
// //                 setTimeout(() => {
// //                     setShowMoodModal(false);
// //                     resetMoodPrediction();
// //                 }, 1500);
// //             } catch (error) {
// //                 setPredictedMood("Server error. Try again later ❌");
// //             }
// //         }
// //     };

// //     const resetMoodPrediction = () => {
// //         setCurrentQuestionIndex(0);
// //         setAnswers([]);
// //         setInputValue("");
// //         setPredictedMood(null);
// //     };

// //     const openMoodModal = () => {
// //         resetMoodPrediction();
// //         setShowMoodModal(true);
// //     };

// //     return (
// //         <ScrollView contentContainerStyle={styles.container}>
// //             <View style={styles.header}>
// //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// //                     <Text style={styles.backButton}>←</Text>
// //                 </TouchableOpacity>
// //                 <Text style={styles.title}>Daily Quran Reciter</Text>
// //                 <View style={styles.headerSpacer} />
// //             </View>

// //             <Text style={styles.label}>Today is:</Text>
// //             <View style={styles.pickerContainer}>
// //                 <Picker
// //                     selectedValue={selectedDay}
// //                     onValueChange={handleDayChange}
// //                     style={styles.picker}
// //                     dropdownIconColor="#000"
// //                 >
// //                     <Picker.Item label="Select a day" value={null} />
// //                     {days.map(day => (
// //                         <Picker.Item
// //                             key={day.day_id}
// //                             label={day.name}
// //                             value={day.day_id}
// //                             color={selectedDay === day.day_id ? '#000' : '#666'}
// //                         />
// //                     ))}
// //                 </Picker>
// //                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
// //             </View>

// //             <Text style={styles.label}>I'm feeling:</Text>
// //             <View style={styles.pickerContainer}>
// //                 <Picker
// //                     selectedValue={selectedMood}
// //                     onValueChange={handleMoodChange}
// //                     style={styles.picker}
// //                     dropdownIconColor="#000"
// //                 >
// //                     <Picker.Item label="Select a mood" value={null} />
// //                     {moods.map(mood => (
// //                         <Picker.Item
// //                             key={mood.mood_id}
// //                             label={mood.name}
// //                             value={mood.mood_id}
// //                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
// //                         />
// //                     ))}
// //                 </Picker>
// //                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
// //             </View>

// //             {/* AI Mood Prediction Button */}
// //             <TouchableOpacity
// //                 style={styles.aiButton}
// //                 onPress={openMoodModal}
// //             >
// //                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
// //                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
// //             </TouchableOpacity>

// //             {ayat && (
// //                 <View style={styles.ayatCard}>
// //                     <Text style={styles.surahName}>
// //                         {ayat.EnglishName} ({ayat.ArabicName})
// //                     </Text>
// //                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>

// //                     {showUrdu && (
// //                         <>
// //                             <Text style={styles.translationLabel}>Urdu Translation:</Text>
// //                             <Text style={styles.translationText}>{ayat.Urdu}</Text>
// //                         </>
// //                     )}

// //                     {showEnglish && (
// //                         <>
// //                             <Text style={styles.translationLabel}>English Translation:</Text>
// //                             <Text style={styles.translationText}>{ayat.English}</Text>
// //                         </>
// //                     )}

// //                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

// //                     {/* Play / Stop Buttons */}
// //                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
// //                         {!isPlaying ? (
// //                             <TouchableOpacity onPress={playAyahAudio} style={styles.audioButton}>
// //                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
// //                             </TouchableOpacity>
// //                         ) : (
// //                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
// //                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
// //                             </TouchableOpacity>
// //                         )}
// //                     </View>
// //                 </View>
// //             )}

// //             {/* Mood Prediction Modal */}
// //             <Modal
// //                 visible={showMoodModal}
// //                 animationType="slide"
// //                 transparent={false}
// //                 onRequestClose={() => setShowMoodModal(false)}
// //             >
// //                 <View style={{
// //                     padding: 25,
// //                     alignItems: 'center',
// //                     justifyContent: 'center',
// //                 }}>
// //                     <Text style={{
// //                         color: '#000',
// //                         fontSize: 24,
// //                         fontWeight: 'bold'
// //                     }}>🤖 AI MOOD PREDICTION</Text>
// //                 </View>
// //                 <SafeAreaView style={styles.modalContainer}>
// //                     {predictedMood ? (
// //                         <View style={styles.card}>
// //                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
// //                             <Text style={styles.resultText}>
// //                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
// //                             </Text>
// //                             <TouchableOpacity
// //                                 style={styles.modalButton}
// //                                 onPress={() => setShowMoodModal(false)}
// //                             >
// //                                 <Text style={styles.modalButtonText}>OK</Text>
// //                             </TouchableOpacity>
// //                         </View>
// //                     ) : (
// //                         <View style={styles.card}>
// //                             <Text style={styles.counter}>
// //                                 Question {currentQuestionIndex + 1}/{questions.length}
// //                             </Text>
// //                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
// //                             <View style={styles.radioContainer}>
// //                                 {[1, 2, 3, 4, 5].map((value) => (
// //                                     <TouchableOpacity
// //                                         key={value}
// //                                         style={[
// //                                             styles.radioButton,
// //                                             inputValue === value.toString() && styles.radioButtonSelected,
// //                                         ]}
// //                                         onPress={() => setInputValue(value.toString())}
// //                                     >
// //                                         <Text style={[
// //                                             styles.radioText,
// //                                             inputValue === value.toString() && styles.radioTextSelected,
// //                                         ]}>
// //                                             {value}
// //                                         </Text>
// //                                     </TouchableOpacity>
// //                                 ))}
// //                             </View>
// //                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
// //                                 <Text style={styles.modalButtonText}>
// //                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
// //                                 </Text>
// //                             </TouchableOpacity>
// //                         </View>
// //                     )}
// //                 </SafeAreaView>
// //             </Modal>
// //         </ScrollView>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flexGrow: 1,
// //         padding: 20,
// //         backgroundColor: '#F8EDF9',
// //     },
// //     header: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         justifyContent: 'space-between',
// //         marginBottom: 30,
// //     },
// //     backButton: {
// //         fontSize: 24,
// //         padding: 10,
// //         color: '#000',
// //     },
// //     title: {
// //         fontSize: 24,
// //         fontWeight: 'bold',
// //         color: '#000',
// //         textAlign: 'center',
// //         flex: 1,
// //     },
// //     headerSpacer: {
// //         width: 40,
// //     },
// //     label: {
// //         fontSize: 16,
// //         marginBottom: 5,
// //         color: '#000',
// //         fontWeight: '500',
// //     },
// //     pickerContainer: {
// //         borderWidth: 1,
// //         borderColor: '#bdc3c7',
// //         borderRadius: 5,
// //         marginBottom: 20,
// //         backgroundColor: 'white',
// //         position: 'relative',
// //     },
// //     picker: {
// //         height: 50,
// //         width: '100%',
// //         opacity: 0,
// //     },
// //     selectedValue: {
// //         position: 'absolute',
// //         left: 15,
// //         top: 15,
// //         fontSize: 16,
// //         color: '#000',
// //     },
// //     button: {
// //         backgroundColor: '#C5A4F7',
// //         padding: 15,
// //         borderRadius: 30,
// //         alignItems: 'center',
// //         marginBottom: 30,
// //         elevation: 5,
// //     },
// //     buttonText: {
// //         color: 'white',
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     aiButton: {
// //         backgroundColor: '#4CAF50',
// //         padding: 15,
// //         borderRadius: 30,
// //         alignItems: 'center',
// //         marginBottom: 15,
// //         elevation: 5,
// //     },
// //     aiButtonText: {
// //         color: 'white',
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //     },
// //     ayatCard: {
// //         backgroundColor: 'white',
// //         borderRadius: 10,
// //         padding: 20,
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.1,
// //         shadowRadius: 5,
// //         elevation: 3,
// //     },
// //     surahName: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //         marginBottom: 15,
// //         color: '#2c3e50',
// //     },
// //     arabicText: {
// //         fontSize: 22,
// //         textAlign: 'right',
// //         marginBottom: 20,
// //         lineHeight: 35,
// //         color: '#34495e',
// //     },
// //     translationLabel: {
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         marginTop: 10,
// //         color: '#7f8c8d',
// //     },
// //     translationText: {
// //         fontSize: 16,
// //         marginBottom: 10,
// //         lineHeight: 24,
// //         color: '#34495e',
// //     },
// //     ayahInfo: {
// //         fontSize: 14,
// //         textAlign: 'right',
// //         color: '#7f8c8d',
// //         marginTop: 10,
// //     },
// //     audioButton: {
// //         backgroundColor: '#2ecc71',
// //         paddingVertical: 10,
// //         paddingHorizontal: 30,
// //         borderRadius: 25,
// //         elevation: 3,
// //     },
// //     audioButtonText: {
// //         color: 'white',
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //     },
// //     // Modal styles
// //     modalContainer: {
// //         flex: 1,
// //         backgroundColor: '#F8EDF9',
// //         justifyContent: 'center',
// //         padding: 20,
// //     },
// //     card: {
// //         backgroundColor: '#fff',
// //         borderRadius: 16,
// //         padding: 25,
// //         elevation: 6,
// //         alignItems: 'center',
// //     },
// //     counter: {
// //         fontSize: 14,
// //         color: '#888',
// //         alignSelf: 'flex-end',
// //     },
// //     question: {
// //         fontSize: 20,
// //         fontWeight: 'bold',
// //         color: '#333',
// //         textAlign: 'center',
// //         marginVertical: 20,
// //     },
// //     radioContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         width: '80%',
// //         marginVertical: 20,
// //     },
// //     radioButton: {
// //         width: 50,
// //         height: 50,
// //         borderRadius: 25,
// //         borderWidth: 2,
// //         borderColor: '#aaa',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         backgroundColor: '#fff',
// //     },
// //     radioButtonSelected: {
// //         borderColor: '#C5A4F7',
// //         backgroundColor: '#C5A4F7',
// //     },
// //     radioText: {
// //         fontSize: 18,
// //         color: '#333',
// //     },
// //     radioTextSelected: {
// //         color: '#fff',
// //         fontWeight: 'bold',
// //     },
// //     modalButton: {
// //         marginTop: 25,
// //         backgroundColor: '#C5A4F7',
// //         paddingVertical: 12,
// //         paddingHorizontal: 35,
// //         borderRadius: 30,
// //         elevation: 4,
// //     },
// //     modalButtonText: {
// //         color: '#fff',
// //         fontWeight: 'bold',
// //         fontSize: 16,
// //     },
// //     resultTitle: {
// //         fontSize: 22,
// //         fontWeight: 'bold',
// //         marginBottom: 15,
// //         color: '#0056b3',
// //     },
// //     resultText: {
// //         fontSize: 26,
// //         fontWeight: 'bold',
// //         color: '#0f5132',
// //     },
// // });

// // export default ShowAyat;

// ////favourite
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Sound from 'react-native-sound';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import openDB from './DB';


// Sound.setCategory('Playback');

// const questions = [
//     "How happy are you feeling?",
//     "How sad are you feeling?",
//     "How energetic are you?",
//     "How tired do you feel?",
//     "How stressed are you?",
//     "How calm do you feel?",
//     "How focused are you?",
//     "How distracted do you feel?",
//     "How anxious are you?",
//     "How relaxed do you feel?",
// ];

// const moodEmojis = {
//     Happy: "😊",
//     Sad: "😢",
//     Angry: "😠",
//     Fearful: "😨",
//     Surprised: "😲",
//     Neutral: "😐",
//     Excited: "🤩",
//     Tired: "😴",
// };

// const ShowAyat = ({ navigation }) => {
//     const [days, setDays] = useState([]);
//     const [moods, setMoods] = useState([]);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [ayat, setAyat] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
//     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showEnglish, setShowEnglish] = useState(true);
//     const [showUrdu, setShowUrdu] = useState(true);
//     const [isFavorite, setIsFavorite] = useState(false); // Track if current ayat is favorite

//     // Mood prediction modal states
//     const [showMoodModal, setShowMoodModal] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [inputValue, setInputValue] = useState("");
//     const [predictedMood, setPredictedMood] = useState(null);

//     useEffect(() => {
//         loadInitialData();
//     }, []);

//     // Check if current ayat is favorite when it changes
//     useEffect(() => {
//         checkIfFavorite();
//     }, [ayat]);

//     // Load language settings when screen comes into focus
//     useFocusEffect(
//         React.useCallback(() => {
//             const loadLanguageSettings = async () => {
//                 try {
//                     const englishSetting = await AsyncStorage.getItem('showEnglish');
//                     const urduSetting = await AsyncStorage.getItem('showUrdu');

//                     if (englishSetting !== null) {
//                         setShowEnglish(JSON.parse(englishSetting));
//                     }

//                     if (urduSetting !== null) {
//                         setShowUrdu(JSON.parse(urduSetting));
//                     }
//                 } catch (error) {
//                     console.error('Error loading language settings:', error);
//                 }
//             };

//             loadLanguageSettings();
//         }, [])
//     );

//     const getCurrentDate = () => {
//         const now = new Date();
//         return now.toISOString().split('T')[0]; // Returns YYYY-MM-DD
//     };

//     const loadInitialData = async () => {
//         try {
//             const db = await openDB();

//             // Load days
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Day',
//                     [],
//                     (_, { rows }) => {
//                         const daysData = rows.raw();
//                         setDays(daysData);

//                         // Get current day name (e.g., "Monday")
//                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//                         const today = new Date().getDay(); // 0-6 (Sunday-Saturday)
//                         const currentDayName = daysOfWeek[today];

//                         // Find matching day in the database
//                         const currentDay = daysData.find(day =>
//                             day.name.toLowerCase() === currentDayName.toLowerCase()
//                         );

//                         if (currentDay) {
//                             setSelectedDay(currentDay.day_id);
//                             setSelectedDayLabel(currentDay.name);
//                         }
//                     },
//                     (_, error) => console.log('Error loading days:', error)
//                 );
//             });

//             // Load moods
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Mood',
//                     [],
//                     (_, { rows }) => setMoods(rows.raw()),
//                     (_, error) => console.log('Error loading moods:', error)
//                 );
//             });

//             // Create favorite_ayat table if it doesn't exist
//             db.transaction(tx => {
//                 tx.executeSql(
//                     `CREATE TABLE IF NOT EXISTS favorite_ayat (
//                         id INTEGER PRIMARY KEY AUTOINCREMENT,
//                         day_id INTEGER,
//                         mood_id INTEGER,
//                         surah_id INTEGER,
//                         ayat_id INTEGER,
//                         date_added TEXT,
//                         FOREIGN KEY(day_id) REFERENCES Day(day_id),
//                         FOREIGN KEY(mood_id) REFERENCES Mood(mood_id)
//                     )`,
//                     [],
//                     () => console.log('Favorite ayat table ready'),
//                     (_, error) => console.log('Error creating favorite table:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     // Check if current ayat is in favorites
//     const checkIfFavorite = async () => {
//         if (!ayat) {
//             setIsFavorite(false);
//             return;
//         }

//         try {
//             const db = await openDB();
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     (_, { rows }) => {
//                         setIsFavorite(rows.length > 0);
//                     },
//                     (_, error) => {
//                         console.log('Error checking favorite:', error);
//                         setIsFavorite(false);
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             setIsFavorite(false);
//         }
//     };

//     // Add ayat to favorites
//     const addToFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'INSERT INTO favorite_ayat (day_id, mood_id, surah_id, ayat_id, date_added) VALUES (?, ?, ?, ?, ?)',
//                     [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate],
//                     () => {
//                         setIsFavorite(true);
//                         Alert.alert('Success', 'Ayat added to favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error adding to favorites:', error);
//                         Alert.alert('Error', 'Failed to add to favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to add to favorites');
//         }
//     };

//     // Remove ayat from favorites
//     const removeFromFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'DELETE FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     () => {
//                         setIsFavorite(false);
//                         Alert.alert('Success', 'Ayat removed from favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error removing from favorites:', error);
//                         Alert.alert('Error', 'Failed to remove from favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to remove from favorites');
//         }
//     };

//     // Toggle favorite status
//     const toggleFavorite = () => {
//         if (isFavorite) {
//             removeFromFavorites();
//         } else {
//             addToFavorites();
//         }
//     };

//     const checkForExistingAyat = async () => {
//         if (!selectedDay && !selectedMood) return null;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, selectedMood, currentDate];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, currentDate];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedMood, currentDate];
//             }

//             return new Promise((resolve) => {
//                 db.transaction(tx => {
//                     tx.executeSql(
//                         query,
//                         params,
//                         (_, { rows }) => {
//                             if (rows.length > 0) {
//                                 resolve(rows.raw()[0]);
//                             } else {
//                                 resolve(null);
//                             }
//                         },
//                         (_, error) => {
//                             console.log('Error checking for existing ayat:', error);
//                             resolve(null);
//                         }
//                     );
//                 });
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             return null;
//         }
//     };

//     const saveAyatToHistory = async (ayat) => {
//         if (!selectedDay && !selectedMood) return;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             // First, delete any existing entry for this day/mood combination for today
//             let deleteQuery = '';
//             let deleteParams = [];

//             if (selectedDay && selectedMood) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                 deleteParams = [selectedDay, selectedMood, currentDate];
//             } else if (selectedDay) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                 deleteParams = [selectedDay, currentDate];
//             } else {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                 deleteParams = [selectedMood, currentDate];
//             }

//             // Then insert the new one
//             const insertQuery = `
//                 INSERT INTO daily_ayat_history (day_id, mood_id, surah_id, ayah_id, date)
//                 VALUES (?, ?, ?, ?, ?)
//             `;
//             const insertParams = [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate];

//             db.transaction(tx => {
//                 tx.executeSql(
//                     deleteQuery,
//                     deleteParams,
//                     () => {
//                         tx.executeSql(
//                             insertQuery,
//                             insertParams,
//                             () => console.log('Ayat saved to history'),
//                             (_, error) => console.log('Error saving ayat to history:', error)
//                         );
//                     },
//                     (_, error) => console.log('Error deleting old history:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const handleDayChange = (itemValue) => {
//         setSelectedDay(itemValue);
//         const selected = days.find(day => day.day_id === itemValue);
//         setSelectedDayLabel(selected ? selected.name : 'Select a day');
//     };

//     const handleMoodChange = (itemValue) => {
//         setSelectedMood(itemValue);
//         const selected = moods.find(mood => mood.mood_id === itemValue);
//         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
//     };

//     const handleShowAyat = async () => {
//         if (!selectedDay && !selectedMood) {
//             Alert.alert('Error', 'Please select at least a day or a mood');
//             return;
//         }

//         setLoading(true);
//         setAyat(null);

//         try {
//             // First check if we already have an ayat for today
//             const existingAyat = await checkForExistingAyat();

//             if (existingAyat) {
//                 setAyat(existingAyat);
//                 setLoading(false);
//                 return;
//             }

//             const db = await openDB();

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.day_id = ? AND m.mood_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedDay, selectedMood];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.day_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedDay];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.mood_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedMood];
//             }

//             db.transaction(tx => {
//                 tx.executeSql(
//                     query,
//                     params,
//                     (_, { rows }) => {
//                         setLoading(false);
//                         if (rows.length > 0) {
//                             const selectedAyat = rows.raw()[0];
//                             setAyat(selectedAyat);
//                             saveAyatToHistory(selectedAyat);
//                         } else {
//                             Alert.alert('Info', 'No ayat found for the selected criteria');
//                         }
//                     },
//                     (_, error) => {
//                         setLoading(false);
//                         console.log('Error fetching ayat:', error);
//                         Alert.alert('Error', 'Failed to fetch ayat');
//                     }
//                 );
//             });
//         } catch (error) {
//             setLoading(false);
//             console.error('Database error:', error);
//         }
//     };

//     // Add this useEffect to load the ayat automatically when day/mood changes
//     useEffect(() => {
//         const loadAyatForCurrentSelection = async () => {
//             if (selectedDay || selectedMood) {
//                 const existingAyat = await checkForExistingAyat();
//                 if (existingAyat) {
//                     setAyat(existingAyat);
//                 }
//             }
//         };

//         loadAyatForCurrentSelection();
//     }, [selectedDay, selectedMood]);

//     const playAyahAudio = async () => {
//         if (!ayat) return;

//         const surahId = String(ayat.surah_id).padStart(3, '0');
//         const ayahLoc = String(ayat.ayah_location).padStart(3, '0');
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         if (sound) {
//             sound.release();
//         }

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert('Error', 'Audio load failed: ' + error.message);
//                 return;
//             }

//             // Audio successfully loaded, now play it
//             newSound.play(async (success) => {
//                 if (success) {
//                     console.log('Playback finished');

//                     // After successful playback, record in history
//                     try {
//                         const db = await openDB();
//                         const currentDate = getCurrentDate();

//                         // Find the history entry for today
//                         let query = '';
//                         let params = [];

//                         if (selectedDay && selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                             params = [selectedDay, selectedMood, currentDate];
//                         } else if (selectedDay) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                             params = [selectedDay, currentDate];
//                         } else if (selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                             params = [selectedMood, currentDate];
//                         } else {
//                             console.log('No day or mood selected, skipping play recording');
//                             return;
//                         }

//                         db.transaction(tx => {
//                             tx.executeSql(
//                                 query,
//                                 params,
//                                 (_, { rows }) => {
//                                     if (rows.length > 0) {
//                                         const historyId = rows.raw()[0].id;
//                                         // Record the play
//                                         tx.executeSql(
//                                             'INSERT INTO ayat_play_history (history_id) VALUES (?)',
//                                             [historyId],
//                                             () => console.log('Play recorded successfully'),
//                                             (_, error) => console.log('Error recording play:', error)
//                                         );
//                                     } else {
//                                         console.log('No history entry found for recording play');
//                                     }
//                                 },
//                                 (_, error) => console.log('Error finding history:', error)
//                             );
//                         });
//                     } catch (error) {
//                         console.error('Database error:', error);
//                     }
//                 } else {
//                     Alert.alert('Error', 'Audio playback failed');
//                 }
//                 newSound.release();
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setIsPlaying(false);
//             });
//         }
//     };

//     // Mood prediction functions
//     const handleMoodPrediction = async () => {
//         const value = parseInt(inputValue);

//         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
//             Alert.alert("Error", "Please select a number between 1 to 5.");
//             return;
//         }

//         const updatedAnswers = [...answers, value];
//         setAnswers(updatedAnswers);
//         setInputValue(""); // Reset selection

//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             // Send to server for prediction
//             try {
//                 const response = await fetch("http://192.168.0.110:5000/predict", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ answers: updatedAnswers }),
//                 });

//                 const data = await response.json();
//                 const mood = data.mood;
//                 setPredictedMood(mood);

//                 // Find the mood_id for the predicted mood
//                 const predictedMoodObj = moods.find(m => m.name === mood);
//                 if (predictedMoodObj) {
//                     setSelectedMood(predictedMoodObj.mood_id);
//                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
//                 }

//                 // Close the modal after a short delay
//                 setTimeout(() => {
//                     setShowMoodModal(false);
//                     resetMoodPrediction();
//                 }, 1500);
//             } catch (error) {
//                 setPredictedMood("Server error. Try again later ❌");
//             }
//         }
//     };

//     const resetMoodPrediction = () => {
//         setCurrentQuestionIndex(0);
//         setAnswers([]);
//         setInputValue("");
//         setPredictedMood(null);
//     };

//     const openMoodModal = () => {
//         resetMoodPrediction();
//         setShowMoodModal(true);
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Text style={styles.backButton}>←</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Daily Quran Reciter</Text>
//                 <View style={styles.headerSpacer} />
//             </View>

//             <Text style={styles.label}>Today is:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedDay}
//                     onValueChange={handleDayChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a day" value={null} />
//                     {days.map(day => (
//                         <Picker.Item
//                             key={day.day_id}
//                             label={day.name}
//                             value={day.day_id}
//                             color={selectedDay === day.day_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
//             </View>

//             <Text style={styles.label}>I'm feeling:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedMood}
//                     onValueChange={handleMoodChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a mood" value={null} />
//                     {moods.map(mood => (
//                         <Picker.Item
//                             key={mood.mood_id}
//                             label={mood.name}
//                             value={mood.mood_id}
//                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
//             </View>

//             {/* AI Mood Prediction Button */}
//             <TouchableOpacity
//                 style={styles.aiButton}
//                 onPress={openMoodModal}
//             >
//                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
//             </TouchableOpacity>

//             {ayat && (
//                 <View style={styles.ayatCard}>
//                     <View style={styles.ayatHeader}>
//                         <Text style={styles.surahName}>
//                             {ayat.EnglishName} ({ayat.ArabicName})
//                         </Text>
//                         <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
//                             <Text style={styles.emojiIcon}>
//                                 {isFavorite ? '❤️' : '🤍'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>

//                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>

//                     {showUrdu && (
//                         <>
//                             <Text style={styles.translationLabel}>Urdu Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.Urdu}</Text>
//                         </>
//                     )}

//                     {showEnglish && (
//                         <>
//                             <Text style={styles.translationLabel}>English Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.English}</Text>
//                         </>
//                     )}

//                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

//                     {/* Play / Stop Buttons */}
//                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
//                         {!isPlaying ? (
//                             <TouchableOpacity onPress={playAyahAudio} style={styles.audioButton}>
//                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
//                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
                    
//                 </View>
//             )}

//             {/* Mood Prediction Modal */}
//             <Modal
//                 visible={showMoodModal}
//                 animationType="slide"
//                 transparent={false}
//                 onRequestClose={() => setShowMoodModal(false)}
//             >
//                 <View style={{
//                     padding: 25,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>
//                     <Text style={{
//                         color: '#000',
//                         fontSize: 24,
//                         fontWeight: 'bold'
//                     }}>🤖 AI MOOD PREDICTION</Text>
//                 </View>
//                 <SafeAreaView style={styles.modalContainer}>
//                     {predictedMood ? (
//                         <View style={styles.card}>
//                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
//                             <Text style={styles.resultText}>
//                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
//                             </Text>
//                             <TouchableOpacity
//                                 style={styles.modalButton}
//                                 onPress={() => setShowMoodModal(false)}
//                             >
//                                 <Text style={styles.modalButtonText}>OK</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View style={styles.card}>
//                             <Text style={styles.counter}>
//                                 Question {currentQuestionIndex + 1}/{questions.length}
//                             </Text>
//                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
//                             <View style={styles.radioContainer}>
//                                 {[1, 2, 3, 4, 5].map((value) => (
//                                     <TouchableOpacity
//                                         key={value}
//                                         style={[
//                                             styles.radioButton,
//                                             inputValue === value.toString() && styles.radioButtonSelected,
//                                         ]}
//                                         onPress={() => setInputValue(value.toString())}
//                                     >
//                                         <Text style={[
//                                             styles.radioText,
//                                             inputValue === value.toString() && styles.radioTextSelected,
//                                         ]}>
//                                             {value}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
//                                 <Text style={styles.modalButtonText}>
//                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </SafeAreaView>
//             </Modal>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: '#F8EDF9',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 30,
//     },
//     backButton: {
//         fontSize: 24,
//         padding: 10,
//         color: '#000',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#000',
//         textAlign: 'center',
//         flex: 1,
//     },
//     headerSpacer: {
//         width: 40,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#000',
//         fontWeight: '500',
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         borderRadius: 5,
//         marginBottom: 20,
//         backgroundColor: 'white',
//         position: 'relative',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         opacity: 0,
//     },
//     selectedValue: {
//         position: 'absolute',
//         left: 15,
//         top: 15,
//         fontSize: 16,
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#C5A4F7',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 30,
//         elevation: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     aiButton: {
//         backgroundColor: '#4CAF50',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 15,
//         elevation: 5,
//     },
//     aiButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     ayatCard: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//     },
//     ayatHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     surahName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         flex: 1,
//     },
//     arabicText: {
//         fontSize: 22,
//         textAlign: 'right',
//         marginBottom: 20,
//         lineHeight: 35,
//         color: '#34495e',
//     },
//     translationLabel: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//         color: '#7f8c8d',
//     },
//     translationText: {
//         fontSize: 16,
//         marginBottom: 10,
//         lineHeight: 24,
//         color: '#34495e',
//     },
//     ayahInfo: {
//         fontSize: 14,
//         textAlign: 'right',
//         color: '#7f8c8d',
//         marginTop: 10,
//     },
//     audioButton: {
//         backgroundColor: '#2ecc71',
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         borderRadius: 25,
//         elevation: 3,
//     },
//     audioButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     // Modal styles
//     modalContainer: {
//         flex: 1,
//         backgroundColor: '#F8EDF9',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 25,
//         elevation: 6,
//         alignItems: 'center',
//     },
//     counter: {
//         fontSize: 14,
//         color: '#888',
//         alignSelf: 'flex-end',
//     },
//     question: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginVertical: 20,
//     },
//     radioButton: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         borderWidth: 2,
//         borderColor: '#aaa',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//     },
//     radioButtonSelected: {
//         borderColor: '#C5A4F7',
//         backgroundColor: '#C5A4F7',
//     },
//     radioText: {
//         fontSize: 18,
//         color: '#333',
//     },
//     radioTextSelected: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     modalButton: {
//         marginTop: 25,
//         backgroundColor: '#C5A4F7',
//         paddingVertical: 12,
//         paddingHorizontal: 35,
//         borderRadius: 30,
//         elevation: 4,
//     },
//     modalButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     resultTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: '#0056b3',
//     },
//     resultText: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#0f5132',
//     },
//     favoriteButton: {
//         padding: 5,
//     },
//     emojiIcon: {
//         fontSize: 24,
//     },

// });

// export default ShowAyat;

//Autoplay


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Sound from 'react-native-sound';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import openDB from './DB';

// Sound.setCategory('Playback');

// const questions = [
//     "How happy are you feeling?",
//     "How sad are you feeling?",
//     "How energetic are you?",
//     "How tired do you feel?",
//     "How stressed are you?",
//     "How calm do you feel?",
//     "How focused are you?",
//     "How distracted do you feel?",
//     "How anxious are you?",
//     "How relaxed do you feel?",
// ];

// const moodEmojis = {
//     Happy: "😊",
//     Sad: "😢",
//     Angry: "😠",
//     Fearful: "😨",
//     Surprised: "😲",
//     Neutral: "😐",
//     Excited: "🤩",
//     Tired: "😴",
// };

// const ShowAyat = ({ navigation }) => {
//     const [days, setDays] = useState([]);
//     const [moods, setMoods] = useState([]);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [ayat, setAyat] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
//     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showEnglish, setShowEnglish] = useState(true);
//     const [showUrdu, setShowUrdu] = useState(true);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

//     // Mood prediction modal states
//     const [showMoodModal, setShowMoodModal] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [inputValue, setInputValue] = useState("");
//     const [predictedMood, setPredictedMood] = useState(null);

//     // Stop audio when component unmounts
//     useEffect(() => {
//         return () => {
//             if (sound) {
//                 sound.stop(() => {
//                     sound.release();
//                     setSound(null);
//                     setIsPlaying(false);
//                 });
//             }
//         };
//     }, [sound]);

//     // Stop audio when ayat changes
//     useEffect(() => {
//         if (sound && isPlaying) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     }, [ayat]);

//     useEffect(() => {
//         playAyahAudio(ayat);
//         loadInitialData();
//         loadAutoPlaySetting();
        
//     }, []);

//     // Check if current ayat is favorite when it changes
//     useEffect(() => {
//         checkIfFavorite();
//     }, [ayat]);

//     // Load language settings and stop audio when screen loses focus
//     useFocusEffect(
//         React.useCallback(() => {
//             const loadLanguageSettings = async () => {
//                 try {
//                     const englishSetting = await AsyncStorage.getItem('showEnglish');
//                     const urduSetting = await AsyncStorage.getItem('showUrdu');

//                     if (englishSetting !== null) {
//                         setShowEnglish(JSON.parse(englishSetting));
//                     }

//                     if (urduSetting !== null) {
//                         setShowUrdu(JSON.parse(urduSetting));
//                     }
//                 } catch (error) {
//                     console.error('Error loading language settings:', error);
//                 }
//             };

//             loadLanguageSettings();

//             // Cleanup: Stop audio when screen loses focus
//             return () => {
//                 if (sound && isPlaying) {
//                     sound.stop(() => {
//                         sound.release();
//                         setSound(null);
//                         setIsPlaying(false);
//                     });
//                 }
//             };
//         }, [sound, isPlaying])
//     );

//     const loadAutoPlaySetting = async () => {
//         try {
//             const autoPlaySetting = await AsyncStorage.getItem('autoPlayEnabled');
//             if (autoPlaySetting !== null) {
//                 setAutoPlayEnabled(JSON.parse(autoPlaySetting));
//             }
//         } catch (error) {
//             console.error('Error loading auto-play setting:', error);
//         }
//     };

//     const getCurrentDate = () => {
//         const now = new Date();
//         return now.toISOString().split('T')[0]; // Returns YYYY-MM-DD
//     };

//     const loadInitialData = async () => {
//         try {
//             const db = await openDB();

//             // Load days
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Day',
//                     [],
//                     (_, { rows }) => {
//                         const daysData = rows.raw();
//                         setDays(daysData);

//                         // Get current day name (e.g., "Monday")
//                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//                         const today = new Date().getDay(); // 0-6 (Sunday-Saturday)
//                         const currentDayName = daysOfWeek[today];

//                         // Find matching day in the database
//                         const currentDay = daysData.find(day =>
//                             day.name.toLowerCase() === currentDayName.toLowerCase()
//                         );

//                         if (currentDay) {
//                             setSelectedDay(currentDay.day_id);
//                             setSelectedDayLabel(currentDay.name);
//                         }
//                     },
//                     (_, error) => console.log('Error loading days:', error)
//                 );
//             });

//             // Load moods
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Mood',
//                     [],
//                     (_, { rows }) => setMoods(rows.raw()),
//                     (_, error) => console.log('Error loading moods:', error)
//                 );
//             });

//             // Create favorite_ayat table if it doesn't exist
//             db.transaction(tx => {
//                 tx.executeSql(
//                     `CREATE TABLE IF NOT EXISTS favorite_ayat (
//                         id INTEGER PRIMARY KEY AUTOINCREMENT,
//                         day_id INTEGER,
//                         mood_id INTEGER,
//                         surah_id INTEGER,
//                         ayat_id INTEGER,
//                         date_added TEXT,
//                         FOREIGN KEY(day_id) REFERENCES Day(day_id),
//                         FOREIGN KEY(mood_id) REFERENCES Mood(mood_id)
//                     )`,
//                     [],
//                     () => console.log('Favorite ayat table ready'),
//                     (_, error) => console.log('Error creating favorite table:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     // Check if current ayat is in favorites
//     const checkIfFavorite = async () => {
//         if (!ayat) {
//             setIsFavorite(false);
//             return;
//         }

//         try {
//             const db = await openDB();
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     (_, { rows }) => {
//                         setIsFavorite(rows.length > 0);
//                     },
//                     (_, error) => {
//                         console.log('Error checking favorite:', error);
//                         setIsFavorite(false);
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             setIsFavorite(false);
//         }
//     };

//     // Add ayat to favorites
//     const addToFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'INSERT INTO favorite_ayat (day_id, mood_id, surah_id, ayat_id, date_added) VALUES (?, ?, ?, ?, ?)',
//                     [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate],
//                     () => {
//                         setIsFavorite(true);
//                         Alert.alert('Success', 'Ayat added to favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error adding to favorites:', error);
//                         Alert.alert('Error', 'Failed to add to favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to add to favorites');
//         }
//     };

//     // Remove ayat from favorites
//     const removeFromFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'DELETE FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     () => {
//                         setIsFavorite(false);
//                         Alert.alert('Success', 'Ayat removed from favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error removing from favorites:', error);
//                         Alert.alert('Error', 'Failed to remove from favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to remove from favorites');
//         }
//     };

//     // Toggle favorite status
//     const toggleFavorite = () => {
//         if (isFavorite) {
//             removeFromFavorites();
//         } else {
//             addToFavorites();
//         }
//     };

//     const checkForExistingAyat = async () => {
//         if (!selectedDay && !selectedMood) return null;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, selectedMood, currentDate];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, currentDate];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedMood, currentDate];
//             }

//             return new Promise((resolve) => {
//                 db.transaction(tx => {
//                     tx.executeSql(
//                         query,
//                         params,
//                         (_, { rows }) => {
//                             if (rows.length > 0) {
//                                 resolve(rows.raw()[0]);
//                             } else {
//                                 resolve(null);
//                             }
//                         },
//                         (_, error) => {
//                             console.log('Error checking for existing ayat:', error);
//                             resolve(null);
//                         }
//                     );
//                 });
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             return null;
//         }
//     };

//     const saveAyatToHistory = async (ayat) => {
//         if (!selectedDay && !selectedMood) return;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             // First, delete any existing entry for this day/mood combination for today
//             let deleteQuery = '';
//             let deleteParams = [];

//             if (selectedDay && selectedMood) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                 deleteParams = [selectedDay, selectedMood, currentDate];
//             } else if (selectedDay) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                 deleteParams = [selectedDay, currentDate];
//             } else {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                 deleteParams = [selectedMood, currentDate];
//             }

//             // Then insert the new one
//             const insertQuery = `
//                 INSERT INTO daily_ayat_history (day_id, mood_id, surah_id, ayah_id, date)
//                 VALUES (?, ?, ?, ?, ?)
//             `;
//             const insertParams = [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate];

//             db.transaction(tx => {
//                 tx.executeSql(
//                     deleteQuery,
//                     deleteParams,
//                     () => {
//                         tx.executeSql(
//                             insertQuery,
//                             insertParams,
//                             () => console.log('Ayat saved to history'),
//                             (_, error) => console.log('Error saving ayat to history:', error)
//                         );
//                     },
//                     (_, error) => console.log('Error deleting old history:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const handleDayChange = (itemValue) => {
//         setSelectedDay(itemValue);
//         const selected = days.find(day => day.day_id === itemValue);
//         setSelectedDayLabel(selected ? selected.name : 'Select a day');
//     };

//     const handleMoodChange = (itemValue) => {
//         setSelectedMood(itemValue);
//         const selected = moods.find(mood => mood.mood_id === itemValue);
//         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
//     };

//     const handleShowAyat = async () => {
//         if (!selectedDay && !selectedMood) {
//             Alert.alert('Error', 'Please select at least a day or a mood');
//             return;
//         }

//         setLoading(true);
//         // Clear previous ayat and stop any playing audio
//         setAyat(null);
//         stopAudio();

//         try {
//             // First check if we already have an ayat for today
//             const existingAyat = await checkForExistingAyat();

//             if (existingAyat) {
//                 setAyat(existingAyat);
//                 setLoading(false);

//                 // Auto-play only if enabled
//                 if (autoPlayEnabled) {
//                     setTimeout(() => {
//                         playAyahAudio(existingAyat);
//                     });
//                 }
//                 return;
//             }

//             const db = await openDB();

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.day_id = ? AND m.mood_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedDay, selectedMood];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.day_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedDay];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.mood_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedMood];
//             }

//             db.transaction(tx => {
//                 tx.executeSql(
//                     query,
//                     params,
//                     (_, { rows }) => {
//                         setLoading(false);
//                         if (rows.length > 0) {
//                             const selectedAyat = rows.raw()[0];
//                             setAyat(selectedAyat);
//                             saveAyatToHistory(selectedAyat);

//                             // Auto-play only if enabled
//                             if (autoPlayEnabled) {
//                                 setTimeout(() => {
//                                     playAyahAudio(selectedAyat);
//                                 }, 500);
//                             }
//                         } else {
//                             Alert.alert('Info', 'No ayat found for the selected criteria');
//                         }
//                     },
//                     (_, error) => {
//                         setLoading(false);
//                         console.log('Error fetching ayat:', error);
//                         Alert.alert('Error', 'Failed to fetch ayat');
//                     }
//                 );
//             });
//         } catch (error) {
//             setLoading(false);
//             console.error('Database error:', error);
//         }
//     };

//     // Modified useEffect: Load ayat on dropdown change and autoplay if enabled
//     useEffect(() => {
//         const loadAyatForCurrentSelection = async () => {
//             if (selectedDay || selectedMood) {
//                 // Stop any existing audio before loading new ayat
//                 stopAudio();
//                 const existingAyat = await checkForExistingAyat();
//                 if (existingAyat) {
//                     setAyat(existingAyat);
//                     // Auto-play if enabled
//                     if (autoPlayEnabled) {
//                         setTimeout(() => {
//                             playAyahAudio(existingAyat);
//                         });
//                     }
//                 }
//             }
//         };

//         loadAyatForCurrentSelection();
//     }, [selectedDay, selectedMood, autoPlayEnabled]);

//     const playAyahAudio = async (currentAyat) => {
//         // Ensure the current ayat matches the displayed ayat to avoid playing stale audio
//         if (!currentAyat || !ayat || currentAyat.ayah_Id !== ayat.ayah_Id || currentAyat.surah_id !== ayat.surah_id) {
//             console.log('Ayat mismatch or no ayat, skipping audio playback');
//             return;
//         }

//         const surahId = String(currentAyat.surah_id).padStart(3, '0');
//         const ayahLoc = String(currentAyat.ayah_location).padStart(3, '0');
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         // Stop and release any existing audio
//         stopAudio();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert('Error', 'Audio load failed: ' + error.message);
//                 return;
//             }

//             // Audio successfully loaded, now play it
//             newSound.play(async (success) => {
//                 if (success) {
//                     console.log('Playback finished');

//                     // After successful playback, record in history
//                     try {
//                         const db = await openDB();
//                         const currentDate = getCurrentDate();

//                         let query = '';
//                         let params = [];

//                         if (selectedDay && selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                             params = [selectedDay, selectedMood, currentDate];
//                         } else if (selectedDay) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                             params = [selectedDay, currentDate];
//                         } else if (selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                             params = [selectedMood, currentDate];
//                         } else {
//                             console.log('No day or mood selected, skipping play recording');
//                             return;
//                         }

//                         db.transaction(tx => {
//                             tx.executeSql(
//                                 query,
//                                 params,
//                                 (_, { rows }) => {
//                                     if (rows.length > 0) {
//                                         const historyId = rows.raw()[0].id;
//                                         // Record the play
//                                         tx.executeSql(
//                                             'INSERT INTO ayat_play_history (history_id) VALUES (?)',
//                                             [historyId],
//                                             () => console.log('Play recorded successfully'),
//                                             (_, error) => console.log('Error recording play:', error)
//                                         );
//                                     } else {
//                                         console.log('No history entry found for recording play');
//                                     }
//                                 },
//                                 (_, error) => console.log('Error finding history:', error)
//                             );
//                         });
//                     } catch (error) {
//                         console.error('Database error:', error);
//                     }
//                 } else {
//                     Alert.alert('Error', 'Audio playback failed');
//                 }
//                 newSound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     };

//     // Mood prediction functions
//     const handleMoodPrediction = async () => {
//         const value = parseInt(inputValue);

//         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
//             Alert.alert("Error", "Please select a number between 1 to 5.");
//             return;
//         }

//         const updatedAnswers = [...answers, value];
//         setAnswers(updatedAnswers);
//         setInputValue(""); // Reset selection

//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             // Send to server for prediction
//             try {
//                 const response = await fetch("http://192.168.0.110:5000/predict", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ answers: updatedAnswers }),
//                 });

//                 const data = await response.json();
//                 const mood = data.mood;
//                 setPredictedMood(mood);

//                 // Find the mood_id for the predicted mood
//                 const predictedMoodObj = moods.find(m => m.name === mood);
//                 if (predictedMoodObj) {
//                     setSelectedMood(predictedMoodObj.mood_id);
//                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
//                 }

//                 // Close the modal after a short delay
//                 setTimeout(() => {
//                     setShowMoodModal(false);
//                     resetMoodPrediction();
//                 }, 1500);
//             } catch (error) {
//                 setPredictedMood("Server error. Try again later ❌");
//             }
//         }
//     };

//     const resetMoodPrediction = () => {
//         setCurrentQuestionIndex(0);
//         setAnswers([]);
//         setInputValue("");
//         setPredictedMood(null);
//     };

//     const openMoodModal = () => {
//         resetMoodPrediction();
//         setShowMoodModal(true);
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => {
//                     stopAudio();
//                     navigation.goBack();
//                 }}>
//                     <Text style={styles.backButton}>←</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Daily Quran Reciter</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('AutoPlay')}>
//                     <Text style={styles.settingsButton}>⚙️</Text>
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.label}>Today is:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedDay}
//                     onValueChange={handleDayChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a day" value={null} />
//                     {days.map(day => (
//                         <Picker.Item
//                             key={day.day_id}
//                             label={day.name}
//                             value={day.day_id}
//                             color={selectedDay === day.day_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
//             </View>

//             <Text style={styles.label}>I'm feeling:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedMood}
//                     onValueChange={handleMoodChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a mood" value={null} />
//                     {moods.map(mood => (
//                         <Picker.Item
//                             key={mood.mood_id}
//                             label={mood.name}
//                             value={mood.mood_id}
//                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
//             </View>

//             <TouchableOpacity style={styles.aiButton} onPress={openMoodModal}>
//                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
//             </TouchableOpacity>

//             {ayat && (
//                 <View style={styles.ayatCard}>
//                     <View style={styles.ayatHeader}>
//                         <Text style={styles.surahName}>
//                             {ayat.EnglishName} ({ayat.ArabicName})
//                         </Text>
//                         <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
//                             <Text style={styles.emojiIcon}>
//                                 {isFavorite ? '❤️' : '🤍'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>

//                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>

//                     {showUrdu && (
//                         <>
//                             <Text style={styles.translationLabel}>Urdu Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.Urdu}</Text>
//                         </>
//                     )}

//                     {showEnglish && (
//                         <>
//                             <Text style={styles.translationLabel}>English Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.English}</Text>
//                         </>
//                     )}

//                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

//                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
//                         {!isPlaying ? (
//                             <TouchableOpacity onPress={() => playAyahAudio(ayat)} style={styles.audioButton}>
//                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
//                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>
//             )}

//             <Modal
//                 visible={showMoodModal}
//                 animationType="slide"
//                 transparent={false}
//                 onRequestClose={() => setShowMoodModal(false)}
//             >
//                 <View style={{
//                     padding: 25,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>
//                     <Text style={{
//                         color: '#000',
//                         fontSize: 24,
//                         fontWeight: 'bold'
//                     }}>🤖 AI MOOD PREDICTION</Text>
//                 </View>
//                 <SafeAreaView style={styles.modalContainer}>
//                     {predictedMood ? (
//                         <View style={styles.card}>
//                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
//                             <Text style={styles.resultText}>
//                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
//                             </Text>
//                             <TouchableOpacity
//                                 style={styles.modalButton}
//                                 onPress={() => setShowMoodModal(false)}
//                             >
//                                 <Text style={styles.modalButtonText}>OK</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View style={styles.card}>
//                             <Text style={styles.counter}>
//                                 Question {currentQuestionIndex + 1}/{questions.length}
//                             </Text>
//                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
//                             <View style={styles.radioContainer}>
//                                 {[1, 2, 3, 4, 5].map((value) => (
//                                     <TouchableOpacity
//                                         key={value}
//                                         style={[
//                                             styles.radioButton,
//                                             inputValue === value.toString() && styles.radioButtonSelected,
//                                         ]}
//                                         onPress={() => setInputValue(value.toString())}
//                                     >
//                                         <Text style={[
//                                             styles.radioText,
//                                             inputValue === value.toString() && styles.radioTextSelected,
//                                         ]}>
//                                             {value}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
//                                 <Text style={styles.modalButtonText}>
//                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </SafeAreaView>
//             </Modal>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: '#F8EDF9',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 30,
//     },
//     backButton: {
//         fontSize: 24,
//         padding: 10,
//         color: '#000',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#000',
//         textAlign: 'center',
//         flex: 1,
//     },
//     settingsButton: {
//         fontSize: 24,
//         padding: 10,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#000',
//         fontWeight: '500',
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         borderRadius: 5,
//         marginBottom: 20,
//         backgroundColor: 'white',
//         position: 'relative',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         opacity: 0,
//     },
//     selectedValue: {
//         position: 'absolute',
//         left: 15,
//         top: 15,
//         fontSize: 16,
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#C5A4F7',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 30,
//         elevation: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     aiButton: {
//         backgroundColor: '#4CAF50',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 15,
//         elevation: 5,
//     },
//     aiButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     ayatCard: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//     },
//     ayatHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     surahName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         flex: 1,
//     },
//     arabicText: {
//         fontSize: 22,
//         textAlign: 'right',
//         marginBottom: 20,
//         lineHeight: 35,
//         color: '#34495e',
//     },
//     translationLabel: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//         color: '#7f8c8d',
//     },
//     translationText: {
//         fontSize: 16,
//         marginBottom: 10,
//         lineHeight: 24,
//         color: '#34495e',
//     },
//     ayahInfo: {
//         fontSize: 14,
//         textAlign: 'right',
//         color: '#7f8c8d',
//         marginTop: 10,
//     },
//     audioButton: {
//         backgroundColor: '#2ecc71',
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         borderRadius: 25,
//         elevation: 3,
//     },
//     audioButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         backgroundColor: '#F8EDF9',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 25,
//         elevation: 6,
//         alignItems: 'center',
//     },
//     counter: {
//         fontSize: 14,
//         color: '#888',
//         alignSelf: 'flex-end',
//     },
//     question: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginVertical: 20,
//     },
//     radioButton: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         borderWidth: 2,
//         borderColor: '#aaa',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//     },
//     radioButtonSelected: {
//         borderColor: '#C5A4F7',
//         backgroundColor: '#C5A4F7',
//     },
//     radioText: {
//         fontSize: 18,
//         color: '#333',
//     },
//     radioTextSelected: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     modalButton: {
//         marginTop: 25,
//         backgroundColor: '#C5A4F7',
//         paddingVertical: 12,
//         paddingHorizontal: 35,
//         borderRadius: 30,
//         elevation: 4,
//     },
//     modalButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     resultTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: '#0056b3',
//     },
//     resultText: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#0f5132',
//     },
//     favoriteButton: {
//         padding: 5,
//     },
//     emojiIcon: {
//         fontSize: 24,
//     },
// });

// export default ShowAyat;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Sound from 'react-native-sound';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import openDB from './DB';

// Sound.setCategory('Playback');

// const questions = [
//     "How happy are you feeling?",
//     "How sad are you feeling?",
//     "How energetic are you?",
//     "How tired do you feel?",
//     "How stressed are you?",
//     "How calm do you feel?",
//     "How focused are you?",
//     "How distracted do you feel?",
//     "How anxious are you?",
//     "How relaxed do you feel?",
// ];

// const moodEmojis = {
//     Happy: "😊",
//     Sad: "😢",
//     Angry: "😠",
//     Fearful: "😨",
//     Surprised: "😲",
//     Neutral: "😐",
//     Excited: "🤩",
//     Tired: "😴",
// };

// const ShowAyat = ({ navigation }) => {
//     const [days, setDays] = useState([]);
//     const [moods, setMoods] = useState([]);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [ayat, setAyat] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
//     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showEnglish, setShowEnglish] = useState(true);
//     const [showUrdu, setShowUrdu] = useState(true);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
//     const [showMoodModal, setShowMoodModal] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [inputValue, setInputValue] = useState("");
//     const [predictedMood, setPredictedMood] = useState(null);

//     // Stop audio when component unmounts
//     useEffect(() => {
//         return () => {
//             if (sound) {
//                 sound.stop(() => {
//                     sound.release();
//                     setSound(null);
//                     setIsPlaying(false);
//                 });
//             }
//         };
//     }, [sound]);

//     // Stop audio when ayat changes
//     useEffect(() => {
//         if (sound && isPlaying) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     }, [ayat]);

//     useEffect(() => {
//         loadInitialData();
//         loadAutoPlaySetting();
//     }, []);

//     // Check if current ayat is favorite when it changes
//     useEffect(() => {
//         checkIfFavorite();
//     }, [ayat]);

//     // Load language settings and stop audio when screen loses focus
//     useFocusEffect(
//         React.useCallback(() => {
//             const loadLanguageSettings = async () => {
//                 try {
//                     const englishSetting = await AsyncStorage.getItem('showEnglish');
//                     const urduSetting = await AsyncStorage.getItem('showUrdu');

//                     if (englishSetting !== null) {
//                         setShowEnglish(JSON.parse(englishSetting));
//                     }

//                     if (urduSetting !== null) {
//                         setShowUrdu(JSON.parse(urduSetting));
//                     }
//                 } catch (error) {
//                     console.error('Error loading language settings:', error);
//                 }
//             };

//             loadLanguageSettings();

//             return () => {
//                 if (sound && isPlaying) {
//                     sound.stop(() => {
//                         sound.release();
//                         setSound(null);
//                         setIsPlaying(false);
//                     });
//                 }
//             };
//         }, [sound, isPlaying])
//     );

//     const loadAutoPlaySetting = async () => {
//         try {
//             const autoPlaySetting = await AsyncStorage.getItem('autoPlayEnabled');
//             if (autoPlaySetting !== null) {
//                 setAutoPlayEnabled(JSON.parse(autoPlaySetting));
//             }
//         } catch (error) {
//             console.error('Error loading auto-play setting:', error);
//         }
//     };

//     const getCurrentDate = () => {
//         const now = new Date();
//         return now.toISOString().split('T')[0]; // Returns YYYY-MM-DD
//     };

//     const loadInitialData = async () => {
//         try {
//             const db = await openDB();

//             // Load days
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Day',
//                     [],
//                     (_, { rows }) => {
//                         const daysData = rows.raw();
//                         setDays(daysData);

//                         // Get current day name (e.g., "Monday")
//                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//                         const today = new Date().getDay();
//                         const currentDayName = daysOfWeek[today];

//                         const currentDay = daysData.find(day =>
//                             day.name.toLowerCase() === currentDayName.toLowerCase()
//                         );

//                         if (currentDay) {
//                             setSelectedDay(currentDay.day_id);
//                             setSelectedDayLabel(currentDay.name);
//                         }
//                     },
//                     (_, error) => console.log('Error loading days:', error)
//                 );
//             });

//             // Load moods
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Mood',
//                     [],
//                     (_, { rows }) => setMoods(rows.raw()),
//                     (_, error) => console.log('Error loading moods:', error)
//                 );
//             });

//             // Create favorite_ayat table if it doesn't exist
//             db.transaction(tx => {
//                 tx.executeSql(
//                     `CREATE TABLE IF NOT EXISTS favorite_ayat (
//                         id INTEGER PRIMARY KEY AUTOINCREMENT,
//                         day_id INTEGER,
//                         mood_id INTEGER,
//                         surah_id INTEGER,
//                         ayat_id INTEGER,
//                         date_added TEXT,
//                         FOREIGN KEY(day_id) REFERENCES Day(day_id),
//                         FOREIGN KEY(mood_id) REFERENCES Mood(mood_id)
//                     )`,
//                     [],
//                     () => console.log('Favorite ayat table ready'),
//                     (_, error) => console.log('Error creating favorite table:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const checkIfFavorite = async () => {
//         if (!ayat) {
//             setIsFavorite(false);
//             return;
//         }

//         try {
//             const db = await openDB();
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     (_, { rows }) => {
//                         setIsFavorite(rows.length > 0);
//                     },
//                     (_, error) => {
//                         console.log('Error checking favorite:', error);
//                         setIsFavorite(false);
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             setIsFavorite(false);
//         }
//     };

//     const addToFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'INSERT INTO favorite_ayat (day_id, mood_id, surah_id, ayat_id, date_added) VALUES (?, ?, ?, ?, ?)',
//                     [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate],
//                     () => {
//                         setIsFavorite(true);
//                         Alert.alert('Success', 'Ayat added to favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error adding to favorites:', error);
//                         Alert.alert('Error', 'Failed to add to favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to add to favorites');
//         }
//     };

//     const removeFromFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'DELETE FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     () => {
//                         setIsFavorite(false);
//                         Alert.alert('Success', 'Ayat removed from favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error removing from favorites:', error);
//                         Alert.alert('Error', 'Failed to remove from favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to remove from favorites');
//         }
//     };

//     const toggleFavorite = () => {
//         if (isFavorite) {
//             removeFromFavorites();
//         } else {
//             addToFavorites();
//         }
//     };

//     const checkForExistingAyat = async () => {
//         if (!selectedDay && !selectedMood) return null;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, selectedMood, currentDate];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, currentDate];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedMood, currentDate];
//             }

//             return new Promise((resolve) => {
//                 db.transaction(tx => {
//                     tx.executeSql(
//                         query,
//                         params,
//                         (_, { rows }) => {
//                             if (rows.length > 0) {
//                                 resolve(rows.raw()[0]);
//                             } else {
//                                 resolve(null);
//                             }
//                         },
//                         (_, error) => {
//                             console.log('Error checking for existing ayat:', error);
//                             resolve(null);
//                         }
//                     );
//                 });
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             return null;
//         }
//     };

//     const saveAyatToHistory = async (ayat) => {
//         if (!selectedDay && !selectedMood) return;

//         try {
//             const db = await openDB();
//             const currentDate = getCurrentDate();

//             let deleteQuery = '';
//             let deleteParams = [];

//             if (selectedDay && selectedMood) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                 deleteParams = [selectedDay, selectedMood, currentDate];
//             } else if (selectedDay) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                 deleteParams = [selectedDay, currentDate];
//             } else {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                 deleteParams = [selectedMood, currentDate];
//             }

//             const insertQuery = `
//                 INSERT INTO daily_ayat_history (day_id, mood_id, surah_id, ayah_id, date)
//                 VALUES (?, ?, ?, ?, ?)
//             `;
//             const insertParams = [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate];

//             db.transaction(tx => {
//                 tx.executeSql(
//                     deleteQuery,
//                     deleteParams,
//                     () => {
//                         tx.executeSql(
//                             insertQuery,
//                             insertParams,
//                             () => console.log('Ayat saved to history'),
//                             (_, error) => console.log('Error saving ayat to history:', error)
//                         );
//                     },
//                     (_, error) => console.log('Error deleting old history:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const handleDayChange = (itemValue) => {
//         setSelectedDay(itemValue);
//         const selected = days.find(day => day.day_id === itemValue);
//         setSelectedDayLabel(selected ? selected.name : 'Select a day');
//         setAyat(null); // Clear ayat when day changes
//     };

//     const handleMoodChange = (itemValue) => {
//         setSelectedMood(itemValue);
//         const selected = moods.find(mood => mood.mood_id === itemValue);
//         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
//         setAyat(null); // Clear ayat when mood changes
//     };

//     const handleShowAyat = async () => {
//         if (!selectedDay && !selectedMood) {
//             Alert.alert('Error', 'Please select at least a day or a mood');
//             return;
//         }

//         setLoading(true);
//         setAyat(null);
//         stopAudio();

//         try {
//             const existingAyat = await checkForExistingAyat();

//             if (existingAyat) {
//                 setAyat(existingAyat);
//                 setLoading(false);

//                 if (autoPlayEnabled) {
//                     setTimeout(() => {
//                         playAyahAudio(existingAyat);
//                     }, 500);
//                 }
//                 return;
//             }

//             const db = await openDB();

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.day_id = ? AND m.mood_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedDay, selectedMood];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.day_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedDay];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.mood_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedMood];
//             }

//             db.transaction(tx => {
//                 tx.executeSql(
//                     query,
//                     params,
//                     (_, { rows }) => {
//                         setLoading(false);
//                         if (rows.length > 0) {
//                             const selectedAyat = rows.raw()[0];
//                             setAyat(selectedAyat);
//                             saveAyatToHistory(selectedAyat);

//                             if (autoPlayEnabled) {
//                                 setTimeout(() => {
//                                     playAyahAudio(selectedAyat);
//                                 }, 500);
//                             }
//                         } else {
//                             Alert.alert('Info', 'No ayat found for the selected criteria');
//                         }
//                     },
//                     (_, error) => {
//                         setLoading(false);
//                         console.log('Error fetching ayat:', error);
//                         Alert.alert('Error', 'Failed to fetch ayat');
//                     }
//                 );
//             });
//         } catch (error) {
//             setLoading(false);
//             console.error('Database error:', error);
//         }
//     };

//     const playAyahAudio = async (currentAyat) => {
//         if (!currentAyat || !ayat || currentAyat.ayah_Id !== ayat.ayah_Id || currentAyat.surah_id !== ayat.surah_id) {
//             console.log('Ayat mismatch or no ayat, skipping audio playback');
//             return;
//         }

//         const surahId = String(currentAyat.surah_id).padStart(3, '0');
//         const ayahLoc = String(currentAyat.ayah_location).padStart(3, '0');
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         stopAudio();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert('Error', 'Audio load failed: ' + error.message);
//                 return;
//             }

//             newSound.play(async (success) => {
//                 if (success) {
//                     console.log('Playback finished');

//                     try {
//                         const db = await openDB();
//                         const currentDate = getCurrentDate();

//                         let query = '';
//                         let params = [];

//                         if (selectedDay && selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                             params = [selectedDay, selectedMood, currentDate];
//                         } else if (selectedDay) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                             params = [selectedDay, currentDate];
//                         } else if (selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                             params = [selectedMood, currentDate];
//                         } else {
//                             console.log('No day or mood selected, skipping play recording');
//                             return;
//                         }

//                         db.transaction(tx => {
//                             tx.executeSql(
//                                 query,
//                                 params,
//                                 (_, { rows }) => {
//                                     if (rows.length > 0) {
//                                         const historyId = rows.raw()[0].id;
//                                         tx.executeSql(
//                                             'INSERT INTO ayat_play_history (history_id) VALUES (?)',
//                                             [historyId],
//                                             () => console.log('Play recorded successfully'),
//                                             (_, error) => console.log('Error recording play:', error)
//                                         );
//                                     } else {
//                                         console.log('No history entry found for recording play');
//                                     }
//                                 },
//                                 (_, error) => console.log('Error finding history:', error)
//                             );
//                         });
//                     } catch (error) {
//                         console.error('Database error:', error);
//                     }
//                 } else {
//                     Alert.alert('Error', 'Audio playback failed');
//                 }
//                 newSound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     };

//     const handleMoodPrediction = async () => {
//         const value = parseInt(inputValue);

//         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
//             Alert.alert("Error", "Please select a number between 1 to 5.");
//             return;
//         }

//         const updatedAnswers = [...answers, value];
//         setAnswers(updatedAnswers);
//         setInputValue("");

//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             try {
//                 const response = await fetch("http://192.168.0.110:5000/predict", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ answers: updatedAnswers }),
//                 });

//                 const data = await response.json();
//                 const mood = data.mood;
//                 setPredictedMood(mood);

//                 const predictedMoodObj = moods.find(m => m.name === mood);
//                 if (predictedMoodObj) {
//                     setSelectedMood(predictedMoodObj.mood_id);
//                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
//                 }

//                 setTimeout(() => {
//                     setShowMoodModal(false);
//                     resetMoodPrediction();
//                 }, 1500);
//             } catch (error) {
//                 setPredictedMood("Server error. Try again later ❌");
//             }
//         }
//     };

//     const resetMoodPrediction = () => {
//         setCurrentQuestionIndex(0);
//         setAnswers([]);
//         setInputValue("");
//         setPredictedMood(null);
//     };

//     const openMoodModal = () => {
//         resetMoodPrediction();
//         setShowMoodModal(true);
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => {
//                     stopAudio();
//                     navigation.goBack();
//                 }}>
//                     <Text style={styles.backButton}>←</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Daily Quran Reciter</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('AutoPlay')}>
//                     <Text style={styles.settingsButton}>⚙️</Text>
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.label}>Today is:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedDay}
//                     onValueChange={handleDayChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a day" value={null} />
//                     {days.map(day => (
//                         <Picker.Item
//                             key={day.day_id}
//                             label={day.name}
//                             value={day.day_id}
//                             color={selectedDay === day.day_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
//             </View>

//             <Text style={styles.label}>I'm feeling:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedMood}
//                     onValueChange={handleMoodChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a mood" value={null} />
//                     {moods.map(mood => (
//                         <Picker.Item
//                             key={mood.mood_id}
//                             label={mood.name}
//                             value={mood.mood_id}
//                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
//             </View>

//             <TouchableOpacity style={styles.aiButton} onPress={openMoodModal}>
//                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
//             </TouchableOpacity>

//             {ayat && (
//                 <View style={styles.ayatCard}>
//                     <View style={styles.ayatHeader}>
//                         <Text style={styles.surahName}>
//                             {ayat.EnglishName} ({ayat.ArabicName})
//                         </Text>
//                         <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
//                             <Text style={styles.emojiIcon}>
//                                 {isFavorite ? '❤️' : '🤍'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>

//                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>

//                     {showUrdu && (
//                         <>
//                             <Text style={styles.translationLabel}>Urdu Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.Urdu}</Text>
//                         </>
//                     )}

//                     {showEnglish && (
//                         <>
//                             <Text style={styles.translationLabel}>English Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.English}</Text>
//                         </>
//                     )}

//                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

//                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
//                         {!isPlaying ? (
//                             <TouchableOpacity onPress={() => playAyahAudio(ayat)} style={styles.audioButton}>
//                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
//                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>
//             )}

//             <Modal
//                 visible={showMoodModal}
//                 animationType="slide"
//                 transparent={false}
//                 onRequestClose={() => setShowMoodModal(false)}
//             >
//                 <View style={{
//                     padding: 25,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>
//                     <Text style={{
//                         color: '#000',
//                         fontSize: 24,
//                         fontWeight: 'bold'
//                     }}>🤖 AI MOOD PREDICTION</Text>
//                 </View>
//                 <SafeAreaView style={styles.modalContainer}>
//                     {predictedMood ? (
//                         <View style={styles.card}>
//                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
//                             <Text style={styles.resultText}>
//                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
//                             </Text>
//                             <TouchableOpacity
//                                 style={styles.modalButton}
//                                 onPress={() => setShowMoodModal(false)}
//                             >
//                                 <Text style={styles.modalButtonText}>OK</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View style={styles.card}>
//                             <Text style={styles.counter}>
//                                 Question {currentQuestionIndex + 1}/{questions.length}
//                             </Text>
//                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
//                             <View style={styles.radioContainer}>
//                                 {[1, 2, 3, 4, 5].map((value) => (
//                                     <TouchableOpacity
//                                         key={value}
//                                         style={[
//                                             styles.radioButton,
//                                             inputValue === value.toString() && styles.radioButtonSelected,
//                                         ]}
//                                         onPress={() => setInputValue(value.toString())}
//                                     >
//                                         <Text style={[
//                                             styles.radioText,
//                                             inputValue === value.toString() && styles.radioTextSelected,
//                                         ]}>
//                                             {value}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
//                                 <Text style={styles.modalButtonText}>
//                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </SafeAreaView>
//             </Modal>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: '#F8EDF9',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 30,
//     },
//     backButton: {
//         fontSize: 24,
//         padding: 10,
//         color: '#000',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#000',
//         textAlign: 'center',
//         flex: 1,
//     },
//     settingsButton: {
//         fontSize: 24,
//         padding: 10,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#000',
//         fontWeight: '500',
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         borderRadius: 5,
//         marginBottom: 20,
//         backgroundColor: 'white',
//         position: 'relative',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         opacity: 0,
//     },
//     selectedValue: {
//         position: 'absolute',
//         left: 15,
//         top: 15,
//         fontSize: 16,
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#C5A4F7',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 30,
//         elevation: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     aiButton: {
//         backgroundColor: '#4CAF50',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 15,
//         elevation: 5,
//     },
//     aiButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     ayatCard: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//     },
//     ayatHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     surahName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         flex: 1,
//     },
//     arabicText: {
//         fontSize: 22,
//         textAlign: 'right',
//         marginBottom: 20,
//         lineHeight: 35,
//         color: '#34495e',
//     },
//     translationLabel: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//         color: '#7f8c8d',
//     },
//     translationText: {
//         fontSize: 16,
//         marginBottom: 10,
//         lineHeight: 24,
//         color: '#34495e',
//     },
//     ayahInfo: {
//         fontSize: 14,
//         textAlign: 'right',
//         color: '#7f8c8d',
//         marginTop: 10,
//     },
//     audioButton: {
//         backgroundColor: '#2ecc71',
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         borderRadius: 25,
//         elevation: 3,
//     },
//     audioButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         backgroundColor: '#F8EDF9',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 25,
//         elevation: 6,
//         alignItems: 'center',
//     },
//     counter: {
//         fontSize: 14,
//         color: '#888',
//         alignSelf: 'flex-end',
//     },
//     question: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginVertical: 20,
//     },
//     radioButton: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         borderWidth: 2,
//         borderColor: '#aaa',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//     },
//     radioButtonSelected: {
//         borderColor: '#C5A4F7',
//         backgroundColor: '#C5A4F7',
//     },
//     radioText: {
//         fontSize: 18,
//         color: '#333',
//     },
//     radioTextSelected: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     modalButton: {
//         marginTop: 25,
//         backgroundColor: '#C5A4F7',
//         paddingVertical: 12,
//         paddingHorizontal: 35,
//         borderRadius: 30,
//         elevation: 4,
//     },
//     modalButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     resultTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: '#0056b3',
//     },
//     resultText: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#0f5132',
//     },
//     favoriteButton: {
//         padding: 5,
//     },
//     emojiIcon: {
//         fontSize: 24,
//     },
// });

// export default ShowAyat;

////calender

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView, Platform } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Sound from 'react-native-sound';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import openDB from './DB';

// Sound.setCategory('Playback');

// const questions = [
//     "How happy are you feeling?",
//     "How sad are you feeling?",
//     "How energetic are you?",
//     "How tired do you feel?",
//     "How stressed are you?",
//     "How calm do you feel?",
//     "How focused are you?",
//     "How distracted do you feel?",
//     "How anxious are you?",
//     "How relaxed do you feel?",
// ];

// const moodEmojis = {
//     Happy: "😊",
//     Sad: "😢",
//     Angry: "😠",
//     Fearful: "😨",
//     Surprised: "😲",
//     Neutral: "😐",
//     Excited: "🤩",
//     Tired: "😴",
// };

// const ShowAyat = ({ navigation }) => {
//     const [days, setDays] = useState([]);
//     const [moods, setMoods] = useState([]);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [ayat, setAyat] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
//     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showEnglish, setShowEnglish] = useState(true);
//     const [showUrdu, setShowUrdu] = useState(true);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
//     const [showMoodModal, setShowMoodModal] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [inputValue, setInputValue] = useState("");
//     const [predictedMood, setPredictedMood] = useState(null);

//     // New state variables for calendar and date selection
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [isHistoricalView, setIsHistoricalView] = useState(false);

//     // Stop audio when component unmounts
//     useEffect(() => {
//         return () => {
//             if (sound) {
//                 sound.stop(() => {
//                     sound.release();
//                     setSound(null);
//                     setIsPlaying(false);
//                 });
//             }
//         };
//     }, [sound]);

//     // Stop audio when ayat changes
//     useEffect(() => {
//         if (sound && isPlaying) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     }, [ayat]);

//     useEffect(() => {
//         loadInitialData();
//         loadAutoPlaySetting();
//     }, []);

//     // Check if current ayat is favorite when it changes
//     useEffect(() => {
//         checkIfFavorite();
//     }, [ayat]);

//     // Load language settings and stop audio when screen loses focus
//     useFocusEffect(
//         React.useCallback(() => {
//             const loadLanguageSettings = async () => {
//                 try {
//                     const englishSetting = await AsyncStorage.getItem('showEnglish');
//                     const urduSetting = await AsyncStorage.getItem('showUrdu');

//                     if (englishSetting !== null) {
//                         setShowEnglish(JSON.parse(englishSetting));
//                     }

//                     if (urduSetting !== null) {
//                         setShowUrdu(JSON.parse(urduSetting));
//                     }
//                 } catch (error) {
//                     console.error('Error loading language settings:', error);
//                 }
//             };

//             loadLanguageSettings();

//             return () => {
//                 if (sound && isPlaying) {
//                     sound.stop(() => {
//                         sound.release();
//                         setSound(null);
//                         setIsPlaying(false);
//                     });
//                 }
//             };
//         }, [sound, isPlaying])
//     );

//     const loadAutoPlaySetting = async () => {
//         try {
//             const autoPlaySetting = await AsyncStorage.getItem('autoPlayEnabled');
//             if (autoPlaySetting !== null) {
//                 setAutoPlayEnabled(JSON.parse(autoPlaySetting));
//             }
//         } catch (error) {
//             console.error('Error loading auto-play setting:', error);
//         }
//     };

//     const getFormattedDate = (date) => {
//         return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
//     };

//     const loadInitialData = async () => {
//         try {
//             const db = await openDB();

//             // Load days
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Day',
//                     [],
//                     (_, { rows }) => {
//                         const daysData = rows.raw();
//                         setDays(daysData);

//                         // Get current day name (e.g., "Monday")
//                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//                         const today = new Date().getDay();
//                         const currentDayName = daysOfWeek[today];

//                         const currentDay = daysData.find(day =>
//                             day.name.toLowerCase() === currentDayName.toLowerCase()
//                         );

//                         if (currentDay) {
//                             setSelectedDay(currentDay.day_id);
//                             setSelectedDayLabel(currentDay.name);
//                         }
//                     },
//                     (_, error) => console.log('Error loading days:', error)
//                 );
//             });

//             // Load moods
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Mood',
//                     [],
//                     (_, { rows }) => setMoods(rows.raw()),
//                     (_, error) => console.log('Error loading moods:', error)
//                 );
//             });

//             // Create favorite_ayat table if it doesn't exist
//             db.transaction(tx => {
//                 tx.executeSql(
//                     `CREATE TABLE IF NOT EXISTS favorite_ayat (
//                         id INTEGER PRIMARY KEY AUTOINCREMENT,
//                         day_id INTEGER,
//                         mood_id INTEGER,
//                         surah_id INTEGER,
//                         ayat_id INTEGER,
//                         date_added TEXT,
//                         FOREIGN KEY(day_id) REFERENCES Day(day_id),
//                         FOREIGN KEY(mood_id) REFERENCES Mood(mood_id)
//                     )`,
//                     [],
//                     () => console.log('Favorite ayat table ready'),
//                     (_, error) => console.log('Error creating favorite table:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const checkIfFavorite = async () => {
//         if (!ayat) {
//             setIsFavorite(false);
//             return;
//         }

//         try {
//             const db = await openDB();
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     (_, { rows }) => {
//                         setIsFavorite(rows.length > 0);
//                     },
//                     (_, error) => {
//                         console.log('Error checking favorite:', error);
//                         setIsFavorite(false);
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             setIsFavorite(false);
//         }
//     };

//     const addToFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();
//             const currentDate = getFormattedDate(new Date());

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'INSERT INTO favorite_ayat (day_id, mood_id, surah_id, ayat_id, date_added) VALUES (?, ?, ?, ?, ?)',
//                     [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate],
//                     () => {
//                         setIsFavorite(true);
//                         Alert.alert('Success', 'Ayat added to favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error adding to favorites:', error);
//                         Alert.alert('Error', 'Failed to add to favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to add to favorites');
//         }
//     };

//     const removeFromFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'DELETE FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     () => {
//                         setIsFavorite(false);
//                         Alert.alert('Success', 'Ayat removed from favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error removing from favorites:', error);
//                         Alert.alert('Error', 'Failed to remove from favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to remove from favorites');
//         }
//     };

//     const toggleFavorite = () => {
//         if (isFavorite) {
//             removeFromFavorites();
//         } else {
//             addToFavorites();
//         }
//     };

//     const checkForExistingAyat = async (date) => {
//         if (!selectedDay && !selectedMood) return null;

//         try {
//             const db = await openDB();
//             const searchDate = getFormattedDate(date);

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, selectedMood, searchDate];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, searchDate];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedMood, searchDate];
//             }

//             return new Promise((resolve) => {
//                 db.transaction(tx => {
//                     tx.executeSql(
//                         query,
//                         params,
//                         (_, { rows }) => {
//                             if (rows.length > 0) {
//                                 resolve(rows.raw()[0]);
//                             } else {
//                                 resolve(null);
//                             }
//                         },
//                         (_, error) => {
//                             console.log('Error checking for existing ayat:', error);
//                             resolve(null);
//                         }
//                     );
//                 });
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             return null;
//         }
//     };

//     const saveAyatToHistory = async (ayat, date) => {
//         if (!selectedDay && !selectedMood) return;

//         try {
//             const db = await openDB();
//             const saveDate = getFormattedDate(date);

//             let deleteQuery = '';
//             let deleteParams = [];

//             if (selectedDay && selectedMood) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                 deleteParams = [selectedDay, selectedMood, saveDate];
//             } else if (selectedDay) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                 deleteParams = [selectedDay, saveDate];
//             } else {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                 deleteParams = [selectedMood, saveDate];
//             }

//             const insertQuery = `
//                 INSERT INTO daily_ayat_history (day_id, mood_id, surah_id, ayah_id, date)
//                 VALUES (?, ?, ?, ?, ?)
//             `;
//             const insertParams = [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, saveDate];

//             db.transaction(tx => {
//                 tx.executeSql(
//                     deleteQuery,
//                     deleteParams,
//                     () => {
//                         tx.executeSql(
//                             insertQuery,
//                             insertParams,
//                             () => console.log('Ayat saved to history'),
//                             (_, error) => console.log('Error saving ayat to history:', error)
//                         );
//                     },
//                     (_, error) => console.log('Error deleting old history:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const handleDayChange = (itemValue) => {
//         setSelectedDay(itemValue);
//         const selected = days.find(day => day.day_id === itemValue);
//         setSelectedDayLabel(selected ? selected.name : 'Select a day');
//         setAyat(null); // Clear ayat when day changes
//     };

//     const handleMoodChange = (itemValue) => {
//         setSelectedMood(itemValue);
//         const selected = moods.find(mood => mood.mood_id === itemValue);
//         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
//         setAyat(null); // Clear ayat when mood changes
//     };

//     const handleDateChange = (event, date) => {
//         setShowDatePicker(false);
//         if (date) {
//             setSelectedDate(date);
//             setIsHistoricalView(true);
//         }
//     };

//     const showDatepicker = () => {
//         setShowDatePicker(true);
//     };

//     const resetToToday = () => {
//         setSelectedDate(new Date());
//         setIsHistoricalView(false);
//         setAyat(null);
//     };

//     const handleShowAyat = async () => {
//         if (!selectedDay && !selectedMood) {
//             Alert.alert('Error', 'Please select at least a day or a mood');
//             return;
//         }

//         setLoading(true);
//         setAyat(null);
//         stopAudio();

//         try {
//             const existingAyat = await checkForExistingAyat(selectedDate);

//             if (existingAyat) {
//                 setAyat(existingAyat);
//                 setLoading(false);

//                 if (autoPlayEnabled && !isHistoricalView) {
//                     setTimeout(() => {
//                         playAyahAudio(existingAyat);
//                     }, 500);
//                 }
//                 return;
//             }

//             // If we're looking at a historical date and no ayat was found
//             if (isHistoricalView) {
//                 setLoading(false);
//                 Alert.alert('Info', `No ayat found for ${getFormattedDate(selectedDate)} with the selected criteria`);
//                 return;
//             }

//             const db = await openDB();

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.day_id = ? AND m.mood_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedDay, selectedMood];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.day_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedDay];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM Quran q
//                     JOIN Surahs s ON q.surah_id = s.surah_id
//                     JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                     WHERE m.mood_id = ?
//                     ORDER BY RANDOM() LIMIT 1
//                 `;
//                 params = [selectedMood];
//             }

//             db.transaction(tx => {
//                 tx.executeSql(
//                     query,
//                     params,
//                     (_, { rows }) => {
//                         setLoading(false);
//                         if (rows.length > 0) {
//                             const selectedAyat = rows.raw()[0];
//                             setAyat(selectedAyat);
//                             saveAyatToHistory(selectedAyat, selectedDate);

//                             if (autoPlayEnabled && !isHistoricalView) {
//                                 setTimeout(() => {
//                                     playAyahAudio(selectedAyat);
//                                 }, 500);
//                             }
//                         } else {
//                             Alert.alert('Info', 'No ayat found for the selected criteria');
//                         }
//                     },
//                     (_, error) => {
//                         setLoading(false);
//                         console.log('Error fetching ayat:', error);
//                         Alert.alert('Error', 'Failed to fetch ayat');
//                     }
//                 );
//             });
//         } catch (error) {
//             setLoading(false);
//             console.error('Database error:', error);
//         }
//     };

//     const playAyahAudio = async (currentAyat) => {
//         if (!currentAyat || !ayat || currentAyat.ayah_Id !== ayat.ayah_Id || currentAyat.surah_id !== ayat.surah_id) {
//             console.log('Ayat mismatch or no ayat, skipping audio playback');
//             return;
//         }

//         const surahId = String(currentAyat.surah_id).padStart(3, '0');
//         const ayahLoc = String(currentAyat.ayah_location).padStart(3, '0');
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         stopAudio();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert('Error', 'Audio load failed: ' + error.message);
//                 return;
//             }

//             newSound.play(async (success) => {
//                 if (success) {
//                     console.log('Playback finished');

//                     try {
//                         const db = await openDB();
//                         const currentDate = getFormattedDate(selectedDate);

//                         let query = '';
//                         let params = [];

//                         if (selectedDay && selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                             params = [selectedDay, selectedMood, currentDate];
//                         } else if (selectedDay) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                             params = [selectedDay, currentDate];
//                         } else if (selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                             params = [selectedMood, currentDate];
//                         } else {
//                             console.log('No day or mood selected, skipping play recording');
//                             return;
//                         }

//                         db.transaction(tx => {
//                             tx.executeSql(
//                                 query,
//                                 params,
//                                 (_, { rows }) => {
//                                     if (rows.length > 0) {
//                                         const historyId = rows.raw()[0].id;
//                                         tx.executeSql(
//                                             'INSERT INTO ayat_play_history (history_id) VALUES (?)',
//                                             [historyId],
//                                             () => console.log('Play recorded successfully'),
//                                             (_, error) => console.log('Error recording play:', error)
//                                         );
//                                     } else {
//                                         console.log('No history entry found for recording play');
//                                     }
//                                 },
//                                 (_, error) => console.log('Error finding history:', error)
//                             );
//                         });
//                     } catch (error) {
//                         console.error('Database error:', error);
//                     }
//                 } else {
//                     Alert.alert('Error', 'Audio playback failed');
//                 }
//                 newSound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     };

//     const handleMoodPrediction = async () => {
//         const value = parseInt(inputValue);

//         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
//             Alert.alert("Error", "Please select a number between 1 to 5.");
//             return;
//         }

//         const updatedAnswers = [...answers, value];
//         setAnswers(updatedAnswers);
//         setInputValue("");

//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             try {
//                 const response = await fetch("http://192.168.0.110:5000/predict", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ answers: updatedAnswers }),
//                 });

//                 const data = await response.json();
//                 const mood = data.mood;
//                 setPredictedMood(mood);

//                 const predictedMoodObj = moods.find(m => m.name === mood);
//                 if (predictedMoodObj) {
//                     setSelectedMood(predictedMoodObj.mood_id);
//                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
//                 }

//                 setTimeout(() => {
//                     setShowMoodModal(false);
//                     resetMoodPrediction();
//                 }, 1500);
//             } catch (error) {
//                 setPredictedMood("Server error. Try again later ❌");
//             }
//         }
//     };

//     const resetMoodPrediction = () => {
//         setCurrentQuestionIndex(0);
//         setAnswers([]);
//         setInputValue("");
//         setPredictedMood(null);
//     };

//     const openMoodModal = () => {
//         resetMoodPrediction();
//         setShowMoodModal(true);
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => {
//                     stopAudio();
//                     navigation.goBack();
//                 }}>
//                     <Text style={styles.backButton}>←</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Daily Quran Reciter</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('AutoPlay')}>
//                     <Text style={styles.settingsButton}>⚙️</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Date Selection Section */}
//             <Text style={styles.label}>Select Date:</Text>
//             <View style={styles.dateSection}>
//                 {/* <Text style={styles.label}>Select Date:</Text> */}
//                 <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
//                     <Text style={styles.dateButtonText}>
//                         {selectedDate.toDateString()}
//                     </Text>
//                 </TouchableOpacity>
//                 {isHistoricalView && (
//                     <TouchableOpacity onPress={resetToToday} style={styles.todayButton}>
//                         <Text style={styles.todayButtonText}>Show Today</Text>
//                     </TouchableOpacity>
//                 )}
//                 {showDatePicker && (
//                     <DateTimePicker
//                         value={selectedDate}
//                         mode="date"
//                         display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                         onChange={handleDateChange}
//                         maximumDate={new Date()}
//                     />
//                 )}
//             </View>

//             <Text style={styles.label}>Today is:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedDay}
//                     onValueChange={handleDayChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a day" value={null} />
//                     {days.map(day => (
//                         <Picker.Item
//                             key={day.day_id}
//                             label={day.name}
//                             value={day.day_id}
//                             color={selectedDay === day.day_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
//             </View>

//             <Text style={styles.label}>I'm feeling:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedMood}
//                     onValueChange={handleMoodChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a mood" value={null} />
//                     {moods.map(mood => (
//                         <Picker.Item
//                             key={mood.mood_id}
//                             label={mood.name}
//                             value={mood.mood_id}
//                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
//             </View>

//             <TouchableOpacity style={styles.aiButton} onPress={openMoodModal}>
//                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
//             </TouchableOpacity>

//             {ayat && (
//                 <View style={styles.ayatCard}>
//                     <View style={styles.ayatHeader}>
//                         <Text style={styles.surahName}>
//                             {ayat.EnglishName} ({ayat.ArabicName})
//                         </Text>
//                         <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
//                             <Text style={styles.emojiIcon}>
//                                 {isFavorite ? '❤️' : '🤍'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>

//                     {isHistoricalView && (
//                         <Text style={styles.historyDate}>
//                             From: {getFormattedDate(selectedDate)}
//                         </Text>
//                     )}

//                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>

//                     {showUrdu && (
//                         <>
//                             <Text style={styles.translationLabel}>Urdu Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.Urdu}</Text>
//                         </>
//                     )}

//                     {showEnglish && (
//                         <>
//                             <Text style={styles.translationLabel}>English Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.English}</Text>
//                         </>
//                     )}

//                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

//                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
//                         {!isPlaying ? (
//                             <TouchableOpacity onPress={() => playAyahAudio(ayat)} style={styles.audioButton}>
//                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
//                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>
//             )}

//             <Modal
//                 visible={showMoodModal}
//                 animationType="slide"
//                 transparent={false}
//                 onRequestClose={() => setShowMoodModal(false)}
//             >
//                 <View style={{
//                     padding: 25,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>
//                     <Text style={{
//                         color: '#000',
//                         fontSize: 24,
//                         fontWeight: 'bold'
//                     }}>🤖 AI MOOD PREDICTION</Text>
//                 </View>
//                 <SafeAreaView style={styles.modalContainer}>
//                     {predictedMood ? (
//                         <View style={styles.card}>
//                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
//                             <Text style={styles.resultText}>
//                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
//                             </Text>
//                             <TouchableOpacity
//                                 style={styles.modalButton}
//                                 onPress={() => setShowMoodModal(false)}
//                             >
//                                 <Text style={styles.modalButtonText}>OK</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View style={styles.card}>
//                             <Text style={styles.counter}>
//                                 Question {currentQuestionIndex + 1}/{questions.length}
//                             </Text>
//                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
//                             <View style={styles.radioContainer}>
//                                 {[1, 2, 3, 4, 5].map((value) => (
//                                     <TouchableOpacity
//                                         key={value}
//                                         style={[
//                                             styles.radioButton,
//                                             inputValue === value.toString() && styles.radioButtonSelected,
//                                         ]}
//                                         onPress={() => setInputValue(value.toString())}
//                                     >
//                                         <Text style={[
//                                             styles.radioText,
//                                             inputValue === value.toString() && styles.radioTextSelected,
//                                         ]}>
//                                             {value}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
//                                 <Text style={styles.modalButtonText}>
//                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </SafeAreaView>
//             </Modal>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: '#F8EDF9',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     backButton: {
//         fontSize: 24,
//         padding: 10,
//         color: '#000',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#000',
//         textAlign: 'center',
//         flex: 1,
//     },
//     settingsButton: {
//         fontSize: 24,
//         padding: 10,
//     },
//     dateSection: {
//         marginBottom: 20,
//         alignItems: 'center',
//     },
//     dateButton: {
//         backgroundColor: '#fff',
//         padding: 15,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 0,
//     },
//     dateButtonText: {
//         fontSize: 16,
//         color: '#000',
//         fontWeight: '500',
//     },
//     todayButton: {
//         backgroundColor: '#3498db',
//         padding: 10,
//         borderRadius: 5,
//     },
//     todayButtonText: {
//         color: 'white',
//         fontSize: 14,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#000',
//         fontWeight: '500',
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         borderRadius: 5,
//         marginBottom: 20,
//         backgroundColor: 'white',
//         position: 'relative',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         opacity: 0,
//     },
//     selectedValue: {
//         position: 'absolute',
//         left: 15,
//         top: 15,
//         fontSize: 16,
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#C5A4F7',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 30,
//         elevation: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     aiButton: {
//         backgroundColor: '#4CAF50',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 15,
//         elevation: 5,
//     },
//     aiButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     ayatCard: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//     },
//     ayatHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     surahName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         flex: 1,
//     },
//     historyDate: {
//         fontSize: 14,
//         color: '#7f8c8d',
//         marginBottom: 10,
//         fontStyle: 'italic',
//     },
//     arabicText: {
//         fontSize: 22,
//         textAlign: 'right',
//         marginBottom: 20,
//         lineHeight: 35,
//         color: '#34495e',
//     },
//     translationLabel: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//         color: '#7f8c8d',
//     },
//     translationText: {
//         fontSize: 16,
//         marginBottom: 10,
//         lineHeight: 24,
//         color: '#34495e',
//     },
//     ayahInfo: {
//         fontSize: 14,
//         textAlign: 'right',
//         color: '#7f8c8d',
//         marginTop: 10,
//     },
//     audioButton: {
//         backgroundColor: '#2ecc71',
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         borderRadius: 25,
//         elevation: 3,
//     },
//     audioButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         backgroundColor: '#F8EDF9',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 25,
//         elevation: 6,
//         alignItems: 'center',
//     },
//     counter: {
//         fontSize: 14,
//         color: '#888',
//         alignSelf: 'flex-end',
//     },
//     question: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginVertical: 20,
//     },
//     radioButton: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         borderWidth: 2,
//         borderColor: '#aaa',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//     },
//     radioButtonSelected: {
//         borderColor: '#C5A4F7',
//         backgroundColor: '#C5A4F7',
//     },
//     radioText: {
//         fontSize: 18,
//         color: '#333',
//     },
//     radioTextSelected: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     modalButton: {
//         marginTop: 25,
//         backgroundColor: '#C5A4F7',
//         paddingVertical: 12,
//         paddingHorizontal: 35,
//         borderRadius: 30,
//         elevation: 4,
//     },
//     modalButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     resultTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: '#0056b3',
//     },
//     resultText: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#0f5132',
//     },
//     favoriteButton: {
//         padding: 5,
//     },
//     emojiIcon: {
//         fontSize: 24,
//     },
// });

// export default ShowAyat;


//used ayats
//jo check krwana hai


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import openDB from './DB';

Sound.setCategory('Playback');

const questions = [
    "How happy are you feeling?",
    "How sad are you feeling?",
    "How energetic are you?",
    "How tired do you feel?",
    "How stressed are you?",
    "How calm do you feel?",
    "How focused are you?",
    "How distracted do you feel?",
    "How anxious are you?",
    "How relaxed do you feel?",
];

const moodEmojis = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😠",
    Fearful: "😨",
    Surprised: "😲",
    Neutral: "😐",
    Excited: "🤩",
    Tired: "😴",
};

const ShowAyat = ({ navigation }) => {
    const [days, setDays] = useState([]);
    const [moods, setMoods] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMood, setSelectedMood] = useState(null);
    const [ayat, setAyat] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
    const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showEnglish, setShowEnglish] = useState(true);
    const [showUrdu, setShowUrdu] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
    const [showMoodModal, setShowMoodModal] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [predictedMood, setPredictedMood] = useState(null);

    // New state variables for calendar and date selection
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isHistoricalView, setIsHistoricalView] = useState(false);

    // Stop audio when component unmounts
    useEffect(() => {
        return () => {
            if (sound) {
                sound.stop(() => {
                    sound.release();
                    setSound(null);
                    setIsPlaying(false);
                });
            }
        };
    }, [sound]);

    // Stop audio when ayat changes
    useEffect(() => {
        if (sound && isPlaying) {
            sound.stop(() => {
                sound.release();
                setSound(null);
                setIsPlaying(false);
            });
        }
    }, [ayat]);

    useEffect(() => {
        loadInitialData();
        loadAutoPlaySetting();
        playAyahAudio();
    }, []);

    // Check if current ayat is favorite when it changes
    useEffect(() => {
        checkIfFavorite();
    }, [ayat]);

    // Load language settings and stop audio when screen loses focus
    useFocusEffect(
        React.useCallback(() => {
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

            loadLanguageSettings();

            return () => {
                if (sound && isPlaying) {
                    sound.stop(() => {
                        sound.release();
                        setSound(null);
                        setIsPlaying(false);
                    });
                }
            };
        }, [sound, isPlaying])
    );

    const loadAutoPlaySetting = async () => {
        try {
            const autoPlaySetting = await AsyncStorage.getItem('autoPlayEnabled');
            if (autoPlaySetting !== null) {
                setAutoPlayEnabled(JSON.parse(autoPlaySetting));
            }
        } catch (error) {
            console.error('Error loading auto-play setting:', error);
        }
    };

    const getFormattedDate = (date) => {
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    const getDayIdFromDate = (date) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = date.getDay();
        return dayIndex + 1; // Assuming day_id starts from 1
    };

    const loadInitialData = async () => {
        try {
            const db = await openDB();

            // Load days
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM Day',
                    [],
                    (_, { rows }) => {
                        const daysData = rows.raw();
                        setDays(daysData);

                        // Get current day name (e.g., "Monday")
                        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        const today = new Date().getDay();
                        const currentDayName = daysOfWeek[today];

                        const currentDay = daysData.find(day =>
                            day.name.toLowerCase() === currentDayName.toLowerCase()
                        );

                        if (currentDay) {
                            setSelectedDay(currentDay.day_id);
                            setSelectedDayLabel(currentDay.name);
                        }
                    },
                    (_, error) => console.log('Error loading days:', error)
                );
            });

            // Load moods
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM Mood',
                    [],
                    (_, { rows }) => setMoods(rows.raw()),
                    (_, error) => console.log('Error loading moods:', error)
                );
            });

            // Create favorite_ayat table if it doesn't exist
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS favorite_ayat (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        day_id INTEGER,
                        mood_id INTEGER,
                        surah_id INTEGER,
                        ayat_id INTEGER,
                        date_added TEXT,
                        FOREIGN KEY(day_id) REFERENCES Day(day_id),
                        FOREIGN KEY(mood_id) REFERENCES Mood(mood_id)
                    )`,
                    [],
                    () => console.log('Favorite ayat table ready'),
                    (_, error) => console.log('Error creating favorite table:', error)
                );
            });

            // Create used_ayahs table if it doesn't exist
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS used_ayahs (
                        day_id INTEGER,
                        mood_id INTEGER,
                        surah_id INTEGER,
                        ayah_id INTEGER,
                        PRIMARY KEY (day_id, mood_id, surah_id, ayah_id)
                    )`,
                    [],
                    () => console.log('Used ayahs table ready'),
                    (_, error) => console.log('Error creating used_ayahs table:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    const checkIfFavorite = async () => {
        if (!ayat) {
            setIsFavorite(false);
            return;
        }

        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
                    [ayat.surah_id, ayat.ayah_Id],
                    (_, { rows }) => {
                        setIsFavorite(rows.length > 0);
                    },
                    (_, error) => {
                        console.log('Error checking favorite:', error);
                        setIsFavorite(false);
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
            setIsFavorite(false);
        }
    };

    const addToFavorites = async () => {
        if (!ayat) return;

        try {
            const db = await openDB();
            const currentDate = getFormattedDate(new Date());

            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO favorite_ayat (day_id, mood_id, surah_id, ayat_id, date_added) VALUES (?, ?, ?, ?, ?)',
                    [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate],
                    () => {
                        setIsFavorite(true);
                        Alert.alert('Success', 'Ayat added to favorites!');
                    },
                    (_, error) => {
                        console.log('Error adding to favorites:', error);
                        Alert.alert('Error', 'Failed to add to favorites');
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
            Alert.alert('Error', 'Failed to add to favorites');
        }
    };

    const removeFromFavorites = async () => {
        if (!ayat) return;

        try {
            const db = await openDB();

            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
                    [ayat.surah_id, ayat.ayah_Id],
                    () => {
                        setIsFavorite(false);
                        Alert.alert('Success', 'Ayat removed from favorites!');
                    },
                    (_, error) => {
                        console.log('Error removing from favorites:', error);
                        Alert.alert('Error', 'Failed to remove from favorites');
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
            Alert.alert('Error', 'Failed to remove from favorites');
        }
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFromFavorites();
        } else {
            addToFavorites();
        }
    };

    const checkForExistingAyat = async (date) => {
        if (!selectedDay && !selectedMood) return null;

        try {
            const db = await openDB();
            const searchDate = getFormattedDate(date);

            let query = '';
            let params = [];

            if (selectedDay && selectedMood) {
                query = `
                    SELECT q.*, s.EnglishName, s.ArabicName 
                    FROM daily_ayat_history d
                    JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
                    JOIN Surahs s ON d.surah_id = s.surah_id
                    WHERE d.day_id = ? AND d.mood_id = ? AND d.date = ?
                `;
                params = [selectedDay, selectedMood, searchDate];
            } else if (selectedDay) {
                query = `
                    SELECT q.*, s.EnglishName, s.ArabicName 
                    FROM daily_ayat_history d
                    JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
                    JOIN Surahs s ON d.surah_id = s.surah_id
                    WHERE d.day_id = ? AND d.date = ?
                `;
                params = [selectedDay, searchDate];
            } else {
                query = `
                    SELECT q.*, s.EnglishName, s.ArabicName 
                    FROM daily_ayat_history d
                    JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
                    JOIN Surahs s ON d.surah_id = s.surah_id
                    WHERE d.mood_id = ? AND d.date = ?
                `;
                params = [selectedMood, searchDate];
            }

            return new Promise((resolve) => {
                db.transaction(tx => {
                    tx.executeSql(
                        query,
                        params,
                        (_, { rows }) => {
                            if (rows.length > 0) {
                                resolve(rows.raw()[0]);
                            } else {
                                resolve(null);
                            }
                        },
                        (_, error) => {
                            console.log('Error checking for existing ayat:', error);
                            resolve(null);
                        }
                    );
                });
            });
        } catch (error) {
            console.error('Database error:', error);
            return null;
        }
    };

    const saveAyatToHistory = async (ayat, date) => {
        if (!selectedDay && !selectedMood) return;

        try {
            const db = await openDB();
            const saveDate = getFormattedDate(date);

            let deleteQuery = '';
            let deleteParams = [];

            if (selectedDay && selectedMood) {
                deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
                deleteParams = [selectedDay, selectedMood, saveDate];
            } else if (selectedDay) {
                deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND date = ?';
                deleteParams = [selectedDay, saveDate];
            } else {
                deleteQuery = 'DELETE FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
                deleteParams = [selectedMood, saveDate];
            }

            const insertQuery = `
                INSERT INTO daily_ayat_history (day_id, mood_id, surah_id, ayah_id, date)
                VALUES (?, ?, ?, ?, ?)
            `;
            const insertParams = [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, saveDate];

            db.transaction(tx => {
                tx.executeSql(
                    deleteQuery,
                    deleteParams,
                    () => {
                        tx.executeSql(
                            insertQuery,
                            insertParams,
                            () => console.log('Ayat saved to history'),
                            (_, error) => console.log('Error saving ayat to history:', error)
                        );
                    },
                    (_, error) => console.log('Error deleting old history:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    // NEW FUNCTION: Check if ayat is already used
    const isAyatUsed = async (surah_id, ayah_id) => {
        try {
            const db = await openDB();
            return new Promise((resolve) => {
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT * FROM used_ayahs WHERE day_id = ? AND mood_id = ? AND surah_id = ? AND ayah_id = ?',
                        [selectedDay, selectedMood, surah_id, ayah_id],
                        (_, { rows }) => {
                            resolve(rows.length > 0);
                        },
                        (_, error) => {
                            console.log('Error checking used ayah:', error);
                            resolve(false);
                        }
                    );
                });
            });
        } catch (error) {
            console.error('Database error:', error);
            return false;
        }
    };

    // NEW FUNCTION: Add ayat to used_ayahs table
    const addToUsedAyahs = async (surah_id, ayah_id) => {
        try {
            const db = await openDB();
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT OR IGNORE INTO used_ayahs (day_id, mood_id, surah_id, ayah_id) VALUES (?, ?, ?, ?)',
                    [selectedDay, selectedMood, surah_id, ayah_id],
                    () => console.log('Ayat added to used_ayahs'),
                    (_, error) => console.log('Error adding to used_ayahs:', error)
                );
            });
        } catch (error) {
            console.error('Database error:', error);
        }
    };

    // NEW FUNCTION: Check if all ayats are used for current day/mood
    const areAllAyahsUsed = async () => {
        try {
            const db = await openDB();
            return new Promise((resolve) => {
                let query = '';
                let params = [];

                if (selectedDay && selectedMood) {
                    query = `
                        SELECT COUNT(*) as total_ayats,
                        (SELECT COUNT(*) FROM used_ayahs WHERE day_id = ? AND mood_id = ?) as used_ayats
                        FROM mood_day_custom_map m
                        JOIN Quran q ON m.surah_id = q.surah_id AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
                        WHERE m.day_id = ? AND m.mood_id = ?
                    `;
                    params = [selectedDay, selectedMood, selectedDay, selectedMood];
                } else if (selectedDay) {
                    query = `
                        SELECT COUNT(*) as total_ayats,
                        (SELECT COUNT(*) FROM used_ayahs WHERE day_id = ?) as used_ayats
                        FROM mood_day_custom_map m
                        JOIN Quran q ON m.surah_id = q.surah_id AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
                        WHERE m.day_id = ?
                    `;
                    params = [selectedDay, selectedDay];
                } else if (selectedMood) {
                    query = `
                        SELECT COUNT(*) as total_ayats,
                        (SELECT COUNT(*) FROM used_ayahs WHERE mood_id = ?) as used_ayats
                        FROM mood_day_custom_map m
                        JOIN Quran q ON m.surah_id = q.surah_id AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
                        WHERE m.mood_id = ?
                    `;
                    params = [selectedMood, selectedMood];
                } else {
                    resolve(false);
                    return;
                }

                db.transaction(tx => {
                    tx.executeSql(
                        query,
                        params,
                        (_, { rows }) => {
                            const result = rows.raw()[0];
                            resolve(result.used_ayats >= result.total_ayats);
                        },
                        (_, error) => {
                            console.log('Error checking all ayahs used:', error);
                            resolve(false);
                        }
                    );
                });
            });
        } catch (error) {
            console.error('Database error:', error);
            return false;
        }
    };

    // NEW FUNCTION: Reset used ayahs for current selection
    const resetUsedAyahs = async () => {
        try {
            const db = await openDB();
            let query = '';
            let params = [];

            if (selectedDay && selectedMood) {
                query = 'DELETE FROM used_ayahs WHERE day_id = ? AND mood_id = ?';
                params = [selectedDay, selectedMood];
            } else if (selectedDay) {
                query = 'DELETE FROM used_ayahs WHERE day_id = ?';
                params = [selectedDay];
            } else if (selectedMood) {
                query = 'DELETE FROM used_ayahs WHERE mood_id = ?';
                params = [selectedMood];
            } else {
                return;
            }

            db.transaction(tx => {
                tx.executeSql(
                    query,
                    params,
                    () => {
                        Alert.alert('Success', 'Used ayahs reset successfully!');
                    },
                    (_, error) => {
                        console.log('Error resetting used ayahs:', error);
                        Alert.alert('Error', 'Failed to reset used ayahs');
                    }
                );
            });
        } catch (error) {
            console.error('Database error:', error);
            Alert.alert('Error', 'Failed to reset used ayahs');
        }
    };

    const handleDayChange = (itemValue) => {
        setSelectedDay(itemValue);
        const selected = days.find(day => day.day_id === itemValue);
        setSelectedDayLabel(selected ? selected.name : 'Select a day');
        setAyat(null); // Clear ayat when day changes
    };

    const handleMoodChange = (itemValue) => {
        setSelectedMood(itemValue);
        const selected = moods.find(mood => mood.mood_id === itemValue);
        setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
        setAyat(null); // Clear ayat when mood changes
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            setIsHistoricalView(true);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const resetToToday = () => {
        setSelectedDate(new Date());
        setIsHistoricalView(false);
        setAyat(null);
    };

    const handleShowAyat = async () => {
        if (!selectedDay && !selectedMood) {
            Alert.alert('Error', 'Please select at least a day or a mood');
            return;
        }

        // Check if all ayats are used
        const allUsed = await areAllAyahsUsed();
        if (allUsed) {
            Alert.alert(
                'All Ayats Used',
                `All ayats for ${selectedDayLabel} ${selectedMoodLabel ? 'and ' + selectedMoodLabel : ''} have been used. Would you like to reset them?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Reset',
                        onPress: resetUsedAyahs
                    }
                ]
            );
            return;
        }

        setLoading(true);
        setAyat(null);
        stopAudio();

        try {
            const existingAyat = await checkForExistingAyat(selectedDate);

            if (existingAyat) {
                setAyat(existingAyat);
                setLoading(false);

                if (autoPlayEnabled && !isHistoricalView) {
                    setTimeout(() => {
                        playAyahAudio(existingAyat);
                    }, 500);
                }
                return;
            }

            // If we're looking at a historical date and no ayat was found
            if (isHistoricalView) {
                setLoading(false);
                Alert.alert('Info', `No ayat found for ${getFormattedDate(selectedDate)} with the selected criteria`);
                return;
            }

            const db = await openDB();

            let query = '';
            let params = [];
            let maxAttempts = 10; // Prevent infinite loop
            let attempts = 0;

            const findUnusedAyat = async () => {
                if (selectedDay && selectedMood) {
                    query = `
                        SELECT q.*, s.EnglishName, s.ArabicName 
                        FROM Quran q
                        JOIN Surahs s ON q.surah_id = s.surah_id
                        JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
                            AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
                        WHERE m.day_id = ? AND m.mood_id = ?
                        ORDER BY RANDOM() LIMIT 1
                    `;
                    params = [selectedDay, selectedMood];
                } else if (selectedDay) {
                    query = `
                        SELECT q.*, s.EnglishName, s.ArabicName 
                        FROM Quran q
                        JOIN Surahs s ON q.surah_id = s.surah_id
                        JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
                            AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
                        WHERE m.day_id = ?
                        ORDER BY RANDOM() LIMIT 1
                    `;
                    params = [selectedDay];
                } else {
                    query = `
                        SELECT q.*, s.EnglishName, s.ArabicName 
                        FROM Quran q
                        JOIN Surahs s ON q.surah_id = s.surah_id
                        JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
                            AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
                        WHERE m.mood_id = ?
                        ORDER BY RANDOM() LIMIT 1
                    `;
                    params = [selectedMood];
                }

                return new Promise((resolve) => {
                    db.transaction(tx => {
                        tx.executeSql(
                            query,
                            params,
                            async (_, { rows }) => {
                                if (rows.length > 0) {
                                    const selectedAyat = rows.raw()[0];
                                    const isUsed = await isAyatUsed(selectedAyat.surah_id, selectedAyat.ayah_Id);

                                    if (!isUsed) {
                                        resolve(selectedAyat);
                                    } else {
                                        attempts++;
                                        if (attempts < maxAttempts) {
                                            resolve(await findUnusedAyat());
                                        } else {
                                            resolve(null);
                                        }
                                    }
                                } else {
                                    resolve(null);
                                }
                            },
                            (_, error) => {
                                console.log('Error fetching ayat:', error);
                                resolve(null);
                            }
                        );
                    });
                });
            };

            const selectedAyat = await findUnusedAyat();

            if (selectedAyat) {
                setAyat(selectedAyat);
                saveAyatToHistory(selectedAyat, selectedDate);
                await addToUsedAyahs(selectedAyat.surah_id, selectedAyat.ayah_Id);

                if (autoPlayEnabled && !isHistoricalView) {
                    setTimeout(() => {
                        playAyahAudio(selectedAyat);
                    }, 500);
                }
            } else {
                Alert.alert('Info', 'No unused ayat found for the selected criteria');
            }

            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error('Database error:', error);
        }
    };

    const playAyahAudio = async (currentAyat) => {
        if (!currentAyat || !ayat || currentAyat.ayah_Id !== ayat.ayah_Id || currentAyat.surah_id !== ayat.surah_id) {
            console.log('Ayat mismatch or no ayat, skipping audio playback');
            return;
        }

        const surahId = String(currentAyat.surah_id).padStart(3, '0');
        const ayahLoc = String(currentAyat.ayah_location).padStart(3, '0');
        const fileName = `a${surahId}${ayahLoc}.mp3`;

        stopAudio();

        const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                Alert.alert('Error', 'Audio load failed: ' + error.message);
                return;
            }

            newSound.play(async (success) => {
                if (success) {
                    console.log('Playback finished');

                    try {
                        const db = await openDB();
                        const currentDate = getFormattedDate(selectedDate);

                        let query = '';
                        let params = [];

                        if (selectedDay && selectedMood) {
                            query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
                            params = [selectedDay, selectedMood, currentDate];
                        } else if (selectedDay) {
                            query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND date = ?';
                            params = [selectedDay, currentDate];
                        } else if (selectedMood) {
                            query = 'SELECT id FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
                            params = [selectedMood, currentDate];
                        } else {
                            console.log('No day or mood selected, skipping play recording');
                            return;
                        }

                        db.transaction(tx => {
                            tx.executeSql(
                                query,
                                params,
                                (_, { rows }) => {
                                    if (rows.length > 0) {
                                        const historyId = rows.raw()[0].id;
                                        tx.executeSql(
                                            'INSERT INTO ayat_play_history (history_id) VALUES (?)',
                                            [historyId],
                                            () => console.log('Play recorded successfully'),
                                            (_, error) => console.log('Error recording play:', error)
                                        );
                                    } else {
                                        console.log('No history entry found for recording play');
                                    }
                                },
                                (_, error) => console.log('Error finding history:', error)
                            );
                        });
                    } catch (error) {
                        console.error('Database error:', error);
                    }
                } else {
                    Alert.alert('Error', 'Audio playback failed');
                }
                newSound.release();
                setSound(null);
                setIsPlaying(false);
            });
        });

        setSound(newSound);
        setIsPlaying(true);
    };

    const stopAudio = () => {
        if (sound) {
            sound.stop(() => {
                sound.release();
                setSound(null);
                setIsPlaying(false);
            });
        }
    };

    const handleMoodPrediction = async () => {
        const value = parseInt(inputValue);

        if (!inputValue || isNaN(value) || value < 1 || value > 5) {
            Alert.alert("Error", "Please select a number between 1 to 5.");
            return;
        }

        const updatedAnswers = [...answers, value];
        setAnswers(updatedAnswers);
        setInputValue("");

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            try {
                const response = await fetch("http://192.168.0.110:5000/predict", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ answers: updatedAnswers }),
                });

                const data = await response.json();
                const mood = data.mood;
                setPredictedMood(mood);

                const predictedMoodObj = moods.find(m => m.name === mood);
                if (predictedMoodObj) {
                    setSelectedMood(predictedMoodObj.mood_id);
                    setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
                }

                setTimeout(() => {
                    setShowMoodModal(false);
                    resetMoodPrediction();
                }, 1500);
            } catch (error) {
                setPredictedMood("Server error. Try again later ❌");
            }
        }
    };

    const resetMoodPrediction = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setInputValue("");
        setPredictedMood(null);
    };

    const openMoodModal = () => {
        resetMoodPrediction();
        setShowMoodModal(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    stopAudio();
                    navigation.goBack();
                }}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Daily Quran Reciter</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AutoPlay')}>
                    <Text style={styles.settingsButton}>⚙️</Text>
                </TouchableOpacity>
            </View>

            {/* Date Selection Section */}
            <Text style={styles.label}>Select Date:</Text>
            <View style={styles.dateSection}>
                <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
                    <Text style={styles.dateButtonText}>
                        {selectedDate.toDateString()}
                    </Text>
                </TouchableOpacity>
                {isHistoricalView && (
                    <TouchableOpacity onPress={resetToToday} style={styles.todayButton}>
                        <Text style={styles.todayButtonText}>Show Today</Text>
                    </TouchableOpacity>
                )}
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                    />
                )}
            </View>

            <Text style={styles.label}>Today is:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedDay}
                    onValueChange={handleDayChange}
                    style={styles.picker}
                    dropdownIconColor="#000"
                >
                    <Picker.Item label="Select a day" value={null} />
                    {days.map(day => (
                        <Picker.Item
                            key={day.day_id}
                            label={day.name}
                            value={day.day_id}
                            color={selectedDay === day.day_id ? '#000' : '#666'}
                        />
                    ))}
                </Picker>
                <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
            </View>

            <Text style={styles.label}>I'm feeling:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedMood}
                    onValueChange={handleMoodChange}
                    style={styles.picker}
                    dropdownIconColor="#000"
                >
                    <Picker.Item label="Select a mood" value={null} />
                    {moods.map(mood => (
                        <Picker.Item
                            key={mood.mood_id}
                            label={mood.name}
                            value={mood.mood_id}
                            color={selectedMood === mood.mood_id ? '#000' : '#666'}
                        />
                    ))}
                </Picker>
                <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
            </View>

            <TouchableOpacity style={styles.aiButton} onPress={openMoodModal}>
                <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
            </TouchableOpacity>

            {ayat && (
                <View style={styles.ayatCard}>
                    <View style={styles.ayatHeader}>
                        <Text style={styles.surahName}>
                            {ayat.EnglishName} ({ayat.ArabicName})
                        </Text>
                        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                            <Text style={styles.emojiIcon}>
                                {isFavorite ? '❤️' : '🤍'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {isHistoricalView && (
                        <Text style={styles.historyDate}>
                            From: {getFormattedDate(selectedDate)}
                        </Text>
                    )}

                    <Text style={styles.arabicText}>{ayat.Arabic}</Text>

                    {showUrdu && (
                        <>
                            <Text style={styles.translationLabel}>Urdu Translation:</Text>
                            <Text style={styles.translationText}>{ayat.Urdu}</Text>
                        </>
                    )}

                    {showEnglish && (
                        <>
                            <Text style={styles.translationLabel}>English Translation:</Text>
                            <Text style={styles.translationText}>{ayat.English}</Text>
                        </>
                    )}

                    <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        {!isPlaying ? (
                            <TouchableOpacity onPress={() => playAyahAudio(ayat)} style={styles.audioButton}>
                                <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
                                <Text style={styles.audioButtonText}>⏹ Stop</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}

            <Modal
                visible={showMoodModal}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setShowMoodModal(false)}
            >
                <View style={{
                    padding: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: '#000',
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>🤖 AI MOOD PREDICTION</Text>
                </View>
                <SafeAreaView style={styles.modalContainer}>
                    {predictedMood ? (
                        <View style={styles.card}>
                            <Text style={styles.resultTitle}>Your Predicted Mood</Text>
                            <Text style={styles.resultText}>
                                {predictedMood} {moodEmojis[predictedMood] || "🧠"}
                            </Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setShowMoodModal(false)}
                            >
                                <Text style={styles.modalButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.card}>
                            <Text style={styles.counter}>
                                Question {currentQuestionIndex + 1}/{questions.length}
                            </Text>
                            <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
                            <View style={styles.radioContainer}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <TouchableOpacity
                                        key={value}
                                        style={[
                                            styles.radioButton,
                                            inputValue === value.toString() && styles.radioButtonSelected,
                                        ]}
                                        onPress={() => setInputValue(value.toString())}
                                    >
                                        <Text style={[
                                            styles.radioText,
                                            inputValue === value.toString() && styles.radioTextSelected,
                                        ]}>
                                            {value}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
                                <Text style={styles.modalButtonText}>
                                    {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </SafeAreaView>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F8EDF9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        fontSize: 24,
        padding: 10,
        color: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    settingsButton: {
        fontSize: 24,
        padding: 10,
    },
    dateSection: {
        marginBottom: 20,
        alignItems: 'center',
    },
    dateButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        width: '100%',
        alignItems: 'center',
        marginBottom: 0,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    todayButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    todayButtonText: {
        color: 'white',
        fontSize: 14,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000',
        fontWeight: '500',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        position: 'relative',
    },
    picker: {
        height: 50,
        width: '100%',
        opacity: 0,
    },
    selectedValue: {
        position: 'absolute',
        left: 15,
        top: 15,
        fontSize: 16,
        color: '#000',
    },
    button: {
        backgroundColor: '#C5A4F7',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 30,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    aiButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 5,
    },
    aiButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    ayatCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    ayatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    surahName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        flex: 1,
    },
    historyDate: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    arabicText: {
        fontSize: 22,
        textAlign: 'right',
        marginBottom: 20,
        lineHeight: 35,
        color: '#34495e',
    },
    translationLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#7f8c8d',
    },
    translationText: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
        color: '#34495e',
    },
    ayahInfo: {
        fontSize: 14,
        textAlign: 'right',
        color: '#7f8c8d',
        marginTop: 10,
    },
    audioButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3,
    },
    audioButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#F8EDF9',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 25,
        elevation: 6,
        alignItems: 'center',
    },
    counter: {
        fontSize: 14,
        color: '#888',
        alignSelf: 'flex-end',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 20,
    },
    radioButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    radioButtonSelected: {
        borderColor: '#C5A4F7',
        backgroundColor: '#C5A4F7',
    },
    radioText: {
        fontSize: 18,
        color: '#333',
    },
    radioTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalButton: {
        marginTop: 25,
        backgroundColor: '#C5A4F7',
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderRadius: 30,
        elevation: 4,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resultTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#0056b3',
    },
    resultText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0f5132',
    },
    favoriteButton: {
        padding: 5,
    },
    emojiIcon: {
        fontSize: 24,
    },
});

export default ShowAyat;


///multiple ayat setting

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView, Platform, Switch } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Sound from 'react-native-sound';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import openDB from './DB';

// Sound.setCategory('Playback');

// const questions = [
//     "How happy are you feeling?",
//     "How sad are you feeling?",
//     "How energetic are you?",
//     "How tired do you feel?",
//     "How stressed are you?",
//     "How calm do you feel?",
//     "How focused are you?",
//     "How distracted do you feel?",
//     "How anxious are you?",
//     "How relaxed do you feel?",
// ];

// const moodEmojis = {
//     Happy: "😊",
//     Sad: "😢",
//     Angry: "😠",
//     Fearful: "😨",
//     Surprised: "😲",
//     Neutral: "😐",
//     Excited: "🤩",
//     Tired: "😴",
// };

// const ShowAyat = ({ navigation }) => {
//     const [days, setDays] = useState([]);
//     const [moods, setMoods] = useState([]);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [ayat, setAyat] = useState(null);
//     const [multipleAyat, setMultipleAyat] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
//     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showEnglish, setShowEnglish] = useState(true);
//     const [showUrdu, setShowUrdu] = useState(true);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
//     const [showMoodModal, setShowMoodModal] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [inputValue, setInputValue] = useState("");
//     const [predictedMood, setPredictedMood] = useState(null);

//     // New state variables for calendar and date selection
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [isHistoricalView, setIsHistoricalView] = useState(false);

//     // New state variables for multiple ayat settings
//     const [showSettingsModal, setShowSettingsModal] = useState(false);
//     const [multipleAyatEnabled, setMultipleAyatEnabled] = useState(false);
//     const [ayatCount, setAyatCount] = useState(3);
//     const [randomSurahEnabled, setRandomSurahEnabled] = useState(false);

//     // Stop audio when component unmounts
//     useEffect(() => {
//         return () => {
//             if (sound) {
//                 sound.stop(() => {
//                     sound.release();
//                     setSound(null);
//                     setIsPlaying(false);
//                 });
//             }
//         };
//     }, [sound]);

//     // Stop audio when ayat changes
//     useEffect(() => {
//         if (sound && isPlaying) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     }, [ayat, multipleAyat]);

//     useEffect(() => {
//         loadInitialData();
//         loadAutoPlaySetting();
//         loadMultipleAyatSettings();
//     }, []);

//     // Check if current ayat is favorite when it changes
//     useEffect(() => {
//         checkIfFavorite();
//     }, [ayat]);

//     // Load language settings and stop audio when screen loses focus
//     useFocusEffect(
//         React.useCallback(() => {
//             const loadLanguageSettings = async () => {
//                 try {
//                     const englishSetting = await AsyncStorage.getItem('showEnglish');
//                     const urduSetting = await AsyncStorage.getItem('showUrdu');

//                     if (englishSetting !== null) {
//                         setShowEnglish(JSON.parse(englishSetting));
//                     }

//                     if (urduSetting !== null) {
//                         setShowUrdu(JSON.parse(urduSetting));
//                     }
//                 } catch (error) {
//                     console.error('Error loading language settings:', error);
//                 }
//             };

//             loadLanguageSettings();

//             return () => {
//                 if (sound && isPlaying) {
//                     sound.stop(() => {
//                         sound.release();
//                         setSound(null);
//                         setIsPlaying(false);
//                     });
//                 }
//             };
//         }, [sound, isPlaying])
//     );

//     const loadAutoPlaySetting = async () => {
//         try {
//             const autoPlaySetting = await AsyncStorage.getItem('autoPlayEnabled');
//             if (autoPlaySetting !== null) {
//                 setAutoPlayEnabled(JSON.parse(autoPlaySetting));
//             }
//         } catch (error) {
//             console.error('Error loading auto-play setting:', error);
//         }
//     };

//     const loadMultipleAyatSettings = async () => {
//         try {
//             const multipleAyatSetting = await AsyncStorage.getItem('multipleAyatEnabled');
//             const ayatCountSetting = await AsyncStorage.getItem('ayatCount');
//             const randomSurahSetting = await AsyncStorage.getItem('randomSurahEnabled');

//             if (multipleAyatSetting !== null) {
//                 setMultipleAyatEnabled(JSON.parse(multipleAyatSetting));
//             }
//             if (ayatCountSetting !== null) {
//                 setAyatCount(JSON.parse(ayatCountSetting));
//             }
//             if (randomSurahSetting !== null) {
//                 setRandomSurahEnabled(JSON.parse(randomSurahSetting));
//             }
//         } catch (error) {
//             console.error('Error loading multiple ayat settings:', error);
//         }
//     };

//     const saveMultipleAyatSettings = async () => {
//         try {
//             await AsyncStorage.setItem('multipleAyatEnabled', JSON.stringify(multipleAyatEnabled));
//             await AsyncStorage.setItem('ayatCount', JSON.stringify(ayatCount));
//             await AsyncStorage.setItem('randomSurahEnabled', JSON.stringify(randomSurahEnabled));
//             setShowSettingsModal(false);
//             Alert.alert('Success', 'Settings saved successfully!');
//         } catch (error) {
//             console.error('Error saving multiple ayat settings:', error);
//             Alert.alert('Error', 'Failed to save settings');
//         }
//     };

//     const getFormattedDate = (date) => {
//         return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
//     };

//     const loadInitialData = async () => {
//         try {
//             const db = await openDB();

//             // Load days
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Day',
//                     [],
//                     (_, { rows }) => {
//                         const daysData = rows.raw();
//                         setDays(daysData);

//                         // Get current day name (e.g., "Monday")
//                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//                         const today = new Date().getDay();
//                         const currentDayName = daysOfWeek[today];

//                         const currentDay = daysData.find(day =>
//                             day.name.toLowerCase() === currentDayName.toLowerCase()
//                         );

//                         if (currentDay) {
//                             setSelectedDay(currentDay.day_id);
//                             setSelectedDayLabel(currentDay.name);
//                         }
//                     },
//                     (_, error) => console.log('Error loading days:', error)
//                 );
//             });

//             // Load moods
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Mood',
//                     [],
//                     (_, { rows }) => setMoods(rows.raw()),
//                     (_, error) => console.log('Error loading moods:', error)
//                 );
//             });

//             // Create favorite_ayat table if it doesn't exist
//             db.transaction(tx => {
//                 tx.executeSql(
//                     `CREATE TABLE IF NOT EXISTS favorite_ayat (
//                         id INTEGER PRIMARY KEY AUTOINCREMENT,
//                         day_id INTEGER,
//                         mood_id INTEGER,
//                         surah_id INTEGER,
//                         ayat_id INTEGER,
//                         date_added TEXT,
//                         FOREIGN KEY(day_id) REFERENCES Day(day_id),
//                         FOREIGN KEY(mood_id) REFERENCES Mood(mood_id)
//                     )`,
//                     [],
//                     () => console.log('Favorite ayat table ready'),
//                     (_, error) => console.log('Error creating favorite table:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const checkIfFavorite = async () => {
//         if (!ayat) {
//             setIsFavorite(false);
//             return;
//         }

//         try {
//             const db = await openDB();
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     (_, { rows }) => {
//                         setIsFavorite(rows.length > 0);
//                     },
//                     (_, error) => {
//                         console.log('Error checking favorite:', error);
//                         setIsFavorite(false);
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             setIsFavorite(false);
//         }
//     };

//     const addToFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();
//             const currentDate = getFormattedDate(new Date());

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'INSERT INTO favorite_ayat (day_id, mood_id, surah_id, ayat_id, date_added) VALUES (?, ?, ?, ?, ?)',
//                     [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate],
//                     () => {
//                         setIsFavorite(true);
//                         Alert.alert('Success', 'Ayat added to favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error adding to favorites:', error);
//                         Alert.alert('Error', 'Failed to add to favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to add to favorites');
//         }
//     };

//     const removeFromFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'DELETE FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     () => {
//                         setIsFavorite(false);
//                         Alert.alert('Success', 'Ayat removed from favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error removing from favorites:', error);
//                         Alert.alert('Error', 'Failed to remove from favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to remove from favorites');
//         }
//     };

//     const toggleFavorite = () => {
//         if (isFavorite) {
//             removeFromFavorites();
//         } else {
//             addToFavorites();
//         }
//     };

//     const checkForExistingAyat = async (date) => {
//         if (!selectedDay && !selectedMood) return null;

//         try {
//             const db = await openDB();
//             const searchDate = getFormattedDate(date);

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, selectedMood, searchDate];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, searchDate];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedMood, searchDate];
//             }

//             return new Promise((resolve) => {
//                 db.transaction(tx => {
//                     tx.executeSql(
//                         query,
//                         params,
//                         (_, { rows }) => {
//                             if (rows.length > 0) {
//                                 resolve(rows.raw()[0]);
//                             } else {
//                                 resolve(null);
//                             }
//                         },
//                         (_, error) => {
//                             console.log('Error checking for existing ayat:', error);
//                             resolve(null);
//                         }
//                     );
//                 });
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             return null;
//         }
//     };

//     const saveAyatToHistory = async (ayat, date) => {
//         if (!selectedDay && !selectedMood) return;

//         try {
//             const db = await openDB();
//             const saveDate = getFormattedDate(date);

//             let deleteQuery = '';
//             let deleteParams = [];

//             if (selectedDay && selectedMood) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                 deleteParams = [selectedDay, selectedMood, saveDate];
//             } else if (selectedDay) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                 deleteParams = [selectedDay, saveDate];
//             } else {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                 deleteParams = [selectedMood, saveDate];
//             }

//             const insertQuery = `
//                 INSERT INTO daily_ayat_history (day_id, mood_id, surah_id, ayah_id, date)
//                 VALUES (?, ?, ?, ?, ?)
//             `;
//             const insertParams = [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, saveDate];

//             db.transaction(tx => {
//                 tx.executeSql(
//                     deleteQuery,
//                     deleteParams,
//                     () => {
//                         tx.executeSql(
//                             insertQuery,
//                             insertParams,
//                             () => console.log('Ayat saved to history'),
//                             (_, error) => console.log('Error saving ayat to history:', error)
//                         );
//                     },
//                     (_, error) => console.log('Error deleting old history:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const handleDayChange = (itemValue) => {
//         setSelectedDay(itemValue);
//         const selected = days.find(day => day.day_id === itemValue);
//         setSelectedDayLabel(selected ? selected.name : 'Select a day');
//         setAyat(null); // Clear ayat when day changes
//         setMultipleAyat([]); // Clear multiple ayat when day changes
//     };

//     const handleMoodChange = (itemValue) => {
//         setSelectedMood(itemValue);
//         const selected = moods.find(mood => mood.mood_id === itemValue);
//         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
//         setAyat(null); // Clear ayat when mood changes
//         setMultipleAyat([]); // Clear multiple ayat when mood changes
//     };

//     const handleDateChange = (event, date) => {
//         setShowDatePicker(false);
//         if (date) {
//             setSelectedDate(date);
//             setIsHistoricalView(true);
//         }
//     };

//     const showDatepicker = () => {
//         setShowDatePicker(true);
//     };

//     const resetToToday = () => {
//         setSelectedDate(new Date());
//         setIsHistoricalView(false);
//         setAyat(null);
//         setMultipleAyat([]);
//     };

//     const getRandomSurahId = async () => {
//         try {
//             const db = await openDB();
//             return new Promise((resolve) => {
//                 db.transaction(tx => {
//                     tx.executeSql(
//                         'SELECT surah_id FROM Surahs ORDER BY RANDOM() LIMIT 1',
//                         [],
//                         (_, { rows }) => {
//                             if (rows.length > 0) {
//                                 resolve(rows.raw()[0].surah_id);
//                             } else {
//                                 resolve(1); // Default to first surah if none found
//                             }
//                         },
//                         (_, error) => {
//                             console.log('Error getting random surah:', error);
//                             resolve(1);
//                         }
//                     );
//                 });
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             return 1;
//         }
//     };

//     const handleShowAyat = async () => {
//         if (!selectedDay && !selectedMood) {
//             Alert.alert('Error', 'Please select at least a day or a mood');
//             return;
//         }

//         setLoading(true);
//         setAyat(null);
//         setMultipleAyat([]);
//         stopAudio();

//         try {
//             // For historical view, we only show single ayat
//             if (isHistoricalView) {
//                 const existingAyat = await checkForExistingAyat(selectedDate);
//                 if (existingAyat) {
//                     setAyat(existingAyat);
//                     setLoading(false);
//                     return;
//                 } else {
//                     setLoading(false);
//                     Alert.alert('Info', `No ayat found for ${getFormattedDate(selectedDate)} with the selected criteria`);
//                     return;
//                 }
//             }

//             const db = await openDB();

//             if (multipleAyatEnabled) {
//                 // Handle multiple ayat generation
//                 let query = '';
//                 let params = [];
//                 let surahId = null;

//                 if (randomSurahEnabled) {
//                     // Get a random surah
//                     surahId = await getRandomSurahId();

//                     query = `
//                         SELECT q.*, s.EnglishName, s.ArabicName 
//                         FROM Quran q
//                         JOIN Surahs s ON q.surah_id = s.surah_id
//                         WHERE q.surah_id = ?
//                         ORDER BY RANDOM() LIMIT ?
//                     `;
//                     params = [surahId, ayatCount];
//                 } else if (selectedDay && selectedMood) {
//                     query = `
//                         SELECT q.*, s.EnglishName, s.ArabicName 
//                         FROM Quran q
//                         JOIN Surahs s ON q.surah_id = s.surah_id
//                         JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                         WHERE m.day_id = ? AND m.mood_id = ?
//                         ORDER BY RANDOM() LIMIT ?
//                     `;
//                     params = [selectedDay, selectedMood, ayatCount];
//                 } else if (selectedDay) {
//                     query = `
//                         SELECT q.*, s.EnglishName, s.ArabicName 
//                         FROM Quran q
//                         JOIN Surahs s ON q.surah_id = s.surah_id
//                         JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                         WHERE m.day_id = ?
//                         ORDER BY RANDOM() LIMIT ?
//                     `;
//                     params = [selectedDay, ayatCount];
//                 } else {
//                     query = `
//                         SELECT q.*, s.EnglishName, s.ArabicName 
//                         FROM Quran q
//                         JOIN Surahs s ON q.surah_id = s.surah_id
//                         JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                         WHERE m.mood_id = ?
//                         ORDER BY RANDOM() LIMIT ?
//                     `;
//                     params = [selectedMood, ayatCount];
//                 }

//                 db.transaction(tx => {
//                     tx.executeSql(
//                         query,
//                         params,
//                         (_, { rows }) => {
//                             setLoading(false);
//                             if (rows.length > 0) {
//                                 const selectedAyatList = rows.raw();
//                                 setMultipleAyat(selectedAyatList);

//                                 // Save the first ayat to history for tracking
//                                 if (selectedAyatList.length > 0) {
//                                     saveAyatToHistory(selectedAyatList[0], selectedDate);
//                                 }

//                                 if (autoPlayEnabled) {
//                                     setTimeout(() => {
//                                         playAyahAudio(selectedAyatList[0]);
//                                     }, 500);
//                                 }
//                             } else {
//                                 Alert.alert('Info', 'No ayat found for the selected criteria');
//                             }
//                         },
//                         (_, error) => {
//                             setLoading(false);
//                             console.log('Error fetching multiple ayat:', error);
//                             Alert.alert('Error', 'Failed to fetch ayat');
//                         }
//                     );
//                 });
//             } else {
//                 // Handle single ayat generation (original logic)
//                 const existingAyat = await checkForExistingAyat(selectedDate);
//                 if (existingAyat) {
//                     setAyat(existingAyat);
//                     setLoading(false);

//                     if (autoPlayEnabled) {
//                         setTimeout(() => {
//                             playAyahAudio(existingAyat);
//                         }, 500);
//                     }
//                     return;
//                 }

//                 let query = '';
//                 let params = [];

//                 if (selectedDay && selectedMood) {
//                     query = `
//                         SELECT q.*, s.EnglishName, s.ArabicName 
//                         FROM Quran q
//                         JOIN Surahs s ON q.surah_id = s.surah_id
//                         JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                         WHERE m.day_id = ? AND m.mood_id = ?
//                         ORDER BY RANDOM() LIMIT 1
//                     `;
//                     params = [selectedDay, selectedMood];
//                 } else if (selectedDay) {
//                     query = `
//                         SELECT q.*, s.EnglishName, s.ArabicName 
//                         FROM Quran q
//                         JOIN Surahs s ON q.surah_id = s.surah_id
//                         JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                         WHERE m.day_id = ?
//                         ORDER BY RANDOM() LIMIT 1
//                     `;
//                     params = [selectedDay];
//                 } else {
//                     query = `
//                         SELECT q.*, s.EnglishName, s.ArabicName 
//                         FROM Quran q
//                         JOIN Surahs s ON q.surah_id = s.surah_id
//                         JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                             AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                         WHERE m.mood_id = ?
//                         ORDER BY RANDOM() LIMIT 1
//                     `;
//                     params = [selectedMood];
//                 }

//                 db.transaction(tx => {
//                     tx.executeSql(
//                         query,
//                         params,
//                         (_, { rows }) => {
//                             setLoading(false);
//                             if (rows.length > 0) {
//                                 const selectedAyat = rows.raw()[0];
//                                 setAyat(selectedAyat);
//                                 saveAyatToHistory(selectedAyat, selectedDate);

//                                 if (autoPlayEnabled) {
//                                     setTimeout(() => {
//                                         playAyahAudio(selectedAyat);
//                                     }, 500);
//                                 }
//                             } else {
//                                 Alert.alert('Info', 'No ayat found for the selected criteria');
//                             }
//                         },
//                         (_, error) => {
//                             setLoading(false);
//                             console.log('Error fetching ayat:', error);
//                             Alert.alert('Error', 'Failed to fetch ayat');
//                         }
//                     );
//                 });
//             }
//         } catch (error) {
//             setLoading(false);
//             console.error('Database error:', error);
//         }
//     };

//     const playAyahAudio = async (currentAyat) => {
//         if (!currentAyat) {
//             console.log('No ayat, skipping audio playback');
//             return;
//         }

//         const surahId = String(currentAyat.surah_id).padStart(3, '0');
//         const ayahLoc = String(currentAyat.ayah_location).padStart(3, '0');
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         stopAudio();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert('Error', 'Audio load failed: ' + error.message);
//                 return;
//             }

//             newSound.play(async (success) => {
//                 if (success) {
//                     console.log('Playback finished');

//                     try {
//                         const db = await openDB();
//                         const currentDate = getFormattedDate(selectedDate);

//                         let query = '';
//                         let params = [];

//                         if (selectedDay && selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                             params = [selectedDay, selectedMood, currentDate];
//                         } else if (selectedDay) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                             params = [selectedDay, currentDate];
//                         } else if (selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                             params = [selectedMood, currentDate];
//                         } else {
//                             console.log('No day or mood selected, skipping play recording');
//                             return;
//                         }

//                         db.transaction(tx => {
//                             tx.executeSql(
//                                 query,
//                                 params,
//                                 (_, { rows }) => {
//                                     if (rows.length > 0) {
//                                         const historyId = rows.raw()[0].id;
//                                         tx.executeSql(
//                                             'INSERT INTO ayat_play_history (history_id) VALUES (?)',
//                                             [historyId],
//                                             () => console.log('Play recorded successfully'),
//                                             (_, error) => console.log('Error recording play:', error)
//                                         );
//                                     } else {
//                                         console.log('No history entry found for recording play');
//                                     }
//                                 },
//                                 (_, error) => console.log('Error finding history:', error)
//                             );
//                         });
//                     } catch (error) {
//                         console.error('Database error:', error);
//                     }
//                 } else {
//                     Alert.alert('Error', 'Audio playback failed');
//                 }
//                 newSound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     };

//     const handleMoodPrediction = async () => {
//         const value = parseInt(inputValue);

//         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
//             Alert.alert("Error", "Please select a number between 1 to 5.");
//             return;
//         }

//         const updatedAnswers = [...answers, value];
//         setAnswers(updatedAnswers);
//         setInputValue("");

//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             try {
//                 const response = await fetch("http://192.168.0.110:5000/predict", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ answers: updatedAnswers }),
//                 });

//                 const data = await response.json();
//                 const mood = data.mood;
//                 setPredictedMood(mood);

//                 const predictedMoodObj = moods.find(m => m.name === mood);
//                 if (predictedMoodObj) {
//                     setSelectedMood(predictedMoodObj.mood_id);
//                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
//                 }

//                 setTimeout(() => {
//                     setShowMoodModal(false);
//                     resetMoodPrediction();
//                 }, 1500);
//             } catch (error) {
//                 setPredictedMood("Server error. Try again later ❌");
//             }
//         }
//     };

//     const resetMoodPrediction = () => {
//         setCurrentQuestionIndex(0);
//         setAnswers([]);
//         setInputValue("");
//         setPredictedMood(null);
//     };

//     const openMoodModal = () => {
//         resetMoodPrediction();
//         setShowMoodModal(true);
//     };

//     const openSettingsModal = () => {
//         setShowSettingsModal(true);
//     };

//     const renderAyatCard = (ayatItem, index) => (
//         <View key={index} style={styles.ayatCard}>
//             <View style={styles.ayatHeader}>
//                 <Text style={styles.surahName}>
//                     {ayatItem.EnglishName} ({ayatItem.ArabicName})
//                 </Text>
//                 {index === 0 && (
//                     <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
//                         <Text style={styles.emojiIcon}>
//                             {isFavorite ? '❤️' : '🤍'}
//                         </Text>
//                     </TouchableOpacity>
//                 )}
//             </View>

//             {isHistoricalView && (
//                 <Text style={styles.historyDate}>
//                     From: {getFormattedDate(selectedDate)}
//                 </Text>
//             )}

//             <Text style={styles.arabicText}>{ayatItem.Arabic}</Text>

//             {showUrdu && (
//                 <>
//                     <Text style={styles.translationLabel}>Urdu Translation:</Text>
//                     <Text style={styles.translationText}>{ayatItem.Urdu}</Text>
//                 </>
//             )}

//             {showEnglish && (
//                 <>
//                     <Text style={styles.translationLabel}>English Translation:</Text>
//                     <Text style={styles.translationText}>{ayatItem.English}</Text>
//                 </>
//             )}

//             <Text style={styles.ayahInfo}>Ayah {ayatItem.ayah_location}</Text>

//             <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
//                 {!isPlaying ? (
//                     <TouchableOpacity onPress={() => playAyahAudio(ayatItem)} style={styles.audioButton}>
//                         <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
//                     </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
//                         <Text style={styles.audioButtonText}>⏹ Stop</Text>
//                     </TouchableOpacity>
//                 )}
//             </View>
//         </View>
//     );

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => {
//                     stopAudio();
//                     navigation.goBack();
//                 }}>
//                     <Text style={styles.backButton}>←</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Daily Quran Reciter</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('AutoPlay')}>
//                     <Text style={styles.settingsButton}>⚙️</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Settings Button */}
//             <TouchableOpacity onPress={openSettingsModal} style={styles.settingsButtonContainer}>
//                 <Text style={styles.settingsButtonText}>Multiple Ayat Settings</Text>
//             </TouchableOpacity>

//             {/* Date Selection Section */}
//             <Text style={styles.label}>Select Date:</Text>
//             <View style={styles.dateSection}>
//                 <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
//                     <Text style={styles.dateButtonText}>
//                         {selectedDate.toDateString()}
//                     </Text>
//                 </TouchableOpacity>
//                 {isHistoricalView && (
//                     <TouchableOpacity onPress={resetToToday} style={styles.todayButton}>
//                         <Text style={styles.todayButtonText}>Show Today</Text>
//                     </TouchableOpacity>
//                 )}
//                 {showDatePicker && (
//                     <DateTimePicker
//                         value={selectedDate}
//                         mode="date"
//                         display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                         onChange={handleDateChange}
//                         maximumDate={new Date()}
//                     />
//                 )}
//             </View>

//             <Text style={styles.label}>Today is:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedDay}
//                     onValueChange={handleDayChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a day" value={null} />
//                     {days.map(day => (
//                         <Picker.Item
//                             key={day.day_id}
//                             label={day.name}
//                             value={day.day_id}
//                             color={selectedDay === day.day_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
//             </View>

//             <Text style={styles.label}>I'm feeling:</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={selectedMood}
//                     onValueChange={handleMoodChange}
//                     style={styles.picker}
//                     dropdownIconColor="#000"
//                 >
//                     <Picker.Item label="Select a mood" value={null} />
//                     {moods.map(mood => (
//                         <Picker.Item
//                             key={mood.mood_id}
//                             label={mood.name}
//                             value={mood.mood_id}
//                             color={selectedMood === mood.mood_id ? '#000' : '#666'}
//                         />
//                     ))}
//                 </Picker>
//                 <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
//             </View>

//             <TouchableOpacity style={styles.aiButton} onPress={openMoodModal}>
//                 <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Show Ayat'}</Text>
//             </TouchableOpacity>

//             {multipleAyatEnabled && multipleAyat.length > 0 && (
//                 <View style={styles.multipleAyatContainer}>
//                     <Text style={styles.multipleAyatTitle}>
//                         {randomSurahEnabled ?
//                             `Random Ayat from Surah ${multipleAyat[0].EnglishName}` :
//                             `${multipleAyat.length} Random Ayat`}
//                     </Text>
//                     {multipleAyat.map((ayatItem, index) => renderAyatCard(ayatItem, index))}
//                 </View>
//             )}

//             {!multipleAyatEnabled && ayat && renderAyatCard(ayat, 0)}

//             {/* Settings Modal */}
//             <Modal
//                 visible={showSettingsModal}
//                 animationType="slide"
//                 transparent={true}
//                 onRequestClose={() => setShowSettingsModal(false)}
//             >
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.settingsModalContainer}>
//                         <Text style={styles.settingsTitle}>Multiple Ayat Settings</Text>

//                         <View style={styles.settingRow}>
//                             <Text style={styles.settingLabel}>Enable Multiple Ayat</Text>
//                             <Switch
//                                 value={multipleAyatEnabled}
//                                 onValueChange={setMultipleAyatEnabled}
//                                 trackColor={{ false: '#767577', true: '#81b0ff' }}
//                                 thumbColor={multipleAyatEnabled ? '#f5dd4b' : '#f4f3f4'}
//                             />
//                         </View>

//                         {multipleAyatEnabled && (
//                             <>
//                                 <View style={styles.settingRow}>
//                                     <Text style={styles.settingLabel}>Number of Ayat</Text>
//                                     <Picker
//                                         selectedValue={ayatCount}
//                                         onValueChange={(itemValue) => setAyatCount(itemValue)}
//                                         style={styles.countPicker}
//                                         dropdownIconColor="#000"
//                                     >
//                                         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(count => (
//                                             <Picker.Item key={count} label={count.toString()} value={count} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <View style={styles.settingRow}>
//                                     <Text style={styles.settingLabel}>Random Surah (All Ayat from one Surah)</Text>
//                                     <Switch
//                                         value={randomSurahEnabled}
//                                         onValueChange={setRandomSurahEnabled}
//                                         trackColor={{ false: '#767577', true: '#81b0ff' }}
//                                         thumbColor={randomSurahEnabled ? '#f5dd4b' : '#f4f3f4'}
//                                     />
//                                 </View>
//                             </>
//                         )}

//                         <View style={styles.settingsButtonRow}>
//                             <TouchableOpacity
//                                 style={[styles.modalButton, styles.cancelButton]}
//                                 onPress={() => setShowSettingsModal(false)}
//                             >
//                                 <Text style={styles.modalButtonText}>Cancel</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={[styles.modalButton, styles.saveButton]}
//                                 onPress={saveMultipleAyatSettings}
//                             >
//                                 <Text style={styles.modalButtonText}>Save</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>

//             <Modal
//                 visible={showMoodModal}
//                 animationType="slide"
//                 transparent={false}
//                 onRequestClose={() => setShowMoodModal(false)}
//             >
//                 <View style={{
//                     padding: 25,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>
//                     <Text style={{
//                         color: '#000',
//                         fontSize: 24,
//                         fontWeight: 'bold'
//                     }}>🤖 AI MOOD PREDICTION</Text>
//                 </View>
//                 <SafeAreaView style={styles.modalContainer}>
//                     {predictedMood ? (
//                         <View style={styles.card}>
//                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
//                             <Text style={styles.resultText}>
//                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
//                             </Text>
//                             <TouchableOpacity
//                                 style={styles.modalButton}
//                                 onPress={() => setShowMoodModal(false)}
//                             >
//                                 <Text style={styles.modalButtonText}>OK</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View style={styles.card}>
//                             <Text style={styles.counter}>
//                                 Question {currentQuestionIndex + 1}/{questions.length}
//                             </Text>
//                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
//                             <View style={styles.radioContainer}>
//                                 {[1, 2, 3, 4, 5].map((value) => (
//                                     <TouchableOpacity
//                                         key={value}
//                                         style={[
//                                             styles.radioButton,
//                                             inputValue === value.toString() && styles.radioButtonSelected,
//                                         ]}
//                                         onPress={() => setInputValue(value.toString())}
//                                     >
//                                         <Text style={[
//                                             styles.radioText,
//                                             inputValue === value.toString() && styles.radioTextSelected,
//                                         ]}>
//                                             {value}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
//                                 <Text style={styles.modalButtonText}>
//                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </SafeAreaView>
//             </Modal>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: '#F8EDF9',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     backButton: {
//         fontSize: 24,
//         padding: 10,
//         color: '#000',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#000',
//         textAlign: 'center',
//         flex: 1,
//     },
//     settingsButton: {
//         fontSize: 24,
//         padding: 10,
//     },
//     settingsButtonContainer: {
//         backgroundColor: '#3498db',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 20,
//         elevation: 5,
//     },
//     settingsButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     dateSection: {
//         marginBottom: 20,
//         alignItems: 'center',
//     },
//     dateButton: {
//         backgroundColor: '#fff',
//         padding: 15,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 0,
//     },
//     dateButtonText: {
//         fontSize: 16,
//         color: '#000',
//         fontWeight: '500',
//     },
//     todayButton: {
//         backgroundColor: '#3498db',
//         padding: 10,
//         borderRadius: 5,
//     },
//     todayButtonText: {
//         color: 'white',
//         fontSize: 14,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#000',
//         fontWeight: '500',
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         borderRadius: 5,
//         marginBottom: 20,
//         backgroundColor: 'white',
//         position: 'relative',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         opacity: 0,
//     },
//     selectedValue: {
//         position: 'absolute',
//         left: 15,
//         top: 15,
//         fontSize: 16,
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#C5A4F7',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 30,
//         elevation: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     aiButton: {
//         backgroundColor: '#4CAF50',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 15,
//         elevation: 5,
//     },
//     aiButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     ayatCard: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//         marginBottom: 20,
//     },
//     multipleAyatContainer: {
//         marginBottom: 20,
//     },
//     multipleAyatTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 15,
//         color: '#2c3e50',
//     },
//     ayatHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     surahName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         flex: 1,
//     },
//     historyDate: {
//         fontSize: 14,
//         color: '#7f8c8d',
//         marginBottom: 10,
//         fontStyle: 'italic',
//     },
//     arabicText: {
//         fontSize: 22,
//         textAlign: 'right',
//         marginBottom: 20,
//         lineHeight: 35,
//         color: '#34495e',
//     },
//     translationLabel: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//         color: '#7f8c8d',
//     },
//     translationText: {
//         fontSize: 16,
//         marginBottom: 10,
//         lineHeight: 24,
//         color: '#34495e',
//     },
//     ayahInfo: {
//         fontSize: 14,
//         textAlign: 'right',
//         color: '#7f8c8d',
//         marginTop: 10,
//     },
//     audioButton: {
//         backgroundColor: '#2ecc71',
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         borderRadius: 25,
//         elevation: 3,
//     },
//     audioButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     settingsModalContainer: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         width: '90%',
//         maxHeight: '80%',
//     },
//     settingsTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#2c3e50',
//     },
//     settingRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     settingLabel: {
//         fontSize: 16,
//         flex: 1,
//         marginRight: 10,
//         color: '#34495e',
//     },
//     countPicker: {
//         width: 100,
//         height: 50,
//     },
//     settingsButtonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 20,
//     },
//     cancelButton: {
//         backgroundColor: '#e74c3c',
//     },
//     saveButton: {
//         backgroundColor: '#2ecc71',
//     },
//     modalContainer: {
//         flex: 1,
//         backgroundColor: '#F8EDF9',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 25,
//         elevation: 6,
//         alignItems: 'center',
//     },
//     counter: {
//         fontSize: 14,
//         color: '#888',
//         alignSelf: 'flex-end',
//     },
//     question: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginVertical: 20,
//     },
//     radioButton: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         borderWidth: 2,
//         borderColor: '#aaa',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//     },
//     radioButtonSelected: {
//         borderColor: '#C5A4F7',
//         backgroundColor: '#C5A4F7',
//     },
//     radioText: {
//         fontSize: 18,
//         color: '#333',
//     },
//     radioTextSelected: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     modalButton: {
//         marginTop: 25,
//         backgroundColor: '#C5A4F7',
//         paddingVertical: 12,
//         paddingHorizontal: 35,
//         borderRadius: 30,
//         elevation: 4,
//     },
//     modalButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     resultTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: '#0056b3',
//     },
//     resultText: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#0f5132',
//     },
//     favoriteButton: {
//         padding: 5,
//     },
//     emojiIcon: {
//         fontSize: 24,
//     },
// });

// export default ShowAyat;

///selected surah

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView, Platform } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Sound from 'react-native-sound';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import openDB from './DB';

// Sound.setCategory('Playback');

// const questions = [
//     "How happy are you feeling?",
//     "How sad are you feeling?",
//     "How energetic are you?",
//     "How tired do you feel?",
//     "How stressed are you?",
//     "How calm do you feel?",
//     "How focused are you?",
//     "How distracted do you feel?",
//     "How anxious are you?",
//     "How relaxed do you feel?",
// ];

// const moodEmojis = {
//     Happy: "😊",
//     Sad: "😢",
//     Angry: "😠",
//     Fearful: "😨",
//     Surprised: "😲",
//     Neutral: "😐",
//     Excited: "🤩",
//     Tired: "😴",
// };

// const ShowAyat = ({ navigation }) => {
//     const [days, setDays] = useState([]);
//     const [moods, setMoods] = useState([]);
//     const [surahs, setSurahs] = useState([]);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [selectedSurah, setSelectedSurah] = useState(null);
//     const [ayat, setAyat] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [selectedDayLabel, setSelectedDayLabel] = useState('Select a day');
//     const [selectedMoodLabel, setSelectedMoodLabel] = useState('Select a mood');
//     const [selectedSurahLabel, setSelectedSurahLabel] = useState('Select a surah');
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showEnglish, setShowEnglish] = useState(true);
//     const [showUrdu, setShowUrdu] = useState(true);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
//     const [showMoodModal, setShowMoodModal] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [inputValue, setInputValue] = useState("");
//     const [predictedMood, setPredictedMood] = useState(null);
//     const [mode, setMode] = useState('daily'); // 'daily' or 'surah'

//     // New state variables for calendar and date selection
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [isHistoricalView, setIsHistoricalView] = useState(false);

//     // Stop audio when component unmounts
//     useEffect(() => {
//         return () => {
//             if (sound) {
//                 sound.stop(() => {
//                     sound.release();
//                     setSound(null);
//                     setIsPlaying(false);
//                 });
//             }
//         };
//     }, [sound]);

//     // Stop audio when ayat changes
//     useEffect(() => {
//         if (sound && isPlaying) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     }, [ayat]);

//     useEffect(() => {
//         loadInitialData();
//         loadAutoPlaySetting();
//     }, []);

//     // Check if current ayat is favorite when it changes
//     useEffect(() => {
//         checkIfFavorite();
//     }, [ayat]);

//     // Load language settings and stop audio when screen loses focus
//     useFocusEffect(
//         React.useCallback(() => {
//             const loadLanguageSettings = async () => {
//                 try {
//                     const englishSetting = await AsyncStorage.getItem('showEnglish');
//                     const urduSetting = await AsyncStorage.getItem('showUrdu');

//                     if (englishSetting !== null) {
//                         setShowEnglish(JSON.parse(englishSetting));
//                     }

//                     if (urduSetting !== null) {
//                         setShowUrdu(JSON.parse(urduSetting));
//                     }
//                 } catch (error) {
//                     console.error('Error loading language settings:', error);
//                 }
//             };

//             loadLanguageSettings();

//             return () => {
//                 if (sound && isPlaying) {
//                     sound.stop(() => {
//                         sound.release();
//                         setSound(null);
//                         setIsPlaying(false);
//                     });
//                 }
//             };
//         }, [sound, isPlaying])
//     );

//     const loadAutoPlaySetting = async () => {
//         try {
//             const autoPlaySetting = await AsyncStorage.getItem('autoPlayEnabled');
//             if (autoPlaySetting !== null) {
//                 setAutoPlayEnabled(JSON.parse(autoPlaySetting));
//             }
//         } catch (error) {
//             console.error('Error loading auto-play setting:', error);
//         }
//     };

//     const getFormattedDate = (date) => {
//         return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
//     };

//     const loadInitialData = async () => {
//         try {
//             const db = await openDB();

//             // Load days
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Day',
//                     [],
//                     (_, { rows }) => {
//                         const daysData = rows.raw();
//                         setDays(daysData);

//                         // Get current day name (e.g., "Monday")
//                         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//                         const today = new Date().getDay();
//                         const currentDayName = daysOfWeek[today];

//                         const currentDay = daysData.find(day =>
//                             day.name.toLowerCase() === currentDayName.toLowerCase()
//                         );

//                         if (currentDay) {
//                             setSelectedDay(currentDay.day_id);
//                             setSelectedDayLabel(currentDay.name);
//                         }
//                     },
//                     (_, error) => console.log('Error loading days:', error)
//                 );
//             });

//             // Load moods
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Mood',
//                     [],
//                     (_, { rows }) => setMoods(rows.raw()),
//                     (_, error) => console.log('Error loading moods:', error)
//                 );
//             });

//             // Load surahs
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM Surahs ORDER BY surah_id',
//                     [],
//                     (_, { rows }) => {
//                         const surahsData = rows.raw();
//                         setSurahs(surahsData);
//                     },
//                     (_, error) => console.log('Error loading surahs:', error)
//                 );
//             });

//             // Create favorite_ayat table if it doesn't exist
//             db.transaction(tx => {
//                 tx.executeSql(
//                     `CREATE TABLE IF NOT EXISTS favorite_ayat (
//                         id INTEGER PRIMARY KEY AUTOINCREMENT,
//                         day_id INTEGER,
//                         mood_id INTEGER,
//                         surah_id INTEGER,
//                         ayat_id INTEGER,
//                         date_added TEXT,
//                         FOREIGN KEY(day_id) REFERENCES Day(day_id),
//                         FOREIGN KEY(mood_id) REFERENCES Mood(mood_id)
//                     )`,
//                     [],
//                     () => console.log('Favorite ayat table ready'),
//                     (_, error) => console.log('Error creating favorite table:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const checkIfFavorite = async () => {
//         if (!ayat) {
//             setIsFavorite(false);
//             return;
//         }

//         try {
//             const db = await openDB();
//             db.transaction(tx => {
//                 tx.executeSql(
//                     'SELECT * FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     (_, { rows }) => {
//                         setIsFavorite(rows.length > 0);
//                     },
//                     (_, error) => {
//                         console.log('Error checking favorite:', error);
//                         setIsFavorite(false);
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             setIsFavorite(false);
//         }
//     };

//     const addToFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();
//             const currentDate = getFormattedDate(new Date());

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'INSERT INTO favorite_ayat (day_id, mood_id, surah_id, ayat_id, date_added) VALUES (?, ?, ?, ?, ?)',
//                     [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, currentDate],
//                     () => {
//                         setIsFavorite(true);
//                         Alert.alert('Success', 'Ayat added to favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error adding to favorites:', error);
//                         Alert.alert('Error', 'Failed to add to favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to add to favorites');
//         }
//     };

//     const removeFromFavorites = async () => {
//         if (!ayat) return;

//         try {
//             const db = await openDB();

//             db.transaction(tx => {
//                 tx.executeSql(
//                     'DELETE FROM favorite_ayat WHERE surah_id = ? AND ayat_id = ?',
//                     [ayat.surah_id, ayat.ayah_Id],
//                     () => {
//                         setIsFavorite(false);
//                         Alert.alert('Success', 'Ayat removed from favorites!');
//                     },
//                     (_, error) => {
//                         console.log('Error removing from favorites:', error);
//                         Alert.alert('Error', 'Failed to remove from favorites');
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             Alert.alert('Error', 'Failed to remove from favorites');
//         }
//     };

//     const toggleFavorite = () => {
//         if (isFavorite) {
//             removeFromFavorites();
//         } else {
//             addToFavorites();
//         }
//     };

//     const checkForExistingAyat = async (date) => {
//         if (!selectedDay && !selectedMood) return null;

//         try {
//             const db = await openDB();
//             const searchDate = getFormattedDate(date);

//             let query = '';
//             let params = [];

//             if (selectedDay && selectedMood) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, selectedMood, searchDate];
//             } else if (selectedDay) {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.day_id = ? AND d.date = ?
//                 `;
//                 params = [selectedDay, searchDate];
//             } else {
//                 query = `
//                     SELECT q.*, s.EnglishName, s.ArabicName 
//                     FROM daily_ayat_history d
//                     JOIN Quran q ON d.ayah_id = q.ayah_Id AND d.surah_id = q.surah_id
//                     JOIN Surahs s ON d.surah_id = s.surah_id
//                     WHERE d.mood_id = ? AND d.date = ?
//                 `;
//                 params = [selectedMood, searchDate];
//             }

//             return new Promise((resolve) => {
//                 db.transaction(tx => {
//                     tx.executeSql(
//                         query,
//                         params,
//                         (_, { rows }) => {
//                             if (rows.length > 0) {
//                                 resolve(rows.raw()[0]);
//                             } else {
//                                 resolve(null);
//                             }
//                         },
//                         (_, error) => {
//                             console.log('Error checking for existing ayat:', error);
//                             resolve(null);
//                         }
//                     );
//                 });
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             return null;
//         }
//     };

//     const saveAyatToHistory = async (ayat, date) => {
//         if (!selectedDay && !selectedMood) return;

//         try {
//             const db = await openDB();
//             const saveDate = getFormattedDate(date);

//             let deleteQuery = '';
//             let deleteParams = [];

//             if (selectedDay && selectedMood) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                 deleteParams = [selectedDay, selectedMood, saveDate];
//             } else if (selectedDay) {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                 deleteParams = [selectedDay, saveDate];
//             } else {
//                 deleteQuery = 'DELETE FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                 deleteParams = [selectedMood, saveDate];
//             }

//             const insertQuery = `
//                 INSERT INTO daily_ayat_history (day_id, mood_id, surah_id, ayah_id, date)
//                 VALUES (?, ?, ?, ?, ?)
//             `;
//             const insertParams = [selectedDay, selectedMood, ayat.surah_id, ayat.ayah_Id, saveDate];

//             db.transaction(tx => {
//                 tx.executeSql(
//                     deleteQuery,
//                     deleteParams,
//                     () => {
//                         tx.executeSql(
//                             insertQuery,
//                             insertParams,
//                             () => console.log('Ayat saved to history'),
//                             (_, error) => console.log('Error saving ayat to history:', error)
//                         );
//                     },
//                     (_, error) => console.log('Error deleting old history:', error)
//                 );
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//         }
//     };

//     const handleDayChange = (itemValue) => {
//         setSelectedDay(itemValue);
//         const selected = days.find(day => day.day_id === itemValue);
//         setSelectedDayLabel(selected ? selected.name : 'Select a day');
//         setAyat(null); // Clear ayat when day changes
//     };

//     const handleMoodChange = (itemValue) => {
//         setSelectedMood(itemValue);
//         const selected = moods.find(mood => mood.mood_id === itemValue);
//         setSelectedMoodLabel(selected ? selected.name : 'Select a mood');
//         setAyat(null); // Clear ayat when mood changes
//     };

//     const handleSurahChange = (itemValue) => {
//         setSelectedSurah(itemValue);
//         const selected = surahs.find(surah => surah.surah_id === itemValue);
//         setSelectedSurahLabel(selected ? `${selected.EnglishName} (${selected.ArabicName})` : 'Select a surah');
//         setAyat(null); // Clear ayat when surah changes
//     };

//     const handleDateChange = (event, date) => {
//         setShowDatePicker(false);
//         if (date) {
//             setSelectedDate(date);
//             setIsHistoricalView(true);
//         }
//     };

//     const showDatepicker = () => {
//         setShowDatePicker(true);
//     };

//     const resetToToday = () => {
//         setSelectedDate(new Date());
//         setIsHistoricalView(false);
//         setAyat(null);
//     };

//     const getRandomAyatFromSurah = async () => {
//         if (!selectedSurah) {
//             Alert.alert('Error', 'Please select a Surah');
//             return null;
//         }

//         try {
//             const db = await openDB();

//             return new Promise((resolve) => {
//                 // First, get the total number of ayahs in the selected surah
//                 db.transaction(tx => {
//                     tx.executeSql(
//                         'SELECT COUNT(*) as total FROM Quran WHERE surah_id = ?',
//                         [selectedSurah],
//                         (_, { rows }) => {
//                             const totalAyahs = rows.raw()[0].total;

//                             // Get a random ayah from the surah
//                             tx.executeSql(
//                                 `SELECT q.*, s.EnglishName, s.ArabicName 
//                                  FROM Quran q
//                                  JOIN Surahs s ON q.surah_id = s.surah_id
//                                  WHERE q.surah_id = ? 
//                                  ORDER BY RANDOM() LIMIT 1`,
//                                 [selectedSurah],
//                                 (_, { rows }) => {
//                                     if (rows.length > 0) {
//                                         resolve(rows.raw()[0]);
//                                     } else {
//                                         resolve(null);
//                                     }
//                                 },
//                                 (_, error) => {
//                                     console.log('Error fetching random ayat:', error);
//                                     resolve(null);
//                                 }
//                             );
//                         },
//                         (_, error) => {
//                             console.log('Error counting ayahs:', error);
//                             resolve(null);
//                         }
//                     );
//                 });
//             });
//         } catch (error) {
//             console.error('Database error:', error);
//             return null;
//         }
//     };

//     const handleShowAyat = async () => {
//         setLoading(true);
//         setAyat(null);
//         stopAudio();

//         try {
//             let selectedAyat = null;

//             if (mode === 'surah') {
//                 // Get random ayat from selected surah
//                 selectedAyat = await getRandomAyatFromSurah();
//             } else {
//                 // Original logic for daily ayat based on day/mood
//                 if (!selectedDay && !selectedMood) {
//                     Alert.alert('Error', 'Please select at least a day or a mood');
//                     setLoading(false);
//                     return;
//                 }

//                 const existingAyat = await checkForExistingAyat(selectedDate);

//                 if (existingAyat) {
//                     selectedAyat = existingAyat;
//                 } else if (isHistoricalView) {
//                     setLoading(false);
//                     Alert.alert('Info', `No ayat found for ${getFormattedDate(selectedDate)} with the selected criteria`);
//                     return;
//                 } else {
//                     const db = await openDB();

//                     let query = '';
//                     let params = [];

//                     if (selectedDay && selectedMood) {
//                         query = `
//                             SELECT q.*, s.EnglishName, s.ArabicName 
//                             FROM Quran q
//                             JOIN Surahs s ON q.surah_id = s.surah_id
//                             JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                                 AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                             WHERE m.day_id = ? AND m.mood_id = ?
//                             ORDER BY RANDOM() LIMIT 1
//                         `;
//                         params = [selectedDay, selectedMood];
//                     } else if (selectedDay) {
//                         query = `
//                             SELECT q.*, s.EnglishName, s.ArabicName 
//                             FROM Quran q
//                             JOIN Surahs s ON q.surah_id = s.surah_id
//                             JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                                 AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                             WHERE m.day_id = ?
//                             ORDER BY RANDOM() LIMIT 1
//                         `;
//                         params = [selectedDay];
//                     } else {
//                         query = `
//                             SELECT q.*, s.EnglishName, s.ArabicName 
//                             FROM Quran q
//                             JOIN Surahs s ON q.surah_id = s.surah_id
//                             JOIN mood_day_custom_map m ON q.surah_id = m.surah_id 
//                                 AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//                             WHERE m.mood_id = ?
//                             ORDER BY RANDOM() LIMIT 1
//                         `;
//                         params = [selectedMood];
//                     }

//                     selectedAyat = await new Promise((resolve) => {
//                         db.transaction(tx => {
//                             tx.executeSql(
//                                 query,
//                                 params,
//                                 (_, { rows }) => {
//                                     if (rows.length > 0) {
//                                         resolve(rows.raw()[0]);
//                                     } else {
//                                         resolve(null);
//                                     }
//                                 },
//                                 (_, error) => {
//                                     console.log('Error fetching ayat:', error);
//                                     resolve(null);
//                                 }
//                             );
//                         });
//                     });

//                     if (selectedAyat) {
//                         saveAyatToHistory(selectedAyat, selectedDate);
//                     }
//                 }
//             }

//             setLoading(false);

//             if (selectedAyat) {
//                 setAyat(selectedAyat);

//                 if (autoPlayEnabled && !isHistoricalView) {
//                     setTimeout(() => {
//                         playAyahAudio(selectedAyat);
//                     }, 500);
//                 }
//             } else {
//                 Alert.alert('Info', 'No ayat found for the selected criteria');
//             }
//         } catch (error) {
//             setLoading(false);
//             console.error('Database error:', error);
//         }
//     };

//     const playAyahAudio = async (currentAyat) => {
//         if (!currentAyat || !ayat || currentAyat.ayah_Id !== ayat.ayah_Id || currentAyat.surah_id !== ayat.surah_id) {
//             console.log('Ayat mismatch or no ayat, skipping audio playback');
//             return;
//         }

//         const surahId = String(currentAyat.surah_id).padStart(3, '0');
//         const ayahLoc = String(currentAyat.ayah_location).padStart(3, '0');
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         stopAudio();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert('Error', 'Audio load failed: ' + error.message);
//                 return;
//             }

//             newSound.play(async (success) => {
//                 if (success) {
//                     console.log('Playback finished');

//                     try {
//                         const db = await openDB();
//                         const currentDate = getFormattedDate(selectedDate);

//                         let query = '';
//                         let params = [];

//                         if (selectedDay && selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND mood_id = ? AND date = ?';
//                             params = [selectedDay, selectedMood, currentDate];
//                         } else if (selectedDay) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE day_id = ? AND date = ?';
//                             params = [selectedDay, currentDate];
//                         } else if (selectedMood) {
//                             query = 'SELECT id FROM daily_ayat_history WHERE mood_id = ? AND date = ?';
//                             params = [selectedMood, currentDate];
//                         } else {
//                             console.log('No day or mood selected, skipping play recording');
//                             return;
//                         }

//                         db.transaction(tx => {
//                             tx.executeSql(
//                                 query,
//                                 params,
//                                 (_, { rows }) => {
//                                     if (rows.length > 0) {
//                                         const historyId = rows.raw()[0].id;
//                                         tx.executeSql(
//                                             'INSERT INTO ayat_play_history (history_id) VALUES (?)',
//                                             [historyId],
//                                             () => console.log('Play recorded successfully'),
//                                             (_, error) => console.log('Error recording play:', error)
//                                         );
//                                     } else {
//                                         console.log('No history entry found for recording play');
//                                     }
//                                 },
//                                 (_, error) => console.log('Error finding history:', error)
//                             );
//                         });
//                     } catch (error) {
//                         console.error('Database error:', error);
//                     }
//                 } else {
//                     Alert.alert('Error', 'Audio playback failed');
//                 }
//                 newSound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setSound(null);
//                 setIsPlaying(false);
//             });
//         }
//     };

//     const handleMoodPrediction = async () => {
//         const value = parseInt(inputValue);

//         if (!inputValue || isNaN(value) || value < 1 || value > 5) {
//             Alert.alert("Error", "Please select a number between 1 to 5.");
//             return;
//         }

//         const updatedAnswers = [...answers, value];
//         setAnswers(updatedAnswers);
//         setInputValue("");

//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             try {
//                 const response = await fetch("http://192.168.0.110:5000/predict", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ answers: updatedAnswers }),
//                 });

//                 const data = await response.json();
//                 const mood = data.mood;
//                 setPredictedMood(mood);

//                 const predictedMoodObj = moods.find(m => m.name === mood);
//                 if (predictedMoodObj) {
//                     setSelectedMood(predictedMoodObj.mood_id);
//                     setSelectedMoodLabel(`${mood} ${moodEmojis[mood] || "🧠"}`);
//                 }

//                 setTimeout(() => {
//                     setShowMoodModal(false);
//                     resetMoodPrediction();
//                 }, 1500);
//             } catch (error) {
//                 setPredictedMood("Server error. Try again later ❌");
//             }
//         }
//     };

//     const resetMoodPrediction = () => {
//         setCurrentQuestionIndex(0);
//         setAnswers([]);
//         setInputValue("");
//         setPredictedMood(null);
//     };

//     const openMoodModal = () => {
//         resetMoodPrediction();
//         setShowMoodModal(true);
//     };

//     const toggleMode = () => {
//         setMode(mode === 'daily' ? 'surah' : 'daily');
//         setAyat(null);
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => {
//                     stopAudio();
//                     navigation.goBack();
//                 }}>
//                     <Text style={styles.backButton}>←</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Daily Quran Reciter</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('AutoPlay')}>
//                     <Text style={styles.settingsButton}>⚙️</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Mode Toggle */}
//             <View style={styles.modeToggle}>
//                 <TouchableOpacity
//                     style={[styles.modeButton, mode === 'daily' && styles.activeMode]}
//                     onPress={() => setMode('daily')}
//                 >
//                     <Text style={[styles.modeText, mode === 'daily' && styles.activeModeText]}>Daily Ayat</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.modeButton, mode === 'surah' && styles.activeMode]}
//                     onPress={() => setMode('surah')}
//                 >
//                     <Text style={[styles.modeText, mode === 'surah' && styles.activeModeText]}>Surah Ayat</Text>
//                 </TouchableOpacity>
//             </View>

//             {mode === 'daily' ? (
//                 <>
//                     {/* Date Selection Section */}
//                     <Text style={styles.label}>Select Date:</Text>
//                     <View style={styles.dateSection}>
//                         <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
//                             <Text style={styles.dateButtonText}>
//                                 {selectedDate.toDateString()}
//                             </Text>
//                         </TouchableOpacity>
//                         {isHistoricalView && (
//                             <TouchableOpacity onPress={resetToToday} style={styles.todayButton}>
//                                 <Text style={styles.todayButtonText}>Show Today</Text>
//                             </TouchableOpacity>
//                         )}
//                         {showDatePicker && (
//                             <DateTimePicker
//                                 value={selectedDate}
//                                 mode="date"
//                                 display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                                 onChange={handleDateChange}
//                                 maximumDate={new Date()}
//                             />
//                         )}
//                     </View>

//                     <Text style={styles.label}>Today is:</Text>
//                     <View style={styles.pickerContainer}>
//                         <Picker
//                             selectedValue={selectedDay}
//                             onValueChange={handleDayChange}
//                             style={styles.picker}
//                             dropdownIconColor="#000"
//                         >
//                             <Picker.Item label="Select a day" value={null} />
//                             {days.map(day => (
//                                 <Picker.Item
//                                     key={day.day_id}
//                                     label={day.name}
//                                     value={day.day_id}
//                                     color={selectedDay === day.day_id ? '#000' : '#666'}
//                                 />
//                             ))}
//                         </Picker>
//                         <Text style={styles.selectedValue}>{selectedDayLabel}</Text>
//                     </View>

//                     <Text style={styles.label}>I'm feeling:</Text>
//                     <View style={styles.pickerContainer}>
//                         <Picker
//                             selectedValue={selectedMood}
//                             onValueChange={handleMoodChange}
//                             style={styles.picker}
//                             dropdownIconColor="#000"
//                         >
//                             <Picker.Item label="Select a mood" value={null} />
//                             {moods.map(mood => (
//                                 <Picker.Item
//                                     key={mood.mood_id}
//                                     label={mood.name}
//                                     value={mood.mood_id}
//                                     color={selectedMood === mood.mood_id ? '#000' : '#666'}
//                                 />
//                             ))}
//                         </Picker>
//                         <Text style={styles.selectedValue}>{selectedMoodLabel}</Text>
//                     </View>

//                     <TouchableOpacity style={styles.aiButton} onPress={openMoodModal}>
//                         <Text style={styles.aiButtonText}>🤖 AI Mood Prediction</Text>
//                     </TouchableOpacity>
//                 </>
//             ) : (
//                 <>
//                     <Text style={styles.label}>Select Surah:</Text>
//                     <View style={styles.pickerContainer}>
//                         <Picker
//                             selectedValue={selectedSurah}
//                             onValueChange={handleSurahChange}
//                             style={styles.picker}
//                             dropdownIconColor="#000"
//                         >
//                             <Picker.Item label="Select a surah" value={null} />
//                             {surahs.map(surah => (
//                                 <Picker.Item
//                                     key={surah.surah_id}
//                                     label={`${surah.surah_id}. ${surah.EnglishName} (${surah.ArabicName})`}
//                                     value={surah.surah_id}
//                                     color={selectedSurah === surah.surah_id ? '#000' : '#666'}
//                                 />
//                             ))}
//                         </Picker>
//                         <Text style={styles.selectedValue}>{selectedSurahLabel}</Text>
//                     </View>
//                 </>
//             )}

//             <TouchableOpacity style={styles.button} onPress={handleShowAyat} disabled={loading}>
//                 <Text style={styles.buttonText}>
//                     {loading ? 'Loading...' : mode === 'daily' ? 'Show Ayat' : 'Show Random Ayat'}
//                 </Text>
//             </TouchableOpacity>

//             {ayat && (
//                 <View style={styles.ayatCard}>
//                     <View style={styles.ayatHeader}>
//                         <Text style={styles.surahName}>
//                             {ayat.EnglishName} ({ayat.ArabicName})
//                         </Text>
//                         <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
//                             <Text style={styles.emojiIcon}>
//                                 {isFavorite ? '❤️' : '🤍'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>

//                     {isHistoricalView && mode === 'daily' && (
//                         <Text style={styles.historyDate}>
//                             From: {getFormattedDate(selectedDate)}
//                         </Text>
//                     )}

//                     <Text style={styles.arabicText}>{ayat.Arabic}</Text>

//                     {showUrdu && (
//                         <>
//                             <Text style={styles.translationLabel}>Urdu Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.Urdu}</Text>
//                         </>
//                     )}

//                     {showEnglish && (
//                         <>
//                             <Text style={styles.translationLabel}>English Translation:</Text>
//                             <Text style={styles.translationText}>{ayat.English}</Text>
//                         </>
//                     )}

//                     <Text style={styles.ayahInfo}>Ayah {ayat.ayah_location}</Text>

//                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
//                         {!isPlaying ? (
//                             <TouchableOpacity onPress={() => playAyahAudio(ayat)} style={styles.audioButton}>
//                                 <Text style={styles.audioButtonText}>▶️ Play Ayat</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity onPress={stopAudio} style={[styles.audioButton, { backgroundColor: '#e74c3c' }]}>
//                                 <Text style={styles.audioButtonText}>⏹ Stop</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>
//             )}

//             <Modal
//                 visible={showMoodModal}
//                 animationType="slide"
//                 transparent={false}
//                 onRequestClose={() => setShowMoodModal(false)}
//             >
//                 <View style={{
//                     padding: 25,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>
//                     <Text style={{
//                         color: '#000',
//                         fontSize: 24,
//                         fontWeight: 'bold'
//                     }}>🤖 AI MOOD PREDICTION</Text>
//                 </View>
//                 <SafeAreaView style={styles.modalContainer}>
//                     {predictedMood ? (
//                         <View style={styles.card}>
//                             <Text style={styles.resultTitle}>Your Predicted Mood</Text>
//                             <Text style={styles.resultText}>
//                                 {predictedMood} {moodEmojis[predictedMood] || "🧠"}
//                             </Text>
//                             <TouchableOpacity
//                                 style={styles.modalButton}
//                                 onPress={() => setShowMoodModal(false)}
//                             >
//                                 <Text style={styles.modalButtonText}>OK</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View style={styles.card}>
//                             <Text style={styles.counter}>
//                                 Question {currentQuestionIndex + 1}/{questions.length}
//                             </Text>
//                             <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
//                             <View style={styles.radioContainer}>
//                                 {[1, 2, 3, 4, 5].map((value) => (
//                                     <TouchableOpacity
//                                         key={value}
//                                         style={[
//                                             styles.radioButton,
//                                             inputValue === value.toString() && styles.radioButtonSelected,
//                                         ]}
//                                         onPress={() => setInputValue(value.toString())}
//                                     >
//                                         <Text style={[
//                                             styles.radioText,
//                                             inputValue === value.toString() && styles.radioTextSelected,
//                                         ]}>
//                                             {value}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                             <TouchableOpacity style={styles.modalButton} onPress={handleMoodPrediction}>
//                                 <Text style={styles.modalButtonText}>
//                                     {currentQuestionIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </SafeAreaView>
//             </Modal>
//         </ScrollView>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: '#F8EDF9',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     backButton: {
//         fontSize: 24,
//         padding: 10,
//         color: '#000',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#000',
//         textAlign: 'center',
//         flex: 1,
//     },
//     settingsButton: {
//         fontSize: 24,
//         padding: 10,
//     },
//     dateSection: {
//         marginBottom: 20,
//         alignItems: 'center',
//     },
//     dateButton: {
//         backgroundColor: '#fff',
//         padding: 15,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 0,
//     },
//     dateButtonText: {
//         fontSize: 16,
//         color: '#000',
//         fontWeight: '500',
//     },
//     todayButton: {
//         backgroundColor: '#3498db',
//         padding: 10,
//         borderRadius: 5,
//     },
//     todayButtonText: {
//         color: 'white',
//         fontSize: 14,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#000',
//         fontWeight: '500',
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#bdc3c7',
//         borderRadius: 5,
//         marginBottom: 20,
//         backgroundColor: 'white',
//         position: 'relative',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         opacity: 0,
//     },
//     selectedValue: {
//         position: 'absolute',
//         left: 15,
//         top: 15,
//         fontSize: 16,
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#C5A4F7',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 30,
//         elevation: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     aiButton: {
//         backgroundColor: '#4CAF50',
//         padding: 15,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 15,
//         elevation: 5,
//     },
//     aiButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     ayatCard: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//     },
//     ayatHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     surahName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         flex: 1,
//     },
//     historyDate: {
//         fontSize: 14,
//         color: '#7f8c8d',
//         marginBottom: 10,
//         fontStyle: 'italic',
//     },
//     arabicText: {
//         fontSize: 22,
//         textAlign: 'right',
//         marginBottom: 20,
//         lineHeight: 35,
//         color: '#34495e',
//     },
//     translationLabel: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//         color: '#7f8c8d',
//     },
//     translationText: {
//         fontSize: 16,
//         marginBottom: 10,
//         lineHeight: 24,
//         color: '#34495e',
//     },
//     ayahInfo: {
//         fontSize: 14,
//         textAlign: 'right',
//         color: '#7f8c8d',
//         marginTop: 10,
//     },
//     audioButton: {
//         backgroundColor: '#2ecc71',
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         borderRadius: 25,
//         elevation: 3,
//     },
//     audioButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         backgroundColor: '#F8EDF9',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 25,
//         elevation: 6,
//         alignItems: 'center',
//     },
//     counter: {
//         fontSize: 14,
//         color: '#888',
//         alignSelf: 'flex-end',
//     },
//     question: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginVertical: 20,
//     },
//     radioButton: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         borderWidth: 2,
//         borderColor: '#aaa',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//     },
//     radioButtonSelected: {
//         borderColor: '#C5A4F7',
//         backgroundColor: '#C5A4F7',
//     },
//     radioText: {
//         fontSize: 18,
//         color: '#333',
//     },
//     radioTextSelected: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     modalButton: {
//         marginTop: 25,
//         backgroundColor: '#C5A4F7',
//         paddingVertical: 12,
//         paddingHorizontal: 35,
//         borderRadius: 30,
//         elevation: 4,
//     },
//     modalButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     resultTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: '#0056b3',
//     },
//     resultText: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#0f5132',
//     },
//     favoriteButton: {
//         padding: 5,
//     },
//     emojiIcon: {
//         fontSize: 24,
//     },
// });

// export default ShowAyat;