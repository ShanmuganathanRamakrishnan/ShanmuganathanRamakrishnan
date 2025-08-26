import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import SelectionCard from '../../components/common/SelectionCard';
import StyledButton from '../../components/common/StyledButton';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type Equipment = 'full_gym' | 'dumbbells' | 'bodyweight';

interface WorkoutLogisticsScreenProps {
    onLogisticsSelected?: (params: { daysPerWeek: number | '5_plus'; equipment: Equipment }) => void;
}

const DAYS_OPTIONS: Array<{ id: number | '5_plus'; label: string }> = [
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' },
    { id: '5_plus', label: '5+' },
];

const EQUIPMENT_OPTIONS = [
    {
        id: 'full_gym',
        title: 'Full Gym',
        description: 'Access to barbells, machines, and cable stacks.',
        icon: <Ionicons name="business" size={24} color={COLORS.PRIMARY_ACCENT} />,
    },
    {
        id: 'dumbbells',
        title: 'Dumbbells Only',
        description: 'A set of dumbbells and maybe a bench.',
        icon: <Ionicons name="cube" size={24} color={COLORS.PRIMARY_ACCENT} />,
    },
    {
        id: 'bodyweight',
        title: 'Bodyweight',
        description: 'No equipment required; focus on calisthenics.',
        icon: <Ionicons name="accessibility" size={24} color={COLORS.PRIMARY_ACCENT} />,
    },
];

const WorkoutLogisticsScreen: React.FC<WorkoutLogisticsScreenProps> = ({ onLogisticsSelected }) => {
    const [daysPerWeek, setDaysPerWeek] = useState<number | '5_plus' | null>(null);
    const [equipment, setEquipment] = useState<Equipment | null>(null);

    const canContinue = daysPerWeek !== null && equipment !== null;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Your Weekly Plan?</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Days per week</Text>
                <View style={styles.daysRow}>
                    {DAYS_OPTIONS.map((opt) => {
                        const selected = daysPerWeek === opt.id;
                        return (
                            <TouchableOpacity
                                key={String(opt.id)}
                                style={[styles.dayChip, selected && styles.dayChipSelected]}
                                onPress={() => setDaysPerWeek(opt.id)}
                                accessibilityRole="button"
                                accessibilityState={{ selected }}
                                accessibilityLabel={`Days per week ${opt.label}${selected ? ' selected' : ''}`}
                            >
                                <Text style={[styles.dayChipText, selected && styles.dayChipTextSelected]}>{opt.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Equipment access</Text>
                <View style={{ width: '100%' }}>
                    {EQUIPMENT_OPTIONS.map((opt) => (
                        <SelectionCard
                            key={opt.id}
                            title={opt.title}
                            description={opt.description}
                            icon={opt.icon}
                            isSelected={equipment === (opt.id as Equipment)}
                            onPress={() => setEquipment(opt.id as Equipment)}
                        />
                    ))}
                </View>
            </View>

            <StyledButton
                title="Continue"
                onPress={() => canContinue && onLogisticsSelected && onLogisticsSelected({ daysPerWeek: daysPerWeek!, equipment: equipment! })}
                disabled={!canContinue}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.L,
    },
    title: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING.M,
    },
    section: {
        width: '100%',
        marginBottom: SPACING.M,
    },
    sectionTitle: {
        ...FONTS.BODY,
        fontWeight: 'bold',
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.S,
    },
    daysRow: {
        flexDirection: 'row',
        gap: SPACING.S as unknown as number,
    },
    dayChip: {
        paddingVertical: SPACING.S,
        paddingHorizontal: SPACING.M,
        borderRadius: SPACING.XL,
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderWidth: 2,
        borderColor: 'transparent',
        marginRight: SPACING.S,
    },
    dayChipSelected: {
        borderColor: COLORS.PRIMARY_ACCENT,
    },
    dayChipText: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
    },
    dayChipTextSelected: {
        color: COLORS.TEXT_PRIMARY,
        fontWeight: 'bold',
    },
});

export default WorkoutLogisticsScreen;


