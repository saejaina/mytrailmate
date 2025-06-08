// app/QuestionnaireScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function QuestionnaireScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trail Questionnaire</Text>
      <Text style={styles.text}>Start answering to customize your trek!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
  text: { fontSize: 16, marginTop: 8 },
});
