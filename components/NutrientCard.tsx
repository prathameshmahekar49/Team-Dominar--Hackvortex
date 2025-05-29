import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface NutrientCardProps {
  title: string;
  value: number;
  unit: string;
  type: 'positive' | 'negative' | 'neutral';
}

export function NutrientCard({ title, value, unit, type }: NutrientCardProps) {
  const getColorByType = () => {
    switch (type) {
      case 'positive':
        return Colors.primary[500];
      case 'negative':
        return Colors.error[500];
      case 'neutral':
        return Colors.secondary[500];
      default:
        return Colors.neutral[500];
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: getColorByType() }]}>{title}</Text>
      <Text style={styles.value}>
        {value}
        <Text style={styles.unit}>{unit}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: Colors.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
  },
  unit: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
  },
});