import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import Card from '@/components/common/Card';

interface ProgressScreenProps {
    hasData: boolean;
}

// Simple line chart using basic Views (no external libs)
const SimpleLineChart: React.FC<{ data: number[] }> = ({ data }) => {
    const maxVal = Math.max(...data, 1);
    const points = data.map((v) => Math.max(4, Math.round((v / maxVal) * 100)));

    return (
        <View style={styles.chartContainer}>
            {points.map((height, idx) => {
                const isLast = idx === points.length - 1;
                const next = isLast ? height : points[idx + 1];
                const dy = next - height;
                const connectorRotation = Math.atan2(dy, 24) * (180 / Math.PI);
                return (
                    <View key={idx} style={styles.chartColumn}>
                        <View style={[styles.chartBar, { height }]} />
                        {!isLast && (
                            <View style={[styles.chartConnector, { transform: [{ rotate: `${connectorRotation}deg` }] }]} />
                        )}
                    </View>
                );
            })}
        </View>
    );
};

const EmptyState: React.FC = () => (
    <Card style={{ width: '100%' }}>
        <Text style={styles.emptyTitle}>Your journey starts today</Text>
        <Text style={styles.emptySubtitle}>Complete your first workout to see your progress here.</Text>
        <View style={styles.emptyGraphic}>
            <View style={styles.emptyDumbbellBar} />
            <View style={[styles.emptyPlate, { left: 12 }]} />
            <View style={[styles.emptyPlate, { right: 12 }]} />
        </View>
    </Card>
);

const ProgressScreen: React.FC<ProgressScreenProps> = ({ hasData }) => {
    const strengthData = [10, 12, 11, 13, 15, 16, 18, 17, 19, 21, 22];
    const recentWorkouts = [
        { id: 'w1', title: 'Upper Body Strength', date: 'Mon' },
        { id: 'w2', title: 'Lower Body Power', date: 'Tue' },
        { id: 'w3', title: 'Push Day', date: 'Thu' },
        { id: 'w4', title: 'Pull Day', date: 'Sat' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Progress</Text>
            {!hasData ? (
                <EmptyState />
            ) : (
                <ScrollView contentContainerStyle={{ paddingBottom: SPACING.XL }} showsVerticalScrollIndicator={false}>
                    <Card style={{ width: '100%', marginBottom: SPACING.M }}>
                        <Text style={styles.sectionTitle}>Overall Strength</Text>
                        <SimpleLineChart data={strengthData} />
                    </Card>

                    <Card style={{ width: '100%' }}>
                        <Text style={styles.sectionTitle}>Recent Workouts</Text>
                        {recentWorkouts.map((w) => (
                            <View key={w.id} style={styles.workoutRow}>
                                <Text style={styles.workoutTitle}>{w.title}</Text>
                                <Text style={styles.workoutDate}>{w.date}</Text>
                            </View>
                        ))}
                    </Card>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        padding: SPACING.L,
    },
    title: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.M,
    },
    sectionTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
        fontWeight: 'bold',
        marginBottom: SPACING.S,
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 140,
        paddingVertical: SPACING.S,
    },
    chartColumn: {
        width: 24,
        alignItems: 'center',
        marginRight: 4,
    },
    chartBar: {
        width: 8,
        backgroundColor: COLORS.PRIMARY_ACCENT,
        borderRadius: 4,
    },
    chartConnector: {
        width: 26,
        height: 2,
        backgroundColor: COLORS.PRIMARY_ACCENT,
        position: 'absolute',
        bottom: 0,
        left: 10,
    },
    workoutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.S,
        borderBottomWidth: 1,
        borderBottomColor: '#2A2A2A',
    },
    workoutTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
    },
    workoutDate: {
        ...FONTS.CAPTION,
        color: COLORS.TEXT_SECONDARY,
    },
    emptyTitle: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.S,
    },
    emptySubtitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
    },
    emptyGraphic: {
        marginTop: SPACING.M,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },
    emptyDumbbellBar: {
        width: 140,
        height: 6,
        backgroundColor: COLORS.SECONDARY_ACCENT,
        borderRadius: 3,
    },
    emptyPlate: {
        position: 'absolute',
        width: 16,
        height: 16,
        backgroundColor: COLORS.SECONDARY_ACCENT,
        borderRadius: 8,
        top: 22,
    },
});

export default ProgressScreen;


