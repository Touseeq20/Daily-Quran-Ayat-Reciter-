

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import openDB from './DB';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigation = useNavigation();
    const [days, setDays] = useState([]);
    const [moods, setMoods] = useState([]);
    const [surahs, setSurahs] = useState([]);

    const [day, setDay] = useState(null);
    const [mood, setMood] = useState(null);
    const [surah, setSurah] = useState(null);
    const [totalAyahs, setTotalAyahs] = useState(0);

    const [fromAyah, setFromAyah] = useState('');
    const [toAyah, setToAyah] = useState('');

    // Load dropdown data
    useEffect(() => {
        (async () => {
            const db = await openDB();

            const dayRes = await db.executeSql(`SELECT * FROM Day`);
            setDays(dayRes[0].rows.raw());

            const moodRes = await db.executeSql(`SELECT * FROM Mood`);
            setMoods(moodRes[0].rows.raw());

            const surahRes = await db.executeSql(`SELECT * FROM Surahs`);
            setSurahs(surahRes[0].rows.raw());
        })();
    }, []);

    // Fetch total ayahs for selected surah
    useEffect(() => {
        if (surah) {
            (async () => {
                const db = await openDB();
                const ayahRes = await db.executeSql(
                    `SELECT COUNT(*) as total FROM Quran WHERE surah_id = ?`,
                    [surah]
                );
                setTotalAyahs(ayahRes[0].rows.item(0).total);
            })();
        } else {
            setTotalAyahs(0);
        }
    }, [surah]);

    // Save data
    const handleSave = async () => {
        if (!surah || !fromAyah || !toAyah) {
            alert('Please select Surah and Ayah range');
            return;
        }

        if (!day && !mood) {
            alert('Please select at least Day or Mood');
            return;
        }

        try {
            const db = await openDB();
            await db.executeSql(
                `INSERT INTO mood_day_custom_map (day_id, mood_id, surah_id, from_ayah, to_ayah)
         VALUES (?, ?, ?, ?, ?)`,
                [
                    day ? day : null,
                    mood ? mood : null,
                    surah,
                    parseInt(fromAyah),
                    parseInt(toAyah),
                ]
            );

            alert('Setting saved successfully!');

            setDay(null);
            setMood(null);
            setSurah(null);
            setFromAyah('');
            setToAyah('');
            setTotalAyahs(0);
        } catch (error) {
            console.error('Error saving setting:', error);
            alert('Failed to save setting');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            {/* Day Picker */}
            <Text style={styles.label}>Select Day</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={day}
                    onValueChange={(val) => setDay(val || null)}
                    style={styles.picker}
                    dropdownIconColor="#000"
                >
                    <Picker.Item label="Select Day" value={null} color="#000" />
                    {days.map((d) => (
                        <Picker.Item key={d.day_id} label={d.name} value={d.day_id} color="#000" />
                    ))}
                </Picker>
            </View>

            {/* Mood Picker */}
            <Text style={styles.label}>Select Mood</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={mood}
                    onValueChange={(val) => setMood(val || null)}
                    style={styles.picker}
                    dropdownIconColor="#000"
                >
                    <Picker.Item label="Select Mood" value={null} color="#000" />
                    {moods.map((m) => (
                        <Picker.Item key={m.mood_id} label={m.name} value={m.mood_id} color="#000" />
                    ))}
                </Picker>
            </View>

            {/* Surah Picker */}
            <Text style={styles.label}>Select Surah</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={surah}
                    onValueChange={(val) => setSurah(val || null)}
                    style={styles.picker}
                    dropdownIconColor="#000"
                >
                    <Picker.Item label="Select Surah" value={null} color="#000" />
                    {surahs.map((s) => (
                        <Picker.Item key={s.surah_id} label={s.EnglishName} value={s.surah_id} color="#000" />
                    ))}
                </Picker>
            </View>

            {/* Total Ayahs */}
            {totalAyahs > 0 && (
                <Text style={styles.ayahCount}>Total Ayahs: {totalAyahs}</Text>
            )}

            {/* From Ayah */}
            <Text style={styles.label}>From Ayah</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={fromAyah}
                onChangeText={setFromAyah}
                placeholder="Enter from ayah"
                placeholderTextColor="#888"
            />

            {/* To Ayah */}
            <Text style={styles.label}>To Ayah</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={toAyah}
                onChangeText={setToAyah}
                placeholder="Enter to ayah"
                placeholderTextColor="#888"
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Setting</Text>
            </TouchableOpacity>

             <TouchableOpacity
                      style={styles.button}
                      onPress={() => navigation.navigate('ViewSettings')}
                    >
                      <Text style={styles.buttonText}>View Settings</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EDF9',
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000',
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        color: '#000',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
    },
    picker: {
        color: '#000',
    },
    ayahCount: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        color: '#000',
    },
    button: {
        backgroundColor: '#C5A4F7',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Settings;

