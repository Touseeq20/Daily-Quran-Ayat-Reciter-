// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, ScrollView } from 'react-native';
// // import SQLite from 'react-native-sqlite-storage';

// // function test() {
// //   const [surahs, setSurahs] = useState([]);
// //   const [errorMsg, setErrorMsg] = useState('');

// //   useEffect(() => {
// //     const db = SQLite.openDatabase(
// //       {
// //         name: 'QuranDB.sqlite',
// //         location: 'default',
// //         createFromLocation: '~QuranDB.sqlite',
// //       },
// //       () => {
// //         db.transaction(tx => {
// //           tx.executeSql(
// //             'SELECT * FROM Surahs',
// //             [],
// //             (tx, results) => {
// //               let temp = [];
// //               for (let i = 0; i < results.rows.length; ++i) {
// //                 temp.push(results.rows.item(i));
// //               }
// //               setSurahs(temp);
// //             },
// //             (tx, error) => {
// //               setErrorMsg('Query Error: ' + error.message);
// //             }
// //           );
// //         });
// //       },
// //       error => {
// //         setErrorMsg('DB Error: ' + error.message);
// //       }
// //     );
// //   }, []);

// //   console.log("Welcome");

// //   return (
// //     <ScrollView>
      
    
// //     <View style={styles.container}>
// //       <Text style={{color: 'white'}}>Surahs from QuranDB.sqlite:</Text>
// //       {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
// //       {surahs.length === 0 && !errorMsg ? (
// //         <Text>No data found.</Text>
// //       ) : (
// //         surahs.map((item, idx) => (
// //           <Text key={idx}>
// //             {item.EnglishName} - {item.ArabicName}
// //           </Text>
// //         ))
// //       )}
// //     </View>

// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 16,
// //     backgroundColor:'white'
// //   },
// // });

// // export default test;

// // // import React, { useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   ScrollView,
// // //   PermissionsAndroid,
// // // } from 'react-native';
// // // import { Picker } from '@react-native-picker/picker';
// // // import Sound from 'react-native-sound';

// // // const RandomAyatScreen = () => {
// // //   const [selectedDay, setSelectedDay] = useState('Monday');
// // //   const [selectedMood, setSelectedMood] = useState('Happy');
// // //   const [ayat, setAyat] = useState(null);

// // //   const getRandomAyat = () => {
// // //     const dummyAyat = {
// // //       arabic: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
// // //       urdu: 'اور جو کتاب (اے محمد ﷺ) تم پر نازل ہوئی اور جو کتابیں تم سے پہلے (پیغمبروں پر) نازل ہوئیں سب پر ایمان لاتے ہیں اور آخرت کا یقین رکھتے ہیں',
// // //       english:
// // //         'Who have faith in what has been revealed to you and others before you and have strong faith in the life hereafter.',
// // //     };
// // //     setAyat(dummyAyat);
// // //   };

// // //   const playAudio = async () => {
// // //     const granted = await PermissionsAndroid.request(
// // //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
// // //     );
// // //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// // //       const sound = new Sound('ayat.mp3', Sound.MAIN_BUNDLE, (error) => {
// // //         if (error) {
// // //           console.log('Failed to load the sound', error);
// // //           return;
// // //         }
// // //         sound.play();
// // //       });
// // //     } else {
// // //       console.log('Permission denied');
// // //     }
// // //   };

// // //   return (
// // //     <ScrollView style={styles.container}>
// // //       <Text style={styles.title}>Day + Mood Random Ayat</Text>

// // //       <Picker
// // //         selectedValue={selectedDay}
// // //         onValueChange={(itemValue) => setSelectedDay(itemValue)}
// // //         style={styles.picker}
// // //         itemStyle={styles.pickerItem}>
// // //         <Picker.Item label="Monday" value="Monday" />
// // //         <Picker.Item label="Tuesday" value="Tuesday" />
// // //         <Picker.Item label="Wednesday" value="Wednesday" />
// // //         <Picker.Item label="Thursday" value="Thursday" />
// // //         <Picker.Item label="Friday" value="Friday" />
// // //         <Picker.Item label="Saturday" value="Saturday" />
// // //         <Picker.Item label="Sunday" value="Sunday" />
// // //       </Picker>

// // //       <Picker
// // //         selectedValue={selectedMood}
// // //         onValueChange={(itemValue) => setSelectedMood(itemValue)}
// // //         style={styles.picker}
// // //         itemStyle={styles.pickerItem}>
// // //         <Picker.Item label="Happy" value="Happy" />
// // //         <Picker.Item label="Sad" value="Sad" />
// // //         <Picker.Item label="Stressed" value="Stressed" />
// // //         <Picker.Item label="Hopeful" value="Hopeful" />
// // //       </Picker>

// // //       <TouchableOpacity style={styles.button} onPress={getRandomAyat}>
// // //         <Text style={styles.buttonText}>Get Random Ayat</Text>
// // //       </TouchableOpacity>

// // //       {ayat && (
// // //         <View style={styles.card}>
// // //           <Text style={styles.arabicText}>{ayat.arabic}</Text>
// // //           <Text style={styles.urduText}>Urdu: {ayat.urdu}</Text>
// // //           <Text style={styles.englishText}>English: {ayat.english}</Text>

// // //           <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
// // //             <Text style={styles.audioButtonText}>▶ Play Audio</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       )}
// // //     </ScrollView>
// // //   );
// // // };

// // // export default RandomAyatScreen;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 20,
// // //     backgroundColor: '#F8EDF9',
// // //   },
// // //   title: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     marginBottom: 20,
// // //   },
// // //   picker: {
// // //     backgroundColor: '#fff',
// // //     marginVertical: 10,
// // //     borderRadius: 8,
// // //     color: '#000', // shows black selected value
// // //   },
// // //   pickerItem: {
// // //     color: '#000', // black text for dropdown options
// // //     fontSize: 16,
// // //   },
// // //   button: {
// // //     backgroundColor: '#C5A4F7',
// // //     padding: 12,
// // //     alignItems: 'center',
// // //     borderRadius: 10,
// // //     marginTop: 15,
// // //   },
// // //   buttonText: {
// // //     color: '#fff',
// // //     fontWeight: '600',
// // //     fontSize: 16,
// // //   },
// // //   card: {
// // //     backgroundColor: '#fff',
// // //     padding: 15,
// // //     marginTop: 20,
// // //     borderRadius: 12,
// // //     shadowColor: '#000',
// // //     elevation: 4,
// // //   },
// // //   arabicText: {
// // //     fontSize: 20,
// // //     textAlign: 'right',
// // //     marginBottom: 10,
// // //   },
// // //   urduText: {
// // //     fontSize: 16,
// // //     marginBottom: 10,
// // //     textAlign: 'right',
// // //     writingDirection: 'rtl',
// // //   },
// // //   englishText: {
// // //     fontSize: 16,
// // //     fontStyle: 'italic',
// // //   },
// // //   audioButton: {
// // //     marginTop: 15,
// // //     alignItems: 'center',
// // //   },
// // //   audioButtonText: {
// // //     color: '#6A4BBC',
// // //     fontWeight: '600',
// // //     fontSize: 16,
// // //   },
// // // });

// // import React from 'react';
// // import { SafeAreaView, StatusBar } from 'react-native';
// // import MoodScreen from './screens/MoodScreen'; // Make sure path is correct

// // const App = () => {
// //   return (
// //     <SafeAreaView style={{ flex: 1 }}>
// //       <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
// //       <MoodScreen />
// //     </SafeAreaView>
// //   );
// // };

// // export default App;

// /////////////////////////////////////////////////

// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // const App = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Daily Quran Reciter</Text>
// //       <TouchableOpacity style={styles.button}>
// //         <Text style={styles.buttonText}>Continue</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8EDF9', // light purple background from new theme
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20, // added padding from new theme
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 20, // spacing below the title
// //     color: '#000', // black text to match theme
// //   },
// //   button: {
// //     backgroundColor: '#C5A4F7', // purple button color from new theme
// //     paddingVertical: 12, // adjusted padding to match new theme
// //     paddingHorizontal: 40,
// //     borderRadius: 10, // updated to match new theme's button radius
// //     elevation: 4, // adjusted shadow for Android to match new theme
// //   },
// //   buttonText: {
// //     color: '#fff', // white text from new theme
// //     fontSize: 16, // adjusted to match new theme
// //     fontWeight: '600', // updated to match new theme
// //   },
// // });

// // export default App;

// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // const App = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Dashboard</Text>
// //       <TouchableOpacity style={styles.button}>
// //         <Text style={styles.buttonText}>Mood-Based Ayats</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.button}>
// //         <Text style={styles.buttonText}>Day-Wise Ayats</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.button}>
// //         <Text style={styles.buttonText}>Settings</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8EDF9', // light green background from old theme
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //   },
// //   title: {
// //     marginBottom: 80,
    
// //     fontSize: 30,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     color: '#000',
// //   },
// //   button: {
// //     backgroundColor: '#C5A4F7', // darker green from old theme
// //     paddingVertical: 14,
// //     paddingHorizontal: 40,
// //     borderRadius: 30,
// //     elevation: 5,
// //     marginVertical: 10, // spacing between buttons
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default App;

// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   StyleSheet,
// //   TouchableOpacity,
// // } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import Icon from 'react-native-vector-icons/MaterialIcons';

// // const App = () => {
// //   const [selectedday, setSelectedday] = useState('Monday');

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.title}>Day-Based Ayats</Text>

// //       <Text style={styles.label}>Select Day</Text>
// //       <View style={styles.pickerWrapper}>
// //         <Picker
// //           selectedValue={selectedday}
// //           onValueChange={(itemValue) => setSelectedday(itemValue)}
// //           style={styles.picker}
// //           dropdownIconColor="#C5A4F7"
// //         >
// //           <Picker.Item label="Monday" value="Monday" />
// //           <Picker.Item label="Tuesday" value="Tuesday" />
// //           <Picker.Item label="Wednesday" value="Wednesday" />
// //           <Picker.Item label="Thursday" value="Thursday" />
// //           <Picker.Item label="Friday" value="Friday" />
// //           <Picker.Item label="Saturday" value="Saturday" />
// //           <Picker.Item label="Sunday" value="Sunday" />
// //         </Picker>
// //       </View>

// //       <Text style={styles.selecteddayText}>Selected: {selectedday}</Text>

// //       <Text style={styles.surahTitle}>Al-Baqarah (The Cow)</Text>

// //       <View style={styles.card}>
// //         <Text style={styles.arabicText}>
// //           قَالَ يَا آدَمُ أَنبِئْهُم بِأَسْمَائِهِمْ فَلَمَّا أَنبَأَهُم
// //           بِأَسْمَائِهِمْ قَالَ أَلَمْ أَقُل لَّكُمْ إِنِّي أَعْلَمُ غَيْبَ
// //           السَّمَاوَاتِ وَالْأَرْضِ وَأَعْلَمُ مَا تُبْدُونَ وَمَا كُنتُمْ
// //           تَكْتُمُونَ
// //         </Text>

// //         <Text style={styles.urduText}>
// //           خدا نے (آدم کو) حکم دیا کہ آدم! ان کو ان (جنوں) کے نام بتاؤ۔ جب آدمؑ
// //           نے ان کے نام بتائے تو (فرشتوں سے) فرمایا کیا میں نے تم سے نہیں کہا تھا
// //           کہ میں آسمانوں اور زمین کی سب پوشیدہ باتیں جانتا ہوں؟ اور جو تم ظاہر
// //           کرتے ہو اور جو چھپاتے ہو وہ مجھ کو معلوم ہے۔
// //         </Text>

// //         <Text style={styles.englishText}>
// //           English: The Lord said to Adam, "Tell the names of the beings to the
// //           angels." When Adam said their names, the Lord said, "Did I not tell
// //           you (angels) that I know the secrets of the heavens and the earth and
// //           all that you reveal or hide?"
// //         </Text>

// //         <TouchableOpacity style={styles.playButton}>
// //           <Icon name="play-arrow" size={30} color="white" />
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8EDF9', // theme background
// //     padding: 16,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     marginBottom: 12,
// //     textAlign: 'center',
// //     color: '#000',
// //   },
// //   label: {
// //     fontSize: 14,
// //     marginBottom: 4,
// //     color: '#555',
// //   },
// //   pickerWrapper: {
// //     borderWidth: 1,
// //     borderColor: '#C5A4F7',
// //     borderRadius: 6,
// //     marginBottom: 10,
// //     overflow: 'hidden',
// //   },
// //   picker: {
// //     height: 50,
// //     width: '100%',
// //     color: '#000',
// //   },
// //   selectedMoodText: {
// //     fontSize: 14,
// //     marginBottom: 16,
// //     color: '#222',
// //   },
// //   surahTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#7B4397', // deep purple
// //     textAlign: 'center',
// //     marginBottom: 12,
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     borderRadius: 8,
// //     padding: 16,
// //     elevation: 2,
// //     marginBottom: 32,
// //     position: 'relative',
// //   },
// //   arabicText: {
// //     fontSize: 22,
// //     textAlign: 'right',
// //     marginBottom: 12,
// //     fontFamily: 'serif',
// //     lineHeight: 34,
// //   },
// //   urduText: {
// //     fontSize: 16,
// //     marginBottom: 10,
// //     fontFamily: 'serif',
// //     textAlign: 'right',
// //     lineHeight: 26,
// //   },
// //   englishText: {
// //     fontSize: 14,
// //     color: '#333',
// //     fontStyle: 'italic',
// //     marginBottom: 40,
// //   },
// //   playButton: {
// //     backgroundColor: '#C5A4F7',
// //     width: 50,
// //     height: 50,
// //     borderRadius: 25,
// //     position: 'absolute',
// //     bottom: 12,
// //     right: 12,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     elevation: 4,
// //   },
// // });

// // export default App;

// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // const App = () => {
// //   return (
// //     <View style={styles.container}>
// //       {/* Header with centered title and right-aligned search */}
// //       <View style={styles.header}>
// //         <View style={styles.headerSpacer} /> {/* left spacer */}
// //         <Text style={styles.title}>Settings</Text>
// //         {/* <TouchableOpacity style={styles.searchButton}>
// //           <Text style={styles.searchIcon}>8</Text>
// //         </TouchableOpacity> */}
// //       </View>

// //       {/* Buttons shifted up */}
// //       <View style={styles.buttonContainer}>
// //         <TouchableOpacity style={styles.button}>
// //           <Text style={styles.buttonText}>Set Day-Mood-Based Ayats</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.button}>
// //           <Text style={styles.buttonText}>Set Day-Wise Ayats</Text>
// //         </TouchableOpacity>
// //         {/* <TouchableOpacity style={styles.button}>
// //           <Text style={styles.buttonText}>Settings</Text>
// //         </TouchableOpacity> */}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8EDF9',
// //     paddingTop: 50,
// //     paddingHorizontal: 20,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 50,
// //   },
// //   // headerSpacer: {
// //   //   width: 20, // same width as the icon for symmetry
// //   // },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#000',
// //     textAlign: 'center',
// //     flex: 1,
// //   },
// //   searchButton: {
// //     padding: 4,
// //   },
// //   searchIcon: {
// //     fontSize: 22,
// //   },
// //   buttonContainer: {
// //     flex: 1,
// //     justifyContent: 'flex-start', // shift buttons up
// //     alignItems: 'center',
// //     paddingTop: 40, // adjust to control vertical position
// //   },
// //   button: {
// //     backgroundColor: '#C5A4F7',
// //     paddingVertical: 14,
// //     paddingHorizontal: 40,
// //     borderRadius: 30,
// //     elevation: 5,
// //     marginVertical: 10,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default App;
// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   StyleSheet,
// //   ScrollView,
// //   TouchableOpacity,
// // } from 'react-native';

