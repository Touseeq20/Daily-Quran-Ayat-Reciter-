import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppSettings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />

        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>


        <Text style={styles.title}>App Settings</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>AYAT SETTINGS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Language')}
        >
          <Text style={styles.buttonText}>LANGUAGES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AutoPlay')}
        >
          <Text style={styles.buttonText}>AUTO PLAY</Text>
        </TouchableOpacity>

              <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('NotificationSchedule')}
              >
                  <Text style={styles.buttonText}>NOTIFICATION SCHEDULE</Text>
              </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EDF9',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
    backButton: {
        fontSize: 24,
        padding: 0,
        color: '#000',
    },
  headerSpacer: {
    // width: 4,
   
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  searchButton: {
    padding: 6,
  },
  searchIcon: {
    fontSize: 24,
    color: '#000',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  button: {
    backgroundColor: '#C5A4F7',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppSettings;
