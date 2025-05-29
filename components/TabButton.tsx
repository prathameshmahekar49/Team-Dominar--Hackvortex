import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';

interface TabButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
  badge?: number;
}

export function TabButton({ title, active, onPress, badge }: TabButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.activeButton]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.titleContainer}>
        <Text style={[styles.title, active && styles.activeTitle]}>{title}</Text>
        {badge !== undefined && badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      {active && <View style={styles.indicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  activeButton: {
    backgroundColor: Colors.neutral[100],
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.neutral[700],
  },
  activeTitle: {
    color: Colors.primary[500],
  },
  badge: {
    backgroundColor: Colors.primary[500],
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: Colors.primary[500],
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});