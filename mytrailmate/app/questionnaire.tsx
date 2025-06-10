// app/questionnaire.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function QuestionnaireScreen() {
  const router = useRouter();

  const handleSubmit = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Trekking Questionnaire</Text>

      {Array.from({ length: 10 }).map((_, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>Q{index + 1}: Enter your answer</Text>
          <TextInput style={styles.input} placeholder={`Answer ${index + 1}`} />
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} color="#1C4D4F" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E5F5F4',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C4D4F',
  },
  questionContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
});
