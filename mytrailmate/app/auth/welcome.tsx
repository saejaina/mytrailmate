import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

export default function WelcomeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      
      <View style={styles.container}>
        {/* Skip button at top right */}
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* App title and tagline */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to MyTrailMate</Text>
        </View>

        {/* Authentication buttons */}
        <View style={styles.authContainer}>
          <Image source = {require('../../assets/images/welcome.png')} style={styles.background} />

          <Text style={styles.heading}>Create an Account</Text>

           <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />



          {/* Create Account */}
          <TouchableOpacity 
            style={[styles.button, styles.createAccountButton]}
            // onPress={() => router.push('/create-account')}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Sign up</Text>
          </TouchableOpacity>



          {/* Login option */}
          <TouchableOpacity style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginBold}>Sign in</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 320,
    height: 250,
    marginBottom: 10,

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity as needed
  },
  container: {
    flex: 1,
    padding: 20,
    position: 'relative', 
    backgroundColor: '#E4FDE1', 
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 15,
    zIndex: 1, // Ensure it stays above the overlay
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 5,
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
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },



  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtagline: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  authContainer: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  createAccountButton: {
    backgroundColor: '#2c8ef4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
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
});