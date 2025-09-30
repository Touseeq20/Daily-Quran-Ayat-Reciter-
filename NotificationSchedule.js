
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Alert,
    Platform,
    TextInput,
    FlatList
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import openDB from "./DB";

const NotificationSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(null);
    const [days, setDays] = useState([]);
    const [editingTime, setEditingTime] = useState(null);
    const [newTime, setNewTime] = useState('');

    useEffect(() => {
        loadSchedule();
        loadDays();
    }, []);

    const loadDays = async () => {
        try {
            const db = await openDB();
            const [results] = await db.executeSql('SELECT * FROM Day ORDER BY day_id');

            let temp = [];
            for (let i = 0; i < results.rows.length; i++) {
                temp.push(results.rows.item(i));
            }
            setDays(temp);
        } catch (error) {
            console.error("Error loading days:", error);
        }
    };

    const loadSchedule = async () => {
        try {
            const db = await openDB();
            const [results] = await db.executeSql(`
                SELECT nt.*, d.name as day_name 
                FROM notification_schedule nt
                JOIN Day d ON nt.day_id = d.day_id
                ORDER BY d.day_id, nt.time
            `);

            let temp = [];
            for (let i = 0; i < results.rows.length; i++) {
                temp.push(results.rows.item(i));
            }
            setSchedule(temp);
        } catch (error) {
            console.error("Error loading schedule:", error);
        }
    };

    const addNewTime = async (dayId) => {
        if (!newTime) {
            Alert.alert("Error", "Please enter a valid time");
            return;
        }

        try {
            const db = await openDB();
            await db.executeSql(
                'INSERT INTO notification_schedule (day_id, time, enabled) VALUES (?, ?, 1)',
                [dayId, newTime]
            );

            setNewTime('');
            setEditingTime(null);
            loadSchedule();
            Alert.alert("Success", "Notification time added");
        } catch (error) {
            console.error("Error adding time:", error);
            Alert.alert("Error", "Failed to add notification time");
        }
    };

    const updateTime = async (id, newTimeValue) => {
        try {
            const db = await openDB();
            await db.executeSql(
                'UPDATE notification_schedule SET time = ?, updated_at = datetime("now") WHERE id = ?',
                [newTimeValue, id]
            );

            loadSchedule();
        } catch (error) {
            console.error("Error updating time:", error);
            Alert.alert("Error", "Failed to update notification time");
        }
    };

    const deleteTime = async (id) => {
        Alert.alert(
            "Delete Time",
            "Are you sure you want to delete this notification time?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const db = await openDB();
                            await db.executeSql('DELETE FROM notification_schedule WHERE id = ?', [id]);
                            loadSchedule();
                            Alert.alert("Success", "Notification time deleted");
                        } catch (error) {
                            console.error("Error deleting time:", error);
                            Alert.alert("Error", "Failed to delete notification time");
                        }
                    }
                }
            ]
        );
    };

    const toggleEnabled = async (id, currentValue) => {
        try {
            const db = await openDB();
            await db.executeSql(
                'UPDATE notification_schedule SET enabled = ?, updated_at = datetime("now") WHERE id = ?',
                [currentValue ? 0 : 1, id]
            );

            loadSchedule();
        } catch (error) {
            console.error("Error toggling notification:", error);
            Alert.alert("Error", "Failed to update notification setting");
        }
    };

    const resetToDefault = async () => {
        Alert.alert(
            "Reset Schedule",
            "Are you sure you want to reset all notification times to default?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    onPress: async () => {
                        try {
                            const db = await openDB();

                            // Pehle sabhi existing times delete karein
                            await db.executeSql('DELETE FROM notification_schedule');

                            // Default times add karein har din ke liye
                            const defaultTimes = [
                                { day_id: 0, time: '05:00' }, // Sunday
                                { day_id: 1, time: '05:00' }, // Monday
                                { day_id: 2, time: '05:00' }, // Tuesday
                                { day_id: 3, time: '05:00' }, // Wednesday
                                { day_id: 4, time: '05:00' }, // Thursday
                                { day_id: 5, time: '05:00' }, // Friday
                                { day_id: 6, time: '06:00' }, // Saturday
                            ];

                            for (const time of defaultTimes) {
                                await db.executeSql(
                                    'INSERT INTO notification_schedule (day_id, time, enabled) VALUES (?, ?, 1)',
                                    [time.day_id, time.time]
                                );
                            }

                            loadSchedule();
                            Alert.alert("Success", "Notification schedule reset to default");
                        } catch (error) {
                            console.error("Error resetting schedule:", error);
                            Alert.alert("Error", "Failed to reset notification schedule");
                        }
                    }
                }
            ]
        );
    };

    const formatTime = (timeString) => {
        if (!timeString) return "Not set";

        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;

        return `${displayHour}:${minutes} ${period}`;
    };

    const renderDaySchedule = (day) => {
        const dayTimes = schedule.filter(item => item.day_id === day.day_id);

        return (
            <View key={day.day_id} style={styles.dayContainer}>
                <Text style={styles.dayName}>{day.name}</Text>

                <FlatList
                    data={dayTimes}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.timeItem}>
                            <TouchableOpacity
                                onPress={() => setShowTimePicker(item.id)}
                                style={styles.timeButton}
                            >
                                <Text style={styles.timeText}>
                                    {formatTime(item.time)}
                                </Text>
                            </TouchableOpacity>

                            <Switch
                                value={item.enabled === 1}
                                onValueChange={() => toggleEnabled(item.id, item.enabled)}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={item.enabled ? "#8E44AD" : "#f4f3f4"}
                            />

                            <TouchableOpacity
                                onPress={() => deleteTime(item.id)}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteText}>❌</Text>
                            </TouchableOpacity>

                            {showTimePicker === item.id && (
                                <DateTimePicker
                                    value={new Date(`2000-01-01T${item.time}`)}
                                    mode="time"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={(event, selectedTime) => {
                                        setShowTimePicker(null);
                                        if (selectedTime) {
                                            const timeString = selectedTime.toTimeString().split(' ')[0].substring(0, 5);
                                            updateTime(item.id, timeString);
                                        }
                                    }}
                                />
                            )}
                        </View>
                    )}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                />

                {editingTime === day.day_id ? (
                    <View style={styles.addTimeContainer}>
                        <TextInput
                            style={styles.timeInput}
                            placeholder="HH:MM"
                            value={newTime}
                            onChangeText={setNewTime}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => addNewTime(day.day_id)}
                        >
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setEditingTime(null)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.addTimeButton}
                        onPress={() => setEditingTime(day.day_id)}
                    >
                        <Text style={styles.addTimeButtonText}>+ Add Time</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>⏰ Notification Schedule</Text>

            <FlatList
                data={days}
                keyExtractor={(item) => item.day_id.toString()}
                renderItem={({ item }) => renderDaySchedule(item)}
                ListFooterComponent={
                    <>
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={resetToDefault}
                        >
                            <Text style={styles.resetButtonText}>Reset to Default Schedule</Text>
                        </TouchableOpacity>

                        <Text style={styles.note}>
                            Note: You can add multiple notification times for each day.
                            Notifications will be delivered daily at the specified times if enabled.
                        </Text>
                    </>
                }
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8EDF9",
        padding: 15
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        color: "#000",
    },
    list: {
        flex: 1,
    },
    dayContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    dayName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2c3e50",
        marginBottom: 10,
    },
    timeItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        padding: 8,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
    },
    timeButton: {
        flex: 1,
    },
    timeText: {
        fontSize: 16,
        color: "#8E44AD",
        fontWeight: "500",
    },
    deleteButton: {
        padding: 5,
        marginLeft: 10,
    },
    deleteText: {
        fontSize: 16,
    },
    addTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    timeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 8,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: "#8E44AD",
        padding: 8,
        borderRadius: 5,
        marginRight: 5,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#95a5a6",
        padding: 8,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    addTimeButton: {
        backgroundColor: "#E0D5E1",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    addTimeButtonText: {
        color: "#8E44AD",
        fontWeight: "bold",
    },
    resetButton: {
        backgroundColor: "#8E44AD",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    resetButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    note: {
        fontSize: 12,
        color: "#7f8c8d",
        textAlign: "center",
        marginTop: 10,
        fontStyle: "italic",
    },
});

export default NotificationSchedule;