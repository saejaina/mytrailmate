import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // ✅ Make sure this path is correct

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    let valid = true;

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const username = userCredential.user.email?.split('@')[0] ?? 'User';
      Alert.alert('Login Successful', `Welcome, ${username}!`);
      router.replace('/(tabs)/dashboard');
    } catch (error: any) {
      console.error("Login Error:", error.message);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      enableOnAndroid
      extraScrollHeight={10}
      keyboardShouldPersistTaps="handled"
    >
      <Animatable.View animation="fadeInUp" delay={200} style={styles.form}>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Sign In to MyTrailMate</Text>

        <TextInput
          placeholder="Enter email"
          style={[styles.input, emailError ? styles.inputError : null]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          placeholder="Enter password"
          style={[styles.input, passwordError ? styles.inputError : null]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: '#7daaf5' }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.quote}>“Adventure begins here.”</Text>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(207, 233, 207, 0.95)',
  },
  form: {
    backgroundColor: 'rgba(187, 223, 187, 0.95)',
    padding: 26,
    borderRadius: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 50, height: 60 },
  },
  logo: {
    width: 155,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2d4f6c',
    marginBottom: 20,
  },
  input: {
    padding: 14,
    borderRadius: 10,
    borderColor: '#cbd5e0',
    borderWidth: 1,
    backgroundColor: '#f7fafc',
    fontSize: 16,
    marginBottom: 12,
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
  button: {
    backgroundColor: '#4e8df5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#4e8df5',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  quote: {
    textAlign: 'center',
    marginTop: 18,
    fontStyle: 'italic',
    color: '#6c757d',
    fontSize: 13,
  },
});

export default SignIn;
