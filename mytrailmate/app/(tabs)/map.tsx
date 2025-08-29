import React, { useEffect, useState, Suspense } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

// Leaflet CSS for proper rendering
import "leaflet/dist/leaflet.css";

// Dynamic import for Leaflet
const MapWithLeaflet = React.lazy(async () => {
  const L = await import("leaflet");

  // Fix default icon URLs
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const { MapContainer, TileLayer, Marker, Polyline, Tooltip } = await import("react-leaflet");

const trailCoordinates = [
  // High score (>=85)
  { name: "Annapurna Base Camp", lat: 28.5304, lon: 83.8798 },
  { name: "Langtang Valley", lat: 28.211, lon: 85.542 },
  { name: "Everest Base Camp", lat: 28.0026, lon: 86.8528 },
  { name: "Nar Phu Valley", lat: 28.7762, lon: 84.2416 },
  { name: "Dhaulagiri Circuit", lat: 28.6960, lon: 83.4872 },
  { name: "Rolwaling Valley", lat: 27.9780, lon: 86.1800 },
  { name: "Yala Peak", lat: 28.2570, lon: 86.7630 },

  // Medium score (>=70)
  { name: "Mardi Himal", lat: 28.4189, lon: 83.9198 },
  { name: "Poon Hill (Ghorepani)", lat: 28.3867, lon: 83.9219 },
  { name: "Khopra Danda", lat: 28.3370, lon: 83.9034 },
  { name: "Helambu Trek", lat: 28.1405, lon: 85.5578 },
  { name: "Tamang Heritage Trail", lat: 27.9768, lon: 85.3985 },
  { name: "Pikey Peak", lat: 27.1250, lon: 87.0500 },
  { name: "Everest Panorama", lat: 27.9597, lon: 86.8200 },
  { name: "Australian Camp / Dhampus", lat: 28.1980, lon: 83.9080 },

  // Low score (>=50)
  { name: "Shivapuri Hike", lat: 27.7500, lon: 85.3500 },
  { name: "Namobuddha Trail", lat: 27.6830, lon: 85.4700 },
  { name: "Nagarkot Panorama", lat: 27.7100, lon: 85.5200 },
  { name: "Suryachaur", lat: 27.6930, lon: 85.4300 },
  { name: "Muldai Viewpoint", lat: 27.7000, lon: 85.4300 },

  // Very low score (<50)
  { name: "Short Nature Walk", lat: 27.7100, lon: 85.3200 },
  { name: "Local Heritage Trek", lat: 27.7150, lon: 85.3250 },
  { name: "Short Winter Family Trek", lat: 27.7200, lon: 85.3300 },
  { name: "Chisapani Hike", lat: 27.7300, lon: 85.3100 },
  { name: "Royal Trek", lat: 27.7400, lon: 85.3400 },
];


  const LeafletMap = ({ currentLocation, selectedTrail, setSelectedTrail }: any) => {
    return (
      <MapContainer
        center={currentLocation || [28.3949, 84.124]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {trailCoordinates.map((trail) => (
          <Marker
            key={trail.name}
            position={[trail.lat, trail.lon]}
            eventHandlers={{
              click: () => setSelectedTrail(trail),
            }}
          >
            <Tooltip sticky>{trail.name}</Tooltip>
          </Marker>
        ))}

        {currentLocation && selectedTrail && (
          <Polyline
            positions={[currentLocation, [selectedTrail.lat, selectedTrail.lon]]}
            color="#1E90FF"
          />
        )}
      </MapContainer>
    );
  };

  return { default: LeafletMap };
});

export default function LiveTrackingMapWeb() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    setMounted(true);

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCurrentLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  if (!mounted) return <Text style={styles.loadingText}>Loading map...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🗺️ Live Tracking Map</Text>
      <Text style={styles.subtitle}>
        Works in Web Preview. Shows GPS location if allowed.
      </Text>

      <Suspense fallback={<Text>Loading map...</Text>}>
        <View style={styles.mapCard}>
          <MapWithLeaflet
            currentLocation={currentLocation}
            selectedTrail={selectedTrail}
            setSelectedTrail={setSelectedTrail}
          />
        </View>
      </Suspense>

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
    padding: 25,
    paddingTop: 60,
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 4, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 20, textAlign: "center" },
  backButton: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#2C8EF4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backText: { color: "#fff", marginLeft: 8, fontWeight: "600" },
  loadingText: { fontSize: 18, marginTop: 50, textAlign: "center", color: "#555" },
  mapCard: {
    width: "100%",
    maxWidth: 800,
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 20,
  },
});
