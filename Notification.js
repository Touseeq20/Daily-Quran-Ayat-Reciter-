import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView,
    SectionList
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import openDB from "./DB";


Sound.setCategory('Playback');

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [moods, setMoods] = useState([]);
    const [days, setDays] = useState([]);
    const [surahs, setSurahs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [groupedNotifications, setGroupedNotifications] = useState([]);

    // Dropdown filters
    const [selectedMood, setSelectedMood] = useState('all');
    const [selectedDay, setSelectedDay] = useState('all');
    const [selectedSurah, setSelectedSurah] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Date filters
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    const [sound, setSound] = useState(null);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

    const navigation = useNavigation();



    useEffect(() => {
        (async () => {
            try {
                const db = await openDB(); // DB open/copy

              
                await generateDailyNotification(db); // App launch pe notification generate
            } catch (error) {
                console.error("Error in app initialization:", error);
            }
        })();
    }, []);




    useEffect(() => {
        fetchNotifications();
        loadFilterData();
        loadAutoPlaySetting();


    }, []);

    useEffect(() => {
        filterNotifications();
    }, [notifications, selectedMood, selectedDay, selectedSurah, selectedStatus, fromDate, toDate]);

    useEffect(() => {
        groupNotificationsByDate();
    }, [filteredNotifications]);

    const fetchNotifications = async () => {
        try {
            const db = await openDB();

            // fetch notifications with mood and day information
            const [results] = await db.executeSql(
                `SELECT n.id, n.date, n.played, n.mood_id, n.day_id, n.notification_time, n.played_time,
                        q.ayah_Id, q.surah_id, q.ayah_location,
                        q.Arabic, q.Urdu, q.English,
                        s.EnglishName, s.ArabicName, 
                        d.name as DayName,
                        m.name as MoodName
                 FROM notification_history n
                 JOIN Quran q ON n.ayat_id = q.ayah_Id
                 JOIN Surahs s ON n.surah_id = s.surah_id
                 LEFT JOIN Day d ON n.day_id = d.day_id
                 LEFT JOIN Mood m ON n.mood_id = m.mood_id
                 WHERE date(n.date)=date('now','localtime') 
                 ORDER BY n.date DESC, n.id DESC
                 LIMIT 1`// remove where date and limit for all data

            );

            let temp = [];
            for (let i = 0; i < results.rows.length; i++) {
                temp.push(results.rows.item(i));
            }
            setNotifications(temp);
        } catch (error) {
            console.error("Error fetching notifications:", error);
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

    const filterNotifications = () => {
        let filtered = [...notifications];

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

        // Status filter
        if (selectedStatus !== 'all') {
            if (selectedStatus === 'played') {
                filtered = filtered.filter(item => item.played);
            } else if (selectedStatus === 'unplayed') {
                filtered = filtered.filter(item => !item.played);
            }
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

        setFilteredNotifications(filtered);
    };

    const groupNotificationsByDate = () => {
        const grouped = filteredNotifications.reduce((acc, item) => {
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

        setGroupedNotifications(sections);
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

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return 'Select Date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const clearAllFilters = () => {
        setSelectedMood('all');
        setSelectedDay('all');
        setSelectedSurah('all');
        setSelectedStatus('all');
        setFromDate(null);
        setToDate(null);
    };

    const renderNotificationItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, item.played ? styles.played : styles.unplayed]}
            onPress={() => navigation.navigate("NotificationDetails", { item })}

        >


            {/* Date and Time */}
            <View style={styles.timeContainer}>
                <Text style={styles.dateText}>
                    {item.date}
                    {item.notification_time && ` at ${formatTime(item.notification_time)}`}
                </Text>
                {item.played_time && (
                    <Text style={styles.playedTimeText}>
                        Played at: {formatTime(item.played_time)}
                    </Text>
                )}
            </View>

            {/* Source - agar mood_id hai toh mood-based, nahi toh day-based */}
            <Text style={styles.sourceText}>
                {item.mood_id ? `Based on your mood (${item.MoodName})` : `Based on day (${item.DayName})`}
            </Text>

            {/* Surah Name */}
            <Text style={styles.surah}>
                {item.EnglishName} ({item.ArabicName})
            </Text>

            {/* Ayat Location */}
            <Text style={styles.ayahInfo}>
                Ayah {item.ayah_location}
            </Text>

            {/* Status Indicator */}
            <Text style={styles.statusText}>
                Status: {item.played ? "Played" : "Unplayed"}
            </Text>
        </TouchableOpacity>

    );

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
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


    // ✅ Current Day ka day_id find karna
    const getCurrentDayId = async (db) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = days[new Date().getDay()]; // e.g. "Monday"

        const [results] = await db.executeSql(
            "SELECT day_id FROM Day WHERE name = ?",
            [today]
        );

        if (results.rows.length > 0) {
            return results.rows.item(0).day_id;
        } else {
            return null;
        }
    };

    // ✅ User ka last mood get karna from daily_ayat_history (sirf kal ki date check karein)
    const getLastUserMood = async (db) => {
        try {
            // Kal ki date nikalte hain (yesterday)
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayDate = yesterday.toISOString().split("T")[0];

            // Sirf kal ke history se mood fetch karte hain
            const [results] = await db.executeSql(
                `SELECT mood_id 
       FROM daily_ayat_history 
       WHERE date = ? AND mood_id IS NOT NULL 
       ORDER BY id DESC 
       LIMIT 1`,
                [yesterdayDate]
            );

            if (results.rows.length > 0) {
                return results.rows.item(0).mood_id;
            }

            return null;
        } catch (error) {
            console.error("Error getting last user mood:", error);
            return null;
        }
    };

    // ✅ Check if notification is enabled for today
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


    const isNotificationEnabledForTodayAndTime = async (db) => {
        try {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const today = days[new Date().getDay()];
            const now = new Date();
            const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

            const [results] = await db.executeSql(
                `SELECT nt.enabled 
       FROM notification_schedule nt
       JOIN Day d ON nt.day_id = d.day_id
       WHERE d.name = ? AND nt.time = ?`,
                [today, currentTime]
            );

            if (results.rows.length > 0) {
                return results.rows.item(0).enabled === 1;
            }

            return false;
        } catch (error) {
            console.error("Error checking notification status:", error);
            return false;
        }
    };

    // ✅ Daily random ayat generate karke notification_history me insert karna
    const generateDailyNotification = async (db) => {
        const todayDate = new Date().toISOString().split("T")[0];
        const now = new Date();
        const notificationTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

        // Check karein ki is time ke liye notification enabled hai ya nahi
        const isEnabled = await isNotificationEnabledForTodayAndTime(db);
        if (!isEnabled) {
            console.log("🔕 Notifications are disabled for this time");
            return;
        }

        // Pehle check karte hain ki is time ke liye notification already generated toh nahi hai
        const [check] = await db.executeSql(
            "SELECT id FROM notification_history WHERE date = ? AND notification_time = ?",
            [todayDate, notificationTime]
        );

        if (check.rows.length > 0) {
            console.log("⚠️ Notification already exists for this time today");
            return;
        }

        // Baaki ka logic same rahega...
        // User ka last mood get karte hain (sirf kal ke liye)
        const lastMoodId = await getLastUserMood(db);
        const dayId = await getCurrentDayId(db);

        let query = '';
        let params = [];
        let moodIdForNotification = 0;
        let notificationSource = 'day'; // 'mood' or 'day'

        if (lastMoodId) {
            // Agar user ne kal mood select kiya tha, toh usi ke hisab se ayat select karte hain
            query = `
      SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
             s.EnglishName, s.ArabicName
      FROM Quran q
      JOIN Surahs s ON q.surah_id = s.surah_id
      JOIN mood_day_custom_map m 
           ON q.surah_id = m.surah_id 
          AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
      WHERE m.mood_id = ?
      ORDER BY RANDOM() LIMIT 1
    `;
            params = [lastMoodId];
            moodIdForNotification = lastMoodId;
            notificationSource = 'mood';
        } else if (dayId) {
            // Agar kal ka mood nahi mila, toh aaj ke day ke hisab se ayat select karte hain
            query = `
      SELECT q.ayah_Id, q.surah_id, q.Arabic, q.Urdu, q.English, 
             s.EnglishName, s.ArabicName
      FROM Quran q
      JOIN Surahs s ON q.surah_id = s.surah_id
      JOIN mood_day_custom_map m 
           ON q.surah_id = m.surah_id 
          AND q.ayah_location BETWEEN m.from_ayah AND m.to_ayah
      WHERE m.day_id = ?
      ORDER BY RANDOM() LIMIT 1
    `;
            params = [dayId];
            moodIdForNotification = 0;
            notificationSource = 'day';
        } else {
            console.log("❌ No day or mood found for notification");
            return;
        }

        const [results] = await db.executeSql(query, params);

        if (results.rows.length > 0) {
            const row = results.rows.item(0);

            await db.executeSql(
                `INSERT INTO notification_history 
        (day_id, mood_id, surah_id, ayat_id, date, played, notification_time) 
       VALUES (?, ?, ?, ?, ?, 0, ?)`,
                [dayId, moodIdForNotification, row.surah_id, row.ayah_Id, todayDate, notificationTime]
            );
            console.log(`✅ Daily notification generated (based on ${notificationSource}) at ${notificationTime}`);
        }
    };

    // ✅ Daily random ayat generate karke notification_history me insert karna
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

    // Check karein ki aaj ke din notification enabled hai ya nahi
    // const isEnabled = await isNotificationEnabledForToday(db);
    // if (!isEnabled) {
    //   console.log("🔕 Notifications are disabled for today");
    //   return;
    // }

    // User ka last mood get karte hain (sirf kal ke liye)
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


    return (
        <View style={styles.container}>
            <Text style={styles.header}>📌 Notifications</Text>

            {/* Filter Button */}
            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowFilters(true)}
            >
                <Text style={styles.filterButtonText}>🔍 Advanced Filters</Text>
            </TouchableOpacity>

            {/* Active Filters Indicator */}
            {(selectedMood !== 'all' || selectedDay !== 'all' || selectedSurah !== 'all' ||
                selectedStatus !== 'all' || fromDate || toDate) && (
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
                            {selectedStatus !== 'all' && (
                                <View style={styles.filterChip}>
                                    <Text style={styles.filterChipText}>
                                        Status: {selectedStatus}
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

            {/* Notifications List */}
            {groupedNotifications.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No notifications found</Text>
                    <Text style={styles.emptySubText}>
                        {selectedMood !== 'all' || selectedDay !== 'all' || selectedSurah !== 'all' ||
                            selectedStatus !== 'all' || fromDate || toDate ?
                            'No notifications match your filters' :
                            'Your notifications will appear here'
                        }
                    </Text>
                </View>
            ) : (
                <SectionList
                    sections={groupedNotifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderNotificationItem}
                    renderSectionHeader={renderSectionHeader}
                    stickySectionHeadersEnabled={true}
                />
            )}

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

                            {/* Status Filter */}
                            <Text style={styles.filterLabel}>Status:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedStatus}
                                    onValueChange={setSelectedStatus}
                                    style={styles.picker}
                                    dropdownIconColor="#000"
                                >
                                    <Picker.Item label="All Status" value="all" color="#000" />
                                    <Picker.Item label="Played" value="played" color="#000" />
                                    <Picker.Item label="Unplayed" value="unplayed" color="#000" />
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
        backgroundColor: "#F8EDF9",
        padding: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        color: "#000",
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
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 10,
        elevation: 3,
    },
    timeContainer: {
        marginBottom: 6,
    },
    playedTimeText: {
        fontSize: 12,
        color: "#4CAF50",
        marginTop: 2,
        fontStyle: 'italic',
    },
    surah: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#2c3e50",
    },
    unplayed: {
        borderLeftWidth: 5,
        borderLeftColor: "red"
    },
    played: {
        borderLeftWidth: 5,
        borderLeftColor: "green",
        opacity: 0.8
    },
    dateText: {
        fontSize: 13,
        color: "#666",
        marginBottom: 6
    },
    sourceText: {
        fontSize: 12,
        color: "#888",
        marginBottom: 8,
        fontStyle: 'italic',
    },
    ayahInfo: {
        fontSize: 14,
        color: "#7f8c8d",
        marginBottom: 4,
    },
    statusText: {
        fontSize: 12,
        color: "#888",
        fontStyle: "italic",
        marginTop: 4,
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

export default Notification;