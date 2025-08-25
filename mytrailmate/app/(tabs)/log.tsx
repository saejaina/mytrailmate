import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const trekData = [
  {
    id: '1',
    name: 'Mountain Trail',
    date: '2023-10-01',
    duration: '5 hours',
    distance: '12 km',
    elevation: '800 m',
    weather: 'Sunny',
    notes: 'Beautiful views, but challenging ascent.',
  },
  {
    id: '2',
    name: 'Forest Path',
    date: '2023-09-15',
    duration: '3 hours',
    distance: '8 km',
    elevation: '200 m',
    weather: 'Cloudy',
    notes: 'Easy trek, great for beginners.',
  },
    {
        id: '3',
        name: 'Lakeside Walk',
        date: '2023-08-20',
        duration: '2 hours',
        distance: '5 km',
        elevation: '50 m',
        weather: 'Rainy',
        notes: 'Muddy trails, but peaceful scenery.',
    },
  // Add more trek data as needed
];

export default function TrekLog() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trek Log / History</Text>
      <FlatList
        data={trekData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.trekCard} activeOpacity={0.8}>
            <Text style={styles.trekName}>{item.name}</Text>
            <Text style={styles.trekDetails}>Date: {item.date}</Text>
            <Text style={styles.trekDetails}>Duration: {item.duration}</Text>
            <Text style={styles.trekDetails}>Distance: {item.distance}</Text>
            <Text style={styles.trekDetails}>Elevation: {item.elevation}</Text>
            <Text style={styles.trekDetails}>Weather: {item.weather}</Text>
            <Text style={styles.trekNotes}>Notes: {item.notes}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
        <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.push('/(tabs)/dashboard')}
      >
        <AntDesign name="arrowleft" size={18} color="#fff" />
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 30,
    paddingBottom: 60,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1c3d5a',
  },
  trekCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  trekName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d4f6c',
  },
  trekDetails: {
    fontSize: 14,
    color: '#555',
  },
  trekNotes: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#2C8EF4',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});
