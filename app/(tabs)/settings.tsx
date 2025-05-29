import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Moon, Sun, Monitor, Lock, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { usePreferences } from '@/hooks/usePreferences';
import { HeaderBar } from '@/components/HeaderBar';
import Colors from '@/constants/Colors';

export default function SettingsScreen() {
  const router = useRouter();
  const { 
    userName,
    updateUserName,
    notificationsEnabled,
    setNotificationsEnabled,
    theme,
    setTheme
  } = usePreferences();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <HeaderBar title="Settings" />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.authButton}>
            <Text style={styles.authButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.authButton, styles.appleButton]}>
            <Text style={styles.appleButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.profileItem}>
            <Text style={styles.settingLabel}>Your Name</Text>
            <TextInput
              style={styles.nameInput}
              value={userName}
              onChangeText={updateUserName}
              placeholder="Enter your name"
              placeholderTextColor={Colors.neutral[500]}
            />
          </View>
          
          <View style={styles.profileItem}>
            <View style={styles.settingRow}>
              <Settings size={18} color={Colors.neutral[700]} />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.neutral[300], true: Colors.primary[300] }}
              thumbColor={notificationsEnabled ? Colors.primary[500] : Colors.neutral[100]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.themeButtons}>
            <TouchableOpacity 
              style={[
                styles.themeButton,
                theme === 'light' && styles.themeButtonActive
              ]}
              onPress={() => setTheme('light')}
            >
              <Sun size={20} color={theme === 'light' ? Colors.primary[500] : Colors.neutral[700]} />
              <Text style={[
                styles.themeButtonText,
                theme === 'light' && styles.themeButtonTextActive
              ]}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.themeButton,
                theme === 'dark' && styles.themeButtonActive
              ]}
              onPress={() => setTheme('dark')}
            >
              <Moon size={20} color={theme === 'dark' ? Colors.primary[500] : Colors.neutral[700]} />
              <Text style={[
                styles.themeButtonText,
                theme === 'dark' && styles.themeButtonTextActive
              ]}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.themeButton,
                theme === 'system' && styles.themeButtonActive
              ]}
              onPress={() => setTheme('system')}
            >
              <Monitor size={20} color={theme === 'system' ? Colors.primary[500] : Colors.neutral[700]} />
              <Text style={[
                styles.themeButtonText,
                theme === 'system' && styles.themeButtonTextActive
              ]}>System</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => router.push('/terms')}
          >
            <FileText size={20} color={Colors.neutral[700]} />
            <Text style={styles.linkButtonText}>Terms and Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => router.push('/privacy')}
          >
            <Lock size={20} color={Colors.neutral[700]} />
            <Text style={styles.linkButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.neutral[900],
    marginBottom: 16,
  },
  authButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  authButtonText: {
    color: Colors.neutral[50],
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  appleButton: {
    backgroundColor: Colors.neutral[900],
  },
  appleButtonText: {
    color: Colors.neutral[50],
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    flex: 1,
    backgroundColor: Colors.neutral[200],
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  themeButtonActive: {
    backgroundColor: Colors.primary[100],
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  themeButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  themeButtonTextActive: {
    color: Colors.primary[500],
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  linkButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[900],
  },
  profileSection: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.neutral[700],
  },
  nameInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.neutral[900],
    textAlign: 'right',
    flex: 1,
    marginLeft: 8,
  },
});