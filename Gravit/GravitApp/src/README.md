# Source Code Structure

This directory contains all the source code for the Gravit application, organized by functionality.

## Directory Structure

- `/assets` - Project-specific assets (images, fonts, etc.)
- `/components` - Reusable UI components
- `/constants` - Application constants and theme definitions
- `/hooks` - Custom React hooks
- `/navigation` - Navigation setup and navigators
- `/screens` - Screen components organized by feature
- `/utils` - Utility functions and helpers

## Naming Conventions

- Components: PascalCase (e.g., `LoginRegisterScreen.tsx`)
- Hooks: camelCase starting with 'use' (e.g., `useAuth.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE or camelCase
- Directories: lowercase with hyphens if needed