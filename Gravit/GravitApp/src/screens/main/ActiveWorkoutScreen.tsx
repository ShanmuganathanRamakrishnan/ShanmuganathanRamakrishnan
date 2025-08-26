import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import Card from '@/components/common/Card';
import StyledButton from '@/components/common/StyledButton';
import StyledInput from '@/components/common/StyledInput';
import WorkoutCelebrationModal from '@/components/common/WorkoutCelebrationModal';

type Exercise = {
    name: string;
    videoUrl: string;
    commonMistakes: string[];
    sets: number;
};

type SetLog = {
    exerciseName: string;
    setNumber: number;
    reps: number;
    weight: number;
};

const DEFAULT_WORKOUT: Exercise[] = [
    {
        name: 'Barbell Squat',
        videoUrl: 'https://www.youtube.com/embed/ultWZbUMPL8',
        commonMistakes: [
            'Heels lifting off the ground',
            'Knees caving inward',
            'Back rounding at the bottom',
        ],
        sets: 3,
    },
    {
        name: 'Bench Press',
        videoUrl: 'https://www.youtube.com/embed/gRVjAtPip0Y',
        commonMistakes: [
            'Elbows flaring too wide',
            'Bouncing bar off chest',
            'Unstable shoulder blades',
        ],
        sets: 3,
    },
];

