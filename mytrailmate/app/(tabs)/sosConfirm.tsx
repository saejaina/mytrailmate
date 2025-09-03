import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SOSConfirm() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.replace("/(tabs)/dashboard");
    }
  }, [countdown]);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚨</Text>
      <Text style={styles.title}>SOS Alert Sent!</Text>
      <Text style={styles.subtitle}>
        Your emergency contact has been notified. Help is on the way.
      </Text>

      <Text style={styles.timer}>Returning in {countdown}s...</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(tabs)/dashboard")}
      >
        <Text style={styles.buttonText}>Return Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#e6f0fbff", padding: 20 },
  emoji: { fontSize: 70, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: "bold", color: "#dc2626", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 18, textAlign: "center", color: "#475569", marginBottom: 20 },
  timer: { fontSize: 16, marginBottom: 20, color: "#334155" },
  button: { backgroundColor: "#dc2626", paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
