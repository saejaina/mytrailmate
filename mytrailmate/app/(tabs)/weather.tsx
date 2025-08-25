import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

// Firebase Cloud Function URL - replace with your actual deployed function URL
const FIREBASE_FUNCTION_URL = 'https://your-project-region-your-project-id.cloudfunctions.net/getWeatherData';

const Weather = () => {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (location: string = 'Kathmandu') => {
    setLoading(true);
    setError(null);
    try {
      // Call Firebase Cloud Function with location parameter
      const response = await axios.get(`${FIREBASE_FUNCTION_URL}?location=${location}`);
      setWeatherData(response.data);
    } catch (err: any) {
      console.error('Firebase Function Error:', err);
      setError(err.response?.data?.error || 'Failed to fetch weather data from server');
    } finally {
      setLoading(false);
    }
  };

  const refetchWeatherData = () => {
    fetchWeatherData();
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const renderWeatherInfo = () => {
    if (weatherData) {
      return (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
          <Text style={styles.description}>
            {weatherData.weather[0].description}
          </Text>
          <View style={styles.weatherDetails}>
            <Text style={styles.detailText}>
              🌡️ Feels like: {Math.round(weatherData.main.feels_like)}°C
            </Text>
            <Text style={styles.detailText}>
              💧 Humidity: {weatherData.main.humidity}%
            </Text>
            <Text style={styles.detailText}>
              💨 Wind: {weatherData.wind.speed} m/s
            </Text>
            <Text style={styles.detailText}>
              📊 Pressure: {weatherData.main.pressure} hPa
            </Text>
            <Text style={styles.detailText}>
              👁️ Visibility: {(weatherData.visibility / 1000).toFixed(1)} km
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌤️ Weather Forecast</Text>
      <Text style={styles.subtitle}>Powered by Firebase Cloud Functions</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Fetching weather data from server...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={refetchWeatherData}
          >
            <AntDesign name="reload1" size={18} color="#fff" />
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        renderWeatherInfo()
      )}

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.push('/(tabs)/dashboard')}
      >
        <AntDesign name="arrowleft" size={18} color="#fff" />
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  weatherContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
    maxWidth: 350,
  },
  city: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 10,
  },
  temp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#2C7A7B',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    color: '#374151',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  weatherDetails: {
    width: '100%',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 10,
    paddingVertical: 3,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 15,
    color: '#6B7280',
    fontSize: 14,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    margin: 10,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#2C8EF4',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});
