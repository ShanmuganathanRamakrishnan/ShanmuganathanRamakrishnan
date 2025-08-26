import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SPACING, FONTS } from '@/constants/theme';

type StyledInputProps = TextInputProps;

const StyledInput: React.FC<StyledInputProps> = ({ style, ...rest }) => {
    return <TextInput style={[styles.input, style]} placeholderTextColor={COLORS.TEXT_SECONDARY} {...rest} />;
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderRadius: SPACING.M,
        paddingVertical: SPACING.S,
        paddingHorizontal: SPACING.M,
        color: COLORS.TEXT_PRIMARY,
        ...FONTS.BODY,
        borderWidth: 1,
        borderColor: 'transparent',
    },
});

export default StyledInput;


