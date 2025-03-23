import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList={
  Home: undefined;
  FaceScan: undefined;
  Recommendations: { imageUri: string };
};

type FaceScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FaceScan'>;

export default function FaceScanScreen({ navigation }: { navigation: FaceScanScreenNavigationProp }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera | null>(null); // ✅ Use Camera type

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // ✅ Debug log to check if Camera has "Type"
  console.log("Camera Object:", Camera);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      navigation.navigate('Recommendations', { imageUri: photo.uri });
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting Camera Permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.back}
      />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.buttonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  captureButton: { 
    position: 'absolute', bottom: 20, alignSelf: 'center', 
    backgroundColor: '#007AFF', padding: 15, borderRadius: 50 
  },
  buttonText: { color: '#fff', fontSize: 18 },
});
