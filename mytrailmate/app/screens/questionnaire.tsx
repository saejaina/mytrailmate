// app/screens/Questionnaire.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function Questionnaire() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trek Questionnaire</Text>
      {/* Add your questions here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
