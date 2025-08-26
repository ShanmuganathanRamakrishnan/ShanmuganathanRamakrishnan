import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import SelectionCard from '@/components/common/SelectionCard';
import StyledButton from '@/components/common/StyledButton';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

const LEVELS = [
    {
        id: 'beginner',
        title: 'Beginner',
        description: 'New to the gym or less than 1 year of experience.',
        icon: <Ionicons name="sparkles" size={24} color={COLORS.PRIMARY_ACCENT} />,
    },
    {
        id: 'intermediate',
        title: 'Intermediate',
        description: '1-3 years of consistent training with solid fundamentals.',
        icon: <Ionicons name="fitness" size={24} color={COLORS.PRIMARY_ACCENT} />,
    },
    {
        id: 'advanced',
        title: 'Advanced',
        description: '3+ years of training and comfortable with complex programming.',
        icon: <Ionicons name="trophy" size={24} color={COLORS.PRIMARY_ACCENT} />,
    },
];

interface ExperienceLevelScreenProps {
    onExperienceSelected?: (level: ExperienceLevel) => void;
}

const ExperienceLevelScreen: React.FC<ExperienceLevelScreenProps> = ({ onExperienceSelected }) => {
    const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | null>(null);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>What's Your Experience Level?</Text>
            <View style={styles.cardContainer}>
                {LEVELS.map((level) => (
                    <SelectionCard
                        key={level.id}
                        title={level.title}
                        description={level.description}
                        icon={level.icon}
                        isSelected={selectedLevel === level.id}
                        onPress={() => setSelectedLevel(level.id as ExperienceLevel)}
                    />
                ))}
            </View>
            <StyledButton
                title="Continue"
                onPress={() => selectedLevel && onExperienceSelected && onExperienceSelected(selectedLevel)}
                disabled={!selectedLevel}
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
        marginBottom: SPACING.L,
    },
    cardContainer: {
        width: '100%',
        flex: 1,
    },
});

export default ExperienceLevelScreen;