const ActiveWorkoutScreen: React.FC = () => {
    const [exercises] = useState<Exercise[]>(DEFAULT_WORKOUT);
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [showMistakes, setShowMistakes] = useState(false);
    const [restSeconds, setRestSeconds] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [logs, setLogs] = useState<SetLog[]>([]);
    const [showPRAni, setShowPRAni] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    const prAnimScale = useRef(new Animated.Value(0)).current;
    const prAnimOpacity = useRef(new Animated.Value(0)).current;

    const currentExercise = exercises[exerciseIndex];
    const isLastSetOfExercise = currentSet >= currentExercise.sets;
    const isLastExercise = exerciseIndex >= exercises.length - 1;
    const canFinish = isLastExercise && isLastSetOfExercise && !isResting && restSeconds === 0;

    // Simple PR check: higher weight than any previous log for this exercise
    const isPR = useMemo(() => {
        const prevMax = logs
            .filter((l) => l.exerciseName === currentExercise.name)
            .reduce((m, l) => Math.max(m, l.weight), 0);
        const w = Number(weight || '0');
        return w > 0 && w > prevMax;
    }, [logs, currentExercise.name, weight]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isResting && restSeconds > 0) {
            interval = setInterval(() => setRestSeconds((s) => Math.max(0, s - 1)), 1000);
        } else if (isResting && restSeconds === 0) {
            setIsResting(false);
        }
        return () => interval && clearInterval(interval);
    }, [isResting, restSeconds]);

    const triggerPRAnimation = () => {
        setShowPRAni(true);
        prAnimScale.setValue(0.6);
        prAnimOpacity.setValue(0);
        Animated.parallel([
            Animated.timing(prAnimScale, { toValue: 1.2, duration: 600, useNativeDriver: true }),
            Animated.timing(prAnimOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start(() => {
            Animated.timing(prAnimOpacity, { toValue: 0, duration: 500, delay: 400, useNativeDriver: true }).start(() => {
                setShowPRAni(false);
            });
        });
    };

    const handleCompleteSet = () => {
        const repsNum = Number(reps || '0');
        const weightNum = Number(weight || '0');
        if (repsNum <= 0) return;

        const newLog: SetLog = {
            exerciseName: currentExercise.name,
            setNumber: currentSet,
            reps: repsNum,
            weight: weightNum,
        };
        setLogs((prev) => [...prev, newLog]);

        if (isPR) triggerPRAnimation();

        // Start rest timer (e.g., 90s) unless workout finished
        if (!(isLastExercise && isLastSetOfExercise)) {
            setRestSeconds(90);
            setIsResting(true);
        }

        // Advance set/exercise after marking complete
        if (isLastSetOfExercise) {
            if (!isLastExercise) {
                setExerciseIndex((i) => i + 1);
                setCurrentSet(1);
            }
        } else {
            setCurrentSet((s) => s + 1);
        }

        setReps('');
        setWeight('');
    };

    const handleFinishWorkout = () => {
        setShowCelebration(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.exerciseTitle}>
                {currentExercise.name} · Set {currentSet}/{currentExercise.sets}
            </Text>

            <View style={styles.videoContainer}>
                <WebView
                    style={{ flex: 1, borderRadius: SPACING.M, overflow: 'hidden' }}
                    source={{ uri: currentExercise.videoUrl }}
                    allowsFullscreenVideo
                />
            </View>

            <Card style={{ width: '100%', marginBottom: SPACING.M }}>
                <TouchableOpacity onPress={() => setShowMistakes((s) => !s)}>
                    <Text style={styles.sectionTitle}>Common Mistakes {showMistakes ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                {showMistakes && (
                    <View>
                        {currentExercise.commonMistakes.map((m, i) => (
                            <Text key={i} style={styles.mistakeItem}>• {m}</Text>
                        ))}
                    </View>
                )}
            </Card>

            <Card style={{ width: '100%', marginBottom: SPACING.M }}>
                <Text style={styles.sectionTitle}>Log Your Set</Text>
                <View style={styles.inputsRow}>
                    <View style={{ flex: 1, marginRight: SPACING.S }}>
                        <StyledInput
                            placeholder="Reps"
                            keyboardType="number-pad"
                            value={reps}
                            onChangeText={setReps}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: SPACING.S }}>
                        <StyledInput
                            placeholder="Weight (kg)"
                            keyboardType="number-pad"
                            value={weight}
                            onChangeText={setWeight}
                        />
                    </View>
                </View>
                <StyledButton title={isPR ? 'Mark Set Complete (PR!)' : 'Mark Set Complete'} onPress={handleCompleteSet} />
            </Card>

            <View style={styles.bottomRow}>
                <Card style={{ flex: 1, marginRight: SPACING.S }}>
                    <Text style={styles.sectionTitle}>Rest Timer</Text>
                    <Text style={styles.timerText}>{isResting ? `${restSeconds}s` : 'Ready'}</Text>
                </Card>
                {canFinish && (
                    <View style={{ flex: 1, marginLeft: SPACING.S }}>
                        <StyledButton title="Finish Workout" onPress={handleFinishWorkout} />
                    </View>
                )}
            </View>

            {showPRAni && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.prOverlay,
                        {
                            opacity: prAnimOpacity,
                            transform: [{ scale: prAnimScale }],
                        },
                    ]}
                >
                    <Text style={styles.prText}>New PR!</Text>
                </Animated.View>
            )}
            <WorkoutCelebrationModal
                visible={showCelebration}
                onClose={() => setShowCelebration(false)}
                summary={{
                    totalExercises: exercises.length,
                    totalSets: exercises.reduce((a, e) => a + e.sets, 0),
                    newPRs: logs
                        .filter((l) =>
                            logs.filter((x) => x.exerciseName === l.exerciseName).every((x) => l.weight >= x.weight)
                        )
                        .map((l) => ({ exercise: l.exerciseName, weight: l.weight })),
                    coinsEarned: 25,
                    achievementsUnlocked: [{ id: 'a1', title: 'First of Many', coins: 25 }],
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        padding: SPACING.L,
    },
    exerciseTitle: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.M,
    },
    videoContainer: {
        height: 200,
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderRadius: SPACING.M,
        overflow: 'hidden',
        marginBottom: SPACING.M,
    },
    sectionTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
        fontWeight: 'bold',
        marginBottom: SPACING.S,
    },
    mistakeItem: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.XS,
    },
    inputsRow: {
        flexDirection: 'row',
        marginBottom: SPACING.M,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
    },
    prOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    prText: {
        ...FONTS.H1,
        color: COLORS.PRIMARY_ACCENT,
    },
});

export default ActiveWorkoutScreen;


