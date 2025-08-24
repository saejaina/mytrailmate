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
import { Ionicons } from '@expo/vector-icons';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // ✅ make sure path is correct

// ✅ Allowed college domains
const collegeDomains = [
  'academiacollege.edu.np',
  'students.academiacollege.edu.np',
  'abccollege.edu.np',
  'students.abccollege.edu.np',
];

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false); // toggle login / reset
  const router = useRouter();

  // -------------------
  // EMAIL VALIDATION
  // -------------------
  const isValidEmail = (email: string) => {
    const publicEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.com$/;
    const isPublicEmail = publicEmailRegex.test(email);
    const isCollegeEmail = collegeDomains.some((domain) =>
      email.toLowerCase().endsWith(`@${domain}`)
    );
    return isPublicEmail || isCollegeEmail;
  };

  // -------------------
  // LOGIN HANDLER
  // -------------------
  const handleSubmit = async () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Please enter your email');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError(
        'Use Gmail, Yahoo, Outlook, Hotmail, or a valid college email'
      );
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim() && !forgotMode) {
      setPasswordError('Please enter your password');
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
      console.error('Login Error:', error.message);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------
  // PASSWORD RESET HANDLER
  // -------------------
  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    } else if (!isValidEmail(email)) {
      setEmailError(
        'Use Gmail, Yahoo, Outlook, Hotmail, or a valid college email'
      );
      return;
    } else {
      setEmailError('');
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Reset Link Sent',
        'Check your email for password reset instructions.'
      );
      setForgotMode(false);
    } catch (error: any) {
      console.error('Password Reset Error:', error.message);
      Alert.alert('Reset Failed', error.message);
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
        <Text style={styles.title}>
          {forgotMode ? 'Reset Password' : 'Sign In to MyTrailMate'}
        </Text>

        {/* Email input */}
        <TextInput
          placeholder="Enter email"
          style={[styles.input, emailError ? styles.inputError : null]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password input (only if not in forgot mode) */}
        {!forgotMode && (
          <View
            style={[styles.passwordContainer, passwordError ? styles.inputError : null]}
          >
            <TextInput
              placeholder="Enter password"
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        )}
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* Action button */}
        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: '#7daaf5' }]}
          onPress={forgotMode ? handlePasswordReset : handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {forgotMode ? 'Send Reset Link' : 'Log In'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Toggle link */}
        <TouchableOpacity onPress={() => setForgotMode(!forgotMode)}>
          <Text style={styles.linkText}>
            {forgotMode ? '← Back to Login' : 'Forgot Password?'}
          </Text>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#cbd5e0',
    borderWidth: 1,
    backgroundColor: '#f7fafc',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
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
  linkText: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
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
