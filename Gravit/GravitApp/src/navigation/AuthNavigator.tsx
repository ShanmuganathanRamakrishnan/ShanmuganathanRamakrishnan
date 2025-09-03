// AuthNavigator.tsx
// This file implements the authentication flow using React Navigation

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginRegisterScreen from '@/screens/Auth/LoginRegisterScreen';

// Mock screens for demonstration
import { View, Text, Button } from 'react-native';

const Stack = createStackNavigator();

// Mock onboarding and main screens
const WelcomeScreen = ({ navigation }: any) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Welcome to Onboarding</Text>
    <Button title="Continue" onPress={() => navigation.navigate('GoalSelection')} />
  </View>
);

const GoalSelectionScreen = ({ navigation }: any) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Goal Selection</Text>
    <Button title="Next" onPress={() => navigation.navigate('MainApp')} />
  </View>
);

const MainAppScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Main App Content</Text>
  </View>
);

const AuthNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="LoginRegister">
            {() => <LoginRegisterScreen />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
            <Stack.Screen name="MainApp" component={MainAppScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;