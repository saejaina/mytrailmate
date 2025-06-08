// app/screens/QuestionnaireScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuestionnaireScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trek Questionnaire</Text>
      {/* Your questions and inputs will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
