export interface UserPreference {
  id: string;
  ingredient: string;
  reason: string;
  dateAdded: string;
  type: 'want' | 'avoid';
}

export type ThemeMode = 'light' | 'dark' | 'system';