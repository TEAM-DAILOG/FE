import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { BackHeader, Button, ScreenContainer } from "@/src/components/common";

export default function DiaryRecommendationsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="일기작성" />

      <View className="flex-1 justify-between px-4 pb-12 pt-5">
        <View className="gap-5">
          <View className="gap-2">
            <Text className="text-gray-900 text-h-02">일기 작성 완료!</Text>
            <Text className="text-gray-900 text-b-03-m">
              작성한 일기를 분석해 AI가 일정을 추천해 드려요.
            </Text>
          </View>

          <View className="gap-3 rounded-[20px] bg-bg px-3 py-4">
            <Text className="text-gray-900 text-b-03-m">추천 일정</Text>

            {/* TODO: 추천 일정 카드(ScheduleItem) - 다른 브랜치에서 작업완료 머지되면 연결 */}
          </View>
        </View>

        <Button label="홈으로" onPress={() => router.replace("/")} />
      </View>
    </ScreenContainer>
  );
}
