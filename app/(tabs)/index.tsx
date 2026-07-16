import { AddScheduleButton } from "@/src/components/common/AddScheduleButton";
import { ScheduleItem } from "@/src/components/common/ScheduleItem";
import type { CategoryColor } from "@/src/types/categories/category.types";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Schedule = {
  id: string;
  categoryLabel: string;
  categoryColor: CategoryColor;
  description: string;
  checked: boolean;
};

const MOCK_SCHEDULES: Schedule[] = [
  {
    id: "1",
    categoryLabel: "CATEGORY",
    categoryColor: "blue",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
  {
    id: "2",
    categoryLabel: "CATEGORY",
    categoryColor: "brown",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
  {
    id: "3",
    categoryLabel: "CATEGORY",
    categoryColor: "green",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
  {
    id: "4",
    categoryLabel: "CATEGORY",
    categoryColor: "purple",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
  {
    id: "5",
    categoryLabel: "CATEGORY",
    categoryColor: "pink",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
];

function useFormattedDate() {
  return useMemo(() => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const now = new Date();
    return `${now.getMonth() + 1}월 ${now.getDate()}일 ${days[now.getDay()]}요일`;
  }, []);
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const dateLabel = useFormattedDate();
  const [schedules, setSchedules] = useState<Schedule[]>(MOCK_SCHEDULES);
  const hasSchedules = schedules.length > 0;

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: "#F5F9F6",
        paddingTop: insets.top + 20,
        paddingHorizontal: 16,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 로고 영역 */}
        <View className="mb-2 h-[32px] items-start justify-center">
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#4D826C" }}>
            DA·LOG
          </Text>
        </View>

        {/* 날짜 */}
        <Text
          className="mb-3"
          style={{
            fontFamily: "SUIT-SemiBold",
            fontWeight: "600",
            fontSize: 20,
            lineHeight: 30, // 20 * 150%
            letterSpacing: -0.4, // 20 * -2%
            color: "#15231D",
          }}
        >
          {dateLabel}
        </Text>

        {/* 일정 카드 */}
        <View className="w-full rounded-2xl bg-white px-4 py-4">
          <Text
            className="mb-2"
            style={{
              fontFamily: "SUIT-Regular",
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 24, // 16 * 150%
              letterSpacing: -0.32, // 16 * -2%
              color: "#020303",
            }}
          >
            {hasSchedules
              ? "오늘 계획한 일정은 모두 마치셨나요?"
              : "오늘 계획된 일정이 없어요."}
          </Text>

          {hasSchedules && (
            <View className="gap-2">
              {schedules.map((s) => (
                <ScheduleItem
                  key={s.id}
                  categoryLabel={s.categoryLabel}
                  categoryColor={s.categoryColor}
                  description={s.description}
                  action={{
                    type: "checkbox",
                    checked: s.checked,
                    onToggle: () => toggleSchedule(s.id),
                  }}
                />
              ))}
            </View>
          )}

          <View className={hasSchedules ? "mt-2" : ""}>
            <AddScheduleButton onPress={() => router.push("/schedule")} />
          </View>
        </View>

        {/* 오늘의 질문 */}
        <View className="mt-6">
          <Text
            className="mb-3"
            style={{
              fontFamily: "SUIT-Medium",
              fontWeight: "500",
              fontSize: 18,
              lineHeight: 27, // 18 * 150%
              letterSpacing: -0.36, // 18 * -2%
              color: "#15231D",
            }}
          >
            오늘의 질문
          </Text>
          <Pressable
            className="w-full items-center justify-center rounded-2xl py-4"
            style={{ backgroundColor: "#4D826C", outlineStyle: "none" } as any}
          >
            <Text
              className="text-white"
              style={{ fontSize: 16, fontWeight: "600" }}
            >
              질문 받기
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
