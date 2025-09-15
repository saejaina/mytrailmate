import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

// ------------------ Types ------------------
type Trail = {
  name: string;
  difficulty: "Low" | "Moderate" | "High";
  risk: "Low Risk" | "Moderate Risk" | "High Risk";
};

// ------------------ Trails Data ------------------
const trails: Trail[] = [
  // Low Risk
  { name: "Shivapuri Hike", difficulty: "Low", risk: "Low Risk" },
  { name: "Phulchoki Walk", difficulty: "Low", risk: "Low Risk" },
  { name: "Nagarkot Sunrise Trek", difficulty: "Low", risk: "Low Risk" },
  { name: "Godavari Trail", difficulty: "Low", risk: "Low Risk" },
  { name: "Dhulikhel Easy Hike", difficulty: "Low", risk: "Low Risk" },

  // Moderate Risk
  { name: "Ghandruk Loop", difficulty: "Moderate", risk: "Moderate Risk" },
  { name: "Poon Hill Trek", difficulty: "Moderate", risk: "Moderate Risk" },
  { name: "Australian Camp Trek", difficulty: "Moderate", risk: "Moderate Risk" },
  { name: "Chisapani Nagarkot Trek", difficulty: "Moderate", risk: "Moderate Risk" },
  { name: "Helambu Trek", difficulty: "Moderate", risk: "Moderate Risk" },

  // High Risk
  { name: "Everest Base Camp", difficulty: "High", risk: "High Risk" },
  { name: "Annapurna Base Camp", difficulty: "High", risk: "High Risk" },
  { name: "Kanchenjunga Trek", difficulty: "High", risk: "High Risk" },
  { name: "Manaslu Circuit", difficulty: "High", risk: "High Risk" },
  { name: "Langtang Lirung Trek", difficulty: "High", risk: "High Risk" },
];

// ------------------ Suitable Trails Based on Risk ------------------
const getSuitableTrails = (userRisk: string) => {
  switch (userRisk) {
    case "High":
      return trails.filter((t) => t.difficulty === "Low"); // only safe/easy trails
    case "Moderate":
      return trails.filter((t) => t.difficulty === "Low" || t.difficulty === "Moderate"); // easy & moderate
    case "Low":
      return trails; // all trails
    default:
      return [];
  }
};

// ------------------ UI Component ------------------
const RecommendTrails = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams(); // category = user risk from results.tsx
  const { width } = useWindowDimensions();
  const [recommendedTrailList, setRecommendedTrailList] = useState<Trail[]>([]);

  useEffect(() => {
    if (!category) return;
    const suitableTrails = getSuitableTrails(category as string);
    setRecommendedTrailList(suitableTrails);
  }, [category]);

  // Group trails by difficulty
  const groupedTrails: Record<string, Trail[]> = {
    Low: recommendedTrailList.filter((t) => t.difficulty === "Low"),
    Moderate: recommendedTrailList.filter((t) => t.difficulty === "Moderate"),
    High: recommendedTrailList.filter((t) => t.difficulty === "High"),
  };

  const difficultyColors: Record<string, string> = {
    Low: "green",
    Moderate: "#CA8A04",
    High: "#EF4444",
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingHorizontal: width * 0.05, paddingTop: 60, paddingBottom: 60 },
      ]}
    >
      <Text style={styles.title}>🏞️ Recommended Trails for You</Text>

      {Object.keys(groupedTrails).map((difficulty) => {
        const trails = groupedTrails[difficulty];
        if (trails.length === 0) return null;

        return (
          <View key={difficulty} style={{ marginBottom: 30, width: "100%" }}>
            <Text style={[styles.categoryTitle, { color: difficultyColors[difficulty] }]}>
              {difficulty} Difficulty
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {trails.map((trail, index) => (
                <View key={index} style={styles.trailCardHorizontal}>
                  <Text style={styles.trailName}>{trail.name}</Text>
                  <Text style={styles.trailInfo}>
                    Difficulty:{" "}
                    <Text style={{ color: difficultyColors[trail.difficulty] }}>
                      {trail.difficulty}
                    </Text>
                  </Text>
                  <Text style={styles.trailInfo}>
                    Risk:{" "}
                    <Text style={{ color: difficultyColors[trail.difficulty] }}>
                      {trail.risk}
                    </Text>
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        );
      })}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={18} color="#fff" />
        <Text style={styles.backText}>Back to Results</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: "#10B981" }]}
        onPress={() => router.push("/(tabs)/dashboard")}
      >
        <Text style={styles.backText}>Go to Dashboard</Text>
        <AntDesign name="arrowright" size={18} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RecommendTrails;

// ------------------ Styles ------------------
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1E3A8A",
    textAlign: "center",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  trailCardHorizontal: {
    backgroundColor: "#fff",
    padding: 16,
    marginRight: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    width: 220,
  },
  trailName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 6,
  },
  trailInfo: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
  },
  backButton: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#2C8EF4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
