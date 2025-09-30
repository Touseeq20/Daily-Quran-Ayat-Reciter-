

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";

const questions = [
    "How happy are you feeling?",
    "How sad are you feeling?",
    "How energetic are you?",
    "How tired do you feel?",
    "How stressed are you?",
    "How calm do you feel?",
    "How focused are you?",
    "How distracted do you feel?",
    "How anxious are you?",
    "How relaxed do you feel?",
];

const moodEmojis = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😠",
    Fearful: "😨",
    Surprised: "😲",
    Neutral: "😐",
    Excited: "🤩",
    Tired: "😴",
};

const MoodScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [predictedMood, setPredictedMood] = useState(null);

    const handleNext = async () => {
        const value = parseInt(inputValue);

        if (isNaN(value) || value < 1 || value > 5) {
            alert("Please enter a number between 1 to 5.");
            return;
        }

        const updatedAnswers = [...answers, value];
        setAnswers(updatedAnswers);
        setInputValue("");

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Send to server for prediction
            try {
                const response = await fetch("http://192.168.130.1:5000/predict", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ answers: updatedAnswers }),
                });

                const data = await response.json();
                const mood = data.mood;
                setPredictedMood(`${mood} ${moodEmojis[mood] || "🧠"}`);
            } catch (error) {
                setPredictedMood("Server error. Try again later ❌");
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {predictedMood ? (
                <View style={styles.card}>
                    <Text style={styles.resultTitle}>Your Predicted Mood</Text>
                    <Text style={styles.resultText}>{predictedMood}</Text>
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.counter}>
                        Question {currentIndex + 1}/{questions.length}
                    </Text>
                    <Text style={styles.question}>{questions[currentIndex]}</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        placeholder="Enter 1-5"
                        placeholderTextColor="#666"
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>
                            {currentIndex === questions.length - 1 ? "🔮 Predict" : "Next →"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default MoodScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8EDF9",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 25,
        elevation: 6,
        alignItems: "center",
    },
    counter: {
        fontSize: 14,
        color: "#888",
        alignSelf: "flex-end",
    },
    question: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginVertical: 20,
    },
    input: {
        width: "50%",
        borderColor: "#aaa",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 18,
        textAlign: "center",
        color: "#000",
        backgroundColor: "#fff",
    },
    button: {
        marginTop: 25,
        backgroundColor: "#C5A4F7",
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderRadius: 30,
        elevation: 4,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    resultTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#0056b3",
    },
    resultText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#0f5132",
    },
});
