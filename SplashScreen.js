import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('Dashboard'); // Navigates to Dashboard
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daily Quran Reciter</Text>
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EDF9', // light purple background from new theme
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, // added padding from new theme
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20, // spacing below the title
        color: '#000', // black text to match theme
    },
    button: {
        backgroundColor: '#C5A4F7', // purple button color from new theme
        paddingVertical: 12, // adjusted padding to match new theme
        paddingHorizontal: 40,
        borderRadius: 10, // updated to match new theme's button radius
        elevation: 4, // adjusted shadow for Android to match new theme
    },
    buttonText: {
        color: '#fff', // white text from new theme
        fontSize: 16, // adjusted to match new theme
        fontWeight: '600', // updated to match new theme
    },
});

export default SplashScreen;
