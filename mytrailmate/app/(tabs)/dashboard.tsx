import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, collection, addDoc, Timestamp } from 'firebase/firestore';

const features = [
  {
    title: 'Risk Score',
    desc: 'View your current trail risk level and get safety tips.',
    image: require('../../assets/images/risk.png'),
    route: '../questionnaire',
  },
  {
    title: 'Offline Emergency Kit',
    desc: 'Access tools like flashlight, whistle & checklist anytime.',
    image: require('../../assets/images/sos.png'),
    route: '/kit',
  },
  {
    title: 'Offline Maps',
    desc: 'Download maps for navigation without internet.',
    image: require('../../assets/images/location.png'),
    route: '/maps',
  },
  {
    title: 'Weather Forecast',
    desc: 'Get live and upcoming weather updates to plan safer and smarter treks.',
    image: require('../../assets/images/recommendation.png'),
    route: '/weather',
  },
  {
    title: 'Badges & Awards',
    desc: 'Track your milestones and collect achievement badges.',
    image: require('../../assets/images/badges.png'),
    route: 'badges',
  },
  {
    title: 'Trek Log / History',
    desc: 'See records of your completed treks.',
    image: require('../../assets/images/history.png'),
    route: 'history',
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [emergencyNumber, setEmergencyNumber] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  // SOS HANDLER (Demo for Mobile Preview)
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

    // Log SOS alert to Firestore
    try {
      await addDoc(collection(db, 'sosAlerts'), {
        contact: emergencyNumber,
        timestamp: Timestamp.now(),
        status: 'sent',
      });

      // Show alert
      Alert.alert('📩 SOS Sent', `Emergency message sent to ${emergencyNumber}`);

      // Show dummy modal popup
      setModalVisible(true);
    } catch (error) {
      console.error('SOS Error:', error);
      Alert.alert('Error', 'Failed to send SOS.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>    Welcome Back Adventurer !</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <Ionicons name="log-out-outline" size={28} color="#1c3d5a" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {features.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => router.push(item.route as any)} >
            <Image source={item.image} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SOS Button */}
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <TouchableOpacity style={[styles.sosButton, { width: 150 }]} onPress={handleSOS}>
          <Ionicons name="alert-circle" size={33} color="#fff" />
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      {/* Dummy Modal Popup */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalBox}>
            <Text style={modalStyles.modalText}>📩 SOS Message Sent!</Text>
            <Text style={modalStyles.modalSubText}>
              Your emergency contact ({emergencyNumber}) has been notified.
            </Text>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
