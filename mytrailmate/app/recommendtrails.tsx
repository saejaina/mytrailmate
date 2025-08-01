import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const getTrailSuggestions = (numericScore: number): string[] => {
  if (numericScore >= 85) return [
  'Annapurna Base Camp',
  'Langtang Valley',
  'Everest Base Camp',
  'Nar Phu Valley',
  'Dhaulagiri Circuit',
  'Rolwaling Valley',
  'Yala Peak'  ];


  if (numericScore >= 70) return [
  'Mardi Himal',
  'Poon Hill (Ghorepani)',
  'Khopra Danda',
  'Helambu Trek',
  'Tamang Heritage Trail',
  'Pikey Peak',
  'Everest Panorama',
  'Australian Camp / Dhampus'  ];


  if (numericScore >= 50) return [
  'Shivapuri Hike',
  'Namobuddha Trail',
  'Nagarkot Panorama',
  'Suryachaur',
  'Muldai Viewpoint'  ];

  
  return [
  'Short Nature Walk',
  'Local Heritage Trek',
  'Short Winter Family Trek',
  'Chisapani Hike',
  'Royal Trek'  ];
};

const trailDetails: { [key: string]: string } = {
  'Annapurna Base Camp': 'A scenic and moderately difficult trek through the heart of the Annapurna range.',
  'Langtang Valley': 'An accessible trek offering rich Tamang culture and close-up mountain views.',
  'Everest Base Camp': 'Iconic high-altitude adventure to the base of the world’s tallest mountain.',
  'Nar Phu Valley': 'A remote and rugged trek blending Tibetan culture with untouched landscapes.',
  'Dhaulagiri Circuit': 'Challenging loop with glacier crossings and wild mountain scenery.',
  'Rolwaling Valley': 'Remote trek with dramatic ridges and views of Gauri Shankar and other peaks.',
  'Yala Peak': 'Trekking peak in Langtang region, ideal for first-time Himalayan climbers.',
  'Mardi Himal': 'A short and less crowded trek with spectacular views of Machapuchare.',
  'Poon Hill': 'Famous for sunrise views over Dhaulagiri and Annapurna ranges, suitable for beginners.',
  'Khopra Danda': 'Offbeat ridge trail with grand Himalayan panoramas and fewer trekkers.',
  'Helambu Trek': 'Moderate hike through Buddhist villages and rhododendron forests near Kathmandu.',
  'Tamang Heritage Trail': 'Cultural trek in the Langtang region, rich in traditions and hospitality.',
  'Pikey Peak': 'Scenic hilltop trek with panoramic Everest views and authentic Sherpa culture.',
  'Everest Panorama': 'Short Everest region trek offering iconic views without extreme altitude.',
  'Australian Camp / Dhampus': 'Easy and scenic ridge trail near Pokhara, perfect for short breaks.',
  'Shivapuri Hike': 'A gentle day hike near Kathmandu, ideal for warm-up and local nature experience.',
  'Namobuddha Trail': 'A spiritual and cultural trek through monasteries and terraced hillsides.',
  'Nagarkot Panorama': 'Leisure hike with mountain views and easy access from Kathmandu.',
  'Suryachaur': 'An easy hike with picnic vibes and views of the northern hills and Himalayas.',
  'Muldai Viewpoint': 'Short detour off the Ghorepani trail with excellent panoramic peaks.',
  'Short Nature Walk': 'Relaxed local path through forests and rural landscapes — low risk and restorative.',
  'Local Heritage Trek': 'Explore cultural villages and scenic countryside without major altitude gain.',
  'Short Winter Family Trek': 'Low-altitude routes perfect for families even in colder seasons.',
  'Chisapani Hike': 'A popular overnight hike with ridge trails and views of the Langtang range.',
  'Royal Trek': 'Gentle walk near Pokhara once explored by Prince Charles — perfect for beginners.',
};

const RecommendTrails = () => {
  const router = useRouter();
  const { score } = useLocalSearchParams();
  const numericScore = parseInt(score as string) || 0;
  const { width } = useWindowDimensions();
  const trails = getTrailSuggestions(numericScore);

  const [expandedTrail, setExpandedTrail] = useState<string | null>(null);
  const toggleTrail = (trail: string) => {
    setExpandedTrail(prev => (prev === trail ? null : trail));
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingHorizontal: width * 0.05, paddingTop: 60, paddingBottom: 60 },
      ]}
    >
      <Text style={styles.title}>🏞️ Recommended Trails</Text>
      <Text style={styles.subtitle}>
        Based on your score of <Text style={styles.score}>{numericScore}%</Text>
      </Text>

      {trails.map((trail, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.trailCard, { width: '100%' }]}
          onPress={() => toggleTrail(trail)}
          activeOpacity={0.8}
        >
          <Text style={styles.trailName}>{trail}</Text>
          {expandedTrail === trail && (
            <Text style={styles.trailDesc}>{trailDetails[trail]}</Text>
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={18} color="#fff" />
        <Text style={styles.backText}>Back to Results</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: '#10B981' }]}
        onPress={() => router.push('/(tabs)/dashboard')}
      >
        <Text style={styles.backText}>Go to Dashboard</Text>
        <AntDesign name="arrowright" size={18} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RecommendTrails;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#374151',
    textAlign: 'center',
  },
  score: {
    fontWeight: 'bold',
    color: '#2C7A7B',
  },
  trailCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  trailName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 6,
  },
  trailDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#2C8EF4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
});
