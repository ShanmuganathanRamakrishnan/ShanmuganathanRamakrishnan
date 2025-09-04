import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar, SafeAreaView } from 'react-native';
import { colors, typography, spacing, components, borderRadius } from '@/constants/theme';
import InputField from '@/components/InputField';
import SocialLoginButtons from '@/components/SocialLoginButtons';

const LoginRegisterScreen = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAuth = () => {
    console.log(`${isLoginMode ? 'Login' : 'Register'} pressed with:`, { email, password });
    
    // Mock validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (!isLoginMode && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    if (!isLoginMode && password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }
    
    // For now, just show a success message
    Alert.alert(
      'Success', 
      `${isLoginMode ? 'Login' : 'Registration'} successful!`
    );
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    // Clear form when switching modes
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality would be implemented here');
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Social Login', `Continue with ${provider} would be implemented here`);
  };

  const isFormValid = () => {
    if (isLoginMode) {
      return email.length > 0 && password.length > 0;
    } else {
      return email.length > 0 && password.length >= 6 && password === confirmPassword;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#141414' }}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.mainHeading}>
                {isLoginMode ? 'Login' : 'Register'}
              </Text>
              <Text style={styles.subHeading}>
                {isLoginMode 
                  ? 'Continue your workout progress' 
                  : 'Start your fitness transformation'}
              </Text>
            </View>

            <View style={styles.formContainer}>
              <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <InputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {!isLoginMode && (
                <InputField
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}

              {isLoginMode && (
                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity 
                style={[
                  styles.primaryButton,
                  !isFormValid() && styles.disabledButton
                ]}
                onPress={handleAuth}
                disabled={!isFormValid()}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoginMode ? 'Sign In' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              <SocialLoginButtons onSocialLogin={handleSocialLogin} />

              <View style={styles.switchModeContainer}>
                <Text style={styles.switchModeText}>
                  {isLoginMode 
                    ? "Don't have an account?" 
                    : "Already have an account?"}
                </Text>
                <TouchableOpacity onPress={toggleAuthMode}>
                  <Text style={styles.switchModeLink}>
                    {isLoginMode ? "Create an account" : "Sign in"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#141414', // Explicit black background for SafeAreaView
  },
  container: {
    flex: 1,
    backgroundColor: '#141414', // Explicit black background for container
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    width: '100%',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    width: '100%',
    minHeight: 80, // Increased fixed height for better positioning consistency
  },
  mainHeading: {
    ...typography.hero,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subHeading: {
    ...typography.body,
    color: colors.accent.primary, // Changed to orange color
    textAlign: 'center',
    minHeight: 40, // Fixed height to ensure consistent positioning
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: 0,
  },
  forgotPasswordText: {
    ...typography.caption,
    color: colors.text.accent,
    // Removed textDecorationLine: 'underline'
  },
  primaryButton: {
    ...components.button.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    opacity: 1,
  },
  primaryButtonText: {
    ...typography.body,
    fontWeight: '600' as const,
    color: components.button.primary.color,
  },
  switchModeContainer: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  switchModeText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  switchModeLink: {
    ...typography.body,
    color: colors.text.accent,
    // Removed textDecorationLine: 'underline'
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default LoginRegisterScreen;