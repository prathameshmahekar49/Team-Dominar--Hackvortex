import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { Additive } from '@/types/Scan';
import Colors from '@/constants/Colors';

interface AdditiveItemProps {
  additive: Additive;
}

export function AdditiveItem({ additive }: AdditiveItemProps) {
  const [expanded, setExpanded] = useState(false);
  
  const getColorByRisk = (risk: string) => {
    switch (risk) {
      case 'No Risk':
        return Colors.primary[500];
      case 'Good':
        return Colors.secondary[500];
      case 'Risky':
        return Colors.accent[500];
      case 'Hazardous':
        return Colors.error[500];
      default:
        return Colors.neutral[500];
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.nameRow}>
          <View 
            style={[
              styles.riskIndicator, 
              { backgroundColor: getColorByRisk(additive.riskLevel) }
            ]} 
          />
          <Text style={styles.name}>{additive.name}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.riskText}>{additive.riskLevel}</Text>
          {expanded ? (
            <ChevronUp size={20} color={Colors.neutral[700]} />
          ) : (
            <ChevronDown size={20} color={Colors.neutral[700]} />
          )}
        </View>
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.detailsContainer}>
          {additive.purpose && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Purpose:</Text>
              <Text style={styles.detailText}>{additive.purpose}</Text>
            </View>
          )}
          {additive.description && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Description:</Text>
              <Text style={styles.detailText}>{additive.description}</Text>
            </View>
          )}
          {additive.potentialEffects && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Potential Effects:</Text>
              <Text style={styles.detailText}>{additive.potentialEffects}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  riskIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.neutral[900],
    flex: 1,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.neutral[700],
    marginRight: 8,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: Colors.neutral[100],
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  detailRow: {
    marginBottom: 10,
  },
  detailLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
    lineHeight: 22,
  },
});