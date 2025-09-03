# Integration Guide for LoginRegisterScreen

This document explains how to integrate the LoginRegisterScreen into different navigation setups.

## Basic Integration

The LoginRegisterScreen accepts two optional props:
- `onLoginSuccess`: Function to call when login is successful
- `onRegisterSuccess`: Function to call when registration is successful

## Integration with Custom Navigation

```tsx
import LoginRegisterScreen from '@/screens/Auth/LoginRegisterScreen';

// In your navigation component
<LoginRegisterScreen 
  onLoginSuccess={() => {
    // Handle successful login
    // e.g., navigate to onboarding or main app
  }}
  onRegisterSuccess={() => {
    // Handle successful registration
    // e.g., show confirmation and then navigate
  }}
/>
```

## Integration with React Navigation

If using React Navigation, you can integrate the screen like this:

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import LoginRegisterScreen from '@/screens/Auth/LoginRegisterScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginRegister">
        {() => (
          <LoginRegisterScreen 
            onLoginSuccess={() => {
              // Navigate to next screen
              navigation.navigate('Onboarding');
            }}
            onRegisterSuccess={() => {
              // Navigate to next screen
              navigation.navigate('Onboarding');
            }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
```

## Integration with the Provided App Structure

The App.tsx file has been updated to include an authentication state that uses the LoginRegisterScreen as the initial screen. The screen will call the appropriate handler functions to transition to the onboarding flow.