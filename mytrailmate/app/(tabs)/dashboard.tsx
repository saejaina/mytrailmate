import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // make sure this is your Firebase auth export

const features = [
  {
    title: 'Risk Score',
    desc: 'View your current trail risk level and get safety tips.',
    image: require('../../assets/images/risk.png'),
    route: '/features/risk',
  },
  {
    title: 'Offline Emergency Kit',
    desc: 'Access tools like flashlight, whistle & checklist anytime.',
    image: require('../../assets/images/sos.png'),
    route: '/features/emergency',
  },
  {
    title: 'Offline Maps',
    desc: 'Download maps for navigation without internet.',
    image: require('../../assets/images/location.png'),
    route: '/features/maps',
  },
  {
    title: 'Weather Forecast',
    desc: 'Get live and upcoming weather updates to plan safer and smarter treks.',
    image: require('../../assets/images/recommendation.png'),
    route: '/features/recommend',
  },
  {
    title: 'Badges & Awards',
    desc: 'Track your milestones and collect achievement badges.',
    image: require('../../assets/images/badges.png'),
    route: 'tabs/badges',
  },
  {
    title: 'Trek Log / History',
    desc: 'See records of your completed treks.',
    image: require('../../assets/images/history.png'),
    route: '/features/history',
  },
];

export default function Dashboard() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/welcome');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>         Welcome back, adventurer!</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <Ionicons name="log-out-outline" size={24} color="#1c3d5a" />
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            // onPress={() => router.push(item.route)}
          >
            <Image source={item.image} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 16,
    backgroundColor: '#f3f8fe',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c3d5a',
  },
  signOutBtn: {
    padding: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d4f6c',
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
  },
});
