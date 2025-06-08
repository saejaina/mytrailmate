// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'; 

export default function WelcomeScreen() {
  const router = useRouter(); // <-- Correct for Expo Router

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyTrailMate 🏞️</Text>
      <Text style={styles.subtitle}>
        Your intelligent trekking companion. Plan smarter. Trek safer.
      </Text>
      <Image
        source={require('../../assets/images/welcome.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => router.push('/questionnaire')}
      >
        <AntDesign name="arrowright" size={28} color="white" />
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
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative', 
    },
  image: {
    width: '100%',
    height: '55%',
  },
  arrowButton: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    backgroundColor: '#1C4D4F',
    padding: 15,
    borderRadius: 50,
     elevation: 4, // Adds shadow on Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  arrow: {
    fontSize: 24,
    color: 'white',
    },
});
