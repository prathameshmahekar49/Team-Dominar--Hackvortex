import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Colors from '@/constants/Colors';

interface ActivityRingProps {
  percentage: number;
  size: number;
  color: string;
  title: string;
}

export function ActivityRing({ percentage, size, color, title }: ActivityRingProps) {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <View style={styles.container}>
      <View style={styles.ringContainer}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Colors.neutral[300]}
            strokeWidth={6}
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={6}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          />
        </Svg>
        <Text style={[styles.percentage, { color }]}>{percentage}%</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  percentage: {
    position: 'absolute',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.neutral[700],
  },
});