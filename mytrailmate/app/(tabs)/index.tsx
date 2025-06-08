import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../../assets/images/welcome.png')} // Add your image path
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay to improve text readability */}
      <View style={styles.overlay} />
      
      <View style={styles.container}>
        {/* Skip button at top right */}
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* App title and tagline */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.brand}>MyTrailMate</Text>
          <Text style={styles.tagline}>Your intelligent trekking companion.</Text>
          <Text style={styles.subtagline}>Plan smarter. Trek safer.</Text>
        </View>

        {/* Authentication buttons */}
        <View style={styles.authContainer}>
          {/* Continue with Google */}
          <TouchableOpacity style={[styles.button, styles.googleButton]}>
            <Image 
              source={require('../../assets/images/google.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Create Account */}
          <TouchableOpacity 
            style={[styles.button, styles.createAccountButton]}
            onPress={() => router.push('/questionnaire')}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Create an Account</Text>
          </TouchableOpacity>

          {/* Login option */}
          <TouchableOpacity style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginBold}>Log in</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity as needed
  },
  container: {
    flex: 1,
    padding: 20,
    position: 'relative', // Needed for absolute positioning of children
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 15,
    zIndex: 1, // Ensure it stays above the overlay
  },
  skipText: {
    color: '#fff', // Changed to white for better visibility
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loginBold: {
    fontWeight: 'bold',
    color: '#fff',
  },
});