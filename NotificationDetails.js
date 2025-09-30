

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert, I18nManager } from "react-native";
// import Sound from "react-native-sound";
// import openDB from "./DB";

// Sound.setCategory("Playback");

// const NotificationDetails = ({ route }) => {
//     const { item } = route.params;
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     useEffect(() => {
//         return () => {
//             if (sound) sound.release();
//         };
//     }, [sound]);

//     const playAyahAudio = () => {
//         if (isPlaying) {
//             stopAudio();
//             return;
//         }

//         const surahId = String(item.surah_id).padStart(3, "0");
//         const ayahLoc = String(item.ayah_location).padStart(3, "0");
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         if (sound) sound.release();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert("Error", "Audio load failed: " + error.message);
//                 return;
//             }
//             newSound.play((success) => {
//                 if (!success) Alert.alert("Error", "Playback failed");
//                 newSound.release();
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);

//         // ✅ Mark as played in DB
//         (async () => {
//             const db = await openDB();
//             await db.executeSql("UPDATE notification_history SET played = 1 WHERE id = ?", [item.id]);
//         })();
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setIsPlaying(false);
//             });
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.dateText}>{item.DayName} • {item.date}</Text>
//             <Text style={styles.surah}>{item.EnglishName} ({item.ArabicName})</Text>

//             {/* ✅ Arabic Text (Right aligned) */}
//             <Text style={styles.arabic}>{item.Arabic}</Text>

//             {/* ✅ Urdu Text (Right aligned) */}
//             <Text style={styles.urdu}>{item.Urdu}</Text>

//             {/* ✅ English Translation */}
//             <Text style={styles.english}>{item.English}</Text>

//             {/* Play / Stop button */}
//             <TouchableOpacity style={styles.playBtn} onPress={playAyahAudio}>
//                 <Text style={{ color: "white", fontSize: 16 }}>
//                     {isPlaying ? "⏹ Stop" : "▶️ Play"}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#F8EDF9", padding: 20 },
//     dateText: { fontSize: 14, color: "#666", marginBottom: 6 },
//     surah: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#000" },

//     arabic: { fontSize: 22, textAlign: "right", marginBottom: 12, color: "#000", fontWeight: "bold" },
//     urdu: { fontSize: 18, textAlign: "right", marginBottom: 10, color: "#333" },
//     english: { fontSize: 16, marginBottom: 10, color: "#444" },

//     playBtn: {
//         marginTop: 20,
//         backgroundColor: "#6C63FF",
//         padding: 12,
//         borderRadius: 8,
//         alignItems: "center",
//     },
// });

// export default NotificationDetails;


// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import Sound from "react-native-sound";
// import openDB from "./DB";

// Sound.setCategory("Playback");

// const NotificationDetails = ({ route }) => {
//     const { item } = route.params;
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     useEffect(() => {
//         return () => {
//             if (sound) sound.release();
//         };
//     }, [sound]);

//     const playAyahAudio = () => {
//         if (isPlaying) {
//             stopAudio();
//             return;
//         }

//         const surahId = String(item.surah_id).padStart(3, "0");
//         const ayahLoc = String(item.ayah_location).padStart(3, "0");
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         if (sound) sound.release();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert("Error", "Audio load failed: " + error.message);
//                 return;
//             }
//             newSound.play((success) => {
//                 if (!success) Alert.alert("Error", "Playback failed");
//                 newSound.release();
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);

//         // ✅ Mark as played in DB
//         (async () => {
//             const db = await openDB();
//             await db.executeSql("UPDATE notification_history SET played = 1 WHERE id = ?", [item.id]);
//         })();
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setIsPlaying(false);
//             });
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Surah Title */}
//             <Text style={styles.surah}>{item.EnglishName} ({item.ArabicName})</Text>

//             {/* Date & Time */}
//             <Text style={styles.dateText}>{item.DayName} • {item.date}</Text>

//             {/* White Card */}
//             <View style={styles.card}>
//                 {/* Arabic */}
//                 <Text style={styles.arabic}>{item.Arabic}</Text>

//                 {/* Urdu */}
//                 <Text style={styles.urdu}>{item.Urdu}</Text>

//                 {/* English */}
//                 <Text style={styles.english}>{item.English}</Text>
//             </View>

//             {/* Play / Stop button */}
//             <TouchableOpacity style={styles.playBtn} onPress={playAyahAudio}>
//                 <Text style={styles.playBtnText}>
//                     {isPlaying ? "⏹ Stop" : "▶️ Play"}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#F8EDF9", padding: 20 },

//     surah: { fontSize: 22, fontWeight: "bold", marginBottom: 6, color: "#000", textAlign: "center", marginTop: 30, marginBottom: 10 },
//     dateText: { fontSize: 14, color: "#666", marginBottom: 26, textAlign: "center" },

