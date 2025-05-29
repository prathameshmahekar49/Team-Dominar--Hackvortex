import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export function ScanButton() {
  const router = useRouter();

  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/scan')}
        activeOpacity={0.8}
      >
        <Camera size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[900],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});