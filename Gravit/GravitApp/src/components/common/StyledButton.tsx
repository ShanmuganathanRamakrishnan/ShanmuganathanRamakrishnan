import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

interface StyledButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
