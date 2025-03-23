import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  FaceScan: undefined;
  Recommendations: { imageUri: string };
};

type RecommendationsScreenProps = {
  route: RouteProp<RootStackParamList, 'Recommendations'>;
};

export default function RecommendationsScreen({ route }: RecommendationsScreenProps) {
  const { imageUri } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Frames</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Text style={styles.recommendation}>Suggested Frame: Round Glasses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  image: { width: 200, height: 200, borderRadius: 100, marginBottom: 20 },
  recommendation: { fontSize: 18, color: 'gray' },
});
