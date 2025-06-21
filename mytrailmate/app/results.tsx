import React from 'react'; 
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { width } = Dimensions.get('window');

export default function ResultsScreen() {
  const { data } = useLocalSearchParams();
  const parsed = data ? JSON.parse(data as string) : null;

  if (!parsed) return <Text style={styles.loading}>Loading...</Text>;

  const { overallScore, overallStatus, overallAdvice, categoryScores } = parsed;

  const getRiskIcon = (score: number) => {
    if (score <= 3) return '🔴 High Risk';
    if (score <= 6) return '🟠 Medium Risk';
    return '🟢 Low Risk';
  };

  const recommendedTrails = [
    {
      name: 'Ghandruk Loop',
      difficulty: 'Moderate',
      risk: '🟠 Medium Risk',
      distance: '10km',
      time: '~5 hrs',
      reason: 'Good health + experience fit',
    },
    {
      name: 'Shivapuri Hike',
      difficulty: 'Easy',
      risk: '🟢 Low Risk',
      distance: '6km',
      time: '~3 hrs',
      reason: 'Great for your current gear & fitness level',
    },
    {
      name: 'Poon Hill Trek',
      difficulty: 'Moderate',
      risk: '🟠 Medium Risk',
      distance: '13km',
      time: '~6.5 hrs',
      reason: 'Suited for moderate endurance trekkers',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎯 Your Overall Risk Score</Text>

      <AnimatedCircularProgress
        size={180}
        width={15}
        fill={overallScore}
        tintColor="#4CAF50"
        backgroundColor="#333"
        rotation={0}
        lineCap="round"
        style={styles.chart}
      >
        {() => (
          <Text style={styles.scoreText}>{overallScore}</Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.statusText}>✅ {overallScore} / 100 — {overallStatus}</Text>
      <Text style={styles.adviceText}>🔶 {overallAdvice}</Text>

      <Text style={styles.sectionTitle}>📊 Risk Breakdown</Text>
      {categoryScores.map((item: { label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; score: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; suggestion: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
        <View key={index} style={styles.breakdownCard}>
          <Text style={styles.breakdownLabel}>{item.label}</Text>
          <Text style={styles.breakdownDetail}>Score: {item.score}/10 — {item.status} {getRiskIcon(Number(item.score) || 0)}</Text>
          {item.suggestion ? <Text style={styles.breakdownAdvice}>💡 {item.suggestion}</Text> : null}
        </View>
      ))}

      <Text style={styles.sectionTitle}>🥾 Recommended Trails for You</Text>
      {recommendedTrails.map((trail, index) => (
        <View key={index} style={styles.trailCard}>
          <Text style={styles.trailName}>🗺️ {trail.name}</Text>
          <Text>‣ Difficulty: {trail.difficulty} | {trail.risk}</Text>
          <Text>‣ Distance: {trail.distance} | Time: {trail.time}</Text>
          <Text>‣ Reason: {trail.reason}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#111',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '600',
  },
  chart: {
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 36,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  adviceText: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  breakdownCard: {
    width: width - 40,
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  breakdownLabel: {
    fontSize: 16,
    color: '#f0f0f0',
    fontWeight: '600',
  },
  breakdownDetail: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  breakdownAdvice: {
    fontSize: 13,
    color: '#a0e0ff',
    marginTop: 6,
  },
  trailCard: {
    width: width - 40,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  trailName: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
  },
  loading: {
    marginTop: 100,
    color: '#fff',
    textAlign: 'center',
  },
});  