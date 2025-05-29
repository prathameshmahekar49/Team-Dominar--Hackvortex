import { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Scan } from '@/types/Scan';
import { sampleScans } from '@/constants/scans';

interface ScanContextType {
  recentScans: Scan[];
  addScan: (scan: Omit<Scan, 'id' | 'scanDate'>) => string;
  getScanById: (id: string) => Scan | undefined;
}

export const ScanContext = createContext<ScanContextType | null>(null);

interface ScanProviderProps {
  children: ReactNode;
}

export function ScanProvider({ children }: ScanProviderProps) {
  const [recentScans, setRecentScans] = useState<Scan[]>([]);

  useEffect(() => {
    loadScans();
  }, []);

  const loadScans = async () => {
    try {
      const storedScans = await AsyncStorage.getItem('recentScans');
      if (storedScans) {
        setRecentScans(JSON.parse(storedScans));
      } else {
        setRecentScans(sampleScans);
      }
    } catch (error) {
      console.error('Error loading scans:', error);
    }
  };

  const saveScans = async (scans: Scan[]) => {
    try {
      await AsyncStorage.setItem('recentScans', JSON.stringify(scans));
    } catch (error) {
      console.error('Error saving scans:', error);
    }
  };

  const addScan = (scanData: Omit<Scan, 'id' | 'scanDate'>) => {
    const id = Date.now().toString();
    const newScan: Scan = {
      ...scanData,
      id,
      scanDate: new Date().toISOString(),
    };

    const updatedScans = [newScan, ...recentScans];
    setRecentScans(updatedScans);
    saveScans(updatedScans);
    return id;
  };

  const getScanById = (id: string) => {
    return recentScans.find((scan) => scan.id === id);
  };

  return (
    <ScanContext.Provider
      value={{
        recentScans,
        addScan,
        getScanById,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
}
