import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { router, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Toast } from "@/src/components/common/Toast";
import { ModalPage } from "@/src/components/modals/ModalPage";
import { useAuthBootstrap } from "@/src/hooks/useAuthBootstrap";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { usePushTokenRegistration } from "@/src/hooks/usePushTokenRegistration";
import { queryClient } from "@/src/lib/queryClient";
import { useAuthStore } from "@/src/store/auth/authStore";
import "../../global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

function PushTokenRegistrar() {
  usePushTokenRegistration();
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const { isBootstrapping } = useAuthBootstrap();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [fontsLoaded] = useFonts({
    "SUIT-Regular": require("@/assets/fonts/SUIT-Regular.otf"),
    "SUIT-Medium": require("@/assets/fonts/SUIT-Medium.otf"),
    "SUIT-SemiBold": require("@/assets/fonts/SUIT-SemiBold.otf"),
    "SUIT-Bold": require("@/assets/fonts/SUIT-Bold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!fontsLoaded || isBootstrapping) {
      return;
    }

    const rootSegment = segments[0];
    const isAuthRoute = rootSegment === "(auth)";

    if (!isAuthenticated && !isAuthRoute) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && isAuthRoute) {
      router.replace("/(tabs)");
    }
  }, [fontsLoaded, isBootstrapping, isAuthenticated, segments]);

  if (!fontsLoaded || isBootstrapping) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PushTokenRegistrar />
        <SafeAreaProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(stacks)" options={{ headerShown: false }} />
            </Stack>
            <ModalPage />
            <Toast />
            <StatusBar style="dark" />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
