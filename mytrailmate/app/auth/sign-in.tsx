import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    const username = email.split('@')[0];
    Alert.alert('Login Successful', `Welcome, ${username}!`);
    router.push('/(tabs)/dashboard');
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={200} style={styles.form}>
        <Image
          source={require('../../assets/images/logo.png')} // Add your logo here
          style={styles.logo}
        />
        <Text style={styles.title}>Sign In to MyTrailMate</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.quote}>“Adventure begins here.”</Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0eafc',
  },
  form: {
    backgroundColor: 'rgba(201, 222, 244, 0.95)',
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
  error: {
    backgroundColor: '#ffe5e9',
    color: '#d62828',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 14,
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