// // const SurahScreen = () => {
// //   const [searchText, setSearchText] = useState('');
// //   const [isPlaying, setIsPlaying] = useState(false);

// //   const toggleAudio = () => {
// //     setIsPlaying(!isPlaying);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         placeholder="Search Surah"
// //         style={styles.searchBar}
// //         value={searchText}
// //         onChangeText={setSearchText}
// //       />

// //       <ScrollView>
// //         {/* Surah Card */}
// //         <View style={styles.card}>
// //           <Text style={styles.arabicText}>
// //             بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الر تِلْكَ آيَاتُ الْكِتَابِ الْحَكِيمِ
// //           </Text>
// //           <Text style={styles.urduText}>
// //             آ۔ل۔ر۔ یہ بڑی دانائی کی کتاب کی آیتیں ہیں
// //           </Text>
// //           <Text style={styles.englishText}>
// //             Alif. Lam. Ra. These are the verses of the Book of wisdom.
// //           </Text>

// //           <View style={styles.audioButtonContainer}>
// //             <TouchableOpacity style={styles.audioButton} onPress={toggleAudio}>
// //               <Text style={styles.audioButtonText}>
// //                 {isPlaying ? 'Stop Audio' : 'Play Audio'}
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Second Ayah */}
// //         <View style={styles.card}>
// //           <Text style={styles.arabicText}>
// //             أَكَانَ لِلنَّاسِ عَجَبًا أَنْ أَوْحَيْنَا إِلَىٰ رَجُلٍ مِّنْهُمْ ...
// //           </Text>
// //           <Text style={styles.urduText}>
// //             کیا لوگوں کو تعجب ہوا کہ ہم نے ان ہی میں سے ایک مرد کو حکم بھیجا ...
// //           </Text>
// //           <Text style={styles.englishText}>
// //             Why should it seem strange to mankind that We sent revelations to a mortal among them...
// //           </Text>

// //           <View style={styles.audioButtonContainer}>
// //             <TouchableOpacity style={styles.audioButton} onPress={toggleAudio}>
// //               <Text style={styles.audioButtonText}>
// //                 {isPlaying ? 'Stop Audio' : 'Play Audio'}
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default SurahScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8EDF9',
// //     padding: 15,
// //   },
// //   searchBar: {
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     paddingHorizontal: 15,
// //     paddingVertical: 10,
// //     fontSize: 16,
// //     marginBottom: 10,
// //     elevation: 3,
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 15,
// //     marginVertical: 10,
// //     elevation: 4,
// //     shadowColor: '#000',
// //   },
// //   arabicText: {
// //     fontSize: 22,
// //     textAlign: 'right',
// //     marginBottom: 10,
// //     lineHeight: 32,
// //     color: '#000',
// //   },
// //   urduText: {
// //     fontSize: 16,
// //     textAlign: 'right',
// //     writingDirection: 'rtl',
// //     marginBottom: 8,
// //     color: '#333',
// //   },
// //   englishText: {
// //     fontSize: 15,
// //     fontStyle: 'italic',
// //     color: '#444',
// //   },
// //   audioButtonContainer: {
// //     marginTop: 10,
// //     flexDirection: 'row',
// //     justifyContent: 'flex-start',
// //   },
// //   audioButton: {
// //     backgroundColor: '#E0D7F9',
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     marginRight: 10,
// //   },
// //   audioButtonText: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     color: '#6A4BBC',
// //   },
// // });

// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // const App = () => {
// //   return (
// //     <View style={styles.container}>
// //       {/* Header with centered title and right-aligned search */}
// //       <View style={styles.header}>
// //         <View style={styles.headerSpacer} /> {/* left spacer */}
// //         <Text style={styles.title}>Dashboard</Text>
// //         <TouchableOpacity style={styles.searchButton}>
// //           <Text style={styles.searchIcon}>🔍</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Buttons shifted up */}
// //       <View style={styles.buttonContainer}>
// //         <TouchableOpacity style={styles.button}>
// //           <Text style={styles.buttonText}>Day-Mood-Based Ayats</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.button}>
// //           <Text style={styles.buttonText}>Day-Wise Ayats</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.button}>
// //           <Text style={styles.buttonText}>Settings</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8EDF9',
// //     paddingTop: 50,
// //     paddingHorizontal: 20,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 40,
// //   },
// //   headerSpacer: {
// //     width: 24, // same width as the icon for symmetry
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#000',
// //     textAlign: 'center',
// //     flex: 1,
// //   },
// //   searchButton: {
// //     padding: 4,
// //   },
// //   searchIcon: {
// //     fontSize: 22,
// //   },
// //   buttonContainer: {
// //     flex: 1,
// //     justifyContent: 'flex-start', // shift buttons up
// //     alignItems: 'center',
// //     paddingTop: 40, // adjust to control vertical position
// //   },
// //   button: {
// //     backgroundColor: '#C5A4F7',
// //     paddingVertical: 14,
// //     paddingHorizontal: 40,
// //     borderRadius: 30,
// //     elevation: 5,
// //     marginVertical: 10,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default App;

// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// // } from 'react-native';

// // const MoodBasedAyaatScreen = () => {
// //   const [fromAyah, setFromAyah] = useState('5');
// //   const [toAyah, setToAyah] = useState('15');

// //   const handleSave = () => {
// //     console.log({
// //       day: 'Monday',
// //       mood: 'Sad',
// //       surah: 'Al-Baqarah',
// //       fromAyah,
// //       toAyah,
// //     });
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.title}>Set Day-Mood-Based Ayats</Text>

// //       <Text style={styles.label}>Select Day</Text>
// //       <TextInput
// //         value="Monday"
// //         editable={false}
// //         style={styles.readOnlyInput}
// //       />

// //       <Text style={styles.label}>Select Mood</Text>
// //       <TextInput
// //         value="Sad"
// //         editable={false}
// //         style={styles.readOnlyInput}
// //       />

// //       <Text style={styles.label}>Select Surah</Text>
// //       <TextInput
// //         value="Al-Baqarah"
// //         editable={false}
// //         style={styles.readOnlyInput}
// //       />

// //       <Text style={styles.label}>From Ayah</Text>
// //       <TextInput
// //         keyboardType="numeric"
// //         value={fromAyah}
// //         onChangeText={setFromAyah}
// //         style={styles.input}
// //       />

// //       <Text style={styles.label}>To Ayah</Text>
// //       <TextInput
// //         keyboardType="numeric"
// //         value={toAyah}
// //         onChangeText={setToAyah}
// //         style={styles.input}
// //       />

// //       <TouchableOpacity style={styles.button} onPress={handleSave}>
// //         <Text style={styles.buttonText}>Save Setting</Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // };

// // export default MoodBasedAyaatScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8EDF9',
// //     paddingTop: 50,
// //     paddingHorizontal: 20,
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#333',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   label: {
// //     fontSize: 14,
// //     marginBottom: 6,
// //     marginTop: 12,
// //     color: '#333',
// //   },
// //   readOnlyInput: {
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     color: '#000',
// //     elevation: 2,
// //   },
// //   input: {
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     color: '#000',
// //     elevation: 2,
// //   },
// //   button: {
// //     backgroundColor: '#C5A4F7',
// //     paddingVertical: 14,
// //     paddingHorizontal: 40,
// //     borderRadius: 30,
// //     elevation: 5,
// //     marginVertical: 20,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// // });


// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import SplashScreen from './screens/SplashScreen';
// // import Dashboard from './screens/Dashboard';
// // import DayAyat from './screens/DayAyat';


// // const Stack = createNativeStackNavigator();

// // const App = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Splash">
// //         <Stack.Screen
// //           name="Splash"
// //           component={SplashScreen}
// //           options={{ headerShown: false }}
// //         />
// //         <Stack.Screen
// //           name="Dashboard"
// //           component={Dashboard}
// //           options={{ headerShown: false }}
// //         />
// //       </Stack.Navigator>

