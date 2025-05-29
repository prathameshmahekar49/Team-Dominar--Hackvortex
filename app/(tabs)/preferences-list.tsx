import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CirclePlus as PlusCircle, TriangleAlert as AlertTriangle, ThumbsUp, Info } from 'lucide-react-native';
import { usePreferences } from '@/hooks/usePreferences';
import { PreferenceItem } from '@/components/PreferenceItem';
import { HeaderBar } from '@/components/HeaderBar';
import { EmptyState } from '@/components/EmptyState';
import Colors from '@/constants/Colors';

export default function PreferencesListScreen() {
  const { 
    userPreferences,
    addUserPreference,
    removeUserPreference,
    updateUserName,
  } = usePreferences();
  
  const [newPreference, setNewPreference] = useState('');
  const [newReason, setNewReason] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [preferenceType, setPreferenceType] = useState<'want' | 'avoid'>('avoid');

  const handleAddPreference = () => {
    if (newPreference.trim()) {
      addUserPreference({
        id: Date.now().toString(),
        ingredient: newPreference.trim(),
        reason: newReason.trim() || 'Personal preference',
        dateAdded: new Date().toISOString(),
        type: preferenceType,
      });
      setNewPreference('');
      setNewReason('');
      setIsAdding(false);
    }
  };

  const filteredPreferences = (type: 'want' | 'avoid') => 
    userPreferences.filter(pref => pref.type === type);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderBar title="Your Preferences" />
      
      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Info size={18} color={Colors.secondary[700]} />
          <Text style={styles.infoText}>
            List ingredients you want to include or avoid due to allergies, dietary restrictions, or personal preferences..
          </Text>
        </View>
        
        {isAdding && (
          <View style={styles.addForm}>
            <View style={styles.typeToggle}>
              <TouchableOpacity 
                style={[
                  styles.typeButton,
                  preferenceType === 'want' && styles.typeButtonActive,
                  preferenceType === 'want' && { backgroundColor: Colors.primary[500] }
                ]}
                onPress={() => setPreferenceType('want')}
              >
                <ThumbsUp size={16} color={preferenceType === 'want' ? '#fff' : Colors.neutral[700]} />
                <Text style={[
                  styles.typeButtonText,
                  preferenceType === 'want' && styles.typeButtonTextActive
                ]}>Want</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.typeButton,
                  preferenceType === 'avoid' && styles.typeButtonActive,
                  preferenceType === 'avoid' && { backgroundColor: Colors.error[500] }
                ]}
                onPress={() => setPreferenceType('avoid')}
              >
                <AlertTriangle size={16} color={preferenceType === 'avoid' ? '#fff' : Colors.neutral[700]} />
                <Text style={[
                  styles.typeButtonText,
                  preferenceType === 'avoid' && styles.typeButtonTextActive
                ]}>Avoid</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={newPreference}
              onChangeText={setNewPreference}
              placeholder="Ingredient name (e.g., Peanuts)"
              placeholderTextColor={Colors.neutral[500]}
            />
            <TextInput
              style={styles.input}
              value={newReason}
              onChangeText={setNewReason}
              placeholder="Reason (e.g., Allergy, Diet)"
              placeholderTextColor={Colors.neutral[500]}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.formButton, styles.cancelButton]}
                onPress={() => {
                  setIsAdding(false);
                  setNewPreference('');
                  setNewReason('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.formButton, 
                  styles.saveButton,
                  !newPreference.trim() && styles.saveButtonDisabled
                ]}
                onPress={handleAddPreference}
                disabled={!newPreference.trim()}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {!isAdding && (
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsAdding(true)}
          >
            <PlusCircle size={20} color={Colors.primary[500]} />
            <Text style={styles.addButtonText}>Add Preference</Text>
          </TouchableOpacity>
        )}

        {userPreferences.length === 0 ? (
          <EmptyState 
            icon="alert-circle" 
            title="No Preferences Set" 
            message="Add ingredients you want to include or avoid" 
          />
        ) : (
          <FlatList
            data={userPreferences}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PreferenceItem 
                preference={item} 
                onRemove={() => removeUserPreference(item.id)} 
              />
            )}
            contentContainerStyle={styles.preferencesList}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                {filteredPreferences('want').length > 0 && (
                  <Text style={styles.sectionTitle}>Wanted Ingredients</Text>
                )}
                {filteredPreferences('avoid').length > 0 && (
                  <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                    Ingredients to Avoid
                  </Text>
                )}
              </>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary[100],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.secondary[900],
    lineHeight: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  addForm: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  typeToggle: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.neutral[200],
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: Colors.primary[500],
  },
  typeButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  typeButtonTextActive: {
    color: Colors.neutral[50],
  },
  input: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[900],
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  formButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.neutral[200],
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[900],
  },
  saveButton: {
    backgroundColor: Colors.primary[500],
  },
  saveButtonDisabled: {
    backgroundColor: Colors.primary[300],
  },
  saveButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[50],
  },
  preferencesList: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutral[900],
    marginBottom: 12,
  },
});