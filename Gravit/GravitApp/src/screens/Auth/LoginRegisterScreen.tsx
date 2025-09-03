import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import { colors, typography, spacing, components, borderRadius } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

const LoginRegisterScreen = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

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

  const isFormValid = () => {
    if (isLoginMode) {
      return email.length > 0 && password.length > 0;
    } else {
      return email.length > 0 && password.length >= 6 && password === confirmPassword;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.background} />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainHeading}>
            {isLoginMode ? 'Login' : 'Register'}
          </Text>
          <Text style={styles.subHeading}>
            {isLoginMode 
              ? 'Sign in to continue' 
              : 'Create your account'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[
                styles.input, 
                isEmailFocused && styles.inputFocused
              ]}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter your email address"
              placeholderTextColor={colors.text.muted}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={[
                styles.input, 
                isPasswordFocused && styles.inputFocused
              ]}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter your password"
              placeholderTextColor={colors.text.muted}
            />
          </View>

          {!isLoginMode && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input, 
                  isConfirmPasswordFocused && styles.inputFocused
                ]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Confirm your password"
                placeholderTextColor={colors.text.muted}
              />
            </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    width: '100%',
  },
  mainHeading: {
    ...typography.hero,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subHeading: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  input: {
    ...components.input,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary.surface,
    color: colors.text.primary,
    fontSize: 16,
    padding: spacing.md,
    minHeight: 50,
  },
  inputFocused: {
    ...components.inputFocus,
    shadowColor: colors.accent.primary,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: -spacing.sm,
  },
  forgotPasswordText: {
    ...typography.caption,
    color: colors.text.accent,
    textDecorationLine: 'underline',
  },
  primaryButton: {
    ...components.button.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
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
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  switchModeText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  switchModeLink: {
    ...typography.body,
    color: colors.text.accent,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default LoginRegisterScreen;