//     card: {
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: 20,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//         elevation: 3,
//     },

//     arabic: { fontSize: 24, textAlign: "right", marginBottom: 12, color: "#000", fontWeight: "bold" },
//     urdu: { fontSize: 18, textAlign: "right", marginBottom: 10, color: "#333" },
//     english: { fontSize: 16, marginBottom: 10, color: "#444", textAlign: "left" },

//     playBtn: {
//         backgroundColor: "#6C63FF",
//         paddingVertical: 14,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     playBtnText: {
//         color: "white",
//         fontSize: 18,
//         fontWeight: "bold",
//     },
// });

// export default NotificationDetails;

//////async wla

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import Sound from "react-native-sound";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import openDB from "./DB";

// Sound.setCategory("Playback");

// const NotificationDetails = ({ route }) => {
//     const { item } = route.params;
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showEnglish, setShowEnglish] = useState(true);
//     const [showUrdu, setShowUrdu] = useState(true);

//     useEffect(() => {
//         loadLanguageSettings();

//         return () => {
//             if (sound) sound.release();
//         };
//     }, [sound]);

//     const loadLanguageSettings = async () => {
//         try {
//             const englishSetting = await AsyncStorage.getItem('showEnglish');
//             const urduSetting = await AsyncStorage.getItem('showUrdu');

//             if (englishSetting !== null) {
//                 setShowEnglish(JSON.parse(englishSetting));
//             }

//             if (urduSetting !== null) {
//                 setShowUrdu(JSON.parse(urduSetting));
//             }
//         } catch (error) {
//             console.error('Error loading language settings:', error);
//         }
//     };

//     const playAyahAudio = () => {
//         if (isPlaying) {
//             stopAudio();
//             return;
//         }

//         const surahId = String(item.surah_id).padStart(3, "0");
//         const ayahLoc = String(item.ayah_location).padStart(3, "0");
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         if (sound) sound.release();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert("Error", "Audio load failed: " + error.message);
//                 return;
//             }
//             newSound.play((success) => {
//                 if (!success) Alert.alert("Error", "Playback failed");
//                 newSound.release();
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);

//         // ✅ Mark as played in DB
//         (async () => {
//             const db = await openDB();
//             await db.executeSql("UPDATE notification_history SET played = 1 WHERE id = ?", [item.id]);
//         })();
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setIsPlaying(false);
//             });
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Surah Title */}
//             <Text style={styles.surah}>{item.EnglishName} ({item.ArabicName})</Text>

//             {/* Date & Time */}
//             <Text style={styles.dateText}>{item.DayName} • {item.date}</Text>

//             {/* White Card */}
//             <View style={styles.card}>
//                 {/* Arabic - Always shown */}
//                 <Text style={styles.arabic}>{item.Arabic}</Text>

//                 {/* Urdu - Conditionally shown */}
//                 {showUrdu && (
//                     <Text style={styles.urdu}>{item.Urdu}</Text>
//                 )}

//                 {/* English - Conditionally shown */}
//                 {showEnglish && (
//                     <Text style={styles.english}>{item.English}</Text>
//                 )}
//             </View>

//             {/* Play / Stop button */}
//             <TouchableOpacity style={styles.playBtn} onPress={playAyahAudio}>
//                 <Text style={styles.playBtnText}>
//                     {isPlaying ? "⏹ Stop" : "▶️ Play"}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#F8EDF9", padding: 20 },

//     surah: { fontSize: 22, fontWeight: "bold", marginBottom: 6, color: "#000", textAlign: "center", marginTop: 30, marginBottom: 10 },
//     dateText: { fontSize: 14, color: "#666", marginBottom: 26, textAlign: "center" },

//     card: {
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: 20,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//         elevation: 3,
//     },

//     arabic: { fontSize: 24, textAlign: "right", marginBottom: 12, color: "#000", fontWeight: "bold" },
//     urdu: { fontSize: 18, textAlign: "right", marginBottom: 10, color: "#333" },
//     english: { fontSize: 16, marginBottom: 10, color: "#444", textAlign: "left" },

//     playBtn: {
//         backgroundColor: "#6C63FF",
//         paddingVertical: 14,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     playBtnText: {
//         color: "white",
//         fontSize: 18,
//         fontWeight: "bold",
//     },
// });

// export default NotificationDetails;

//kab notification play hua


// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import Sound from "react-native-sound";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import openDB from "./DB";

// Sound.setCategory("Playback");

// const NotificationDetails = ({ route }) => {
//     const { item } = route.params;
//     const [sound, setSound] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showEnglish, setShowEnglish] = useState(true);
//     const [showUrdu, setShowUrdu] = useState(true);

//     useEffect(() => {
//         loadLanguageSettings();

