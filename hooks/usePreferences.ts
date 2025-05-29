import { useContext } from 'react';
import { PreferencesContext } from '@/store/PreferencesContext';

export function usePreferences() {
  const context = useContext(PreferencesContext);
  
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  
  return context;
}