// //       <Stack.Screen
// //         name="DayAyat"
// //         component={DayAyat}
// //         options={{ title: 'Day-Based Ayat' }}
// //       />

// //     </NavigationContainer>
// //   );
// // };

// // export default App;
// ////////////////////////////////////////////

// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import SplashScreen from './screens/SplashScreen';
// // import Dashboard from './screens/Dashboard';
// // import ShowAyat from './screens/ShowAyat'; // Import ShowAyat
// // import Search from './screens/Search';
// // import Settings from './screens/Settings'; // Import Settings

// // const Stack = createNativeStackNavigator();

// // const App = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Splash">
// //         <Stack.Screen
// //           name="Splash"
// //           component={SplashScreen}
// //           options={{ headerShown: false }}
// //         />
// //         <Stack.Screen
// //           name="Dashboard"
// //           component={Dashboard}
// //           options={{ headerShown: false }}
// //         />
// //         <Stack.Screen
// //           name="ShowAyat" // Match this with the navigation name in Dashboard
// //           component={ShowAyat}
// //           options={{ headerShown: false }}
// //         />
// //         <Stack.Screen
// //           name="Search"
// //           component={Search}
// //           options={{ headerShown: false }}
// //         />

// //         <Stack.Screen
// //           name="Settings"
// //           component={Settings}
// //           options={{ headerShown: false }}
// //         />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // };

// // export default App;

// ///////////////////////////////////////////////////////////////////////

// // import React, { useState } from 'react';
// // import { View, Button, Alert, StyleSheet } from 'react-native';
// // import Sound from 'react-native-sound';

// // Sound.setCategory('Playback');

// // export default function App() {
// //   const [sound, setSound] = useState(null);

// //   const playSound = () => {
// //     // Agar pehle se sound loaded hai to release kar do
// //     if (sound) {
// //       sound.release();
// //     }

// //     const newSound = new Sound('a002004.mp3', Sound.MAIN_BUNDLE, (error) => {
// //       if (error) {
// //         Alert.alert('Error', 'Failed to load the sound: ' + error.message);
// //         return;
// //       }
// //       newSound.play((success) => {
// //         if (success) {
// //           console.log('Successfully finished playing');
// //         } else {
// //           Alert.alert('Error', 'Playback failed due to audio decoding errors');
// //         }
// //         newSound.release();
// //       });
// //     });

// //     setSound(newSound);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Button title="Play Audio" onPress={playSound} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     paddingHorizontal: 30,
// //   },
// // });


// // import React, { useEffect } from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import SplashScreen from './screens/SplashScreen';
// // import Dashboard from './screens/Dashboard';
// // import ShowAyat from './screens/ShowAyat';
// // import Search from './screens/Search';
// // //import Settings from './screens/Settings';
// // import Notification from './screens/Notification'
// // import openDB from './screens/DB';


// // const Stack = createNativeStackNavigator();

// // const App = () => {
// //   useEffect(() => {
// //     (async () => {
// //       await openDB(); // first run me DB copy ho jayegi
// //     })();
// //   }, []);

// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Splash">
// //         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
// //         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
// //         <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
// //         <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
// //         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
// //         {/* <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} /> */}
        
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // };

// // export default App;


// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import ShowAyat from './screens/ShowAyat';
// import Search from './screens/Search';
// import Notification from './screens/Notification';
// import NotificationDetails from './screens/NotificationDetails';
// import Settings from './screens/Settings'; // Import Settings
// import ViewSettings from './screens/ViewSettings'; // Import ViewSettings
// import Language from './screens/Language'; // Import Language
// import History from './screens/History'; // Import History
// import Favorites from './screens/Favorites'; // Import Favorites

// import openDB from './screens/DB';

// const Stack = createNativeStackNavigator();

// // ✅ Current Day ka day_id find karna
// const getCurrentDayId = async (db) => {
//   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const today = days[new Date().getDay()]; // e.g. "Monday"

//   const [results] = await db.executeSql(
//     "SELECT day_id FROM Day WHERE name = ?",
//     [today]
//   );

//   if (results.rows.length > 0) {
//     return results.rows.item(0).day_id;
//   } else {
//     return null;
//   }
// };

// // ✅ Daily random ayat generate karke notification_history me insert karna
// const generateDailyNotification = async (db) => {
//   const dayId = await getCurrentDayId(db);
//   if (!dayId) return;

//   const [results] = await db.executeSql(
//     `
//     SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//            s.EnglishName, s.ArabicName
//     FROM Quran q
//     JOIN Surahs s ON q.surah_id = s.surah_id
//     JOIN mood_day_custom_map m 
//          ON q.surah_id = m.surah_id 
//         AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//     WHERE m.day_id = ?
//     ORDER BY RANDOM() LIMIT 1
//     `,
//     [dayId]
//   );

//   if (results.rows.length > 0) {
//     const row = results.rows.item(0);
//     const todayDate = new Date().toISOString().split("T")[0];

//     // check if already created
//     const [check] = await db.executeSql(
//       "SELECT id FROM notification_history WHERE date = ? AND day_id = ?",
//       [todayDate, dayId]
//     );

//     if (check.rows.length === 0) {
//       await db.executeSql(
//         `INSERT INTO notification_history 
//           (day_id, mood_id, surah_id, ayat_id, date, played) 
//          VALUES (?, ?, ?, ?, ?, 0)`,
//         [dayId, 0, row.surah_id, row.ayah_Id, todayDate]
//       );
//       console.log("✅ Daily notification generated");
//     } else {
//       console.log("⚠️ Notification already exists for today");
//     }
//   }
// };

// const App = () => {
//   useEffect(() => {
//     (async () => {
//       const db = await openDB(); // DB open/copy
//       await generateDailyNotification(db); // App launch pe notification generate
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//         <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
//         <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
//         <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
//         <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
//         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
//         <Stack.Screen name="ViewSettings" component={ViewSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
//         <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


// ////////////////////mood notification

// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import ShowAyat from './screens/ShowAyat';
// import Search from './screens/Search';
// import Notification from './screens/Notification';
// import NotificationDetails from './screens/NotificationDetails';
// import Settings from './screens/Settings';
// import ViewSettings from './screens/ViewSettings';
// import Language from './screens/Language';
// import History from './screens/History';
// import Favorites from './screens/Favorites';
// import openDB from './screens/DB';
// import AppSettings from './screens/AppSettings';
// import AutoPlay from './screens/Autoplay';

// const Stack = createNativeStackNavigator();

// // ✅ Current Day ka day_id find karna
// const getCurrentDayId = async (db) => {
//   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const today = days[new Date().getDay()]; // e.g. "Monday"

//   const [results] = await db.executeSql(
//     "SELECT day_id FROM Day WHERE name = ?",
//     [today]
//   );

//   if (results.rows.length > 0) {
//     return results.rows.item(0).day_id;
//   } else {
//     return null;
//   }
// };

// // ✅ User ka last mood get karna from daily_ayat_history (sirf kal ki date check karein)
// const getLastUserMood = async (db) => {
//   try {
//     // Kal ki date nikalte hain (yesterday)
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const yesterdayDate = yesterday.toISOString().split("T")[0];

//     // Sirf kal ke history se mood fetch karte hain
//     const [results] = await db.executeSql(
//       `SELECT mood_id 
//        FROM daily_ayat_history 
//        WHERE date = ? AND mood_id IS NOT NULL 
//        ORDER BY id DESC 
//        LIMIT 1`,
//       [yesterdayDate]
//     );

//     if (results.rows.length > 0) {
//       return results.rows.item(0).mood_id;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error getting last user mood:", error);
//     return null;
//   }
// };

// // ✅ Daily random ayat generate karke notification_history me insert karna
// const generateDailyNotification = async (db) => {
//   const todayDate = new Date().toISOString().split("T")[0];

