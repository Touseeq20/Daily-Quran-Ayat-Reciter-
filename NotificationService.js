import notifee from '@notifee/react-native';
import openDB from './DB';
import BackgroundTimer from 'react-native-background-timer';

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
const isNotificationEnabledForToday = async (db) => {
    try {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = days[new Date().getDay()];

        const [results] = await db.executeSql(
            `SELECT ns.enabled 
       FROM notification_schedule ns
       JOIN Day d ON ns.day_id = d.day_id
       WHERE d.name = ?`,
            [today]
        );

        if (results.rows.length > 0) {
            return results.rows.item(0).enabled === 1;
        }

        // Agar data nahi mila toh by default enabled consider karein
        return true;
    } catch (error) {
        console.error("Error checking notification status:", error);
        // Error case mein bhi enabled consider karein
        return true;
    }
};

// ✅ Aapka original generateDailyNotification logic with improvements
const generateDailyNotification = async (db) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const now = new Date();
    const notificationTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

    // Pehle check karte hain ki aaj ke liye notification already generated toh nahi hai
    const [check] = await db.executeSql(
        "SELECT id FROM notification_history WHERE date = ?",
        [todayDate]
    );

    if (check.rows.length > 0) {
        console.log("⚠️ Notification already exists for today");
        return null;
    }

    // Check karein ki aaj ke din notification enabled hai ya nahi
    const isEnabled = await isNotificationEnabledForToday(db);
    if (!isEnabled) {
        console.log("🔕 Notifications are disabled for today");
        return null;
    }

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
        return null;
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
        return row;
    }

    return null;
};

// Schedule a notification for a specific day and time
const scheduleNotification = async (dayOfWeek, hour, minute, dayName) => {
    try {
        // Request notification permissions
        await notifee.requestPermission();

        // Create a time object for the notification
        const date = new Date();
        date.setDate(date.getDate() + ((dayOfWeek + 7 - date.getDay()) % 7));
        date.setHours(hour, minute, 0, 0);

        // Create a trigger for the notification
        const trigger = {
            type: 4, // TIMESTAMP
            timestamp: date.getTime(),
            repeatFrequency: 1, // WEEKLY
        };

        // Aapke logic se verse generate karenge
        const db = await openDB();
        const verse = await generateDailyNotification(db);

        if (verse) {
            // Create the notification
            await notifee.createTriggerNotification(
                {
                    id: `daily-${dayName.toLowerCase()}`,
                    title: `Daily Quran Verse - ${dayName}`,
                    body: verse.English.substring(0, 100) + '...',
                    android: {
                        channelId: 'daily-quran',
                        pressAction: {
                            id: 'default',
                        },
                    },
                    data: {
                        surah: verse.EnglishName,
                        arabic: verse.Arabic,
                        urdu: verse.Urdu,
                        english: verse.English,
                        surah_id: verse.surah_id.toString(),
                        ayat_id: verse.ayah_Id.toString(),
                    },
                },
                trigger,
            );

            console.log(`Scheduled notification for ${dayName} at ${hour}:${minute}`);
        }
    } catch (error) {
        console.error('Error scheduling notification:', error);
    }
};

// Cancel all scheduled notifications
const cancelAllScheduledNotifications = async () => {
    try {
        await notifee.cancelAllNotifications();
        console.log('All notifications cancelled');
    } catch (error) {
        console.error('Error cancelling notifications:', error);
    }
};

// Initialize all scheduled notifications
const initializeScheduledNotifications = async () => {
    try {
        // Cancel any existing notifications
        await cancelAllScheduledNotifications();

        // Get all enabled schedules from database
        const db = await openDB();
        const [results] = await db.executeSql(`
            SELECT ns.*, d.name as day_name 
            FROM notification_schedule ns
            JOIN Day d ON ns.day_id = d.day_id
            WHERE ns.enabled = 1
        `);

        const daysMap = {
            "Sunday": 0,
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5,
            "Saturday": 6
        };

        // Schedule each notification
        for (let i = 0; i < results.rows.length; i++) {
            const item = results.rows.item(i);
            const dayOfWeek = daysMap[item.day_name];
            const [hours, minutes] = item.time.split(':');

            await scheduleNotification(
                dayOfWeek,
                parseInt(hours),
                parseInt(minutes),
                item.day_name
            );
        }

        console.log('All notifications initialized');
    } catch (error) {
        console.error('Error initializing notifications:', error);
    }
};

// Background check for notifications (as a fallback)
const startBackgroundNotificationCheck = () => {
    BackgroundTimer.runBackgroundTimer(async () => {
        try {
            const now = new Date();
            const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const today = days[now.getDay()];

            const db = await openDB();
            const [results] = await db.executeSql(
                `SELECT ns.time 
                 FROM notification_schedule ns
                 JOIN Day d ON ns.day_id = d.day_id
                 WHERE d.name = ? AND ns.enabled = 1`,
                [today]
            );

            if (results.rows.length > 0) {
                const scheduledTime = results.rows.item(0).time;

                // Check if it's time for the notification (within a 1-minute window)
                if (scheduledTime === currentTime) {
                    // Show immediate notification using your logic
                    const verse = await generateDailyNotification(db);
                    if (verse) {
                        await showImmediateNotification(today, verse);
                    }
                }
            }
        } catch (error) {
            console.error("Error in background notification check:", error);
        }
    }, 60000); // Check every minute
};

const showImmediateNotification = async (dayName, verse) => {
    try {
        await notifee.displayNotification({
            id: 'immediate-quran',
            title: `Daily Quran Verse - ${dayName}`,
            body: verse.English.substring(0, 100) + '...',
            android: {
                channelId: 'daily-quran',
                pressAction: {
                    id: 'default',
                },
            },
            data: {
                surah: verse.EnglishName,
                arabic: verse.Arabic,
                urdu: verse.Urdu,
                english: verse.English,
                surah_id: verse.surah_id.toString(),
                ayat_id: verse.ayah_Id.toString(),
            },
        });
    } catch (error) {
        console.error('Error showing immediate notification:', error);
    }
};

const stopBackgroundNotificationCheck = () => {
    BackgroundTimer.stopBackgroundTimer();
};

// App launch pe bhi notification generate karein
const generateNotificationOnAppLaunch = async () => {
    try {
        const db = await openDB();
        await generateDailyNotification(db);
    } catch (error) {
        console.error("Error generating notification on app launch:", error);
    }
};

export {
    scheduleNotification,
    cancelAllScheduledNotifications,
    initializeScheduledNotifications,
    startBackgroundNotificationCheck,
    stopBackgroundNotificationCheck,
    generateNotificationOnAppLaunch
};