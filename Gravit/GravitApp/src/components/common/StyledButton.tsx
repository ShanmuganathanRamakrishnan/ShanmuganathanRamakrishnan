import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

interface StyledButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityLabel?: string;
  enableHaptics?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ title, onPress, accessibilityLabel, enableHaptics = true }) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (enableHaptics) {
      Haptics.selectionAsync();
    }
    onPress && onPress(event);
  };
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PRIMARY_ACCENT,
    paddingVertical: SPACING.M,
    paddingHorizontal: SPACING.L,
    borderRadius: SPACING.XL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.TEXT_PRIMARY,
    ...FONTS.BODY,
    fontWeight: 'bold',
  },
});

export default StyledButton;
