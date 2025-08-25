import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
  Animated,
  Switch,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { router } from 'expo-router';

const avatars: { [key: string]: any } = {
  Aayush: require('../../assets/avatars/avatar1.png'),
  Saejaina: require('../../assets/avatars/avatar2.png'),
  Riya: require('../../assets/avatars/avatar3.png'),
};

const badgeCategories = {
  Experience: [
    {
      id: '1',
      title: 'Trail Explorer',
      description: 'Complete 5 treks',
      icon: require('../../assets/badges/explorer.png'),
      earned: true,
      progressCurrent: 5,
      progressMax: 5,
      earnDetails: 'You need to complete 5 treks using MyTrailMate.',
    },
  ],
  Safety: [
    {
      id: '2',
      title: 'Safety Champ',
      description: 'Fill emergency info',
      icon: require('../../assets/badges/safety.png'),
      earned: true,
      progressCurrent: 1,
      progressMax: 1,
      earnDetails: 'Fill your emergency contact information in profile.',
    },
  ],
  Altitude: [
    {
      id: '3',
      title: 'Altitude Ace',
      description: 'Hike above 3000m',
      icon: require('../../assets/badges/altitude.png'),
      earned: false,
      progressCurrent: 2100,
      progressMax: 3000,
      earnDetails: 'Complete a trek above 3000 meters elevation.',
    },
  ],
  Streaks: [
    {
      id: '4',
      title: 'Streak Master',
      description: 'Trek 3 weekends in a row',
      icon: require('../../assets/badges/streak.png'),
      earned: false,
      progressCurrent: 1,
      progressMax: 3,
      earnDetails: 'Complete trekking for 3 consecutive weekends.',
    },
  ],
  Distance: [
    {
      id: '5',
      title: 'Distance Dominator',
      description: 'Hike 100km total',
      icon: require('../../assets/badges/distance.png'),
      earned: false,
      progressCurrent: 64,
      progressMax: 100,
      earnDetails: 'Accumulate 100 km of trekking distance.',
    },
  ],
  Endurance: [
    {
      id: '6',
      title: 'Endurance Expert',
      description: 'Complete a 10-hour trek',
      icon: require('../../assets/badges/endurance.png'),
      earned: false,
      progressCurrent: 4,
      progressMax: 10,
      earnDetails: 'Complete a single trek lasting 10 hours or more.',
    },
  ],
};

const leaderboardData = [
  { name: 'Aayush', treks: 14 },
  { name: 'Sairaa', treks: 12 },
  { name: 'Riya', treks: 10 },
];

const ProgressBar = ({ current, max }: { current: number; max: number }) => {
  const progress = Math.min(current / max, 1);
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.progressBarBackground}>
      <Animated.View
        style={[styles.progressBarFill, {
          width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
        }]} />
      <Text style={styles.progressBarText}>{current}/{max}</Text>
    </View>
  );
};

type Badge = {
  id: string;
  title: string;
  description: string;
  icon: any;
  earned: boolean;
  progressCurrent: number;
  progressMax: number;
  earnDetails: string;
};

