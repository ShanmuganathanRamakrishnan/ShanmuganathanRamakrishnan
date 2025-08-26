import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import StyledButton from '@/components/common/StyledButton';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Gravit</Text>
        <Text style={styles.subtitle}>Welcome to your fitness journey.</Text>
      </View>
      <StyledButton title="Let's Get Started" onPress={onContinue} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: SPACING.L,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...FONTS.H1,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.S,
  },
  subtitle: {
    ...FONTS.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