//         return () => {
//             if (sound) sound.release();
//         };
//     }, [sound]);

//     const loadLanguageSettings = async () => {
//         try {
//             const englishSetting = await AsyncStorage.getItem('showEnglish');
//             const urduSetting = await AsyncStorage.getItem('showUrdu');

//             if (englishSetting !== null) {
//                 setShowEnglish(JSON.parse(englishSetting));
//             }

//             if (urduSetting !== null) {
//                 setShowUrdu(JSON.parse(urduSetting));
//             }
//         } catch (error) {
//             console.error('Error loading language settings:', error);
//         }
//     };

//     const formatTime = (timeString) => {
//         if (!timeString) return "";

//         try {
//             const [hours, minutes] = timeString.split(':');
//             const hour = parseInt(hours);
//             const period = hour >= 12 ? 'PM' : 'AM';
//             const displayHour = hour % 12 || 12;

//             return `${displayHour}:${minutes} ${period}`;
//         } catch (e) {
//             return timeString; // Return original if parsing fails
//         }
//     };

//     const playAyahAudio = () => {
//         if (isPlaying) {
//             stopAudio();
//             return;
//         }

//         const surahId = String(item.surah_id).padStart(3, "0");
//         const ayahLoc = String(item.ayah_location).padStart(3, "0");
//         const fileName = `a${surahId}${ayahLoc}.mp3`;

//         if (sound) sound.release();

//         const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 Alert.alert("Error", "Audio load failed: " + error.message);
//                 return;
//             }
//             newSound.play((success) => {
//                 if (!success) Alert.alert("Error", "Playback failed");
//                 newSound.release();
//                 setIsPlaying(false);
//             });
//         });

//         setSound(newSound);
//         setIsPlaying(true);

//         // ✅ Mark as played in DB with timestamp
//         (async () => {
//             try {
//                 const db = await openDB();
//                 const now = new Date();
//                 const playedTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

//                 await db.executeSql(
//                     "UPDATE notification_history SET played = 1, played_time = ? WHERE id = ?",
//                     [playedTime, item.id]
//                 );
//             } catch (error) {
//                 console.error("Error updating notification:", error);
//             }
//         })();
//     };

//     const stopAudio = () => {
//         if (sound) {
//             sound.stop(() => {
//                 sound.release();
//                 setIsPlaying(false);
//             });
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Surah Title */}
//             <Text style={styles.surah}>{item.EnglishName} ({item.ArabicName})</Text>

//             {/* Date & Time */}
//             <View style={styles.timeContainer}>
//                 <Text style={styles.dateText}>{item.DayName} • {item.date}</Text>
//                 {item.notification_time && (
//                     <Text style={styles.timeText}>Sent at: {formatTime(item.notification_time)}</Text>
//                 )}
//                 {item.played_time && (
//                     <Text style={styles.playedTimeText}>Played at: {formatTime(item.played_time)}</Text>
//                 )}
//             </View>

//             {/* White Card */}
//             <View style={styles.card}>
//                 {/* Arabic - Always shown */}
//                 <Text style={styles.arabic}>{item.Arabic}</Text>

//                 {/* Urdu - Conditionally shown */}
//                 {showUrdu && (
//                     <Text style={styles.urdu}>{item.Urdu}</Text>
//                 )}

//                 {/* English - Conditionally shown */}
//                 {showEnglish && (
//                     <Text style={styles.english}>{item.English}</Text>
//                 )}
//             </View>

//             {/* Play / Stop button */}
//             <TouchableOpacity style={styles.playBtn} onPress={playAyahAudio}>
//                 <Text style={styles.playBtnText}>
//                     {isPlaying ? "⏹ Stop" : "▶️ Play"}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#F8EDF9", padding: 20 },

//     surah: { fontSize: 22, fontWeight: "bold", marginBottom: 6, color: "#000", textAlign: "center", marginTop: 30, marginBottom: 10 },
//     timeContainer: { marginBottom: 26 },
//     dateText: { fontSize: 14, color: "#666", textAlign: "center" },
//     timeText: { fontSize: 12, color: "#666", textAlign: "center", marginTop: 2 },
//     playedTimeText: { fontSize: 12, color: "#4CAF50", textAlign: "center", marginTop: 2, fontStyle: 'italic' },

//     card: {
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: 20,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//         elevation: 3,
//     },

//     arabic: { fontSize: 24, textAlign: "right", marginBottom: 12, color: "#000", fontWeight: "bold" },
//     urdu: { fontSize: 18, textAlign: "right", marginBottom: 10, color: "#333" },
//     english: { fontSize: 16, marginBottom: 10, color: "#444", textAlign: "left" },

//     playBtn: {
//         backgroundColor: "#6C63FF",
//         paddingVertical: 14,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     playBtnText: {
//         color: "white",
//         fontSize: 18,
//         fontWeight: "bold",
//     },
// });

