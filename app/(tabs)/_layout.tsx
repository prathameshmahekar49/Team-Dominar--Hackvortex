import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Chrome as Home, History, CircleUser as UserCircle, Camera, ListPlus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ScanButton } from '@/components/ScanButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary[700],
        tabBarInactiveTintColor: Colors.neutral[500],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <History color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: () => <ScanButton />,
        }}
      />
      <Tabs.Screen
        name="preferences-list"
        options={{
          title: 'Preferences',
          tabBarIcon: ({ color, size }) => <ListPlus color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <UserCircle color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background.light,
    borderTopColor: Colors.neutral[300],
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});