//   // Pehle check karte hain ki aaj ke liye notification already generated toh nahi hai
//   const [check] = await db.executeSql(
//     "SELECT id FROM notification_history WHERE date = ?",
//     [todayDate]
//   );

//   if (check.rows.length > 0) {
//     console.log("⚠️ Notification already exists for today");
//     return;
//   }

//   // User ka last mood get karte hain (sirf kal ke liye)
//   const lastMoodId = await getLastUserMood(db);
//   const dayId = await getCurrentDayId(db);

//   let query = '';
//   let params = [];
//   let moodIdForNotification = 0;
//   let notificationSource = 'day'; // 'mood' or 'day'

//   if (lastMoodId) {
//     // Agar user ne kal mood select kiya tha, toh usi ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.mood_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [lastMoodId];
//     moodIdForNotification = lastMoodId;
//     notificationSource = 'mood';
//   } else if (dayId) {
//     // Agar kal ka mood nahi mila, toh aaj ke day ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.day_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [dayId];
//     moodIdForNotification = 0;
//     notificationSource = 'day';
//   } else {
//     console.log("❌ No day or mood found for notification");
//     return;
//   }

//   const [results] = await db.executeSql(query, params);

//   if (results.rows.length > 0) {
//     const row = results.rows.item(0);

//     await db.executeSql(
//       `INSERT INTO notification_history 
//         (day_id, mood_id, surah_id, ayat_id, date, played) 
//        VALUES (?, ?, ?, ?, ?, 0)`,
//       [dayId, moodIdForNotification, row.surah_id, row.ayah_Id, todayDate]
//     );
//     console.log(`✅ Daily notification generated (based on ${notificationSource})`);
//   }
// };

// const App = () => {
//   useEffect(() => {
//     (async () => {
//       const db = await openDB(); // DB open/copy
//       await generateDailyNotification(db); // App launch pe notification generate
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//         <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
//         <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
//         <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
//         <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
//         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
//         <Stack.Screen name="ViewSettings" component={ViewSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
//         <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
//         <Stack.Screen name="AutoPlay" component={AutoPlay} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

///notification time

// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import ShowAyat from './screens/ShowAyat';
// import Search from './screens/Search';
// import Notification from './screens/Notification';
// import NotificationDetails from './screens/NotificationDetails';
// import Settings from './screens/Settings';
// import ViewSettings from './screens/ViewSettings';
// import Language from './screens/Language';
// import History from './screens/History';
// import Favorites from './screens/Favorites';
// import openDB from './screens/DB';
// import AppSettings from './screens/AppSettings';
// import AutoPlay from './screens/Autoplay';
// import NotificationSchedule from './screens/NotificationSchedule'; // Naya screen import karein

// const Stack = createNativeStackNavigator();

// // ✅ Current Day ka day_id find karna
// const getCurrentDayId = async (db) => {
//   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const today = days[new Date().getDay()]; // e.g. "Monday"

//   const [results] = await db.executeSql(
//     "SELECT day_id FROM Day WHERE name = ?",
//     [today]
//   );

//   if (results.rows.length > 0) {
//     return results.rows.item(0).day_id;
//   } else {
//     return null;
//   }
// };

// // ✅ User ka last mood get karna from daily_ayat_history (sirf kal ki date check karein)
// const getLastUserMood = async (db) => {
//   try {
//     // Kal ki date nikalte hain (yesterday)
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const yesterdayDate = yesterday.toISOString().split("T")[0];

//     // Sirf kal ke history se mood fetch karte hain
//     const [results] = await db.executeSql(
//       `SELECT mood_id 
//        FROM daily_ayat_history 
//        WHERE date = ? AND mood_id IS NOT NULL 
//        ORDER BY id DESC 
//        LIMIT 1`,
//       [yesterdayDate]
//     );

//     if (results.rows.length > 0) {
//       return results.rows.item(0).mood_id;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error getting last user mood:", error);
//     return null;
//   }
// };

// // ✅ Daily random ayat generate karke notification_history me insert karna
// const generateDailyNotification = async (db) => {
//   const todayDate = new Date().toISOString().split("T")[0];

//   // Pehle check karte hain ki aaj ke liye notification already generated toh nahi hai
//   const [check] = await db.executeSql(
//     "SELECT id FROM notification_history WHERE date = ?",
//     [todayDate]
//   );

//   if (check.rows.length > 0) {
//     console.log("⚠️ Notification already exists for today");
//     return;
//   }

//   // User ka last mood get karte hain (sirf kal ke liye)
//   const lastMoodId = await getLastUserMood(db);
//   const dayId = await getCurrentDayId(db);

//   let query = '';
//   let params = [];
//   let moodIdForNotification = 0;
//   let notificationSource = 'day'; // 'mood' or 'day'

//   if (lastMoodId) {
//     // Agar user ne kal mood select kiya tha, toh usi ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.mood_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [lastMoodId];
//     moodIdForNotification = lastMoodId;
//     notificationSource = 'mood';
//   } else if (dayId) {
//     // Agar kal ka mood nahi mila, toh aaj ke day ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.day_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [dayId];
//     moodIdForNotification = 0;
//     notificationSource = 'day';
//   } else {
//     console.log("❌ No day or mood found for notification");
//     return;
//   }

//   const [results] = await db.executeSql(query, params);

//   if (results.rows.length > 0) {
//     const row = results.rows.item(0);

//     await db.executeSql(
//       `INSERT INTO notification_history 
//         (day_id, mood_id, surah_id, ayat_id, date, played) 
//        VALUES (?, ?, ?, ?, ?, 0)`,
//       [dayId, moodIdForNotification, row.surah_id, row.ayah_Id, todayDate]
//     );
//     console.log(`✅ Daily notification generated (based on ${notificationSource})`);
//   }
// };

// const App = () => {
//   useEffect(() => {
//     (async () => {
//       const db = await openDB(); // DB open/copy
//       await generateDailyNotification(db); // App launch pe notification generate
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//         <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
//         <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
//         <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
//         <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
//         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
//         <Stack.Screen name="ViewSettings" component={ViewSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
//         <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
//         <Stack.Screen name="AutoPlay" component={AutoPlay} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationSchedule" component={NotificationSchedule} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import ShowAyat from './screens/ShowAyat';
// import Search from './screens/Search';
// import Notification from './screens/Notification';
// import NotificationDetails from './screens/NotificationDetails';
// import Settings from './screens/Settings';
// import ViewSettings from './screens/ViewSettings';
// import Language from './screens/Language';
// import History from './screens/History';
// import Favorites from './screens/Favorites';
// import openDB from './screens/DB';
// import AppSettings from './screens/AppSettings';
// import AutoPlay from './screens/Autoplay';
// import NotificationSchedule from './screens/NotificationSchedule';

// const Stack = createNativeStackNavigator();

// // ✅ Current Day ka day_id find karna
// const getCurrentDayId = async (db) => {
//   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const today = days[new Date().getDay()]; // e.g. "Monday"

//   const [results] = await db.executeSql(
//     "SELECT day_id FROM Day WHERE name = ?",
//     [today]
//   );

//   if (results.rows.length > 0) {
//     return results.rows.item(0).day_id;
//   } else {
//     return null;
//   }
// };

// // ✅ User ka last mood get karna from daily_ayat_history (sirf kal ki date check karein)
// const getLastUserMood = async (db) => {
//   try {
//     // Kal ki date nikalte hain (yesterday)
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const yesterdayDate = yesterday.toISOString().split("T")[0];

//     // Sirf kal ke history se mood fetch karte hain
//     const [results] = await db.executeSql(
//       `SELECT mood_id 
//        FROM daily_ayat_history 
//        WHERE date = ? AND mood_id IS NOT NULL 
//        ORDER BY id DESC 
//        LIMIT 1`,
//       [yesterdayDate]
//     );

