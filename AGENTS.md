# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

# Project Guide

This app uses Expo SDK 54, React Native, Expo Router, NativeWind, TypeScript, Axios, Zustand, and TanStack Query.

## Commands

- Start Expo: `npm run start`
- Run Android: `npm run android`
- Run iOS: `npm run ios`
- Run web: `npm run web`
- Lint: `npm run lint`

Native config plugins, native fonts, push notifications, and other native-module behavior require a development build. Expo Go is only for features supported by the Expo Go client.

## Folder Structure

Follow the team document as the source of truth:

- `src/app/` is only for Expo Router page routing, page files, and layouts.
- Reusable components, API code, hooks, stores, types, constants, and utilities belong under `src/`.
- Use domain-based folders inside `src/components`.

Expected structure:

```text
src/
  app/
    (auth)/
    (tabs)/
    _layout.tsx
  components/
    common/
    home/
    auth/
    profile/
  hooks/
  api/
  store/
  types/
  constants/
  utils/
assets/
```

## Naming Rules

- Component files: PascalCase, for example `UserCard.tsx`
- Route files: kebab-case, for example `user-profile.tsx`
- Dynamic routes: bracket syntax, for example `[userId].tsx`
- Hook files: camelCase with `use` prefix, for example `useAuthStore.ts`
- Utility and service files: camelCase, for example `formatDate.ts`, `userService.ts`
- Type files: camelCase with `.types`, for example `user.types.ts`
- Constant files: camelCase, for example `colors.ts`
- Constant values: UPPER_SNAKE_CASE
- Barrel exports: `index.ts`

## Code Style

- Components: `export function Name() {}`
- Custom hooks: `export function useXxx() {}`
- API/service layer: `export const xxxService = { ... }`
- Pure utilities: `export function formatXxx() {}`
- Global constants: `export const MAX_COUNT = 10`
- Zustand stores: `export const useXxxStore = create(...)`
- Prefer absolute imports with `@/`.
- Avoid `any`; prefer type guards over broad type assertions.
- React Native UI should use `View`, `Text`, `Pressable`, and other React Native primitives.
- Put component prop types near the top of the file.

## Styling

- Prefer NativeWind `className` for static styling.
- Use design tokens registered in `tailwind.config.js`.
- Use SUIT font tokens from the Tailwind config; the font is registered through the Expo font config plugin.
- Use inline `style` only for dynamic values or React Native styles that NativeWind cannot express clearly.

## API And State

- Put API clients and service objects in `src/api`.
- Use Axios for HTTP.
- Use TanStack Query for server state.
- Use Zustand in `src/store` for client/global state.

## Git Convention

Commit message format:

```text
Tag: commit content
```

Allowed commit tags:

- `Feat`
- `Fix`
- `UI`
- `Design`
- `Docs`
- `Refactor`
- `Test`
- `Chore`
- `Setting`
- `Build`
- `Asset`
- `Comment`
- `Rename`
- `Remove`
- `Hotfix`

Branch format:

```text
type/issue-number-work-content
```

Examples:

- `feature/12-ui-login`
- `fix/27-signup-email-validation`
- `hotfix/31-crash-on-launch`
