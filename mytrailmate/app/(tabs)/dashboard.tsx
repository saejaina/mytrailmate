import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import * as SMS from 'expo-sms';

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
  const [emergencyNumber, setEmergencyNumber] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/welcome');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // -------------------
  // Fetch emergency contact from Firestore
  // -------------------
  const fetchEmergencyContact = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setEmergencyNumber(data.emergencyContact || null);
      }
    } catch (error) {
      console.error('Failed to fetch emergency contact:', error);
    }
  };

  useEffect(() => {
    fetchEmergencyContact();
  }, []);

  // -------------------
  // SOS HANDLER
  // -------------------
  const handleSOS = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    if (!emergencyNumber) {
      Alert.alert('Error', 'No emergency contact set.');
      return;
    }

    // Validate phone number
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(emergencyNumber)) {
      Alert.alert('Invalid Number', 'Emergency contact is not a valid phone number.');
      return;
    }

    const message = `🚨 SOS Alert! ${user.email} is in emergency. Please contact immediately.`;

    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'SMS is not available on this device.');
        return;
      }

      await SMS.sendSMSAsync([emergencyNumber], message);
      Alert.alert('SOS Sent', `Emergency message sent to ${emergencyNumber}`);
    } catch (error: any) {
      console.error('SOS Error:', error.message);
      Alert.alert('Error', 'Failed to send SOS.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, adventurer!</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <Ionicons name="log-out-outline" size={24} color="#1c3d5a" />
        </TouchableOpacity>
      </View>

      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
        <Ionicons name="alert-circle" size={28} color="#fff" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <View style={styles.grid}>
        {features.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
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
  signOutBtn: { padding: 6 },
  sosButton: {
    flexDirection: 'row',
    backgroundColor: '#ff4d4d',
    padding: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sosText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 10,
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