//     if (results.rows.length > 0) {
//       return results.rows.item(0).mood_id;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error getting last user mood:", error);
//     return null;
//   }
// };

// // ✅ Check if notification is enabled for today
// const isNotificationEnabledForToday = async (db) => {
//   try {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const today = days[new Date().getDay()];

//     const [results] = await db.executeSql(
//       `SELECT ns.enabled 
//        FROM notification_schedule ns
//        JOIN Day d ON ns.day_id = d.day_id
//        WHERE d.name = ?`,
//       [today]
//     );

//     if (results.rows.length > 0) {
//       return results.rows.item(0).enabled === 1;
//     }

//     // Agar data nahi mila toh by default enabled consider karein
//     return true;
//   } catch (error) {
//     console.error("Error checking notification status:", error);
//     // Error case mein bhi enabled consider karein
//     return true;
//   }
// };

// // ✅ Daily random ayat generate karke notification_history me insert karna
// const generateDailyNotification = async (db) => {
//   const todayDate = new Date().toISOString().split("T")[0];

//   // Pehle check karte hain ki aaj ke liye notification already generated toh nahi hai
//   const [check] = await db.executeSql(
//     "SELECT id FROM notification_history WHERE date = ?",
//     [todayDate]
//   );

//   if (check.rows.length > 0) {
//     console.log("⚠️ Notification already exists for today");
//     return;
//   }

//   // Check karein ki aaj ke din notification enabled hai ya nahi
//   const isEnabled = await isNotificationEnabledForToday(db);
//   if (!isEnabled) {
//     console.log("🔕 Notifications are disabled for today");
//     return;
//   }

//   // User ka last mood get karte hain (sirf kal ke liye)
//   const lastMoodId = await getLastUserMood(db);
//   const dayId = await getCurrentDayId(db);

//   let query = '';
//   let params = [];
//   let moodIdForNotification = 0;
//   let notificationSource = 'day'; // 'mood' or 'day'

//   if (lastMoodId) {
//     // Agar user ne kal mood select kiya tha, toh usi ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.mood_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [lastMoodId];
//     moodIdForNotification = lastMoodId;
//     notificationSource = 'mood';
//   } else if (dayId) {
//     // Agar kal ka mood nahi mila, toh aaj ke day ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.day_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [dayId];
//     moodIdForNotification = 0;
//     notificationSource = 'day';
//   } else {
//     console.log("❌ No day or mood found for notification");
//     return;
//   }

//   const [results] = await db.executeSql(query, params);

//   if (results.rows.length > 0) {
//     const row = results.rows.item(0);

//     await db.executeSql(
//       `INSERT INTO notification_history 
//         (day_id, mood_id, surah_id, ayat_id, date, played) 
//        VALUES (?, ?, ?, ?, ?, 0)`,
//       [dayId, moodIdForNotification, row.surah_id, row.ayah_Id, todayDate]
//     );
//     console.log(`✅ Daily notification generated (based on ${notificationSource})`);
//   }
// };

// const App = () => {
//   useEffect(() => {
//     (async () => {
//       try {
//         const db = await openDB(); // DB open/copy

//         // Pehle check karein ki notification_schedule table exists bhi hai ya nahi
//         // Agar nahi hai toh create karein (backward compatibility ke liye)
//         try {
//           await db.executeSql(
//             "SELECT name FROM sqlite_master WHERE type='table' AND name='notification_schedule'"
//           );
//         } catch (error) {
//           console.log("Notification schedule table doesn't exist yet");
//           // Table nahi hai, toh aage continue karein without error
//         }

//         await generateDailyNotification(db); // App launch pe notification generate
//       } catch (error) {
//         console.error("Error in app initialization:", error);
//       }
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//         <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
//         <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
//         <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
//         <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
//         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
//         <Stack.Screen name="ViewSettings" component={ViewSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
//         <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
//         <Stack.Screen name="AutoPlay" component={AutoPlay} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationSchedule" component={NotificationSchedule} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

//isme notification time played

// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import ShowAyat from './screens/ShowAyat';
// import Search from './screens/Search';
// import Notification from './screens/Notification';
// import NotificationDetails from './screens/NotificationDetails';
// import Settings from './screens/Settings';
// import ViewSettings from './screens/ViewSettings';
// import Language from './screens/Language';
// import History from './screens/History';
// import Favorites from './screens/Favorites';
// import openDB from './screens/DB';
// import AppSettings from './screens/AppSettings';
// import AutoPlay from './screens/Autoplay';
// import NotificationSchedule from './screens/NotificationSchedule';
// import Playlist from './screens/Playlist';

// const Stack = createNativeStackNavigator();

// // ✅ Current Day ka day_id find karna
// const getCurrentDayId = async (db) => {
//   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const today = days[new Date().getDay()]; // e.g. "Monday"

//   const [results] = await db.executeSql(
//     "SELECT day_id FROM Day WHERE name = ?",
//     [today]
//   );

//   if (results.rows.length > 0) {
//     return results.rows.item(0).day_id;
//   } else {
//     return null;
//   }
// };

// // ✅ User ka last mood get karna from daily_ayat_history (sirf kal ki date check karein)
// const getLastUserMood = async (db) => {
//   try {
//     // Kal ki date nikalte hain (yesterday)
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const yesterdayDate = yesterday.toISOString().split("T")[0];

//     // Sirf kal ke history se mood fetch karte hain
//     const [results] = await db.executeSql(
//       `SELECT mood_id 
//        FROM daily_ayat_history 
//        WHERE date = ? AND mood_id IS NOT NULL 
//        ORDER BY id DESC 
//        LIMIT 1`,
//       [yesterdayDate]
//     );

//     if (results.rows.length > 0) {
//       return results.rows.item(0).mood_id;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error getting last user mood:", error);
//     return null;
//   }
// };

// // ✅ Check if notification is enabled for today
// const isNotificationEnabledForToday = async (db) => {
//   try {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const today = days[new Date().getDay()];

//     const [results] = await db.executeSql(
//       `SELECT ns.enabled 
//        FROM notification_schedule ns
//        JOIN Day d ON ns.day_id = d.day_id
//        WHERE d.name = ?`,
//       [today]
//     );

//     if (results.rows.length > 0) {
//       return results.rows.item(0).enabled === 1;
//     }

//     // Agar data nahi mila toh by default enabled consider karein
//     return true;
//   } catch (error) {
//     console.error("Error checking notification status:", error);
//     // Error case mein bhi enabled consider karein
//     return true;
//   }
// };

// // ✅ Daily random ayat generate karke notification_history me insert karna
// const generateDailyNotification = async (db) => {
//   const todayDate = new Date().toISOString().split("T")[0];
//   const now = new Date();
//   const notificationTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

//   // Pehle check karte hain ki aaj ke liye notification already generated toh nahi hai
//   const [check] = await db.executeSql(
//     "SELECT id FROM notification_history WHERE date = ?",
//     [todayDate]
//   );

//   if (check.rows.length > 0) {
//     console.log("⚠️ Notification already exists for today");
//     return;
//   }

//   // Check karein ki aaj ke din notification enabled hai ya nahi
//   const isEnabled = await isNotificationEnabledForToday(db);
//   if (!isEnabled) {
//     console.log("🔕 Notifications are disabled for today");
//     return;
//   }

//   // User ka last mood get karte hain (sirf kal ke liye)
//   const lastMoodId = await getLastUserMood(db);
//   const dayId = await getCurrentDayId(db);

//   let query = '';
//   let params = [];
//   let moodIdForNotification = 0;
//   let notificationSource = 'day'; // 'mood' or 'day'

//   if (lastMoodId) {
//     // Agar user ne kal mood select kiya tha, toh usi ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.mood_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [lastMoodId];
//     moodIdForNotification = lastMoodId;
//     notificationSource = 'mood';
//   } else if (dayId) {
//     // Agar kal ka mood nahi mila, toh aaj ke day ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.day_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [dayId];
//     moodIdForNotification = 0;
//     notificationSource = 'day';
//   } else {
//     console.log("❌ No day or mood found for notification");
//     return;
//   }

