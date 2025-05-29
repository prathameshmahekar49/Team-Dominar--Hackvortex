import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBar } from '@/components/HeaderBar';
import Colors from '@/constants/Colors';

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderBar title="Privacy Policy" />
      <View style={styles.content}>
        <Text style={styles.text}>Privacy Policy</Text>
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