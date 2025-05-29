import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBar } from '@/components/HeaderBar';
import Colors from '@/constants/Colors';

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderBar title="Terms and Conditions" />
      <View style={styles.content}>
        <Text style={styles.text}>Terms and Conditions</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[100],
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.neutral[900],
  },
});