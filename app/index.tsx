import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { usePreferences } from '@/hooks/usePreferences';

/**
 * Entry point that redirects to the appropriate initial screen
 */
export default function Index() {
  const { hasCompletedOnboarding } = usePreferences();

  // Redirect based on onboarding status
  return hasCompletedOnboarding ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/onboarding" />
  );
}