// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter(); // <-- Correct for Expo Router

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyTrailMate 🏞️</Text>
      <Text style={styles.subtitle}>
        Your intelligent trekking companion. Plan smarter. Trek safer.
      </Text>
      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => router.push('/questionnaire')}
      >
        <Text style={styles.arrow}>➡️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE8E1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C4D4F',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
  arrowButton: {
    marginTop: 30,
    backgroundColor: '#1C4D4F',
    padding: 15,
    borderRadius: 50,
  },
  arrow: {
    fontSize: 24,
    color: 'white',
  },
});
