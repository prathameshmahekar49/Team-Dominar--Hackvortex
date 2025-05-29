import { useContext } from 'react';
import { ScanContext } from '@/store/ScanContext';

export function useScan() {
  const context = useContext(ScanContext);
  
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  
  return context;
}