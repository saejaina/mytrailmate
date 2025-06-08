import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyTrailMate 🏞️</Text>
      <Text style={styles.subtitle}>Your smart trekking partner</Text>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => router.push('/questionnaire')}
      >
        <Text style={styles.arrowText}>➔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#666' },
  arrowButton: { marginTop: 30, backgroundColor: '#064420', borderRadius: 50, padding: 14 },
  arrowText: { fontSize: 24, color: '#fff' },
});
