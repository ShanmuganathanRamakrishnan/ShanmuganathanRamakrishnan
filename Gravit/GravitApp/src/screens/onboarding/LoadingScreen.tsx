import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

interface LoadingScreenProps {
    onComplete: () => void;
    delayMs?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, delayMs = 3500 }) => {
    const squatAnim = useRef(new Animated.Value(0)).current; // 0 = up, 1 = down

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(squatAnim, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
                Animated.timing(squatAnim, { toValue: 0, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
            ])
        );
        loop.start();

        const timer = setTimeout(() => {
            loop.stop();
            onComplete();
        }, delayMs);

        return () => {
            loop.stop();
            clearTimeout(timer);
        };
    }, [delayMs, onComplete, squatAnim]);

    const translateY = squatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 16] });
    const barTranslateY = squatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 6] });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Building Your Personalized Plan...</Text>

            <View style={styles.figureContainer}>
                <Animated.View style={[styles.barbell, { transform: [{ translateY: barTranslateY }] }]} />
                <Animated.View style={{ transform: [{ translateY }] }}>
                    <View style={styles.head} />
                    <View style={styles.torso} />
                    <View style={styles.legs}>
                        <View style={styles.leg} />
                        <View style={styles.leg} />
                    </View>
                    <View style={styles.arms}>
                        <View style={styles.arm} />
                        <View style={styles.arm} />
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.L,
    },
    title: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING.XL,
    },
    figureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: COLORS.SECONDARY_ACCENT,
        alignSelf: 'center',
        marginBottom: 6,
    },
    torso: {
        width: 6,
        height: 36,
        backgroundColor: COLORS.SECONDARY_ACCENT,
        alignSelf: 'center',
    },
    arms: {
        position: 'absolute',
        top: 28,
        left: -14,
        right: -14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    arm: {
        width: 28,
        height: 4,
        backgroundColor: COLORS.SECONDARY_ACCENT,
    },
    legs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 28,
        alignSelf: 'center',
        marginTop: 6,
    },
    leg: {
        width: 4,
        height: 28,
        backgroundColor: COLORS.SECONDARY_ACCENT,
    },
    barbell: {
        width: 120,
        height: 6,
        backgroundColor: COLORS.SECONDARY_ACCENT,
        marginBottom: 10,
        borderRadius: 3,
    },
});

export default LoadingScreen;


