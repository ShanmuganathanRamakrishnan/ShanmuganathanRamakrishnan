import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import Card from '@/components/common/Card';
import StyledButton from '@/components/common/StyledButton';

type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

interface HomeScreenProps {
    userName: string;
    experienceLevel: ExperienceLevel;
}

const TodayPlanCard: React.FC = () => {
    const navigation = useNavigation();
    return (
        <Card style={styles.cardFullWidth}>
            <Text style={styles.cardTitle}>Today's Plan</Text>
            <Text style={styles.planName}>Upper Body Strength</Text>
            <View style={{ height: SPACING.M }} />
            <StyledButton title="Start Workout" onPress={() => navigation.navigate('ActiveWorkout' as never)} />
        </Card>
    );
};

const TipOfTheDayCard: React.FC = () => (
    <Card style={styles.cardFullWidth}>
        <Text style={styles.cardTitle}>Tip of the Day</Text>
        <Text style={styles.tipText}>Focus on form over weight. Master movements before adding load.</Text>
    </Card>
);

const WeeklyReportCard: React.FC = () => {
    const weeklyData = [3, 5, 4, 6, 5, 7, 4];
    const maxVal = Math.max(...weeklyData, 1);
    return (
        <Card style={styles.cardFullWidth}>
            <Text style={styles.cardTitle}>Weekly Report</Text>
            <View style={styles.chartRow}>
                {weeklyData.map((v, idx) => (
                    <View key={idx} style={styles.barContainer}>
                        <View style={[styles.bar, { height: 12 + (64 * v) / maxVal }]} />
                    </View>
                ))}
            </View>
            <Text style={styles.chartCaption}>Workouts minutes per day</Text>
        </Card>
    );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ userName, experienceLevel }) => {
    const isBeginner = experienceLevel === 'beginner';
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hi, {userName}!</Text>
            <TodayPlanCard />
            {isBeginner ? <TipOfTheDayCard /> : <WeeklyReportCard />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        padding: SPACING.L,
    },
    header: {
        ...FONTS.H1,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.L,
    },
    cardFullWidth: {
        width: '100%',
        marginBottom: SPACING.M,
    },
    cardTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
        marginBottom: SPACING.S,
        fontWeight: 'bold',
    },
    planName: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
    },
    tipText: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
    },
    chartRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: SPACING.S,
        marginBottom: SPACING.S,
    },
    barContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 2,
    },
    bar: {
        width: 12,
        backgroundColor: COLORS.PRIMARY_ACCENT,
        borderRadius: 6,
    },
    chartCaption: {
        ...FONTS.CAPTION,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
    },
});

export default HomeScreen;


