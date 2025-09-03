import { ResizeMode, Video } from 'expo-av';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const features = [
  {
    title: 'Real-Time Risk Score',
    desc: 'Calculates personal and environmental risks to guide your trek safely.',
    icon: require('../../assets/images/risk.png'),
  },
  {
    title: 'SOS Emergency Alerts',
    desc: 'Send instant alerts to local contacts during danger—even offline.',
    icon: require('../../assets/images/sos.png'),
  },
  {
    title: 'Offline Trail Support',
    desc: 'Access trail maps and safety data without needing the internet.',
    icon: require('../../assets/images/offline.png'),
  },
  {
    title: 'Smart Trek Recommendations',
    desc: 'AI-suggested trails based on your fitness and preferences.',
    icon: require('../../assets/images/ai.png'),
  },
  {
    title: 'Guest Mode & Secure Login',
    desc: 'Join easily without account or log in for a personalized journey.',
    icon: require('../../assets/images/login.png'),
  },
];

const policies = [
  {
    title: 'Minimal Data Collection',
    desc: 'We collect only essential information to make your trek safer and smarter. No unnecessary access, ever.',
    icon: require('../../assets/images/data.png'),
  },
  {
    title: 'Location Privacy',
    desc: 'Your location is only used for SOS alerts or navigation, with your clear permission.',
    icon: require('../../assets/images/location.png'),
  },
  {
    title: 'No Ads or Tracking',
    desc: 'We do not share or sell your data. No ads, no distractions — just you and the trail.',
    icon: require('../../assets/images/noads.png'),
  },
  {
    title: 'Encrypted Security',
    desc: 'Your data is encrypted with Firebase-grade protection and safe cloud handling.',
    icon: require('../../assets/images/secure.png'),
  },
  
];

export default function AboutUs() {
  const router = useRouter();
  const [faqStates, setFaqStates] = useState([false, false, false, false, false]);

  const toggleFAQ = (i: number) => {
    const updated = [...faqStates];
    updated[i] = !updated[i];
    setFaqStates(updated);
  };

  return (
    <ScrollView style={s.container}>
      <ImageBackground source={require('../../assets/images/skip.jpg')} style={s.image}>
        <View style={s.overlay} />
      </ImageBackground>
      <View style={s.section}>
        <Text style={s.heading}>Why MyTrailMate?</Text>
        {[
          'MyTrailMate is more than just a trekking assistant — it’s your smart safety partner built for adventure.',
          '🌄 Our Mission: To empower trekkers through real-time insights, offline access, and emergency-ready tools so no one feels alone on the trail.',
          '🎯 Our Goal: Ensure every trek is safe, smart, and personalized using tech, AI, and care.',
          'Born from real needs in high-risk trails, MyTrailMate brings peace of mind to solo and group trekkers alike.',
        ].map((p, i) => (
          <Text key={i} style={[s.paragraph, { textAlign: 'justify' }]}>
            {p}
          </Text>
        ))}
      </View>

      <View style={s.divider} />

      <View style={[s.section, s.cardContainer]}>
        <Text style={s.heading}>What We Offer</Text>
        {features.map((item, index) => (
          <View key={`f-${index}`} style={s.card}>
            <Image source={item.icon} style={s.icon} />
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <Text style={[s.cardDesc, { textAlign: 'justify' }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={s.divider} />

      <View style={[s.section, s.cardContainer]}>
        <Text style={s.heading}>Privacy & Safety Policy</Text>
        {policies.map((item, index) => (
          <View key={`p-${index}`} style={s.card}>
            <Image source={item.icon} style={s.icon} />
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <Text style={[s.cardDesc, { textAlign: 'justify' }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={s.divider} />

      <View style={[s.section, s.cardContainer]}>
        <Text style={s.heading}>Frequently Asked Questions</Text>
        {[
          { q: 'Will the app work without internet?', a: 'Yes, offline functionality is supported after download.' },
          { q: 'Is MyTrailMate free?', a: 'Yes, and all core features are included.' },
          { q: 'Do I need to create an account?', a: 'It is optional but enables full features and alerts.' },
          { q: 'How accurate is the risk score?', a: 'We use multiple data points: weather, trails, health.' },
          { q: 'Can I give feedback?', a: 'Yes, through our contact details at the bottom.' }
        ].map((faq, index) => (
          <View key={`faq-${index}`} style={s.faqItem}>
            <TouchableOpacity onPress={() => toggleFAQ(index)}>
              <Text style={s.faqQ}>{faq.q}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!faqStates[index]}>
              <Text style={s.faqA}>{faq.a}</Text>
            </Collapsible>
          </View>
        ))}
      </View>

      <View style={s.ctaWrapper}>
        <TouchableOpacity style={s.ctaButton} onPress={() => router.push('/auth/welcome')}>
          <Text style={s.ctaText}>Get Started With MyTrailMate</Text>
        </TouchableOpacity>
      </View>

      <View style={s.footer}>
        <Text style={s.footerHeader}>Contact Us</Text>
        <View style={s.contactRow}>
          <View style={s.contactCol}>
            <Text style={s.footerText}>📧 Email</Text>
            <Text style={s.footerSub}>support@mytrailmate.app</Text>
            <Text style={s.footerText}>📍 Address</Text>
            <Text style={s.footerSub}>Pulchowk, Lalitpur, Nepal</Text>
          </View>
          <View style={s.contactCol}>
            <Text style={s.footerText}>📞 Phone</Text>
            <Text style={s.footerSub}>+977-9800000000</Text>
            <Text style={s.footerText}>🕐 Support Hours</Text>
            <Text style={s.footerSub}>9:00 AM – 6:00 PM (NPT)</Text>
          </View>
        </View>
        <View style={{ marginTop: 15, alignItems: 'center' }}>
          <Text style={s.footerSub}>© 2025 MyTrailMate. All rights reserved.</Text>
          <Text style={s.footerSub}>Empowering safer treks, one step at a time.</Text>
        </View>
      </View>
    </ScrollView>
  );
}
const SCREEN_WIDTH = Dimensions.get('window').width;


const s = StyleSheet.create({
  container: {
    backgroundColor: '#f2f6ff',
  },
  image: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_WIDTH * 1.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
  },
  section: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1f2f57',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#e1e9f0',
    marginVertical: 30,
    marginHorizontal: 30,
    borderRadius: 8,
  },
  cardContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#f2f6ff',
    shadowColor: '#rgba(23, 37, 224, 0.1)',
    elevation: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(205, 213, 232, 0.4)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#273c75',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 15,
    color: '#4a4a4a',
    lineHeight: 22,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQ: {
    fontSize: 16,
    fontWeight: '700',
    color: '#445ef3',
  },
  faqA: {
    fontSize: 15,
    color: '#444',
    paddingTop: 8,
    lineHeight: 22,
  },
  ctaWrapper: {
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 40,
  },
  ctaButton: {
    backgroundColor: '#6a5ae0',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 28,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 20,
  },
  contactCol: {
    flex: 1,
    paddingHorizontal: 14,
  },
  footerHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d2e5b',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 2,
  },
  footerSub: {
    fontSize: 13,
    color: '#6e7a8a',
    marginBottom: 6,
  },
  footer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#eef2f9',
    borderTopWidth: 1,
    borderColor: '#cdd9eb',
  },
});
