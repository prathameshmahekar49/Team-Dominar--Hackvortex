import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle, Trash2, ThumbsUp } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { UserPreference } from '@/types/Preferences';

interface PreferenceItemProps {
  preference: UserPreference;
  onRemove: () => void;
}

export function PreferenceItem({ preference, onRemove }: PreferenceItemProps) {
  const formattedDate = new Date(preference.dateAdded).toLocaleDateString();
  
  return (
    <View style={[
      styles.container,
      preference.type === 'want' ? styles.wantContainer : styles.avoidContainer
    ]}>
      <View style={styles.iconContainer}>
        {preference.type === 'want' ? (
          <ThumbsUp size={20} color={Colors.primary[500]} />
        ) : (
          <AlertTriangle size={20} color={Colors.error[500]} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.ingredient}>{preference.ingredient}</Text>
        <Text style={styles.reason}>{preference.reason}</Text>
        <Text style={styles.date}>Added on {formattedDate}</Text>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Trash2 size={18} color={preference.type === 'want' ? Colors.primary[500] : Colors.error[500]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[50],
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  wantContainer: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary[500],
  },
  avoidContainer: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.error[500],
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  ingredient: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  reason: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.neutral[700],
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  removeButton: {
    padding: 8,
  },
});