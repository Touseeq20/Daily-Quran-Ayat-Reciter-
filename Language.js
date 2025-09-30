import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Language = () => {
    const navigation = useNavigation();
    const [englishEnabled, setEnglishEnabled] = useState(true);
    const [urduEnabled, setUrduEnabled] = useState(true);

    useEffect(() => {
        loadLanguageSettings();
    }, []);

    const loadLanguageSettings = async () => {
        try {
            const englishSetting = await AsyncStorage.getItem('showEnglish');
            const urduSetting = await AsyncStorage.getItem('showUrdu');

            if (englishSetting !== null) {
                setEnglishEnabled(JSON.parse(englishSetting));
            }

            if (urduSetting !== null) {
                setUrduEnabled(JSON.parse(urduSetting));
            }
        } catch (error) {
            console.error('Error loading language settings:', error);
        }
    };

    const saveLanguageSettings = async (english, urdu) => {
        try {
            await AsyncStorage.setItem('showEnglish', JSON.stringify(english));
            await AsyncStorage.setItem('showUrdu', JSON.stringify(urdu));
        } catch (error) {
            console.error('Error saving language settings:', error);
        }
    };

    const toggleEnglish = () => {
        const newValue = !englishEnabled;
        setEnglishEnabled(newValue);
        saveLanguageSettings(newValue, urduEnabled);
    };

    const toggleUrdu = () => {
        const newValue = !urduEnabled;
        setUrduEnabled(newValue);
        saveLanguageSettings(englishEnabled, newValue);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Set Language</Text>
                <View style={styles.headerSpacer} />
            </View>

            <View style={styles.content}>
                <Text style={styles.description}>
                    Choose which translations to display in the app. Arabic will always be shown.
                </Text>

                {/* English Toggle */}
                <View style={styles.toggleContainer}>
                    <View style={styles.toggleTextContainer}>
                        <Text style={styles.toggleLabel}>English</Text>
                        <Text style={styles.toggleDescription}>
                            Show English translations
                        </Text>
                    </View>
                    <Switch
                        value={englishEnabled}
                        onValueChange={toggleEnglish}
                        trackColor={{ false: '#767577', true: '#C5A4F7' }}
                        thumbColor={englishEnabled ? '#8B5FBF' : '#f4f3f4'}
                    />
                </View>

                {/* Urdu Toggle */}
                <View style={styles.toggleContainer}>
                    <View style={styles.toggleTextContainer}>
                        <Text style={styles.toggleLabel}>Urdu</Text>
                        <Text style={styles.toggleDescription}>
                            Show Urdu translations
                        </Text>
                    </View>
                    <Switch
                        value={urduEnabled}
                        onValueChange={toggleUrdu}
                        trackColor={{ false: '#767577', true: '#C5A4F7' }}
                        thumbColor={urduEnabled ? '#8B5FBF' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.noteContainer}>
                    <Text style={styles.noteText}>
                        Note: Arabic text will always be displayed regardless of your selection.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F8EDF9',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
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
    headerSpacer: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 22,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toggleTextContainer: {
        flex: 1,
        marginRight: 15,
    },
    toggleLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 5,
    },
    toggleDescription: {
        fontSize: 14,
        color: '#666',
    },
    noteContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f0e6ff',
        borderRadius: 8,
    },
    noteText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default Language;