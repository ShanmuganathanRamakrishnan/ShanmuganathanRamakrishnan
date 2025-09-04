import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

interface SocialLoginButtonsProps {
  onSocialLogin: (provider: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onSocialLogin }) => {
  return (
    <View style={styles.socialLoginContainer}>
      <Text style={styles.continueWithText}>Continue with</Text>
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity 
          style={[styles.socialIcon, styles.googleIcon]} 
          onPress={() => onSocialLogin('Google')}
        >
          <Text style={[styles.socialIconText, styles.googleText]}>G</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.socialIcon, styles.appleIcon]} 
          onPress={() => onSocialLogin('Apple')}
        >
          <Text style={[styles.socialIconText, styles.appleText]}>A</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.socialIcon, styles.facebookIcon]} 
          onPress={() => onSocialLogin('Facebook')}
        >
          <Text style={[styles.socialIconText, styles.facebookText]}>f</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialLoginContainer: {
    width: '100%',
    marginVertical: spacing.md,
    alignItems: 'center',
  },
  continueWithText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    borderWidth: 1,
  },
  googleIcon: {
    borderColor: '#DB4437',
    backgroundColor: 'transparent',
  },
  appleIcon: {
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  facebookIcon: {
    borderColor: '#4267B2',
    backgroundColor: 'transparent',
  },
  socialIconText: {
    ...typography.hero,
    fontWeight: '600',
  },
  googleText: {
    color: '#DB4437',
  },
  appleText: {
    color: '#000000',
  },
  facebookText: {
    color: '#4267B2',
  },
});

export default SocialLoginButtons;