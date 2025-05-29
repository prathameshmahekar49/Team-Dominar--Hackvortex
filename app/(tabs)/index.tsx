import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useScan } from '@/hooks/useScan';
import { usePreferences } from '@/hooks/usePreferences';
import { RecentScans } from '@/components/RecentScans';
import { WelcomeCard } from '@/components/WelcomeCard';
import { StatCard } from '@/components/StatCard';
import { ActivityRing } from '@/components/ActivityRing';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const router = useRouter();
  const { recentScans } = useScan();
  const { userName, userPreferences } = usePreferences();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {userName || 'Friend'}!</Text>
            <Text style={styles.subheading}>Track your food ingredients with ease</Text>
          </View>
          <View style={styles.profileImageWrapper}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }} 
              style={styles.profileImage} 
            />
          </View>
        </View>

        <WelcomeCard />

        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard 
              title="Total Scans" 
              value={recentScans.length.toString()} 
              icon="search" 
              color={Colors.secondary[500]} 
              growth={+8}
            />
            <StatCard 
              title="Avoided Items" 
              value={`${userPreferences.length}`} 
              icon="alert-circle" 
              color={Colors.accent[500]} 
              growth={+3}
            />
          </View>
          <View style={styles.activityContainer}>
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>Your Nutrition</Text>
              <Text style={styles.activitySubtitle}>Based on your recent scans</Text>
            </View>
            <View style={styles.ringsContainer}>
              <ActivityRing 
                percentage={75} 
                size={70} 
                color={Colors.primary[500]} 
                title="Protein" 
              />
              <ActivityRing 
                percentage={45} 
                size={70} 
                color={Colors.secondary[500]} 
                title="Vitamins" 
              />
              <ActivityRing 
                percentage={30} 
                size={70} 
                color={Colors.error[500]} 
                title="Additives" 
              />
            </View>
          </View>
        </View>

        <RecentScans scans={recentScans.slice(0, 3)} onViewAll={() => router.push('/history')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral[900],
  },
  subheading: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
    marginTop: 2,
  },
  profileImageWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary[500],
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  statsContainer: {
    padding: 16,
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  activityContainer: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityText: {
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
  },
  activitySubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
  },
  ringsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});