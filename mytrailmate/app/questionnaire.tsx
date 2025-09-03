import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '@/firebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

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

type RadioGroupProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selected, onSelect }) => (
  <View>
    {options.map((opt, idx) => (
      <TouchableOpacity key={idx} onPress={() => onSelect(opt)} style={styles.radioRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name={selected === opt ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={selected === opt ? '#007aff' : '#999'}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.radioText}>{opt}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const essentialGear = [
  "Trekking Shoes",
  "First Aid Kit",
  "Rain Jacket",
  "Gloves",
  "Trekking Pole",
  "Headlamp",
  "Map/Compass",
  "Sleeping Bag",
  "Extra Clothing",
  "Water Bottle",
];

const Questionnaire = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isNewUser = params?.isNewUser === 'true';

  const [currentTab, setCurrentTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [trekMode, setTrekMode] = useState<'solo' | 'group' | null>(null);

  type FormData = {
    name: string;
    emergencyName: string;
    emergencyPhone: string;
    groupMembers: string;
    groupLeader: string;
    groupSize: string;
    groupAgeRange: string;
    childrenOrSeniors: string;
    guidePresent: string;
    age: string;
    bloodGroup: string;
    medicalConditions: string;
    medicalDetails: string;
    medicalKit: string;
    trekCount: string;
    gear: string[];
    groupGear: string;
    coldSensitive: string;
    backupPlan: string;
    [key: string]: string | string[];
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    emergencyName: '',
    emergencyPhone: '',
    groupMembers: '',
    groupLeader: '',
    groupSize: '',
    groupAgeRange: '',
    childrenOrSeniors: '',
    guidePresent: '',
    age: '',
    bloodGroup: '',
    medicalConditions: '',
    medicalDetails: '',
    medicalKit: '',
    trekCount: '',
    gear: [],
    groupGear: '',
    coldSensitive: '',
    backupPlan: '',
  });

  const handleChange = (key: string, value: string | any[]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const medicalOptions = [
    "Asthma",
    "Diabetes",
    "Heart Condition",
    "Allergies",
    "Hypertension",
  ];

  const toggleGearItem = (item: string) => {
    const newGear = formData.gear.includes(item)
      ? formData.gear.filter(g => g !== item)
      : [...formData.gear, item];
    handleChange('gear', newGear);
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
    if (formData.medicalConditions === 'Yes') score -= 15;
    if (formData.backupPlan === 'No') score -= 10;
    if (trekCount < 2) score -= 15;
    if (formData.coldSensitive === 'Yes') score -= 10;
    if (trekMode === 'group' && formData.groupGear === 'No') score -= 10;
    if (formData.gear.length < essentialGear.length / 2) score -= 15;
    return Math.max(0, score);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'name', 'age', 'bloodGroup', 'medicalConditions',
      'trekCount', 'backupPlan', 'emergencyName', 'emergencyPhone'
    ];

    if (trekMode === 'group') {
      requiredFields.push('groupMembers', 'groupGear');
    }

    const isValid = requiredFields.every(field => {
      const value = formData[field];
      if (typeof value === 'string') return value.trim();
      if (Array.isArray(value)) return value.length > 0;
      return false;
    });

    if (!isValid || !trekMode) {
      Alert.alert('Incomplete Form', 'Please fill all required fields before submitting.');
      return;
    }

    const phoneRegex = /^98\d{8}$/;
    if (!phoneRegex.test(formData.emergencyPhone)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid Nepal mobile number starting with 98.');
      return;
    }

    const riskScore = calculateRisk();

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Not Logged In', 'Please log in before submitting.');
        return;
      }

      await addDoc(collection(db, 'questionnaires'), {
        ...formData,
        trekMode,
        riskScore,
        userId: user.uid,
        userEmail: user.email,
        submittedAt: Timestamp.now(),
      });

      router.push({
        pathname: '/results',
        params: {
          score: String(riskScore),
          data: JSON.stringify(formData),
        },
      });
    } catch (error) {
      console.error('❌ Firestore write error:', error);
      Alert.alert('Error', 'Failed to submit. Please try again.');
    }
  };

  const renderQuestions = () => {
    switch (currentTab) {
      case 0:
        return (
          <View>
            <Text style={styles.label}>Are you trekking solo or with a group?</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity style={[styles.toggleButton, trekMode === 'solo' && styles.selected]} onPress={() => setTrekMode('solo')}>
                <Text>Solo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toggleButton, trekMode === 'group' && styles.selected]} onPress={() => setTrekMode('group')}>
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
            <RadioGroup options={['<16', '16–30', '31–50', '>50']} selected={formData.age} onSelect={value => handleChange('age', value)} />
            <Text style={styles.label}>Blood Group</Text>
            <RadioGroup options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} selected={formData.bloodGroup} onSelect={value => handleChange('bloodGroup', value)} />
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
                <RadioGroup options={['Yes', 'No']} selected={formData.childrenOrSeniors} onSelect={value => handleChange('childrenOrSeniors', value)} />
                <Text style={styles.label}>Guide present? (Yes/No)</Text>
                <RadioGroup options={['Yes', 'No']} selected={formData.guidePresent} onSelect={value => handleChange('guidePresent', value)} />
              </>
            )}
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.label}>Any medical conditions?</Text>
            <RadioGroup options={['Yes', 'No']} selected={formData.medicalConditions} onSelect={value => handleChange('medicalConditions', value)} />
            <Text style={styles.label}>If yes, specify</Text>
            <RadioGroup
              options={medicalOptions}
              selected={formData.medicalDetails}
              onSelect={(value) =>{
                if (formData.medicalDetails === value) handleChange('medicalDetails', '');
                else handleChange('medicalDetails', value);
              }}
            />
            <Text style={styles.label}>Medical Kit?</Text>
            <RadioGroup options={['Yes', 'No']} selected={formData.medicalKit} onSelect={value => handleChange('medicalKit', value)} />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.label}>Treks completed</Text>
            <RadioGroup options={['0', '1', '2-5', '5+']} selected={formData.trekCount} onSelect={value => handleChange('trekCount', value)} />
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={styles.label}>Select the gear you have:</Text>
            {essentialGear.map((item, idx) => {
              const checked = formData.gear.includes(item);
              return (
                <TouchableOpacity key={idx} onPress={() => toggleGearItem(item)} style={styles.gearItemRow}>
                  <Ionicons
                    name={checked ? 'checkbox-outline' : 'square-outline'}
                    size={22}
                    color={checked ? '#34c759' : '#888'}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.gearItemText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
            {trekMode === 'group' && (
              <>
                <Text style={styles.label}>All members have gear? (Yes/No)</Text>
                <RadioGroup options={['Yes', 'No']} selected={formData.groupGear} onSelect={value => handleChange('groupGear', value)} />
              </>
            )}
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={styles.label}>Cold-sensitive? (Yes/No)</Text>
            <RadioGroup options={['Yes', 'No']} selected={formData.coldSensitive} onSelect={value => handleChange('coldSensitive', value)} />
            <Text style={styles.label}>Backup plan? (Yes/No)</Text>
            <RadioGroup options={['Yes', 'No']} selected={formData.backupPlan} onSelect={value => handleChange('backupPlan', value)} />
          </View>
        );
      case 6:
        return (
          <View>
            <Text style={styles.label}>Emergency Contact Name</Text>
            <TextInput style={styles.input} value={formData.emergencyName} onChangeText={text => handleChange('emergencyName', text)} />
            <Text style={styles.label}>Emergency Phone Number</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" value={formData.emergencyPhone} onChangeText={text => handleChange('emergencyPhone', text)} placeholder="98XXXXXXXX"/>
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

       
        {/* Save & Continue */}
        {currentTab < topics.length - 1 && (
          <TouchableOpacity style={styles.saveButton} onPress={() => setCurrentTab(prev => prev + 1)}>
            <Text style={styles.saveButtonText}>Next</Text>
          </TouchableOpacity>
        )}

        {/* Submit */}
        {currentTab === topics.length - 1 && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        )}

         {/* Back Buttons */}
        {currentTab === 0 && (
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: '#524f4fff', marginTop: 15 }]}
            onPress={() => {
              if (isNewUser) router.replace('/auth/welcome');
              else router.replace('/(tabs)/dashboard');
            }}
          >
            <Text style={styles.saveButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentTab > 0 && (
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: '#555', marginTop: 15 }]}
            onPress={() => setCurrentTab(prev => prev - 1)}
          >
            <Text style={styles.saveButtonText}>Back</Text>
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
  input: { borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, marginBottom: 10 },
  saveButton: { marginTop: 30, backgroundColor: '#2c8ef4', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  submitButton: { marginTop: 15, backgroundColor: '#34c759', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  toggleContainer: { flexDirection: 'row', marginTop: 10 },
  toggleButton: { padding: 10, backgroundColor: '#eee', borderRadius: 8, marginRight: 10 },
  selected: { backgroundColor: '#cce5ff' },
  checkboxRow: { marginTop: 5 },
  radioRow: { marginTop: 5 },
  gearItemRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  gearItemText: { fontSize: 16 },
  radioText: { fontSize: 16 },
});
