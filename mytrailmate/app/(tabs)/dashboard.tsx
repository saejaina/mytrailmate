import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Vibration,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Toast from 'react-native-toast-message';

const features = [
  { title: 'Risk Score', desc: 'View your current trail risk level and get safety tips.', image: require('../../assets/images/risk.png'), route: '../questionnaire' },
  { title: 'Offline Emergency Kit', desc: 'Access tools like flashlight, whistle & checklist anytime.', image: require('../../assets/images/sos.png'), route: '/kit' },
  { title: 'Offline Maps', desc: 'Download maps for navigation without internet.', image: require('../../assets/images/location.png'), route: '/map' },
  { title: 'Weather Forecast', desc: 'Get live and upcoming weather updates to plan safer and smarter treks.', image: require('../../assets/images/recommendation.png'), route: '/weather' },
  { title: 'Badges & Awards', desc: 'Track your milestones and collect achievement badges.', image: require('../../assets/images/badges.png'), route: 'badges' },
  { title: 'Trek Log / History', desc: 'See records of your completed treks.', image: require('../../assets/images/history.png'), route: 'log' },
];

export default function Dashboard() {
  const router = useRouter();
  const [sosSent, setSosSent] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/welcome');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // -------------------------
  // SOS Button Handler
  // -------------------------
  const handleSOS = () => {
    setSosSent(true);
    Vibration.vibrate(500);

    // Toast confirmation
    Toast.show({
      type: 'success',
      text1: '🚨 SOS Alert Sent!',
      text2: 'Your emergency contact has been notified.',
      visibilityTime: 3000,
    });
    

    // Navigate to confirmation screen
    setTimeout(() => {
    router.push('../sosConfirm');
  }, 2000);
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>     Welcome Back Adventurer!</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <Ionicons name="log-out-outline" size={28} color="#1c3d5a" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(item.route as any)}
          >
            <Image source={item.image} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SOS Button */}
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <TouchableOpacity
          style={[styles.sosButton, sosSent && styles.sosButtonSent, { width: 150 }]}
          onPress={handleSOS}
        >
          <Ionicons name="alert-circle" size={33} color="#fff" />
          <Text style={styles.sosText}>{sosSent ? 'Sent' : 'SOS'}</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 50, paddingHorizontal: 16, backgroundColor: '#f3f8fe' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 21, fontWeight: '600', color: '#1c3d5a' },
  signOutBtn: { padding: 6 },
  sosButton: { flexDirection: 'row', backgroundColor: '#ff4d4d', padding: 14, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  sosButtonSent: { backgroundColor: '#28a745' }, // green after pressed
  sosText: { color: '#fff', fontWeight: '700', fontSize: 18, marginLeft: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  icon: { width: 48, height: 48, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '600', color: '#2d4f6c', marginBottom: 6 },
  desc: { fontSize: 13, textAlign: 'center', color: '#555' },
});
