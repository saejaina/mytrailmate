import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // ✅ Make sure this path is correct

export default function WelcomeScreen() {
  const { width } = Dimensions.get('window');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!email.trim()) {
      setEmailError('Please enter your email');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters and include upper, lower, number, and special character'
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const username = userCredential.user.email?.split('@')[0] ?? 'User';
      Alert.alert('Sign Up Successful', `Welcome, ${username}!`);
      router.replace('/questionnaire');
    } catch (error: any) {
      console.error('Sign Up Error:', error.message);
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, backgroundColor: 'rgba(207, 233, 207, 0.95)' }}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={() => router.push('../(tabs)/home')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome to MyTrailMate</Text>
        </View>

        <View style={styles.authContainer}>
          <Image source={require('../../assets/images/welcome.png')} style={styles.background} />

          <Text style={styles.heading}>Create an Account</Text>

          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Enter email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Enter password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity
            style={[styles.button, styles.createAccountButton, loading && { backgroundColor: '#7daaf5' }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.buttonText, { color: '#fff' }]}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLink} onPress={() => router.push('../auth/sign-in')}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginBold}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  background: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.7,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 30,
    position: 'relative',
    backgroundColor: 'rgba(207, 233, 207, 0.95)',
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 15,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SCREEN_WIDTH < 350 ? 20 : 10,
    paddingBottom: SCREEN_WIDTH < 350 ? 10 : 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  authContainer: {
    width: '100%',
    marginBottom: 55,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  createAccountButton: {
    backgroundColor: '#2c8ef4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignSelf: 'center',
  },
  loginText: {
    color: 'rgb(0, 0, 0)',
  },
  loginBold: {
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.97)',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
});
