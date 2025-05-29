import { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPreference, ThemeMode } from '@/types/Preferences';

interface PreferencesContextType {
  userPreferences: UserPreference[];
  hasCompletedOnboarding: boolean;
  userName: string;
  notificationsEnabled: boolean;
  theme: ThemeMode;
  addUserPreference: (preference: UserPreference) => void;
  removeUserPreference: (id: string) => void;
  completeOnboarding: () => void;
  updateUserName: (name: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
}

export const PreferencesContext = createContext<PreferencesContextType | null>(null);

interface PreferencesProviderProps {
  children: ReactNode;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userName, setUserName] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>('system');

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const storedPreferences = await AsyncStorage.getItem('userPreferences');
      if (storedPreferences) {
        setUserPreferences(JSON.parse(storedPreferences));
      }

      const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
      setHasCompletedOnboarding(onboardingCompleted === 'true');

      const storedUserName = await AsyncStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }

      const notificationsStatus = await AsyncStorage.getItem('notificationsEnabled');
      setNotificationsEnabled(notificationsStatus !== 'false');

      const storedTheme = await AsyncStorage.getItem('theme') as ThemeMode;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const addUserPreference = async (preference: UserPreference) => {
    try {
      const updatedPreferences = [...userPreferences, preference];
      setUserPreferences(updatedPreferences);
      await AsyncStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    } catch (error) {
      console.error('Error adding preference:', error);
    }
  };

  const removeUserPreference = async (id: string) => {
    try {
      const updatedPreferences = userPreferences.filter(pref => pref.id !== id);
      setUserPreferences(updatedPreferences);
      await AsyncStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    } catch (error) {
      console.error('Error removing preference:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      setHasCompletedOnboarding(true);
      await AsyncStorage.setItem('onboardingCompleted', 'true');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const updateUserName = async (name: string) => {
    try {
      setUserName(name);
      await AsyncStorage.setItem('userName', name);
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  const updateNotificationsEnabled = async (enabled: boolean) => {
    try {
      setNotificationsEnabled(enabled);
      await AsyncStorage.setItem('notificationsEnabled', enabled.toString());
    } catch (error) {
      console.error('Error updating notifications status:', error);
    }
  };

  const updateTheme = async (newTheme: ThemeMode) => {
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        userPreferences,
        hasCompletedOnboarding,
        userName,
        notificationsEnabled,
        theme,
        addUserPreference,
        removeUserPreference,
        completeOnboarding,
        updateUserName,
        setNotificationsEnabled: updateNotificationsEnabled,
        setTheme: updateTheme,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}