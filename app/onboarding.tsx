import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { usePreferences } from '@/hooks/usePreferences';
import { Camera, Utensils, AlertTriangle, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor, Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Biteezy',
    description: 'Your personal food ingredient analyzer for making healthier choices',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
    icon: Utensils,
    color: Colors.primary[500],
  },
  {
    id: '2',
    title: 'Scan Ingredients',
    description: 'Simply scan any food product with your camera to analyze ingredients',
    image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg',
    icon: Camera,
    color: Colors.secondary[500],
  },
  {
    id: '3',
    title: 'Stay Informed',
    description: 'Get insights about additives, allergens, and nutritional information',
    image: 'https://images.pexels.com/photos/8105035/pexels-photo-8105035.jpeg',
    icon: AlertTriangle,
    color: Colors.accent[500],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { completeOnboarding } = usePreferences();
  
  const backgroundColorValue = useSharedValue(0);
  
  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      backgroundColorValue.value,
      [0, 1, 2],
      [Colors.primary[50], Colors.secondary[50], Colors.accent[50]]
    );
    
    return {
      backgroundColor,
    };
  });
  
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };
  
  const handleSkip = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
      backgroundColorValue.value = withTiming(newIndex, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.skipButtonContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => {
          const IconComponent = item.icon;
          return (
            <View style={styles.slide}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.image} 
                  resizeMode="cover"
                />
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <IconComponent color="#fff" size={32} />
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.paginationContainer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === currentIndex
                      ? onboardingData[currentIndex].color
                      : Colors.neutral[300],
                  width: index === currentIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
        
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: onboardingData[currentIndex].color }
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ChevronRight color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[700],
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 40,
    position: 'relative',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    bottom: -25,
    right: -25,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'center',
    color: Colors.neutral[900],
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.neutral[700],
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    width: '90%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
});