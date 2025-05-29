import { useState } from 'react';
import { useScan } from './useScan';
import { mockIngredientsData } from '@/utils/mockData';

export function useScanIngredients() {
  const { addScan } = useScan();
  const [isScanning, setIsScanning] = useState(false);

  const scanIngredients = async (): Promise<string | null> => {
    setIsScanning(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get random mock data
      const mockData = mockIngredientsData[
        Math.floor(Math.random() * mockIngredientsData.length)
      ];
      
      // Add the scan to history
      const scanId = addScan(mockData);
      
      return scanId;
    } catch (error) {
      console.error('Error scanning ingredients:', error);
      return null;
    } finally {
      setIsScanning(false);
    }
  };

  return {
    scanIngredients,
    isScanning,
  };
}