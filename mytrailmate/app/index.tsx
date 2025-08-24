import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function AppEntry() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(tabs)/dashboard'); // Logged in → go to questionnaire
      } else {
        router.replace('/auth/welcome');  // Not logged in → go to welcome
      }
    });
    return unsub;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

