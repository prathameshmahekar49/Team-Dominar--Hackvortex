import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export function WelcomeCard() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scan Your First Product</Text>
        <Text style={styles.description}>
          Analyze ingredients and discover what's in your food
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/scan')}
      >
        <Text style={styles.buttonText}>Scan Now</Text>
        <ChevronRight size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary[100],
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: Colors.secondary[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.secondary[900],
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.secondary[700],
    lineHeight: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary[500],
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginRight: 4,
  },
});