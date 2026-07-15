import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/src/components/common";

export default function SettingsScreen() {
  const router = useRouter(); // 컴포넌트 최상단, return 위 — 여기 위치 중요

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => router.push("/diary/123")}
          style={{
            backgroundColor: "#4D826C",
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            작성한 일기 화면 보기
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}