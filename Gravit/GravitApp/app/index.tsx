import React, { useState } from 'react';
import WelcomeScreen from '../src/screens/onboarding/WelcomeScreen';
import GoalSelectionScreen from '../src/screens/onboarding/GoalSelectionScreen';

export default function App() {
  const [onboardingStep, setOnboardingStep] = useState('welcome');

  const handleWelcomeContinue = () => {
    setOnboardingStep('goalSelection');
  };

  const handleGoalSelected = () => {
    // For now, just log it. Later this would navigate to the main app.
    console.log('Onboarding complete!');
  };

  if (onboardingStep === 'goalSelection') {
    return <GoalSelectionScreen onGoalSelected={handleGoalSelected} />;
  }

  return <WelcomeScreen onContinue={handleWelcomeContinue} />;
}