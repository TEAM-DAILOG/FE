import { Tabs } from "expo-router";
import React from "react";

import { BottomTabBar } from "@/src/components/common/BottomTabBar";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "홈" }} />
      <Tabs.Screen name="calendar" options={{ title: "캘린더" }} />
      <Tabs.Screen name="statistics" options={{ title: "통계분석" }} />
      <Tabs.Screen name="settings" options={{ title: "설정" }} />
    </Tabs>
  );
}