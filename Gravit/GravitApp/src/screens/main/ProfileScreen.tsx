import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import Card from '@/components/common/Card';
import StyledButton from '@/components/common/StyledButton';

interface ProfileScreenProps {
    userName?: string;
    avatarUrl?: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userName = 'Alex Carter', avatarUrl }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={avatarUrl ? { uri: avatarUrl } : require('../../../assets/images/react-logo.png')}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{userName}</Text>
            </View>

            <Card style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Trophy Case</Text>
                <View style={styles.rowBetween}>
                    <View style={styles.trophy} />
                    <View style={styles.trophy} />
                    <View style={styles.trophy} />
                    <View style={styles.trophy} />
                </View>
                <Text style={styles.caption}>Recent Personal Records</Text>
            </Card>

            <Card style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Statistics</Text>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Workouts</Text>
                    <Text style={styles.statValue}>142</Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Total Volume</Text>
                    <Text style={styles.statValue}>126,540 kg</Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Streak</Text>
                    <Text style={styles.statValue}>9 days</Text>
                </View>
            </Card>

            <Card style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Store</Text>
                <StyledButton title="Open Gravit Store" onPress={() => Linking.openURL('https://example.com/store')} />
            </Card>

            <Card style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <TouchableOpacity style={styles.linkRow}>
                    <Text style={styles.linkText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkRow}>
                    <Text style={styles.linkText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkRow}>
                    <Text style={styles.linkText}>Privacy</Text>
                </TouchableOpacity>
            </Card>

            <Card style={[styles.sectionCard, { marginBottom: SPACING.XL }]}>
                <Text style={styles.sectionTitle}>Support</Text>
                <TouchableOpacity style={styles.linkRow}>
                    <Text style={styles.linkText}>Help Center</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkRow}>
                    <Text style={styles.linkText}>Contact Us</Text>
                </TouchableOpacity>
            </Card>
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
        alignItems: 'center',
        marginBottom: SPACING.L,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: SPACING.S,
    },
    name: {
        ...FONTS.H2,
        color: COLORS.TEXT_PRIMARY,
    },
    sectionCard: {
        width: '100%',
        marginBottom: SPACING.M,
    },
    sectionTitle: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
        fontWeight: 'bold',
        marginBottom: SPACING.S,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trophy: {
        width: 56,
        height: 56,
        backgroundColor: COLORS.PRIMARY_ACCENT,
        borderRadius: 12,
    },
    caption: {
        ...FONTS.CAPTION,
        color: COLORS.TEXT_SECONDARY,
        marginTop: SPACING.S,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.XS,
    },
    statLabel: {
        ...FONTS.BODY,
        color: COLORS.TEXT_SECONDARY,
    },
    statValue: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
        fontWeight: 'bold',
    },
    linkRow: {
        paddingVertical: SPACING.S,
    },
    linkText: {
        ...FONTS.BODY,
        color: COLORS.TEXT_PRIMARY,
    },
});

export default ProfileScreen;


