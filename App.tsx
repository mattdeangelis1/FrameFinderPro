import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FaceScanScreen from './screens/FaceScanScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';

type RootStackParamList = {
  Home: undefined;
  FaceScan: undefined;
  Recommendations: { imageUri: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FaceScan" component={FaceScanScreen} />
        
        {}
        <Stack.Screen name="Recommendations">
          {({ route }) => <RecommendationsScreen route={route} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
