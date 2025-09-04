import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import { colors, typography, spacing, components, borderRadius } from '@/constants/theme';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  isFocused = false,
  onFocus = () => {},
  onBlur = () => {},
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: spacing.xs,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.text.primary,
    marginBottom: spacing.xs,
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
});

export default InputField;