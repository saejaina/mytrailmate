import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="questionnaire" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
   
    </Stack>
  );
}

