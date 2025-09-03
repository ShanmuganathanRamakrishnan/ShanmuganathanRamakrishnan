# Design System Usage in LoginRegisterScreen

This document explains how the fitness design system is implemented in the LoginRegisterScreen component.

## Color Palette Usage

- **Background**: `colors.primary.background` (#1a1a1a)
- **Card Background**: `components.card.backgroundColor` (#2d2d2d)
- **Input Background**: `components.input.backgroundColor` (#2a2a2a)
- **Primary Accent**: `colors.accent.primary` (#ff6b47)
- **Text Colors**: 
  - Primary: `colors.text.primary` (#ffffff)
  - Secondary: `colors.text.secondary` (#b0b0b0)
  - Muted: `colors.text.muted` (#808080)
  - Accent: `colors.text.accent` (#ff6b47)

## Typography Usage

- **Header**: `typography.hero` (28px, 700 weight)
- **Body Text**: `typography.body` (16px, 400 weight)
- **Caption**: `typography.caption` (14px, 400 weight)

## Component Styles

### Card
- Background: #2d2d2d
- Border: 1px solid #3a3a3a
- Border radius: 12px
- Padding: 20px
- Box shadow: 0 4px 12px rgba(0, 0, 0, 0.4)

### Buttons
- **Primary Button**: `components.button.primary`
  - Background: #ff6b47
  - Text color: #ffffff
- **Secondary Button**: `components.button.secondary`
  - Background: transparent
  - Border: 2px solid #ff6b47
  - Text color: #ff6b47

### Inputs
- Background: #2a2a2a
- Border: 1px solid #3a3a3a
- Border radius: 8px
- Padding: 12px 16px
- Focus state: `components.inputFocus.borderColor` (#ff6b47)

## Spacing and Layout

- Container padding: `spacing.md` (16px)
- Card padding: `components.card.padding` (20px)
- Input margin: `components.input.marginBottom` (24px)
- Button margin: `spacing.sm` (8px)
- Border radius values from `borderRadius` object

## States

- **Focus**: Input border changes to accent color (#ff6b47)
- **Disabled**: Buttons use opacity: 0.5