// export default NotificationDetails;


//test autoplay



import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Sound, { enable } from "react-native-sound";
import AsyncStorage from '@react-native-async-storage/async-storage';

import openDB from "./DB";
import AutoPlay from "./Autoplay";

Sound.setCategory("Playback");

const NotificationDetails = ({ route }) => {
    const { item } = route.params;
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showEnglish, setShowEnglish] = useState(true);
    const [showUrdu, setShowUrdu] = useState(true);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
    

    useEffect(() => {
        loadLanguageSettings();

        
        playAyahAudio();

        return () => {
            if (sound) sound.release();
        };
    }, [sound]);

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

    useEffect(() => {
        return () => {
            if (autoPlayEnabled ) {
                setTimeout(() => {
                    playAyahAudio();
                    
                });
            }
        };
    }, [sound]);



    useEffect(() => {
            
            loadAutoPlaySetting();
            
        }, []);
        


    


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

    const formatTime = (timeString) => {
        if (!timeString) return "";

        try {
            const [hours, minutes] = timeString.split(':');
            const hour = parseInt(hours);
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;

            return `${displayHour}:${minutes} ${period}`;
        } catch (e) {
            return timeString; // Return original if parsing fails
        }
    };

    const playAyahAudio = () => {
        if (isPlaying) {
            stopAudio();
            return;
        }

        const surahId = String(item.surah_id).padStart(3, "0");
        const ayahLoc = String(item.ayah_location).padStart(3, "0");
        const fileName = `a${surahId}${ayahLoc}.mp3`;

        if (sound) sound.release();

        const newSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                Alert.alert("Error", "Audio load failed: " + error.message);
                return;
            }
            newSound.play((success) => {
                if (!success) Alert.alert("Error", "Playback failed");
                newSound.release();
                setIsPlaying(false);
            });
        });

        setSound(newSound);
        setIsPlaying(true);

        // ✅ Mark as played in DB with timestamp
        (async () => {
            try {
                const db = await openDB();
                const now = new Date();
                const playedTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

                await db.executeSql(
                    "UPDATE notification_history SET played = 1, played_time = ? WHERE id = ?",
                    [playedTime, item.id]
                );
            } catch (error) {
                console.error("Error updating notification:", error);
            }
        })();
    };

    const stopAudio = () => {
        if (sound) {
            sound.stop(() => {
                sound.release();
                setIsPlaying(false);
            });
        }
    };

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


    return (
        <View style={styles.container}>
            {/* Surah Title */}
            <Text style={styles.surah}>{item.EnglishName} ({item.ArabicName})</Text>

            {/* Date & Time */}
            <View style={styles.timeContainer}>
                <Text style={styles.dateText}>{item.DayName} • {item.date}</Text>
                {item.notification_time && (
                    <Text style={styles.timeText}>Sent at: {formatTime(item.notification_time)}</Text>
                )}
                {item.played_time && (
                    <Text style={styles.playedTimeText}>Played at: {formatTime(item.played_time)}</Text>
                )}
            </View>

            {/* White Card */}
            <View style={styles.card}>
                {/* Arabic - Always shown */}
                <Text style={styles.arabic}>{item.Arabic}</Text>

                {/* Urdu - Conditionally shown */}
                {showUrdu && (
                    <Text style={styles.urdu}>{item.Urdu}</Text>
                )}

                {/* English - Conditionally shown */}
                {showEnglish && (
                    <Text style={styles.english}>{item.English}</Text>
                )}
            </View>

            {/* Play / Stop button */}
            <TouchableOpacity style={styles.playBtn} onPress={playAyahAudio}>
                <Text style={styles.playBtnText}>
                    {isPlaying ? "⏹ Stop" : "▶️ Play"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8EDF9", padding: 20 },

    surah: { fontSize: 22, fontWeight: "bold", marginBottom: 6, color: "#000", textAlign: "center", marginTop: 30, marginBottom: 10 },
    timeContainer: { marginBottom: 26 },
    dateText: { fontSize: 14, color: "#666", textAlign: "center" },
    timeText: { fontSize: 12, color: "#666", textAlign: "center", marginTop: 2 },
    playedTimeText: { fontSize: 12, color: "#4CAF50", textAlign: "center", marginTop: 2, fontStyle: 'italic' },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },

    arabic: { fontSize: 24, textAlign: "right", marginBottom: 12, color: "#000", fontWeight: "bold" },
    urdu: { fontSize: 18, textAlign: "right", marginBottom: 10, color: "#333" },
    english: { fontSize: 16, marginBottom: 10, color: "#444", textAlign: "left" },

    playBtn: {
        backgroundColor: "#6C63FF",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    playBtnText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default NotificationDetails;