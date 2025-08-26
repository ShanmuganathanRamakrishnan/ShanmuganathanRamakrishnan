import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/main/HomeScreen';
import ProgramsScreen from '@/screens/main/ProgramsScreen';
import ProgressScreen from '@/screens/main/ProgressScreen';
import AwardsScreen from '@/screens/main/AwardsScreen';
import ProfileScreen from '@/screens/main/ProfileScreen';
import ActiveWorkoutScreen from '@/screens/main/ActiveWorkoutScreen';

const Tab = createBottomTabNavigator();

const Placeholder: React.FC<{ label: string }> = ({ label }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{label}</Text>
    </View>
);

const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home">
                {() => <HomeScreen userName="Alex" experienceLevel="intermediate" />}
            </Tab.Screen>
            <Tab.Screen name="Programs">
                {() => <ProgramsScreen experienceLevel="intermediate" />}
            </Tab.Screen>
            <Tab.Screen name="Progress">
                {() => <ProgressScreen hasData={true} />}
            </Tab.Screen>
            <Tab.Screen name="Awards">
                {() => <AwardsScreen totalCoins={170} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
                {() => <ProfileScreen userName="Alex Carter" />}
            </Tab.Screen>
            <Tab.Screen
                name="ActiveWorkout"
                options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
            >
                {() => <ActiveWorkoutScreen />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default MainTabNavigator;


