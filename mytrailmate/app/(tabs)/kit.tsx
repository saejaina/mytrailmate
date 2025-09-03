import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const TrekkingKit = () => {
  const router = useRouter();

  const trekkingEssentials = [
    { icon: 'water', text: 'Water (2-3 liters)', iconType: 'material' as const, color: '#06B6D4' },
    { icon: 'food-apple', text: 'Snacks (energy bars, nuts)', iconType: 'material' as const, color: '#F59E0B' },
    { icon: 'first-aid', text: 'First Aid Kit', iconType: 'fontawesome5' as const, color: '#DC2626' },
    { icon: 'map', text: 'Map and Compass', iconType: 'ionicons' as const, color: '#10B981' },
    { icon: 'toolbox', text: 'Multi-tool or Knife', iconType: 'material' as const, color: '#8B5CF6' },
    { icon: 'flashlight', text: 'Flashlight or Headlamp', iconType: 'ionicons' as const, color: '#FFD700' },
    { icon: 'weather-sunny', text: 'Sunscreen and Sunglasses', iconType: 'material' as const, color: '#EA580C' },
    { icon: 'weather-pouring', text: 'Rain Gear', iconType: 'material' as const, color: '#3B82F6' },
    { icon: 'tshirt-crew', text: 'Warm Clothing', iconType: 'material' as const, color: '#6366F1' },
    { icon: 'whistle', text: 'Emergency Whistle', iconType: 'material' as const, color: '#FF6B6B' },
  ];

  const firstAidTips = [
    { icon: 'bandage', text: 'For blisters: Clean the area, apply a blister pad, and avoid popping it.', iconType: 'material' as const, color: '#EF4444' },
    { icon: 'run-fast', text: 'For sprains: Rest, ice, compress, and elevate the injured area.', iconType: 'material' as const, color: '#3B82F6' },
    { icon: 'content-cut', text: 'For cuts: Clean with water, apply antiseptic, and cover with a bandage.', iconType: 'material' as const, color: '#10B981' },
  ];

  const emergencyProcedures = [
    { icon: 'map-marker-off', text: 'If lost: Stay calm, retrace your steps, and look for landmarks.', iconType: 'material' as const, color: '#8B5CF6' },
    { icon: 'paw', text: 'If encountering wildlife: Do not approach, make noise, and back away slowly.', iconType: 'material' as const, color: '#F59E0B' },
    { icon: 'weather-lightning-rainy', text: 'In severe weather: Find shelter, stay low, and avoid open areas.', iconType: 'material' as const, color: '#06B6D4' },
  ];

  const wildlifeInfo = [
    { icon: 'bear', text: 'Be aware of bears, snakes, and other wildlife.', iconType: 'material' as const, color: '#8B5CF6' },
    { icon: 'volume-high', text: 'Make noise to avoid surprising animals.', iconType: 'material' as const, color: '#10B981' },
  ];

  const weatherTips = [
    { icon: 'weather-partly-cloudy', text: 'Check the weather forecast before your trek.', iconType: 'material' as const, color: '#3B82F6' },
    { icon: 'layers', text: 'Dress in layers to adapt to changing conditions.', iconType: 'material' as const, color: '#6366F1' },
  ];

  const renderIcon = (iconType: 'ionicons' | 'material' | 'fontawesome5', icon: string, color: string) => {
    switch (iconType) {
      case 'ionicons':
        return <Ionicons name={icon as any} size={24} color={color} />;
      case 'material':
        return <MaterialCommunityIcons name={icon as any} size={24} color={color} />;
      case 'fontawesome5':
        return <FontAwesome5 name={icon as any} size={20} color={color} />;
      default:
        return <Ionicons name="help-circle" size={24} color={color} />;
    }
  };

  const renderSection = (title: string, items: Array<{icon: string, text: string, iconType: any, color: string}>) => (
    <View style={styles.section}>
      <Text style={styles.subHeader}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemCard}>
          <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
            {renderIcon(item.iconType, item.icon, item.color)}
          </View>
          <Text style={styles.itemText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛠️ Offline Trekking Kit</Text>
      <Text style={styles.subtitle}>Essential guides and checklists available offline</Text>

      {renderSection('Trekking Essentials Checklist', trekkingEssentials)}
      {renderSection('First Aid Guide', firstAidTips)}
      {renderSection('Emergency Procedures', emergencyProcedures)}
      
      <View style={styles.section}>
        <Text style={styles.subHeader}>Local Wildlife Information</Text>
        {wildlifeInfo.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
              {renderIcon(item.iconType, item.icon, item.color)}
            </View>
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Weather Preparedness</Text>
        {weatherTips.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
              {renderIcon(item.iconType, item.icon, item.color)}
            </View>
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={24} color="#059669" />
        <Text style={styles.infoText}>
          All information is available offline. Review these guidelines before your trek for a safe journey!
        </Text>
      </View>

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

export default TrekkingKit;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
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
    color: '#0d0d0eff',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 25,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 15,
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2C8EF4',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemText: {
    fontSize: 14,
    color: '#111212ff',
    lineHeight: 20,
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    width: '100%',
    maxWidth: 400,
  },
  infoText: {
    fontSize: 14,
    color: '#065F46',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 10,
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
    fontSize: 17,
    marginLeft: 10,
    fontWeight: '600',
  },
});