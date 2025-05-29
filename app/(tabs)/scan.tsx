import { useEffect, useState, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'; 
import * as ImagePicker from 'expo-image-picker';
import { Camera as CameraIcon, Flashlight, ImagePlus, ScanLine } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useScanIngredients } from '@/hooks/useScanIngredients';
import { ScanOverlay } from '@/components/ScanOverlay';
import Colors from '@/constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

export default function ScanScreen() {
  const router = useRouter();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasImagesPermission, setHasImagesPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef<CameraView>(null); 
  const { scanIngredients, isScanning } = useScanIngredients();
  
  const scanLinePosition = useSharedValue(0);

  const requestCameraPermission = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(granted);
  }

  const requestImagePermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasImagesPermission(granted);
  }

  const openGallery = async () => {
    const { assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (assets) {
      setPhotos(assets.map((asset) => asset.uri));
    }
  }

  const handleCameraFocus = useCallback(async () => {
    await requestCameraPermission();
    await requestImagePermission();
    setIsCameraReady(true);
    
    // Start camera when returning to screen
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      handleCameraFocus();
      
      // Cleanup when screen loses focus
      return () => {
        if (cameraRef.current) {
          cameraRef.current.pausePreview();
        }
        setIsCameraReady(false);
      };
    }, [handleCameraFocus])
  );

  const handleScan = async () => {
    if (isScanning) return;
    
    try {
      const scanId = await scanIngredients();
      if (scanId) {
        router.push(`/scan-result/${scanId}`);
      }
    } catch (error) {
      console.error('Scan failed:', error);
    }
  };

  if (!hasCameraPermission) {
    return (
      <View style={styles.permissionContainer}>
        <CameraIcon size={80} color={Colors.neutral[500]} />
        <Text style={styles.permissionTitle}>Camera Permission Required</Text>
        <Text style={styles.permissionText}>
          We need camera permission to scan product ingredients
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraReady && (
        <CameraView 
          style={styles.camera}
          ref={cameraRef}
          facing={type || 'back'}
          enableTorch={false}
        />
      )}
      
      <View style={styles.overlayContainer}>
        <ScanOverlay />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => router.back()}
        >
          <Flashlight color={Colors.neutral[900]} size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
          onPress={handleScan}
          disabled={isScanning}
        >
          {isScanning ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.scanButtonText}>Snap Ingredients</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.imageButton} 
          onPress={hasImagesPermission ? openGallery : requestImagePermission}
        >
          <ImagePlus color={Colors.neutral[900]} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: Colors.primary[500],
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonDisabled: {
    backgroundColor: Colors.primary[300],
  },
  scanButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  imageButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    padding: 24,
  },
  permissionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
    textAlign: 'center',
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});