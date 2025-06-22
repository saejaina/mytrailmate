import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

const Results = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { score, data } = useLocalSearchParams();

  if (!score || !data) return null;

  const parsedData = JSON.parse(data as string);
  const numericScore = parseInt(score as string);
  const percentage = Math.min(Math.max(numericScore, 0), 100);

  // Circular chart sizing
  const radius = width * 0.3;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  const getCategoryScores = () => {
    const age = parseInt(parsedData.age || '0');
    const trekCount = parseInt(parsedData.trekCount || '0');

    return {
      Health: 25 -
        (parsedData.medicalConditions?.toLowerCase() === 'yes' ? 10 : 0) -
        (age < 16 || age > 50 ? 5 : 0),
      Gear: 25 -
        (parsedData.gear?.toLowerCase() !== 'yes' ? 10 : 0) -
        (parsedData.groupGear?.toLowerCase() === 'no' ? 5 : 0),
      Experience: 25 - (trekCount < 2 ? 10 : 0),
      Planning: 25 - (parsedData.backupPlan?.toLowerCase() !== 'yes' ? 10 : 0),
    };
  };

  const categoryScores = getCategoryScores();

  const getImprovementTips = () => {
    const tips = [];
    if (categoryScores.Health < 20) tips.push('Maintain good health & avoid trekking with serious conditions.');
    if (categoryScores.Gear < 20) tips.push('Ensure all essential gear is packed. Group members must carry gear.');
    if (categoryScores.Experience < 20) tips.push('Gain more trekking experience before attempting harder trails.');
    if (categoryScores.Planning < 20) tips.push('Have a backup plan and ensure someone knows your trek itinerary.');
    return tips;
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: 50, paddingBottom: 60, paddingLeft: 30, paddingRight: 30 }]}>
      <Text style={styles.title}>Your Trek Readiness Score</Text>

      <View style={styles.chartWrapper}>
        <Svg width={radius * 2 + 20} height={radius * 2 + 20}>
          <Circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke={percentage >= 70 ? '#34D399' : percentage >= 50 ? '#FBBF24' : '#F87171'}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            origin={`${radius + 10}, ${radius + 10}`}
          />
        </Svg>
        <Text style={[styles.scoreText, { top: radius + 10 - 25 }]}>
          {percentage}%
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Risk Breakdown</Text>
        {Object.entries(categoryScores).map(([category, score]) => (
          <View key={category} style={styles.breakdownRow}>
            <Text style={styles.categoryText}>{category}</Text>
            <View style={styles.scoreBarBackground}>
              <View style={[styles.scoreBarFill, { width: `${(score / 25) * 100}%` }]} />
            </View>
            <Text style={styles.scoreTextSmall}>{score}/25</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 How You Can Improve</Text>
        {getImprovementTips().map((tip, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <MaterialIcons name="check-circle" size={18} color="#10B981" />
            <Text style={[styles.tipItem, { marginLeft: 8 }]}>{tip}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#2c8ef4' }]}
        onPress={() => router.push({ pathname: '/recommendtrails', params: { score } })}
      >
        <AntDesign name="enviromento" size={18} color="white" />
        <Text style={styles.buttonText}>Recommended Trails</Text>
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
    paddingHorizontal: 24,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  chartWrapper: {
    marginBottom: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  scoreText: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    width: '100%',
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1E40AF',
  },
  breakdownRow: {
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#1F2937',
  },
  scoreBarBackground: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: 10,
    backgroundColor: '#3B82F6',
  },
  scoreTextSmall: {
    fontSize: 13,
    color: '#374151',
    marginTop: 2,
  },
  tipItem: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 8,
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
