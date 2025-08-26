import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SelectionCard from '@/components/common/SelectionCard';
import StyledButton from '@/components/common/StyledButton';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

type Goal = 'build_muscle' | 'lose_weight' | 'improve_fitness';

const GOALS = [
  { id: 'build_muscle', title: 'Build Muscle', description: 'Focus on strength and hypertrophy.', icon: <Ionicons name="barbell" size={24} color={COLORS.PRIMARY_ACCENT} /> },
  { id: 'lose_weight', title: 'Lose Weight', description: 'Focus on calorie deficit and cardio.', icon: <Ionicons name="flame" size={24} color={COLORS.PRIMARY_ACCENT} /> },
  { id: 'improve_fitness', title: 'Improve Fitness', description: 'A balanced mix of strength and cardio.', icon: <Ionicons name="heart" size={24} color={COLORS.PRIMARY_ACCENT} /> },
];

interface GoalSelectionScreenProps {
  onGoalSelected: (goal: Goal) => void;
}

const GoalSelectionScreen: React.FC<GoalSelectionScreenProps> = ({ onGoalSelected }) => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What's Your Goal?</Text>
      <View style={styles.cardContainer}>
        {GOALS.map((goal) => (
          <SelectionCard
            key={goal.id}
            title={goal.title}
            description={goal.description}
            icon={goal.icon}
            isSelected={selectedGoal === goal.id}
            onPress={() => setSelectedGoal(goal.id as Goal)}
          />
        ))}
      </View>
      <StyledButton title="Continue" onPress={() => selectedGoal && onGoalSelected(selectedGoal)} disabled={!selectedGoal} />
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

export default GoalSelectionScreen;
