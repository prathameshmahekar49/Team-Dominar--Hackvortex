import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Scan } from '@/types/Scan';
import Colors from '@/constants/Colors';
import { EmptyState } from './EmptyState';

interface RecentScansProps {
  scans: Scan[];
  onViewAll: () => void;
}

export function RecentScans({ scans, onViewAll }: RecentScansProps) {
  const router = useRouter();
  
  const navigateToScanResult = (id: string) => {
    router.push(`/scan-result/${id}`);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Scans</Text>
        {scans.length > 0 && (
          <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color={Colors.primary[500]} />
          </TouchableOpacity>
        )}
      </View>
      
      {scans.length === 0 ? (
        <EmptyState 
          icon="scan" 
          title="No Recent Scans" 
          message="Your scanned products will appear here" 
        />
      ) : (
        <FlatList
          data={scans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.scanItem}
              onPress={() => navigateToScanResult(item.id)}
            >
              <View>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productInfo}>{item.brand}</Text>
                <Text style={styles.scanDate}>
                  {new Date(item.scanDate).toLocaleDateString()}
                </Text>
              </View>
              <ChevronRight size={20} color={Colors.neutral[500]} />
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.primary[500],
  },
  scanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  productInfo: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
    marginBottom: 4,
  },
  scanDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[500],
  },
});