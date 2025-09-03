import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra;

const firebaseConfig = {
  apiKey: extra?.firebaseApiKey,
  authDomain: extra?.firebaseAuthDomain,
  projectId: extra?.firebaseProjectId,
  storageBucket: extra?.firebaseStorageBucket,
  messagingSenderId: extra?.firebaseMessagingSenderId,
  appId: extra?.firebaseAppId,
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

// try {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// } catch (e: any) {
//   if (e?.message?.includes('already been initialized')) {
//     auth = getAuth(app);
//   } else {
//     throw e;
//   }
// }

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
