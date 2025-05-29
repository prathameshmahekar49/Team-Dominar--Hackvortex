import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Scan } from '@/types/Scan';
import Colors from '@/constants/Colors';

interface ScanItemProps {
  scan: Scan;
}

export function ScanItem({ scan }: ScanItemProps) {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/scan-result/${scan.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.productName}>{scan.productName}</Text>
          <Text style={styles.date}>
            {new Date(scan.scanDate).toLocaleDateString()}
          </Text>
        </View>
        
        <Text style={styles.brand}>{scan.brand}</Text>
        
        <View style={styles.highlights}>
          {scan.positives.length > 0 && (
            <View style={[styles.badge, styles.positiveBadge]}>
              <Text style={styles.badgeText}>
                {scan.positives.length} {scan.positives.length === 1 ? 'positive' : 'positives'}
              </Text>
            </View>
          )}
          
          {scan.negatives.length > 0 && (
            <View style={[styles.badge, styles.negativeBadge]}>
              <Text style={styles.badgeText}>
                {scan.negatives.length} {scan.negatives.length === 1 ? 'negative' : 'negatives'}
              </Text>
            </View>
          )}
          
          {scan.additives.length > 0 && (
            <View style={[styles.badge, styles.additiveBadge]}>
              <Text style={styles.badgeText}>
                {scan.additives.length} {scan.additives.length === 1 ? 'additive' : 'additives'}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <ChevronRight size={20} color={Colors.neutral[500]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
    flex: 1,
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[500],
  },
  brand: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
    marginBottom: 8,
  },
  highlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  positiveBadge: {
    backgroundColor: Colors.primary[100],
  },
  negativeBadge: {
    backgroundColor: Colors.error[100],
  },
  additiveBadge: {
    backgroundColor: Colors.accent[100],
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.neutral[800],
  },
});