const Badges = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { width } = useWindowDimensions();
  const confettiRef = useRef<ConfettiCannon>(null);
  const modalScale = useRef(new Animated.Value(0)).current;

  const allBadges: Badge[] = Object.values(badgeCategories).flat();

  const openBadge = (badge: Badge) => {
    setSelectedBadge(badge);
    setModalVisible(true);
    Animated.spring(modalScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
    if (badge.earned && confettiRef.current) {
      confettiRef.current.start();
    }
  };

  const closeModal = () => {
    Animated.timing(modalScale, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedBadge(null);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏅 Badges & Awards</Text>

      <View style={styles.gridContainer}>
        {Array.from({ length: Math.ceil(allBadges.length / 2) }).map((_, rowIndex) => (
          <View style={styles.gridRow} key={rowIndex}>
            {allBadges.slice(rowIndex * 2, rowIndex * 2 + 2).map((badge) => (
              <TouchableOpacity
                key={badge.id}
                style={[styles.badgeCard, !badge.earned && styles.locked]}
                onPress={() => openBadge(badge)}
                activeOpacity={0.8}
              >
                <Image source={badge.icon} style={styles.badgeIcon} />
                <Text style={styles.badgeTitle}>{badge.title}</Text>
                {!badge.earned && (
                  <ProgressBar current={badge.progressCurrent} max={badge.progressMax} />
                )}
                {badge.earned && <Text style={styles.earnedText}>Earned ✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.leaderboardToggle}>
        <Text style={styles.sectionTitle}>🏆 Show Leaderboard</Text>
        <Switch
          value={showLeaderboard}
          onValueChange={() => setShowLeaderboard(!showLeaderboard)}
        />
      </View>

      {showLeaderboard && (
        <View style={styles.leaderboardBox}>
          <Text style={styles.sectionTitle}>Top Trekkers</Text>
          {leaderboardData.map((user, idx) => {
            const isCurrentUser = user.name === 'Sairaa';
            const progressPercent = (user.treks / 20) > 1 ? 1 : (user.treks / 20);

            return (
              <View
                key={idx}
                style={[styles.leaderboardItem, isCurrentUser && styles.leaderboardCurrentUser]}
              >
                <Image
                  source={avatars[user.name] || require('../../assets/avatars/default.png')}
                  style={styles.leaderboardAvatar}
                />
                <View style={styles.leaderboardInfo}>
                  <Text style={[styles.leaderboardName, isCurrentUser && { fontWeight: 'bold' }]}
                  >
                    {user.name} {idx === 0 && '🥇'} {idx === 1 && '🥈'} {idx === 2 && '🥉'}
                  </Text>
                  <View style={styles.leaderboardProgressBarBackground}>
                    <View
                      style={[styles.leaderboardProgressBarFill, { width: `${progressPercent * 100}%` }]}
                    />
                  </View>
                </View>
                <Text style={styles.leaderboardTreks}>{user.treks} Treks</Text>
              </View>
            );
          })}
        </View>
      )}

      {/* Badge Modal */}
      <Modal visible={modalVisible} transparent animationType="none">
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContent, { width: width * 0.85, transform: [{ scale: modalScale }] }]}
          >
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close-circle" size={28} color="#666" />
            </TouchableOpacity>
            {selectedBadge && (
              <>
                <Image source={selectedBadge.icon} style={styles.modalBadgeIcon} />
                <Text style={styles.modalTitle}>{selectedBadge.title}</Text>
                <Text style={styles.modalDesc}>{selectedBadge.earnDetails}</Text>
                <Text style={styles.modalProgress}>
                  {selectedBadge.earned ? 'Badge earned! 🎉' : `Progress: ${selectedBadge.progressCurrent}/${selectedBadge.progressMax}`}
                </Text>
                {!selectedBadge.earned && (
                  <ProgressBar current={selectedBadge.progressCurrent} max={selectedBadge.progressMax} />
                )}
              </>
            )}
          </Animated.View>
        </View>
      </Modal>

      <ConfettiCannon
        count={80}
        origin={{ x: width / 2, y: 0 }}
        autoStart={false}
        ref={confettiRef}
        fadeOut
      />
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

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'column',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#f0f4f7',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  badgeIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  locked: {
    opacity: 0.5,
  },
  earnedText: {
    marginTop: 8,
    color: 'green',
    fontWeight: '700',
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#d1d5db',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
    justifyContent: 'center',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4ade80',
  },
  progressBarText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  leaderboardToggle: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leaderboardBox: {
    backgroundColor: '#e8f0fe',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  leaderboardCurrentUser: {
    backgroundColor: '#d6f5d6',
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  leaderboardAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
  },
  leaderboardProgressBarBackground: {
    height: 8,
    backgroundColor: '#cbd5e1',
    borderRadius: 4,
    marginTop: 2,
  },
  leaderboardProgressBarFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  leaderboardTreks: {
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalBadgeIcon: {
    width: 90,
    height: 90,
    marginBottom: 14,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalDesc: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 14,
    color: '#555',
  },
  modalProgress: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4ade80',
    marginBottom: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C8EF4',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  backText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
});

export default Badges;