import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ title, description, icon, isSelected, onPress, style }) => {
  const cardStyle = [
    styles.card,
    isSelected && styles.selectedCard,
    style,
  ];

  return (
    <TouchableOpacity onPress={onPress} style={cardStyle}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: SPACING.M,
    padding: SPACING.M,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.S,
    width: '100%',
  },
  selectedCard: {
    borderColor: COLORS.PRIMARY_ACCENT,
  },
  iconContainer: {
    marginRight: SPACING.M,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...FONTS.BODY,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  description: {
    ...FONTS.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default SelectionCard;
