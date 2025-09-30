import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AutoPlay = () => {
    const navigation = useNavigation();
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

    useEffect(() => {
        loadAutoPlaySetting();
    }, []);

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

    const saveAutoPlaySetting = async (value) => {
        try {
            await AsyncStorage.setItem('autoPlayEnabled', JSON.stringify(value));
        } catch (error) {
            console.error('Error saving auto-play setting:', error);
        }
    };

    const toggleAutoPlay = () => {
        const newValue = !autoPlayEnabled;
        setAutoPlayEnabled(newValue);
        saveAutoPlaySetting(newValue);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Auto Play Settings</Text>
                <View style={styles.headerSpacer} />
            </View>

            <View style={styles.content}>
                <Text style={styles.description}>
                    Control whether verses automatically play when they appear on the Show Ayat screen.
                </Text>

                {/* Auto Play Toggle */}
                <View style={styles.toggleContainer}>
                    <View style={styles.toggleTextContainer}>
                        <Text style={styles.toggleLabel}>Auto Play</Text>
                        <Text style={styles.toggleDescription}>
                            Automatically play audio when ayat is displayed
                        </Text>
                    </View>
                    <Switch
                        value={autoPlayEnabled}
                        onValueChange={toggleAutoPlay}
                        trackColor={{ false: '#767577', true: '#C5A4F7' }}
                        thumbColor={autoPlayEnabled ? '#8B5FBF' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.noteContainer}>
                    <Text style={styles.noteText}>
                        Note: When enabled, verses will automatically play their audio when displayed on the Show Ayat screen.
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

export default AutoPlay;