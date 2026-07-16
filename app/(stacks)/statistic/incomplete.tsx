import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import {
  BackHeader,
  ProgressBar,
  ScheduleItem,
  type ScheduleItemProps,
  ScreenContainer,
} from "@/src/components/common";
import { DetailToggleButton, MonthSelector } from "@/src/components/statistics";

type ScheduleEntry = Pick<
  ScheduleItemProps,
  "date" | "categoryLabel" | "categoryColor" | "description"
>;

const INCOMPLETE_SCHEDULES: ScheduleEntry[] = [
  {
    date: "2026.05.01",
    categoryLabel: "업무업무업",
    categoryColor: "blue",
    description: "보고서 초안 작성하기",
  },
  {
    date: "2026.05.03",
    categoryLabel: "약속",
    categoryColor: "brown",
    description: "친구 생일 선물 사러 가기",
  },
  {
    date: "2026.05.07",
    categoryLabel: "운동",
    categoryColor: "green",
    description: "헬스장 등록하기",
  },
];

const COMPLETED_SCHEDULES: ScheduleEntry[] = [
  {
    date: "2026.05.02",
    categoryLabel: "업무업무업",
    categoryColor: "blue",
    description: "주간 회의 참석하기",
  },
  {
    date: "2026.05.05",
    categoryLabel: "운동",
    categoryColor: "green",
    description: "아침 조깅하기",
  },
];

const ACHIEVEMENT_RATE = 80;
const YEAR = 2026;
const MONTH = 5;

export default function StatisticIncompleteScreen() {
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="미완료 일정" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20 }}
      >
        <View className="w-full gap-4 rounded-2xl border border-gray-100 bg-gray-0 px-3 py-4">
          <View className="w-full gap-3">
            <View className="flex-row items-center justify-between">
              <MonthSelector year={YEAR} month={MONTH} />

              <Text className="text-gray-800 text-b-02-m">
                일정 달성률{" "}
                <Text className="text-green-600 text-b-02-sb">
                  {ACHIEVEMENT_RATE}%
                </Text>
              </Text>
            </View>

            <ProgressBar value={ACHIEVEMENT_RATE} />
          </View>

          <View className="w-full gap-3">
            <Text className="text-gray-900 text-b-02-m">
              미완료된 일정이{" "}
              <Text className="text-green-600 text-b-02-sb">
                {INCOMPLETE_SCHEDULES.length}
              </Text>
              개 있어요.
            </Text>

            <View className="w-full gap-2">
              {INCOMPLETE_SCHEDULES.map((schedule) => (
                <ScheduleItem
                  key={`${schedule.date}-${schedule.categoryLabel}`}
                  {...schedule}
                  action={{ type: "button", label: "일정재등록" }}
                />
              ))}
            </View>
          </View>

          <DetailToggleButton
            label="완료 일정 펼치기"
            isOpen={isCompletedOpen}
            onPress={() => setIsCompletedOpen((prev) => !prev)}
          />

          {isCompletedOpen && (
            <Animated.View
              entering={FadeIn.duration(100)}
              exiting={FadeOut.duration(100)}
              className="w-full gap-3"
            >
              <Text className="text-gray-900 text-b-03-m">
                <Text className="text-green-600 text-b-03-sb">
                  {COMPLETED_SCHEDULES.length}
                </Text>
                개의 완료된 일정
              </Text>

              <View className="w-full gap-2">
                {COMPLETED_SCHEDULES.map((schedule) => (
                  <ScheduleItem
                    key={`${schedule.date}-${schedule.categoryLabel}`}
                    {...schedule}
                    action={{ type: "none" }}
                  />
                ))}
              </View>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
