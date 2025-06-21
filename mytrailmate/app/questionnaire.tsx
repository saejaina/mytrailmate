import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const topics = [
  'Trek Mode',
  'Personal Info',
  'Health Info',
  'Trek Experience',
  'Gear Prep',
  'Planning',
  'Emergency Contact',
];

const Questionnaire = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [trekMode, setTrekMode] = useState<'solo' | 'group' | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    medicalConditions: '',
    medicalDetails: '',
    medicalKit: '',
    trekCount: '',
    gear: '',
    groupGear: '',
    backupPlan: '',
    coldSensitive: '',
    emergencyName: '',
    emergencyPhone: '',
    groupMembers: '',
    groupLeader: '',
    groupSize: '',
    groupAgeRange: '',
    childrenOrSeniors: '',
    guidePresent: ''
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

  const calculateRisk = () => {
    let score = 100;
    const age = parseInt(formData.age);
    const trekCount = parseInt(formData.trekCount || '0');

    if (age < 16 || age > 50) score -= 10;
    if (formData.medicalConditions.toLowerCase() === 'yes') score -= 15;
    if (formData.gear.toLowerCase() !== 'yes') score -= 10;
    if (formData.backupPlan.toLowerCase() !== 'yes') score -= 10;
    if (trekCount < 2) score -= 15;
    if (formData.coldSensitive.toLowerCase() === 'yes') score -= 10;
    if (trekMode === 'group' && formData.groupGear.toLowerCase() !== 'yes') score -= 10;

    return Math.max(0, score);
  };

  const handleSubmit = () => {
  // Define the fields that must be filled
  const requiredFields = ['name', 'age', 'bloodGroup', 'medicalConditions', 'trekCount', 'gear', 'backupPlan', 'emergencyName', 'emergencyPhone'];
  if (trekMode === 'group') {
    requiredFields.push('groupMembers', 'groupGear');
  }

  const isValid = requiredFields.every(field => formData[field as keyof typeof formData]?.trim());

  if (!isValid || !trekMode) {
    Alert.alert('Incomplete Form', 'Please fill all required fields before submitting.');
    return;
  }

  const riskScore = calculateRisk();
  router.push({
    pathname: '/results',
    params: {
      score: String(riskScore),
      data: JSON.stringify(formData),
    },
  });
};

  const renderQuestions = () => {
    switch (currentTab) {
      case 0:
        return (
          <View>
            <Text style={styles.label}>Are you trekking solo or with a group?</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, trekMode === 'solo' && styles.selected]}
                onPress={() => setTrekMode('solo')}
              >
                <Text>Solo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, trekMode === 'group' && styles.selected]}
                onPress={() => setTrekMode('group')}
              >
                <Text>Group</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={formData.name} onChangeText={text => handleChange('name', text)} />
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={formData.age} onChangeText={text => handleChange('age', text)} />
            <Text style={styles.label}>Blood Group</Text>
            <TextInput style={styles.input} value={formData.bloodGroup} onChangeText={text => handleChange('bloodGroup', text)} />

            {trekMode === 'group' && (
              <>
                <Text style={styles.label}>Group Leader Name</Text>
                <TextInput style={styles.input} value={formData.groupLeader} onChangeText={text => handleChange('groupLeader', text)} />
                <Text style={styles.label}>Total Members</Text>
                <TextInput style={styles.input} value={formData.groupSize} onChangeText={text => handleChange('groupSize', text)} />
                <Text style={styles.label}>Age range (e.g., 18–25)</Text>
                <TextInput style={styles.input} value={formData.groupAgeRange} onChangeText={text => handleChange('groupAgeRange', text)} />
                <Text style={styles.label}>Member names & ages</Text>
                <TextInput style={styles.input} value={formData.groupMembers} onChangeText={text => handleChange('groupMembers', text)} />
                <Text style={styles.label}>Children or seniors? (Yes/No)</Text>
                <TextInput style={styles.input} value={formData.childrenOrSeniors} onChangeText={text => handleChange('childrenOrSeniors', text)} />
                <Text style={styles.label}>Guide present? (Yes/No)</Text>
                <TextInput style={styles.input} value={formData.guidePresent} onChangeText={text => handleChange('guidePresent', text)} />
              </>
            )}
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.label}>Any medical conditions?</Text>
            <TextInput style={styles.input} value={formData.medicalConditions} onChangeText={text => handleChange('medicalConditions', text)} />
            <Text style={styles.label}>If yes, specify</Text>
            <TextInput style={styles.input} value={formData.medicalDetails} onChangeText={text => handleChange('medicalDetails', text)} />
            <Text style={styles.label}>Medical Kit?</Text>
            <TextInput style={styles.input} value={formData.medicalKit} onChangeText={text => handleChange('medicalKit', text)} />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.label}>Treks completed</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={formData.trekCount} onChangeText={text => handleChange('trekCount', text)} />
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={styles.label}>Essential gear?</Text>
            <TextInput style={styles.input} value={formData.gear} onChangeText={text => handleChange('gear', text)} />
            {trekMode === 'group' && (
              <>
                <Text style={styles.label}>All members have gear? (Yes/No)</Text>
                <TextInput style={styles.input} value={formData.groupGear} onChangeText={text => handleChange('groupGear', text)} />
              </>
            )}
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={styles.label}>Cold-sensitive? (Yes/No)</Text>
            <TextInput style={styles.input} value={formData.coldSensitive} onChangeText={text => handleChange('coldSensitive', text)} />
            <Text style={styles.label}>Backup plan? (Yes/No)</Text>
            <TextInput style={styles.input} value={formData.backupPlan} onChangeText={text => handleChange('backupPlan', text)} />
          </View>
        );
      case 6:
        return (
          <View>
            <Text style={styles.label}>Emergency Contact Name</Text>
            <TextInput style={styles.input} value={formData.emergencyName} onChangeText={text => handleChange('emergencyName', text)} />
            <Text style={styles.label}>Emergency Phone Number</Text>
            <TextInput style={styles.input} value={formData.emergencyPhone} onChangeText={text => handleChange('emergencyPhone', text)} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer} contentContainerStyle={styles.tabContent}>
        {topics.map((topic, index) => (
          <TouchableOpacity key={index} style={styles.tabButton} onPress={() => setCurrentTab(index)}>
            <Text style={[styles.tabText, currentTab === index && styles.activeTabText]}>{topic}</Text>
            {currentTab === index && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderQuestions()}

        {currentTab < topics.length - 1 && (
          <TouchableOpacity style={styles.saveButton} onPress={() => setCurrentTab(prev => prev + 1)}>
            <Text style={styles.saveButtonText}>Save & Continue</Text>
          </TouchableOpacity>
        )}

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
  container: { flex: 1, backgroundColor: '#F2FAF1', paddingTop: 35 },
  tabContainer: { paddingTop: 10, backgroundColor: '#fff', maxHeight: 65 },
  tabContent: { paddingHorizontal: 10 },
  tabButton: { paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' },
  tabText: { fontSize: 15, color: '#555' },
  activeTabText: { fontWeight: 'bold', color: '#2c8ef4' },
  underline: { marginTop: 4, height: 2, width: 40, backgroundColor: '#2c8ef4', borderRadius: 5 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  label: { fontSize: 16, marginTop: 12, marginBottom: 6, fontWeight: '500' },
  input: {
    borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 16, marginBottom: 10
  },
  saveButton: {
    marginTop: 30, backgroundColor: '#2c8ef4',
    paddingVertical: 12, borderRadius: 10, alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  submitButton: {
    marginTop: 15, backgroundColor: '#34c759',
    paddingVertical: 12, borderRadius: 10, alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  toggleContainer: { flexDirection: 'row', marginTop: 10 },
  toggleButton: { padding: 10, backgroundColor: '#eee', borderRadius: 8, marginRight: 10 },
  selected: { backgroundColor: '#cce5ff' },
});
