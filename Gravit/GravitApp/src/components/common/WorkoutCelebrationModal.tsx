import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

interface WorkoutSummary {
    totalExercises: number;
    totalSets: number;
    newPRs: Array<{ exercise: string; weight: number }>; // example PRs
    coinsEarned?: number;
    achievementsUnlocked?: Array<{ id: string; title: string; coins: number }>;
}

interface WorkoutCelebrationModalProps {
    visible: boolean;
    summary: WorkoutSummary;
    onClose: () => void;
}

const WorkoutCelebrationModal: React.FC<WorkoutCelebrationModalProps> = ({ visible, summary, onClose }) => {
    const handleShare = async () => {
        try {
            const sticker = `Gravit Workout Completed!\nExercises: ${summary.totalExercises}\nSets: ${summary.totalSets}\nNew PRs: ${summary.newPRs.length}\nCoins: ${summary.coinsEarned ?? 0}`;
            await Share.share({ message: sticker });
        } catch (e) { }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <View style={styles.celebrationCircle}>
                        <Text style={styles.celebrationIcon}>🏆</Text>
                    </View>
                    <Text style={styles.title}>Workout Complete!</Text>
                    <Text style={styles.subtitle}>Great job finishing your session.</Text>

                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Exercises</Text>
                            <Text style={styles.summaryValue}>{summary.totalExercises}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Sets</Text>
                            <Text style={styles.summaryValue}>{summary.totalSets}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>New PRs</Text>
                            <Text style={styles.summaryValue}>{summary.newPRs.length}</Text>
                        </View>
                    </View>

                    {summary.achievementsUnlocked && summary.achievementsUnlocked.length > 0 && (
                        <View style={styles.achievements}>
                            <Text style={styles.sectionTitle}>New Achievements</Text>
                            {summary.achievementsUnlocked.map((a) => (
                                <View key={a.id} style={styles.achievementRow}>
                                    <Text style={styles.achievementTitle}>{a.title}</Text>
                                    <View style={styles.coinPill}><Text style={styles.coinText}>+{a.coins}</Text></View>
                                </View>
                            ))}
                        </View>
                    )}

                    {typeof summary.coinsEarned === 'number' && (
                        <View style={{ marginBottom: SPACING.M }}>
                            <Text style={styles.coinsEarned}>Coins Earned: +{summary.coinsEarned}</Text>
                        </View>
                    )}

                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={handleShare}>
                            <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.continueButton]} onPress={onClose}>
                            <Text style={styles.actionText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.L,
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderRadius: SPACING.M,
        padding: SPACING.L,
        alignItems: 'center',
    },
    celebrationCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: COLORS.PRIMARY_ACCENT,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.M,
    },
    celebrationIcon: {
        fontSize: 48,
    },
    title: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
    },
    subtitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
        marginBottom: SPACING.M,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: SPACING.M,
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    summaryLabel: {
        ...FONTS.CAPTION,
        color: COLORS.TEXT_SECONDARY,
    },
    summaryValue: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
    },
    achievements: {
        width: '100%',
        marginBottom: SPACING.M,
    },
    sectionTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
        fontWeight: 'bold',
        marginBottom: SPACING.S,
    },
    achievementRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.XS,
    },
    achievementTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
    },
    coinPill: {
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
    coinsEarned: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: SPACING.M,
        borderRadius: SPACING.M,
    },
    shareButton: {
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderWidth: 2,
        borderColor: COLORS.PRIMARY_ACCENT,
        marginRight: SPACING.S,
    },
    continueButton: {
        backgroundColor: COLORS.PRIMARY_ACCENT,
        marginLeft: SPACING.S,
    },
    actionText: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
        fontWeight: 'bold',
    },
});

export default WorkoutCelebrationModal;


