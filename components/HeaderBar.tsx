import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface HeaderBarProps {
  title: string;
}

export function HeaderBar({ title }: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
  },
});