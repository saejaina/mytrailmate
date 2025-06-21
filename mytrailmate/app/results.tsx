import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

const Results = () => {
  const router = useRouter();
  const { score, data } = useLocalSearchParams();

  if (!score || !data) return null;

  const parsedData = JSON.parse(data as string);
  const numericScore = parseInt(score as string);
  const percentage = Math.min(Math.max(numericScore, 0), 100);

  // Custom trail suggestion logic (keep it exactly as you wrote)
  const getTrailSuggestions = () => {
    if (numericScore >= 85) return ['Annapurna Base Camp', 'Langtang Valley'];
    if (numericScore >= 70) return ['Mardi Himal', 'Poon Hill'];
    if (numericScore >= 50) return ['Shivapuri Hike', 'Namobuddha Trail'];
    return ['Short Nature Walk', 'Local Heritage Trek'];
  };

  // For SVG Circle
  const radius = 80;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Trek Readiness Score</Text>

      <View style={styles.chartWrapper}>
        <Svg width="200" height="200">
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke={percentage >= 70 ? '#34D399' : percentage >= 50 ? '#FBBF24' : '#F87171'}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            origin="100, 100"
          />
        </Svg>
        <Text style={styles.scoreText}>{percentage}%</Text>
      </View>

      <View style={styles.trailCard}>
        <Text style={styles.subTitle}>Recommended Trails</Text>
        {getTrailSuggestions().map((trail, index) => (
          <View key={index} style={styles.trailItem}>
            <Text style={styles.trailText}>{trail}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={() => alert("Start Planning Coming Soon!")}>
        <AntDesign name="calendar" size={18} color="white" />
        <Text style={styles.buttonText}>Start Planning</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#10B981' }]}
        onPress={() => router.replace('/questionnaire')}
      >
        <AntDesign name="reload1" size={18} color="white" />
        <Text style={styles.buttonText}>Retake Questionnaire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  chartWrapper: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  scoreText: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    top: 80,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1E40AF',
  },
  trailCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  trailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#2c8ef4',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});
