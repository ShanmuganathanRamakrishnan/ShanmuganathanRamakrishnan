import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

interface BodyDetailsScreenProps {
    onCreatePlan?: (details: { age: string; heightCm: string; weightKg: string }) => void;
}

const BodyDetailsScreen: React.FC<BodyDetailsScreenProps> = ({ onCreatePlan }) => {
    const [age, setAge] = useState('');
    const [heightCm, setHeightCm] = useState('');
    const [weightKg, setWeightKg] = useState('');

    const canContinue = Boolean(age && heightCm && weightKg);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Text style={styles.title}>Tell Us About You</Text>

                <View style={styles.form}>
                    <StyledInput
                        placeholder="Age"
                        keyboardType="number-pad"
                        value={age}
                        onChangeText={setAge}
                    />
                    <StyledInput
                        placeholder="Height (cm)"
                        keyboardType="number-pad"
                        value={heightCm}
                        onChangeText={setHeightCm}
                    />
                    <StyledInput
                        placeholder="Weight (kg)"
                        keyboardType="number-pad"
                        value={weightKg}
                        onChangeText={setWeightKg}
                    />
                </View>

                <StyledButton
                    title="Create My Plan"
                    onPress={() => canContinue && onCreatePlan && onCreatePlan({ age, heightCm, weightKg })}
                    disabled={!canContinue}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        alignItems: 'center',
        padding: SPACING.L,
    },
    title: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING.L,
    },
    form: {
        gap: SPACING.M as unknown as number,
        marginBottom: SPACING.L,
    },
});

export default BodyDetailsScreen;


