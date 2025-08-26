import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import Card from '@/components/common/Card';

interface Achievement {
    id: string;
    title: string;
    coins: number;
    unlocked: boolean;
}

interface AwardsScreenProps {
    totalCoins?: number;
    achievements?: Achievement[];
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
    { id: 'a1', title: 'First Workout', coins: 50, unlocked: true },
    { id: 'a2', title: 'Consistency x7', coins: 100, unlocked: false },
    { id: 'a3', title: 'Personal Best', coins: 150, unlocked: false },
    { id: 'a4', title: 'Marathon Week', coins: 200, unlocked: false },
    { id: 'a5', title: 'Form Master', coins: 120, unlocked: true },
    { id: 'a6', title: 'Gym Regular', coins: 80, unlocked: false },
];

const AwardsScreen: React.FC<AwardsScreenProps> = ({ totalCoins = 170, achievements = DEFAULT_ACHIEVEMENTS }) => {
    return (
        <View style={styles.container}>
            <Card style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Total Coins</Text>
                <Text style={styles.balanceValue}>{totalCoins}</Text>
            </Card>

            <FlatList
                data={achievements}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: SPACING.XL }}
                renderItem={({ item }) => (
                    <Card style={[styles.achievementCard, item.unlocked ? styles.unlockedCard : styles.lockedCard]}>
                        <View style={[styles.badge, item.unlocked ? styles.badgeUnlocked : styles.badgeLocked]} />
                        <Text style={[styles.achievementTitle, !item.unlocked && styles.lockedText]}>{item.title}</Text>
                        {item.unlocked && (
                            <View style={styles.coinPill}>
                                <Text style={styles.coinText}>+{item.coins}</Text>
                            </View>
                        )}
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        padding: SPACING.L,
    },
    balanceCard: {
        width: '100%',
        alignItems: 'center',
        marginBottom: SPACING.M,
    },
    balanceLabel: {
        ...FONTS.CAPTION,
        color: COLORS.TEXT_SECONDARY,
    },
    balanceValue: {
        ...FONTS.H1,
        color: COLORS.TEXT_PRIMARY,
    },
    achievementCard: {
        width: '48%',
        marginBottom: SPACING.M,
        alignItems: 'center',
        paddingVertical: SPACING.L,
    },
    unlockedCard: {
        borderWidth: 2,
        borderColor: COLORS.PRIMARY_ACCENT,
    },
    lockedCard: {
        opacity: 0.5,
    },
    badge: {
        width: 54,
        height: 54,
        borderRadius: 27,
        marginBottom: SPACING.S,
    },
    badgeUnlocked: {
        backgroundColor: COLORS.PRIMARY_ACCENT,
    },
    badgeLocked: {
        backgroundColor: '#666666',
    },
    achievementTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
    },
    lockedText: {
        color: COLORS.TEXT_SECONDARY,
    },
    coinPill: {
        marginTop: SPACING.S,
        backgroundColor: COLORS.PRIMARY_ACCENT,
        paddingHorizontal: SPACING.M,
        paddingVertical: 6,
        borderRadius: 999,
    },
    coinText: {
        ...FONTS.CAPTION,
        color: COLORS.TEXT_PRIMARY,
        fontWeight: 'bold',
    },
});

export default AwardsScreen;


