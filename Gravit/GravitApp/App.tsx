import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import WelcomeScreen from '@/screens/onboarding/WelcomeScreen';
import GoalSelectionScreen from '@/screens/onboarding/GoalSelectionScreen';
import ExperienceLevelScreen from '@/screens/onboarding/ExperienceLevelScreen';
import WorkoutLogisticsScreen from '@/screens/onboarding/WorkoutLogisticsScreen';
import BodyDetailsScreen from '@/screens/onboarding/BodyDetailsScreen';
import LoadingScreen from '@/screens/onboarding/LoadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from '@/navigation/MainTabNavigator';

type OnboardingStep = 'welcome' | 'goalSelection' | 'experience' | 'logistics' | 'details' | 'loading';
type Goal = 'build_muscle' | 'lose_weight' | 'improve_fitness';
type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
type Equipment = 'full_gym' | 'dumbbells' | 'bodyweight';

export default function App() {
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
    const [isOnboarding, setIsOnboarding] = useState(true);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
    const [logistics, setLogistics] = useState<{ daysPerWeek: number | '5_plus'; equipment: Equipment } | null>(null);

    const goToGoalSelection = () => setOnboardingStep('goalSelection');
    const handleGoalSelected = (goal: Goal) => {
        setSelectedGoal(goal);
        setOnboardingStep('experience');
    };
    const handleExperienceSelected = (level: ExperienceLevel) => {
        setExperienceLevel(level);
        setOnboardingStep('logistics');
    };
    const handleLogisticsSelected = (params: { daysPerWeek: number | '5_plus'; equipment: Equipment }) => {
        setLogistics(params);
        setOnboardingStep('details');
    };
    const handleCreatePlan = (_details: { age: string; heightCm: string; weightKg: string }) => {
        setOnboardingStep('loading');
    };
    const handleLoadingComplete = () => {
        setIsOnboarding(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isOnboarding ? (
                <>
                    {onboardingStep === 'welcome' && (
                        <WelcomeScreen onContinue={goToGoalSelection} />
                    )}
                    {onboardingStep === 'goalSelection' && (
                        <GoalSelectionScreen onGoalSelected={handleGoalSelected} />
                    )}
                    {onboardingStep === 'experience' && (
                        <ExperienceLevelScreen onExperienceSelected={handleExperienceSelected} />
                    )}
                    {onboardingStep === 'logistics' && (
                        <WorkoutLogisticsScreen onLogisticsSelected={handleLogisticsSelected} />
                    )}
                    {onboardingStep === 'details' && (
                        <BodyDetailsScreen onCreatePlan={handleCreatePlan} />
                    )}
                    {onboardingStep === 'loading' && (
                        <LoadingScreen onComplete={handleLoadingComplete} />
                    )}
                </>
            ) : (
                <NavigationContainer>
                    <MainTabNavigator />
                </NavigationContainer>
            )}
        </SafeAreaView>
    );
}


