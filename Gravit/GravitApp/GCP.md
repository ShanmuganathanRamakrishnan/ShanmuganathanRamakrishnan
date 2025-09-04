# Gravit Mobile App - Global Context Prompt

This file contains the essential context for working on the Gravit Mobile App project.

## Project Overview
- **Project**: Gravit - Smart Fitness Mobile App
- **Stack**: React Native (Expo), TypeScript, React Navigation, Firebase (later), theme.json for all styling
- **Design**: Dark theme, card-based layouts, Inter font, orange accent (#ff6b47)

## Development Rules
1. Always use tokens from `src/constants/theme.json` (colors, typography, spacing, components, animations)
2. Place screens inside `src/screens/{Section}/ScreenName.tsx`
3. Navigation is managed in `App.tsx` (not index.tsx)
4. For now: generate UI-only components with placeholder handlers. Firebase integration will come later
5. Use TypeScript functional components with hooks
6. Follow accessibility best practices (contrast, focus rings, aria labels)
7. For animations, use the design system's tokens when possible

## Default Navigation Flow
- Auth Stack → `LoginRegisterScreen`
- Main Tabs → Home, Programs, Active Workout, Progress, Awards, Profile

## Output Style
- Single React Native component per request
- Must import and apply design tokens (no hard-coded colors/fonts)
- Clean, modular, production-ready code
- Placeholder logic for backend until Firebase is connected

## Progress Tracking
For completed features and ongoing progress, see [GCP-PROGRESS.md](GCP-PROGRESS.md)

## File Structure
```
src/
├── components/
├── screens/
│   ├── Auth/
│   │   ├── LoginRegisterScreen.tsx
│   │   └── index.ts
├── constants/
│   ├── theme.json
│   ├── theme.ts
│   └── index.ts
└── navigation/
```

## Key Design System Tokens
- Primary background: `#1a1a1a`
- Card background: `#2d2d2d`
- Accent color: `#ff6b47`
- Font family: Inter
- Spacing system: xs, sm, md, lg, xl, xxl
- Border radius: sm (8px), md (12px), lg (16px)

## Usage
To load this context in your terminal session, source this file or copy its contents to your clipboard.