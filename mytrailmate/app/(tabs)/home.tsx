// File: /app/(tabs)/home.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Banner or Welcome */}
      <Text style={styles.welcomeTitle}>Hello Explorer!</Text>
      <Text style={styles.description}>
        Welcome to MyTrailMate — your smart trekking companion. Get weather-aware trail advice, emergency support, and personalized risk scores.
      </Text>

      <Image 
        source={require('../../assets/images/welcome.png')} // Make sure this image exists
        style={styles.heroImage}
        resizeMode="contain"
      />

      <Text style={styles.subtext}>
        You’ve skipped the questionnaire, so we’re showing general content.
      </Text>

      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={() => router.push('/questionnaire')} // Push to questionnaire if they change their mind
      >
        <Text style={styles.ctaText}>Complete Profile for Better Recommendations</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Explore Features</Text>
      <View style={styles.features}>
        <Text style={styles.featureItem}>• Check weather risks</Text>
        <Text style={styles.featureItem}>• Find safe trails</Text>
        <Text style={styles.featureItem}>• Emergency SOS alerts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFF9',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B4332',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: '#2D6A4F',
  },
  heroImage: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  subtext: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#2C8EF4',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1B4332',
  },
  features: {
    marginLeft: 10,
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 6,
    color: '#2D6A4F',
  },
});
