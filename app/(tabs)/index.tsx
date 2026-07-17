import { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { AddScheduleButton } from "@/src/components/common/AddScheduleButton";
import { ScheduleCheckItem } from "@/src/components/common/ScheduleCheckItem";
import { LogoHeader } from "@/src/components/common/Header";
import { Button } from "@/src/components/common/Button";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { TabScrollView } from "@/src/components/common/TabScrollView";
import { Divider } from "@/src/components/common/Divider";

type Schedule = {
  id: string;
  categoryLabel: string;
  categoryColor: string;
  description: string;
  checked: boolean;
};

const MOCK_SCHEDULES: Schedule[] = [
  {
    id: "1",
    categoryLabel: "CATEGORY",
    categoryColor: "#5B8FD9",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
  {
    id: "2",
    categoryLabel: "CATEGORY",
    categoryColor: "#D9A05B",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
  {
    id: "3",
    categoryLabel: "CATEGORY",
    categoryColor: "#5FAE72",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
  {
    id: "4",
    categoryLabel: "CATEGORY",
    categoryColor: "#9B7ED9",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
  {
    id: "5",
    categoryLabel: "CATEGORY",
    categoryColor: "#D95B8F",
    description: "Lorem ipsum dolor sit amet consectetur.",
    checked: false,
  },
];

function useDateParts() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    day: now.getDate(),
    weekday: days[now.getDay()],
  };
}

export default function HomeScreen() {
  const { month, day, weekday } = useDateParts();
  const dateLabel = `${month}월 ${day}일 ${weekday}요일`;
  const [schedules, setSchedules] = useState<Schedule[]>(MOCK_SCHEDULES);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const hasSchedules = schedules.length > 0;

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  return (
    <ScreenContainer>
      {/* 로고 영역 */}
      <LogoHeader />

      <TabScrollView>
        <View className="px-4 pb-10 pt-5">
          {/* 날짜 */}
          <Text className="mb-4 text-green-900 text-h-01">{dateLabel}</Text>

          {/* 일정 카드 */}
          <View className="shadow-card-1 w-full gap-3 rounded-2xl bg-gray-0 px-3 py-4">
            <Text className="text-gray-900 text-b-02-r">
              {hasSchedules
                ? "오늘 계획한 일정은 모두 마치셨나요?"
                : "오늘 계획된 일정이 없어요."}
            </Text>
            {hasSchedules && (
              <View className="gap-2">
                {schedules.map((s) => (
                  <ScheduleCheckItem
                    key={s.id}
                    categoryLabel={s.categoryLabel}
                    categoryColor={s.categoryColor}
                    description={s.description}
                    checked={s.checked}
                    onToggle={() => toggleSchedule(s.id)}
                  />
                ))}
              </View>
            )}
            <AddScheduleButton onPress={() => router.push("/schedule")} />
          </View>

          {/* 오늘의 질문 */}
          <View className="mt-7">
            <Text className="mb-4 text-green-900 text-h-02">오늘의 질문</Text>
            {isQuestionAnswered ? (
              <View className="gap-3">
                {/* 질문 응답 카드 */}
                <View className="shadow-card-1 w-full items-center justify-center gap-2 rounded-lg border border-green-100 bg-gray-0 px-8 py-6">
                  {/* 날짜 */}
                  <View className="flex-row items-center gap-1">
                    <View className="flex-row items-center gap-0.5">
                      <Text className="text-green-700 text-b-03-sb">
                        {month}월
                      </Text>
                      <Text className="text-green-700 text-b-03-sb">
                        {day}일
                      </Text>
                    </View>
                    <Text className="text-green-700 text-b-03-sb">
                      {weekday}요일
                    </Text>
                  </View>

                  {/* 구분선 */}
                  <Divider className="w-[278px] border-green-100" />

                  {/* 질문 내용 */}
                  <Text className="text-center text-green-800 text-b-02-m">
                    Lorem ipsum dolor sit amet consectetur. | 294
                  </Text>
                </View>
                <Button
                  label="질문 답변하기"
                  onPress={() => router.push("/diary/write")} // 질문 데이터 전달 필요
                />
              </View>
            ) : (
              <Button
                label="질문 받기"
                onPress={() => {
                  // TODO: 실제 질문 API 연동 시, 응답 받아온 뒤 setIsQuestionAnswered(true)
                  setIsQuestionAnswered(true);
                }}
              />
            )}
          </View>
        </View>
      </TabScrollView>
    </ScreenContainer>
  );
}