//   const [results] = await db.executeSql(query, params);

//   if (results.rows.length > 0) {
//     const row = results.rows.item(0);

//     await db.executeSql(
//       `INSERT INTO notification_history 
//         (day_id, mood_id, surah_id, ayat_id, date, played, notification_time) 
//        VALUES (?, ?, ?, ?, ?, 0, ?)`,
//       [dayId, moodIdForNotification, row.surah_id, row.ayah_Id, todayDate, notificationTime]
//     );
//     console.log(`✅ Daily notification generated (based on ${notificationSource}) at ${notificationTime}`);
//   }
// };

// const App = () => {
//   useEffect(() => {
//     (async () => {
//       try {
//         const db = await openDB(); // DB open/copy

//         // Add time columns to notification_history table if they don't exist
//         try {
//           await db.executeSql('ALTER TABLE notification_history ADD COLUMN notification_time TEXT');
//         } catch (e) {
//           console.log('Column notification_time may already exist');
//         }

//         try {
//           await db.executeSql('ALTER TABLE notification_history ADD COLUMN played_time TEXT');
//         } catch (e) {
//           console.log('Column played_time may already exist');
//         }

//         // Pehle check karein ki notification_schedule table exists bhi hai ya nahi
//         // Agar nahi hai toh create karein (backward compatibility ke liye)
//         try {
//           await db.executeSql(
//             "SELECT name FROM sqlite_master WHERE type='table' AND name='notification_schedule'"
//           );
//         } catch (error) {
//           console.log("Notification schedule table doesn't exist yet");
//           // Table nahi hai, toh aage continue karein without error
//         }

//         await generateDailyNotification(db); // App launch pe notification generate
//       } catch (error) {
//         console.error("Error in app initialization:", error);
//       }
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//         <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
//         <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
//         <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
//         <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
//         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
//         <Stack.Screen name="ViewSettings" component={ViewSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
//         <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
//         <Stack.Screen name="AutoPlay" component={AutoPlay} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationSchedule" component={NotificationSchedule} options={{ headerShown: false }} />
//         <Stack.Screen name='Playlist' component={Playlist} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;











// // ... previous imports ...
// import { initializeScheduledNotifications, startBackgroundNotificationCheck, generateNotificationOnAppLaunch } from './screens/NotificationService';
// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import ShowAyat from './screens/ShowAyat';
// import Search from './screens/Search';
// import Notification from './screens/Notification';
// import NotificationDetails from './screens/NotificationDetails';
// import Settings from './screens/Settings';
// import ViewSettings from './screens/ViewSettings';
// import Language from './screens/Language';
// import History from './screens/History';
// import Favorites from './screens/Favorites';
// import openDB from './screens/DB';
// import AppSettings from './screens/AppSettings';
// import AutoPlay from './screens/Autoplay';
// import NotificationSchedule from './screens/NotificationSchedule';

// const Stack = createNativeStackNavigator();
// const App = () => {
//   useEffect(() => {
//     (async () => {
//       try {
//         const db = await openDB();

//         // Add time columns to notification_history table if they don't exist
//         try {
//           await db.executeSql('ALTER TABLE notification_history ADD COLUMN notification_time TEXT');
//         } catch (e) {
//           console.log('Column notification_time may already exist');
//         }

//         try {
//           await db.executeSql('ALTER TABLE notification_history ADD COLUMN played_time TEXT');
//         } catch (e) {
//           console.log('Column played_time may already exist');
//         }

//         // App launch pe notification generate karein
//         await generateNotificationOnAppLaunch();

//         // Initialize scheduled notifications
//         await initializeScheduledNotifications();

//         // Start background notification check (as a fallback)
//         startBackgroundNotificationCheck();
//       } catch (error) {
//         console.error("Error in app initialization:", error);
//       }
//     })();

//     // Cleanup function
//     return () => {
//       // Stop background timer when app is closed
//       stopBackgroundNotificationCheck();
//     };
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//         <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
//         <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
//         <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
//         <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
//         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
//         <Stack.Screen name="ViewSettings" component={ViewSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
//         <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
//         <Stack.Screen name="AutoPlay" component={AutoPlay} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationSchedule" component={NotificationSchedule} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;



// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import ShowAyat from './screens/ShowAyat';
// import Search from './screens/Search';
// import Notification from './screens/Notification';
// import NotificationDetails from './screens/NotificationDetails';
// import Settings from './screens/Settings';
// import ViewSettings from './screens/ViewSettings';
// import Language from './screens/Language';
// import History from './screens/History';
// import Favorites from './screens/Favorites';
// import openDB from './screens/DB';
// import AppSettings from './screens/AppSettings';
// import AutoPlay from './screens/Autoplay';
// import NotificationSchedule from './screens/NotificationSchedule';
// import Keyword from './screens/Keyword';

// const Stack = createNativeStackNavigator();

// // ✅ Current Day ka day_id find karna
// const getCurrentDayId = async (db) => {
//   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const today = days[new Date().getDay()]; // e.g. "Monday"

//   const [results] = await db.executeSql(
//     "SELECT day_id FROM Day WHERE name = ?",
//     [today]
//   );

//   if (results.rows.length > 0) {
//     return results.rows.item(0).day_id;
//   } else {
//     return null;
//   }
// };

// // ✅ User ka last mood get karna from daily_ayat_history (sirf kal ki date check karein)
// const getLastUserMood = async (db) => {
//   try {
//     // Kal ki date nikalte hain (yesterday)
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const yesterdayDate = yesterday.toISOString().split("T")[0];

//     // Sirf kal ke history se mood fetch karte hain
//     const [results] = await db.executeSql(
//       `SELECT mood_id 
//        FROM daily_ayat_history 
//        WHERE date = ? AND mood_id IS NOT NULL 
//        ORDER BY id DESC 
//        LIMIT 1`,
//       [yesterdayDate]
//     );

//     if (results.rows.length > 0) {
//       return results.rows.item(0).mood_id;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error getting last user mood:", error);
//     return null;
//   }
// };

// // ✅ Check if notification is enabled for today
// // const isNotificationEnabledForToday = async (db) => {
// //   try {
// //     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// //     const today = days[new Date().getDay()];

// //     const [results] = await db.executeSql(
// //       `SELECT ns.enabled 
// //        FROM notification_schedule ns
// //        JOIN Day d ON ns.day_id = d.day_id
// //        WHERE d.name = ?`,
// //       [today]
// //     );

// //     if (results.rows.length > 0) {
// //       return results.rows.item(0).enabled === 1;
// //     }

// //     // Agar data nahi mila toh by default enabled consider karein
// //     return true;
// //   } catch (error) {
// //     console.error("Error checking notification status:", error);
// //     // Error case mein bhi enabled consider karein
// //     return true;
// //   }
// // };


// const isNotificationEnabledForTodayAndTime = async (db) => {
//   try {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const today = days[new Date().getDay()];
//     const now = new Date();
//     const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

//     const [results] = await db.executeSql(
//       `SELECT nt.enabled 
//        FROM notification_schedule nt
//        JOIN Day d ON nt.day_id = d.day_id
//        WHERE d.name = ? AND nt.time = ?`,
//       [today, currentTime]
//     );

//     if (results.rows.length > 0) {
//       return results.rows.item(0).enabled === 1;
//     }

//     return false;
//   } catch (error) {
//     console.error("Error checking notification status:", error);
//     return false;
//   }
// };

// // ✅ Daily random ayat generate karke notification_history me insert karna
// const generateDailyNotification = async (db) => {
//   const todayDate = new Date().toISOString().split("T")[0];
//   const now = new Date();
//   const notificationTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

//   // Check karein ki is time ke liye notification enabled hai ya nahi
//   const isEnabled = await isNotificationEnabledForTodayAndTime(db);
//   if (!isEnabled) {
//     console.log("🔕 Notifications are disabled for this time");
//     return;
//   }

