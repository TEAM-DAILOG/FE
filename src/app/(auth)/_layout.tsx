import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="password" />
      <Stack.Screen name="terms-of-service" />
      <Stack.Screen name="privacy-policy" />
    </Stack>
  );
}
