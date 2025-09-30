

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import openDB from './DB';
import { useNavigation } from '@react-navigation/native';

const ViewSettings = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('day'); // 'day', 'mood', or 'all'
    const [dayMappings, setDayMappings] = useState([]);
    const [moodMappings, setMoodMappings] = useState([]);
    const [allMappings, setAllMappings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState([]);
    const [moods, setMoods] = useState([]);

    useEffect(() => {
        loadMappings();
        loadDaysAndMoods();
    }, []);

    const loadDaysAndMoods = async () => {
        try {
            const db = await openDB();

            // Load all days
            const dayResults = await db.executeSql(`SELECT * FROM Day ORDER BY day_id`);
            let dayData = [];
            for (let i = 0; i < dayResults[0].rows.length; i++) {
                dayData.push(dayResults[0].rows.item(i));
            }
            setDays(dayData);

            // Load all moods
            const moodResults = await db.executeSql(`SELECT * FROM Mood ORDER BY mood_id`);
            let moodData = [];
            for (let i = 0; i < moodResults[0].rows.length; i++) {
                moodData.push(moodResults[0].rows.item(i));
            }
            setMoods(moodData);
        } catch (error) {
            console.error('Error loading days and moods:', error);
        }
    };

    const loadMappings = async () => {
        try {
            const db = await openDB();

            // Load day mappings (where mood_id is null)
            const dayResults = await db.executeSql(`
        SELECT m.*, d.name as day_name, s.EnglishName as surah_name 
        FROM mood_day_custom_map m 
        JOIN Day d ON m.day_id = d.day_id 
        JOIN Surahs s ON m.surah_id = s.surah_id 
       
        ORDER BY d.day_id, s.EnglishName
      `);

            let dayData = [];
            for (let i = 0; i < dayResults[0].rows.length; i++) {
                dayData.push(dayResults[0].rows.item(i));
            }
            setDayMappings(dayData);

            // Load mood mappings (where day_id is null)
            const moodResults = await db.executeSql(`
        SELECT m.*, mo.name as mood_name, s.EnglishName as surah_name 
        FROM mood_day_custom_map m 
        JOIN Mood mo ON m.mood_id = mo.mood_id 
        JOIN Surahs s ON m.surah_id = s.surah_id 
        
        ORDER BY mo.mood_id, s.EnglishName
      `);

            let moodData = [];
            for (let i = 0; i < moodResults[0].rows.length; i++) {
                moodData.push(moodResults[0].rows.item(i));
            }
            setMoodMappings(moodData);

            // Load all mappings (both day and mood)
            const allResults = await db.executeSql(`
        SELECT m.*, 
               d.name as day_name, 
               mo.name as mood_name, 
               s.EnglishName as surah_name 
        FROM mood_day_custom_map m 
        JOIN Day d ON m.day_id = d.day_id 
        JOIN Mood mo ON m.mood_id = mo.mood_id 
        JOIN Surahs s ON m.surah_id = s.surah_id 
        ORDER BY d.day_id, mo.mood_id, s.EnglishName
      `);

            let allData = [];
            for (let i = 0; i < allResults[0].rows.length; i++) {
                allData.push(allResults[0].rows.item(i));
            }
            setAllMappings(allData);

            setLoading(false);
        } catch (error) {
            console.error('Error loading mappings:', error);
            setLoading(false);
        }
    };

    const groupByDay = (data) => {
        const grouped = {};

        // Initialize with all days
        days.forEach(day => {
            grouped[day.name] = [];
        });

        // Add mappings for each day
        data.forEach(item => {
            if (grouped[item.day_name]) {
                grouped[item.day_name].push(item);
            }
        });

        return grouped;
    };

    const groupByMood = (data) => {
        const grouped = {};

        // Initialize with all moods
        moods.forEach(mood => {
            grouped[mood.name] = [];
        });

        // Add mappings for each mood
        data.forEach(item => {
            if (grouped[item.mood_name]) {
                grouped[item.mood_name].push(item);
            }
        });

        return grouped;
    };

    const groupByDayAndMood = (data) => {
        const grouped = {};

        // Initialize with all days
        days.forEach(day => {
            grouped[day.name] = {};

            // Initialize with all moods for each day
            moods.forEach(mood => {
                grouped[day.name][mood.name] = [];
            });
        });

        // Add mappings for each day and mood combination
        data.forEach(item => {
            if (grouped[item.day_name] && grouped[item.day_name][item.mood_name]) {
                grouped[item.day_name][item.mood_name].push(item);
            }
        });

        return grouped;
    };

    const renderDayMappings = () => {
        const groupedData = groupByDay(dayMappings);

        return days.map(day => (
            <View key={day.day_id} style={styles.section}>
                <Text style={styles.sectionHeader}>{day.name}</Text>
                {groupedData[day.name].length > 0 ? (
                    groupedData[day.name].map((item, index) => (
                        <View key={index} style={styles.mappingItem}>
                            <Text style={styles.mappingText}>
                                {item.surah_name} (Ayah {item.from_ayah} - {item.to_ayah})
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No ayats mapped for this day</Text>
                )}
            </View>
        ));
    };

    const renderMoodMappings = () => {
        const groupedData = groupByMood(moodMappings);

        return moods.map(mood => (
            <View key={mood.mood_id} style={styles.section}>
                <Text style={styles.sectionHeader}>{mood.name}</Text>
                {groupedData[mood.name].length > 0 ? (
                    groupedData[mood.name].map((item, index) => (
                        <View key={index} style={styles.mappingItem}>
                            <Text style={styles.mappingText}>
                                {item.surah_name} (Ayah {item.from_ayah} - {item.to_ayah})
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No ayats mapped for this mood</Text>
                )}
            </View>
        ));
    };

    const renderAllMappings = () => {
        const groupedData = groupByDayAndMood(allMappings);

        return days.map(day => (
            <View key={day.day_id} style={styles.section}>
                <Text style={styles.sectionHeader}>{day.name}</Text>
                {moods.map(mood => (
                    <View key={`${day.day_id}-${mood.mood_id}`} style={styles.subSection}>
                        <Text style={styles.subSectionHeader}>{mood.name}</Text>
                        {groupedData[day.name][mood.name].length > 0 ? (
                            groupedData[day.name][mood.name].map((item, index) => (
                                <View key={index} style={styles.mappingItem}>
                                    <Text style={styles.mappingText}>
                                        {item.surah_name} (Ayah {item.from_ayah} - {item.to_ayah})
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noDataText}>No ayats mapped for this combination</Text>
                        )}
                    </View>
                ))}
            </View>
        ));
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>View Settings</Text>
                <View style={styles.headerSpacer} />
            </View>

            {/* Tab Buttons */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'day' && styles.activeTab]}
                    onPress={() => setActiveTab('day')}
                >
                    <Text style={[styles.tabText, activeTab === 'day' && styles.activeTabText]}>
                        Day Ayats
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'mood' && styles.activeTab]}
                    onPress={() => setActiveTab('mood')}
                >
                    <Text style={[styles.tabText, activeTab === 'mood' && styles.activeTabText]}>
                        Mood Ayats
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'all' && styles.activeTab]}
                    onPress={() => setActiveTab('all')}
                >
                    <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                        All Ayats
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.content}>
                {activeTab === 'day' && renderDayMappings()}
                {activeTab === 'mood' && renderMoodMappings()}
                {activeTab === 'all' && renderAllMappings()}

                {(activeTab === 'day' && dayMappings.length === 0) && (
                    <Text style={styles.emptyText}>No day mappings found. Add some in Settings.</Text>
                )}

                {(activeTab === 'mood' && moodMappings.length === 0) && (
                    <Text style={styles.emptyText}>No mood mappings found. Add some in Settings.</Text>
                )}

                {(activeTab === 'all' && allMappings.length === 0) && (
                    <Text style={styles.emptyText}>No combined mappings found. Add some in Settings.</Text>
                )}
            </ScrollView>
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
        paddingTop: 50,
    },
    backButton: {
        fontSize: 24,
        color: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    headerSpacer: {
        width: 24,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#E5D5F7',
    },
    activeTab: {
        backgroundColor: '#C5A4F7',
    },
    tabText: {
        color: '#555',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#000',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 15,
    },
    section: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5D5F7',
        paddingBottom: 5,
    },
    subSection: {
        marginBottom: 15,
        paddingLeft: 10,
    },
    subSectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
    },
    mappingItem: {
        padding: 10,
        backgroundColor: '#F8F4FF',
        borderRadius: 8,
        marginBottom: 8,
    },
    mappingText: {
        fontSize: 14,
        color: '#333',
    },
    noDataText: {
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic',
        marginLeft: 10,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 50,
    },
});

export default ViewSettings;