import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Search, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface StatCardProps {
  title: string;
  value: string;
  icon: 'search' | 'alert-circle';
  color: string;
  growth?: number;
}

export function StatCard({ title, value, icon, color, growth }: StatCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'search':
        return <Search size={24} color={color} />;
      case 'alert-circle':
        return <AlertCircle size={24} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          {renderIcon()}
        </View>
        {growth !== undefined && (
          <View style={styles.growthContainer}>
            {growth > 0 ? (
              <>
                <TrendingUp size={14} color={Colors.primary[500]} />
                <Text style={[styles.growthText, styles.positiveGrowth]}>
                  {growth}%
                </Text>
              </>
            ) : growth < 0 ? (
              <>
                <TrendingDown size={14} color={Colors.error[500]} />
                <Text style={[styles.growthText, styles.negativeGrowth]}>
                  {Math.abs(growth)}%
                </Text>
              </>
            ) : null}
          </View>
        )}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginLeft: 2,
  },
  positiveGrowth: {
    color: Colors.primary[500],
  },
  negativeGrowth: {
    color: Colors.error[500],
  },
  value: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
  },
});