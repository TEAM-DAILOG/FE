import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import {
  BackHeader,
  Button,
  ScheduleItem,
  ScreenContainer,
} from "@/src/components/common";
import type { CategoryColor } from "@/src/types/categories/category.types";

// TODO: API 연동 전까지 더미 사용
const DUMMY_RECOMMENDED_SCHEDULES: {
  id: string;
  categoryLabel: string;
  categoryColor: CategoryColor;
  description: string;
}[] = [
  {
    id: "1",
    categoryLabel: "CATEGORY",
    categoryColor: "green",
    description: "Lorem ipsum dolor sit amet consectet.",
  },
  {
    id: "2",
    categoryLabel: "CATEGORY",
    categoryColor: "blue",
    description: "Lorem ipsum dolor sit amet consectet.",
  },
  {
    id: "3",
    categoryLabel: "CATEGORY",
    categoryColor: "purple",
    description: "Lorem ipsum dolor sit amet consectet.",
  },
];

export default function DiaryRecommendationsScreen() {
  const router = useRouter();

  // TODO: API 연동되면 실제 일정 추가 로직 연결
  const handleAddSchedule = (id: string) => {};

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
              {DUMMY_RECOMMENDED_SCHEDULES.map((schedule) => (
                <ScheduleItem
                  key={schedule.id}
                  categoryLabel={schedule.categoryLabel}
                  categoryColor={schedule.categoryColor}
                  description={schedule.description}
                  action={{
                    type: "button",
                    label: "일정추가",
                    onPress: () => handleAddSchedule(schedule.id),
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
