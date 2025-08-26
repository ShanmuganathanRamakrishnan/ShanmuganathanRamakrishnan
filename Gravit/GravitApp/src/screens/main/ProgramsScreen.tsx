import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import Card from '@/components/common/Card';
import StyledButton from '@/components/common/StyledButton';

type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

interface ProgramsScreenProps {
    experienceLevel: ExperienceLevel;
}

type TabKey = 'guided' | 'library';

const GUIDED_PROGRAMS = [
    { id: 'ppl', title: 'Push Pull Legs', desc: '3-day rotation focused on strength and hypertrophy.' },
    { id: 'ul_ul', title: 'Upper/Lower Split', desc: '4 days/week, balanced strength and volume.' },
    { id: 'fbw', title: 'Full Body Beginner', desc: '3 days/week, fundamentals and form.' },
];

const ProgramsScreen: React.FC<ProgramsScreenProps> = ({ experienceLevel }) => {
    const [activeTab, setActiveTab] = useState<TabKey>('guided');
    const showCustomCta = experienceLevel !== 'beginner';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Guided Path</Text>

            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setActiveTab('guided')} style={[styles.tab, activeTab === 'guided' && styles.tabActive]}>
                    <Text style={[styles.tabText, activeTab === 'guided' && styles.tabTextActive]}>Guided Programs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('library')} style={[styles.tab, activeTab === 'library' && styles.tabActive]}>
                    <Text style={[styles.tabText, activeTab === 'library' && styles.tabTextActive]}>Exercise Library</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'guided' ? (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {GUIDED_PROGRAMS.map((p) => (
                        <Card key={p.id} style={styles.programCard}>
                            <Text style={styles.programTitle}>{p.title}</Text>
                            <Text style={styles.programDesc}>{p.desc}</Text>
                            <View style={{ height: SPACING.S }} />
                            <StyledButton title="View Program" onPress={() => { }} />
                        </Card>
                    ))}
                    {showCustomCta && (
                        <View style={{ marginTop: SPACING.M }}>
                            <StyledButton title="+ Create a Custom Workout" onPress={() => { }} />
                        </View>
                    )}
                </ScrollView>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Card style={styles.programCard}>
                        <Text style={styles.programTitle}>Exercise Library</Text>
                        <Text style={styles.programDesc}>Browse movements by muscle group and equipment.</Text>
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
    tabs: {
        flexDirection: 'row',
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderRadius: SPACING.M,
        padding: SPACING.S,
        marginBottom: SPACING.M,
    },
    tab: {
        flex: 1,
        paddingVertical: SPACING.S,
        borderRadius: SPACING.S,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: COLORS.PRIMARY_ACCENT,
    },
    tabText: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
    },
    tabTextActive: {
        color: COLORS.TEXT_PRIMARY,
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingBottom: SPACING.XL,
    },
    programCard: {
        width: '100%',
        marginBottom: SPACING.M,
    },
    programTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
        fontWeight: 'bold',
        marginBottom: SPACING.XS,
    },
    programDesc: {
        ...FONTS.CAPTION,
        color: COLORS.TEXT_SECONDARY,
    },
});

export default ProgramsScreen;


