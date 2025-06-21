import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ResultScreen() {
  const { riskScore, suggestedTrail } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 Your Trek Readiness Result</Text>
      <Text style={styles.score}>Risk Score: {riskScore}</Text>
      <Text style={styles.trail}>Recommended Trail: {suggestedTrail}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>📥 Download Your Trek Kit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#059669' }]}>
        <Text style={styles.buttonText}>🧭 Start Planning</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#f59e0b' }]}>
        <Text style={styles.buttonText}>🔁 Retake Questionnaire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  score: { fontSize: 20, marginBottom: 10, textAlign: 'center' },
  trail: { fontSize: 20, marginBottom: 30, textAlign: 'center' },
  button: { padding: 15, backgroundColor: '#3b82f6', borderRadius: 10, marginVertical: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 }
});
