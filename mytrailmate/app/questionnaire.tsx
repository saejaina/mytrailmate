import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
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
const topics = ['Trek Mode', 'Personal Info', 'Health Info', 'Trek Experience', 'Gear Prep', 'Planning', 'Emergency Contact'];

const Questionnaire = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [trekMode, setTrekMode] = useState<'solo' | 'group' | null>(null);

  const [formData, setFormData] = useState({});

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
            <TextInput style={styles.input} onChangeText={text => handleChange('name', text)} />
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} keyboardType="numeric" onChangeText={text => handleChange('age', text)} />
            <Text style={styles.label}>Gender</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('gender', text)} />
            <Text style={styles.label}>Blood Group</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('bloodGroup', text)} />
            <Text style={styles.label}>Emergency Contact</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('emergencyContact', text)} />

            {trekMode === 'group' && (
              <>
                <Text style={styles.label}>Group Name or Team Name</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupName', text)} />
                <Text style={styles.label}>Group Leader Name</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupLeader', text)} />
                <Text style={styles.label}>Total Number of Members</Text>
                <TextInput style={styles.input} keyboardType="numeric" onChangeText={text => handleChange('groupSize', text)} />
                <Text style={styles.label}>Age range of group (e.g., 18–25)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupAgeRange', text)} />
                <Text style={styles.label}>List all member names and ages</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupMembers', text)} />
                <Text style={styles.label}>Any children or seniors in group? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('childrenOrSeniors', text)} />
                <Text style={styles.label}>Guide or experienced leader in group? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('hasLeader', text)} />
              </>
            )}
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.label}>Do you have any allergies or medical conditions?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('medicalConditions', text)} />
            <Text style={styles.label}>If yes, please specify</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('medicalDetails', text)} />
            <Text style={styles.label}>Are you carrying a medical kit?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('medicalKit', text)} />

            {trekMode === 'group' && (
              <>
                <Text style={styles.label}>Any serious conditions in group? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupConditions', text)} />
                <Text style={styles.label}>If yes, please specify</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupConditionDetails', text)} />
                <Text style={styles.label}>Shared medical kit? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupMedicalKit', text)} />
                <Text style={styles.label}>First aid trained person present? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupFirstAid', text)} />
              </>
            )}
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.label}>How many treks have you completed?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('trekCount', text)} />
            <Text style={styles.label}>Most difficult trek you've done?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('difficultTrek', text)} />
            <Text style={styles.label}>Experienced altitude sickness?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('altitudeSickness', text)} />
            <Text style={styles.label}>Average pace</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('pace', text)} />

            {trekMode === 'group' && (
              <>
                <Text style={styles.label}>Members with trek experience</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('experiencedMembers', text)} />
                <Text style={styles.label}>Most difficult trek done by any member</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupDifficultTrek', text)} />
                <Text style={styles.label}>Trek together before? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('trekkedTogether', text)} />
                <Text style={styles.label}>Group's average pace</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupPace', text)} />
              </>
            )}
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={styles.label}>Do you have essential gear?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('gear', text)} />
            <Text style={styles.label}>Carrying tent/sleeping bag?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('shelter', text)} />
            <Text style={styles.label}>Using navigation aid?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('navigation', text)} />

            {trekMode === 'group' && (
              <>
                <Text style={styles.label}>Does every member have gear? (Yes/No/Some)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupGear', text)} />
                <Text style={styles.label}>Shared communication devices? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('groupComm', text)} />
              </>
            )}
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={styles.label}>Trail selected?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('trailSelected', text)} />
            <Text style={styles.label}>Have trail map?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('trailMap', text)} />
            <Text style={styles.label}>Backup emergency plan?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('backupPlan', text)} />
            <Text style={styles.label}>Someone aware of trek plan?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('trekAwareness', text)} />
            <Text style={styles.label}>Aware of permit requirements?</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('permitAwareness', text)} />

            {trekMode === 'group' && (
              <>
                <Text style={styles.label}>Any cold-sensitive members? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('coldSensitive', text)} />
                <Text style={styles.label}>Everyone has weather gear? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('weatherGear', text)} />
                <Text style={styles.label}>Weather conditions checked? (Yes/No)</Text>
                <TextInput style={styles.input} onChangeText={text => handleChange('weatherChecked', text)} />
              </>
            )}
          </View>
        );
      case 6:
        return (
          <View>
            <Text style={styles.label}>Emergency Contact Name</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('emergencyName', text)} />
            <Text style={styles.label}>Emergency Phone</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={text => handleChange('emergencyPhone', text)} />
          </View>
        );
      default:
        return null;
    }
  };

  const handleSave = () => {
    if (currentTab < topics.length - 1) {
      setCurrentTab(prev => prev + 1);
    }
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
            style={styles.tabButton}
            onPress={() => setCurrentTab(index)}
          >
            <Text style={[styles.tabText, currentTab === index && styles.activeTabText]}>{topic}</Text>
            {currentTab === index && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderQuestions()}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {currentTab === topics.length - 1 ? 'Finish' : 'Save & Continue'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

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
    marginBottom: 10,
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
  toggleContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#cce5ff',
  },
});

export default Questionnaire;