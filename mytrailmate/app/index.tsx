// import { useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { useRouter } from 'expo-router';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import app from '../firebaseConfig'; // adjust the path if needed

// export default function IndexScreen() {
//   const router = useRouter();
//   const auth = getAuth(app); // initialize auth with your firebase app

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, redirect to /tabs/home
//         router.push('/(tabs)/home');
//       } else {
//         // User is not signed in, redirect to /auth/welcome
//         router.push('/auth/welcome');
//       }
//     });

//     return () => unsubscribe(); // clean up listener
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" />
//     </View>
//   );
// }


// ✅ app/_layout.tsx (at root)
import { Redirect } from 'expo-router';

export default function Layout() {
  return <Redirect href="/auth/welcome" />;
}
