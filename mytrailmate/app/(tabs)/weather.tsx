import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

// 🔹 Trail descriptions
const trailDetails: { [key: string]: string } = {
  "Annapurna Base Camp": "Scenic trek with diverse landscapes, popular among trekkers.",
  "Langtang Valley": "Closer to Kathmandu, offers unique culture and scenery.",
  "Everest Base Camp": "Iconic trek offering breathtaking views of the world's tallest mountain.",
  "Nar Phu Valley": "Remote region with Tibetan culture and rugged trails.",
  "Dhaulagiri Circuit": "Challenging trek circling the massive Dhaulagiri peak.",
  "Rolwaling Valley": "Quiet, less-crowded trek with diverse landscapes.",
  "Yala Peak": "Perfect for beginners aiming for their first trekking peak climb.",
  "Mardi Himal": "Short, less-crowded trek with stunning Annapurna views.",
  "Poon Hill (Ghorepani)": "Easy trek with sunrise views over the Annapurna and Dhaulagiri ranges.",
  "Khopra Danda": "Off-the-beaten-path trek with panoramic views.",
  "Helambu Trek": "Near Kathmandu, rich in culture and suitable for short trips.",
  "Tamang Heritage Trail": "Cultural trek through Tamang villages and scenic landscapes.",
  "Pikey Peak": "Easy trek with great Everest views.",
  "Everest Panorama": "Short trek for panoramic Everest views without going to base camp.",
  "Australian Camp / Dhampus": "Beginner-friendly short trek near Pokhara.",
  "Shivapuri Hike": "Day hike near Kathmandu with valley views.",
  "Namobuddha Trail": "Cultural hike to Buddhist pilgrimage site near Kathmandu.",
  "Nagarkot Panorama": "Easy hike with sunrise and sunset views over the Himalayas.",
  "Suryachaur": "Short scenic trek close to Kathmandu.",
  "Muldai Viewpoint": "Short hike with sunrise Himalayan views.",
  "Chisapani Hike": "One-day trek near Kathmandu with forest and village trails.",
  "Royal Trek": "Easy cultural trek once trekked by Prince Charles.",
};

// 🔹 Trail coordinates
const trailCoordinates: { [key: string]: { lat: number; lon: number } } = {
  "Annapurna Base Camp": { lat: 28.5304, lon: 83.8798 },
  "Langtang Valley": { lat: 28.211, lon: 85.542 },
  "Everest Base Camp": { lat: 28.0026, lon: 86.8528 },
  "Nar Phu Valley": { lat: 28.7762, lon: 84.2416 },
  "Dhaulagiri Circuit": { lat: 28.75, lon: 83.5 },
  "Rolwaling Valley": { lat: 27.8667, lon: 86.3333 },
  "Yala Peak": { lat: 28.25, lon: 85.5833 },
  "Mardi Himal": { lat: 28.4475, lon: 83.9194 },
  "Poon Hill (Ghorepani)": { lat: 28.4, lon: 83.6833 },
  "Khopra Danda": { lat: 28.4, lon: 83.7 },
  "Helambu Trek": { lat: 27.85, lon: 85.5 },
  "Tamang Heritage Trail": { lat: 28.25, lon: 85.4167 },
  "Pikey Peak": { lat: 27.5333, lon: 86.55 },
  "Everest Panorama": { lat: 27.8167, lon: 86.7167 },
  "Australian Camp / Dhampus": { lat: 28.45, lon: 83.95 },
  "Shivapuri Hike": { lat: 27.8333, lon: 85.4167 },
  "Namobuddha Trail": { lat: 27.6, lon: 85.5667 },
  "Nagarkot Panorama": { lat: 27.7167, lon: 85.5167 },
  "Suryachaur": { lat: 27.85, lon: 85.4167 },
  "Muldai Viewpoint": { lat: 28.4167, lon: 83.7167 },
  "Chisapani Hike": { lat: 27.8167, lon: 85.5167 },
  "Royal Trek": { lat: 28.3333, lon: 83.9833 },
};

// 🔹 OpenWeather API Key
const API_KEY = "7a11641a5e55f3e9c05ebc25b45240f0";

export default function RecommendTrails() {
  const router = useRouter();
  const [expandedTrail, setExpandedTrail] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});
  const [loadingTrail, setLoadingTrail] = useState<string | null>(null);

  const recommendedTrails = Object.keys(trailDetails);

  const toggleTrail = (trail: string) => {
    if (expandedTrail === trail) {
      setExpandedTrail(null);
    } else {
      setExpandedTrail(trail);
    }
  };

  const fetchWeatherForTrail = async (trail: string) => {
    try {
      const coords = trailCoordinates[trail];
      if (!coords) return;

      setLoadingTrail(trail);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
      );
      setWeatherData((prev) => ({ ...prev, [trail]: response.data }));
    } catch (error) {
      console.error("Weather fetch error:", error);
    } finally {
      setLoadingTrail(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.title}>🌤️ Weather Forecast</Text>
      <Text style={styles.subtitle}>Powered by OpenWeatherMap</Text>

      {/* Trails */}
      {recommendedTrails.map((trail, index) => (
        <View key={index} style={styles.trailCard}>
          <TouchableOpacity onPress={() => toggleTrail(trail)}>
            <Text style={styles.trailName}>{trail}</Text>
          </TouchableOpacity>

          {expandedTrail === trail && (
            <View style={{ marginTop: 12, alignItems: "center" }}>
              <Text style={styles.trailDesc}>{trailDetails[trail]}</Text>

              {weatherData[trail] ? (
                <View style={styles.weatherContainer}>
                  <Text style={styles.city}>{trail}</Text>
                  <Text style={styles.temp}>
                    {Math.round(weatherData[trail].main.temp)}°C
                  </Text>
                  <Text style={styles.description}>
                    {weatherData[trail].weather[0].description}
                  </Text>
                  <Text style={styles.detailText}>
                    🌡️ Feels like: {Math.round(weatherData[trail].main.feels_like)}°C
                  </Text>
                  <Text style={styles.detailText}>
                    💧 Humidity: {weatherData[trail].main.humidity}%
                  </Text>
                  <Text style={styles.detailText}>
                    💨 Wind: {weatherData[trail].wind.speed} m/s
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.weatherButton}
                  onPress={() => fetchWeatherForTrail(trail)}
                >
                  {loadingTrail === trail ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.weatherButtonText}>Check Weather</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}

      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/(tabs)/dashboard")}
      >
        <AntDesign name="arrowleft" size={18} color="#fff" />
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#d8e7f1ff",
    padding: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
  },
  trailCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  trailName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E3A8A",
    textAlign: "center",
  },
  trailDesc: {
    fontSize: 15,
    color: "#374151",
    textAlign: "center",
    marginBottom: 10,
  },
  weatherContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f8ff",
    borderRadius: 12,
    elevation: 3,
    width: "100%",
  },
  city: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  temp: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    textTransform: "capitalize",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    marginVertical: 1,
  },
  weatherButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#2C8EF4",
    borderRadius: 8,
    alignItems: "center",
    width: 160,
  },
  weatherButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  backButton: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: "#2C8EF4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 17,
    fontWeight: "600",
  },
});
