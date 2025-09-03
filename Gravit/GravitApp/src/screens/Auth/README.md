# Login/Register Screen

This screen provides a login and registration UI for the Gravit app, following the design system specifications.

## Usage

To use this screen in your app, you can import it directly:

```tsx
import LoginRegisterScreen from '@/screens/Auth/LoginRegisterScreen';
```

Or using the index file:

```tsx
import { LoginRegisterScreen } from '@/screens/Auth';
```

## Integration Example

Here's how you might integrate this screen into a navigation flow:

```tsx
// In your navigation setup
import LoginRegisterScreen from '@/screens/Auth/LoginRegisterScreen';

// Example with React Navigation
<Stack.Navigator>
  <Stack.Screen 
    name="LoginRegister" 
    component={LoginRegisterScreen} 
    options={{ headerShown: false }} 
  />
  // ... other screens
</Stack.Navigator>
```

## Features

- Email and password inputs with focus states
- Login and Register buttons with appropriate styling
- Form validation (basic mock implementation)
- "Forgot Password?" link
- Responsive design using the fitness design system

## Implementation Details

The component uses the design tokens from `@/constants/theme.json` for all styling, ensuring consistency with the app's design system.