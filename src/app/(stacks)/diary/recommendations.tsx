import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

import {
  BackHeader,
  Button,
  ScheduleItem,
  ScreenContainer,
} from "@/src/components/common";
import type { RecommendedSchedule } from "@/src/types/ai/ai.types";

function parseRecommendedSchedules(raw?: string): RecommendedSchedule[] {
  if (!raw) return [];

  try {
    return JSON.parse(raw) as RecommendedSchedule[];
  } catch {
    return [];
  }
}

export default function DiaryRecommendationsScreen() {
  const router = useRouter();
  const { recommendedSchedules: recommendedSchedulesParam } =
    useLocalSearchParams<{ recommendedSchedules?: string }>();
  const recommendedSchedules = parseRecommendedSchedules(
    recommendedSchedulesParam
  );

  // TODO: 추천 일정 추가(POST /api/v1/ai/schedules/add) API 연동되면 실제 일정 추가 로직 연결
  const handleAddSchedule = (recommendId: number) => {};

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

            <View className="gap-2">
              {recommendedSchedules.map((schedule) => (
                <ScheduleItem
                  key={schedule.recommendId}
                  categoryLabel={schedule.categoryTitle}
                  categoryColor={schedule.categoryColor}
                  description={schedule.scheduleTitle}
                  action={{
                    type: "button",
                    label: "일정추가",
                    onPress: () => handleAddSchedule(schedule.recommendId),
                  }}
                />
              ))}
            </View>
          </View>
        </View>

        <Button label="홈으로" onPress={() => router.replace("/")} />
      </View>
    </ScreenContainer>
  );
}
