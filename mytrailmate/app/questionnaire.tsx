 import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { calculateRisk } from '../utils/riskScoring';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const topics = [
  'Personal Info',
  'Health Info',
  'Trek Experience',
  'Gear Prep',
  'Weather Adaptation',
  'Emergency Contact',
];

const Questionnaire = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodType: '',
    phone: '', 
    address: '',
    citizenshipnumber: '',
    allergies: '',
    medicalCondition: '',
    hasHikedBefore: '',
    gearItems: '',
    coldPrep: '',
    durationPref: '',
    trailRegion: '',
    emergencyName: '',
    emergencyPhone: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const scrollToTab = (index: number) => {
    const tabWidth = width / 3;
    scrollRef.current?.scrollTo({
      x: tabWidth * index - width / 2 + tabWidth / 2,
      animated: true,
    });
  };

  useEffect(() => {
    scrollToTab(currentTab);
  }, [currentTab]);

  const renderQuestions = () => {
    switch (currentTab) {
      case 0:
        return (
          <>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={formData.name}
              onChangeText={text => handleChange('name', text)}
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              keyboardType="number-pad"
              value={formData.age}
              onChangeText={text => handleChange('age', text)}
            />

            <Text style={styles.label}>Blood Type</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., A+, O-"
              value={formData.bloodType}
              onChangeText={text => handleChange('bloodType', text)}
            />
        
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={text => handleChange('phone', text)}
          />  
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={formData.address}
            onChangeText={text => handleChange('address', text)}
          />
          <Text style={styles.label}>Citizenship Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your citizenship number"
            keyboardType="number-pad"
            value={formData.citizenshipnumber}
            onChangeText={text => handleChange('citizenshipnumber', text)}
          />
          </>
        );
      case 1:
        return (
          <>
            <Text style={styles.label}>Any Allergies?</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., pollen, peanuts"
              value={formData.allergies}
              onChangeText={text => handleChange('allergies', text)}
            />

            <Text style={styles.label}>Medical Conditions</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., asthma, diabetes"
              value={formData.medicalCondition}
              onChangeText={text => handleChange('medicalCondition', text)}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.label}>Have you ever hiked before?</Text>
            <TextInput
              style={styles.input}
              placeholder="Yes / No"
              value={formData.hasHikedBefore}
              onChangeText={text => handleChange('hasHikedBefore', text)}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.label}>List essential gear you have</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., hiking boots, tent"
              value={formData.gearItems}
              onChangeText={text => handleChange('gearItems', text)}
            />
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.label}>Prepared for cold/rainy weather?</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., raincoat, thermal wear"
              value={formData.coldPrep}
              onChangeText={text => handleChange('coldPrep', text)}
            />

            <Text style={styles.label}>Preferred Trek Duration</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., 1 day, 3 days, 1 week"
              value={formData.durationPref}
              onChangeText={text => handleChange('durationPref', text)}
            />

            <Text style={styles.label}>Preferred Trail Region</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., Annapurna, Langtang"
              value={formData.trailRegion}
              onChangeText={text => handleChange('trailRegion', text)}
            />
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.label}>Emergency Contact Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={formData.emergencyName}
              onChangeText={text => handleChange('emergencyName', text)}
            />

            <Text style={styles.label}>Emergency Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={formData.emergencyPhone}
              onChangeText={text => handleChange('emergencyPhone', text)}
            />
          </>
        );
    }
  };

  const handleSave = () => {
    if (currentTab < topics.length - 1) {
      setCurrentTab(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
  const result = calculateRisk({
    fitness: 7,
    experience: 5,
    gear: 3,
    health: 8,
    weather: 6,
  });

  router.push({
    pathname: "/results",
    params: { data: JSON.stringify(result) },
  });
};

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContent}
      >
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
            ]}
            onPress={() => setCurrentTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                currentTab === index && styles.activeTabText,
              ]}
            >
              {topic}
            </Text>
            {currentTab === index && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderQuestions()}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {currentTab === topics.length - 1 ? 'Save Changes' : 'Save & Continue'}
          </Text>
        </TouchableOpacity>

        {currentTab === topics.length - 1 && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Questionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FAF1',
    paddingTop: 35,
  },
  tabContainer: {
    paddingTop: 10,
    backgroundColor: '#fff',
    maxHeight: 65,
  },
  tabContent: {
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 15,
    color: '#555',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#2c8ef4',
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: 40,
    backgroundColor: '#2c8ef4',
    borderRadius: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#2c8ef4',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 15,
    backgroundColor: '#34c759',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 