//   // Pehle check karte hain ki is time ke liye notification already generated toh nahi hai
//   const [check] = await db.executeSql(
//     "SELECT id FROM notification_history WHERE date = ? AND notification_time = ?",
//     [todayDate, notificationTime]
//   );

//   if (check.rows.length > 0) {
//     console.log("⚠️ Notification already exists for this time today");
//     return;
//   }

//   // Baaki ka logic same rahega...
//   // User ka last mood get karte hain (sirf kal ke liye)
//   const lastMoodId = await getLastUserMood(db);
//   const dayId = await getCurrentDayId(db);

//   let query = '';
//   let params = [];
//   let moodIdForNotification = 0;
//   let notificationSource = 'day'; // 'mood' or 'day'

//   if (lastMoodId) {
//     // Agar user ne kal mood select kiya tha, toh usi ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.mood_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [lastMoodId];
//     moodIdForNotification = lastMoodId;
//     notificationSource = 'mood';
//   } else if (dayId) {
//     // Agar kal ka mood nahi mila, toh aaj ke day ke hisab se ayat select karte hain
//     query = `
//       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
//              s.EnglishName, s.ArabicName
//       FROM Quran q
//       JOIN Surahs s ON q.surah_id = s.surah_id
//       JOIN mood_day_custom_map m 
//            ON q.surah_id = m.surah_id 
//           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
//       WHERE m.day_id = ?
//       ORDER BY RANDOM() LIMIT 1
//     `;
//     params = [dayId];
//     moodIdForNotification = 0;
//     notificationSource = 'day';
//   } else {
//     console.log("❌ No day or mood found for notification");
//     return;
//   }

//   const [results] = await db.executeSql(query, params);

//   if (results.rows.length > 0) {
//     const row = results.rows.item(0);

//     await db.executeSql(
//       `INSERT INTO notification_history 
//         (day_id, mood_id, surah_id, ayat_id, date, played, notification_time) 
//        VALUES (?, ?, ?, ?, ?, 0, ?)`,
//       [dayId, moodIdForNotification, row.surah_id, row.ayah_Id, todayDate, notificationTime]
//     );
//     console.log(`✅ Daily notification generated (based on ${notificationSource}) at ${notificationTime}`);
//   }
// };

// // ✅ Daily random ayat generate karke notification_history me insert karna
// // const generateDailyNotification = async (db) => {
// //   const todayDate = new Date().toISOString().split("T")[0];

// //   // Pehle check karte hain ki aaj ke liye notification already generated toh nahi hai
// //   const [check] = await db.executeSql(
// //     "SELECT id FROM notification_history WHERE date = ?",
// //     [todayDate]
// //   );

// //   if (check.rows.length > 0) {
// //     console.log("⚠️ Notification already exists for today");
// //     return;
// //   }

//   // Check karein ki aaj ke din notification enabled hai ya nahi
//   // const isEnabled = await isNotificationEnabledForToday(db);
//   // if (!isEnabled) {
//   //   console.log("🔕 Notifications are disabled for today");
//   //   return;
//   // }

//   // User ka last mood get karte hain (sirf kal ke liye)
// //   const lastMoodId = await getLastUserMood(db);
// //   const dayId = await getCurrentDayId(db);

// //   let query = '';
// //   let params = [];
// //   let moodIdForNotification = 0;
// //   let notificationSource = 'day'; // 'mood' or 'day'

// //   if (lastMoodId) {
// //     // Agar user ne kal mood select kiya tha, toh usi ke hisab se ayat select karte hain
// //     query = `
// //       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
// //              s.EnglishName, s.ArabicName
// //       FROM Quran q
// //       JOIN Surahs s ON q.surah_id = s.surah_id
// //       JOIN mood_day_custom_map m 
// //            ON q.surah_id = m.surah_id 
// //           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// //       WHERE m.mood_id = ?
// //       ORDER BY RANDOM() LIMIT 1
// //     `;
// //     params = [lastMoodId];
// //     moodIdForNotification = lastMoodId;
// //     notificationSource = 'mood';
// //   } else if (dayId) {
// //     // Agar kal ka mood nahi mila, toh aaj ke day ke hisab se ayat select karte hain
// //     query = `
// //       SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
// //              s.EnglishName, s.ArabicName
// //       FROM Quran q
// //       JOIN Surahs s ON q.surah_id = s.surah_id
// //       JOIN mood_day_custom_map m 
// //            ON q.surah_id = m.surah_id 
// //           AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
// //       WHERE m.day_id = ?
// //       ORDER BY RANDOM() LIMIT 1
// //     `;
// //     params = [dayId];
// //     moodIdForNotification = 0;
// //     notificationSource = 'day';
// //   } else {
// //     console.log("❌ No day or mood found for notification");
// //     return;
// //   }

// //   const [results] = await db.executeSql(query, params);

// //   if (results.rows.length > 0) {
// //     const row = results.rows.item(0);

// //     await db.executeSql(
// //       `INSERT INTO notification_history 
// //         (day_id, mood_id, surah_id, ayat_id, date, played) 
// //        VALUES (?, ?, ?, ?, ?, 0)`,
// //       [dayId, moodIdForNotification, row.surah_id, row.ayah_Id, todayDate]
// //     );
// //     console.log(`✅ Daily notification generated (based on ${notificationSource})`);
// //   }
// // };

// const App = () => {
//   useEffect(() => {
//     (async () => {
//       try {
//         const db = await openDB(); // DB open/copy

//         // Pehle check karein ki notification_schedule table exists bhi hai ya nahi
//         // Agar nahi hai toh create karein (backward compatibility ke liye)
//         try {
//           await db.executeSql(
//             "SELECT name FROM sqlite_master WHERE type='table' AND name='notification_schedule'"
//           );
//         } catch (error) {
//           console.log("Notification schedule table doesn't exist yet");
//           // Table nahi hai, toh aage continue karein without error
//         }

//         await generateDailyNotification(db); // App launch pe notification generate
//       } catch (error) {
//         console.error("Error in app initialization:", error);
//       }
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//         <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
//         <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
//         <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
//         <Stack.Screen name='Keyword' component={Keyword} options={{ headerShown: false }} />
//         <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
//         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
//         <Stack.Screen name="ViewSettings" component={ViewSettings} options={{ headerShown: false }} />
//         <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
//         <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
//         <Stack.Screen name="AutoPlay" component={AutoPlay} options={{ headerShown: false }} />
//         <Stack.Screen name="NotificationSchedule" component={NotificationSchedule} options={{ headerShown: false }} />
        
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;



import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import ShowAyat from './screens/ShowAyat';
import Search from './screens/Search';
import Notification from './screens/Notification';
import NotificationDetails from './screens/NotificationDetails';
import Settings from './screens/Settings';
import ViewSettings from './screens/ViewSettings';
import Language from './screens/Language';
import History from './screens/History';
import Favorites from './screens/Favorites';
import openDB from './screens/DB';
import AppSettings from './screens/AppSettings';
import AutoPlay from './screens/Autoplay';
import NotificationSchedule from './screens/NotificationSchedule';
import Keyword from './screens/Keyword';
import Playlist from './screens/Playlist';

const Stack = createNativeStackNavigator();




const App = () => {
  useEffect(() => {
    (async () => {
      try {
        const db = await openDB(); // DB open/copy

      } catch (error) {
        console.error("Error in app initialization:", error);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
        <Stack.Screen name="ShowAyat" component={ShowAyat} options={{ headerShown: false }} />
        <Stack.Screen name='Keyword' component={Keyword} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
        <Stack.Screen name="ViewSettings" component={ViewSettings} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
        <Stack.Screen name="AutoPlay" component={AutoPlay} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationSchedule" component={NotificationSchedule} options={{ headerShown: false }} />
        <Stack.Screen name='Playlist' component={Playlist} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;