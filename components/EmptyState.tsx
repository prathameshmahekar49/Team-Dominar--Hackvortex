import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle, History, Search, ScanLine } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface EmptyStateProps {
  icon: 'history' | 'search' | 'alert-circle' | 'scan';
  title: string;
  message: string;
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'history':
        return <History size={50} color={Colors.neutral[400]} />;
      case 'search':
        return <Search size={50} color={Colors.neutral[400]} />;
      case 'alert-circle':
        return <AlertCircle size={50} color={Colors.neutral[400]} />;
      case 'scan':
        return <ScanLine size={50} color={Colors.neutral[400]} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderIcon()}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex: 1,
    minHeight: 200,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutral[900],
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
    textAlign: 'center',
  },
});