import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Questionnaire() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trail Questionnaire</Text>
      <Text style={styles.subtitle}>Answer a few questions to personalize your trek.</Text>

      <Button title="Continue to App" onPress={() => router.replace('/(tabs)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
});
