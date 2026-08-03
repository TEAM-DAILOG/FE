import { AddScheduleButton } from "@/src/components/common/AddScheduleButton";
import { Button } from "@/src/components/common/Button";
import { Divider } from "@/src/components/common/Divider";
import { LogoHeader } from "@/src/components/common/Header";
import { ScheduleItem } from "@/src/components/common/ScheduleItem";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { TabScrollView } from "@/src/components/common/TabScrollView";
import { useCompleteSchedule } from "@/src/hooks/mutations/schedules/useCompleteSchedule";
import { useGetTodayQuestion } from "@/src/hooks/queries/ai/useGetTodayQuestion";
import { useGetSchedules } from "@/src/hooks/queries/schedules/useGetSchedules";
import { buildScheduleCheckboxAction } from "@/src/utils/buildScheduleCheckboxAction";
import { formatScheduleItem } from "@/src/utils/formatScheduleItem";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

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
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const { data: todayQuestion, isLoading: isQuestionLoading } =
    useGetTodayQuestion();

  // 오늘 화면이므로 조회 범위도 오늘 날짜로 고정
  const TODAY = dayjs().format("YYYY-MM-DD");

  // 오늘 날짜 기준 일정 조회
  const { data: schedulesData } = useGetSchedules({
    startDate: TODAY,
    endDate: TODAY,
  });
  const completeScheduleMutation = useCompleteSchedule();

  const pendingVariables = completeScheduleMutation.variables;
  const isMutationSettled =
    completeScheduleMutation.isPending || completeScheduleMutation.isSuccess;

  const schedules = (schedulesData?.schedules ?? [])
    .map(formatScheduleItem)
    .map((schedule) => ({
      ...schedule,
      checked:
        isMutationSettled &&
        pendingVariables?.scheduleId === Number(schedule.id)
          ? pendingVariables.isCompleted
          : schedule.checked,
    }));
  const hasSchedules = schedules.length > 0;

  const toggleSchedule = (id: string, checked: boolean) => {
    completeScheduleMutation.mutate({
      scheduleId: Number(id),
      isCompleted: !checked,
    });
  };

  return (
    <ScreenContainer>
      {/* 로고 영역 */}
      <LogoHeader />

      <TabScrollView>
        <View className="px-4">
          {/* 날짜 */}
          <Text className="mb-4 text-green-900 text-h-01">{dateLabel}</Text>

          {/* 일정 카드 */}
          <View className="w-full gap-3 rounded-2xl bg-gray-0 px-3 py-4 shadow-card-1">
            <Text className="text-gray-900 text-b-02-r">
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
                    action={buildScheduleCheckboxAction(s, {
                      checked: s.checked,
                      onToggle: () => toggleSchedule(s.id, s.checked),
                    })}
                  />
                ))}
              </View>
            )}
            <AddScheduleButton onPress={() => router.push("/schedule")} />
          </View>

          {hasSchedules && (
            <View className="mt-7">
              <Text className="mb-4 text-green-900 text-h-02">오늘의 질문</Text>
              {isQuestionAnswered ? (
                <View className="gap-3">
                  {/* 질문 응답 카드 */}
                  <View className="w-full items-center justify-center gap-2 rounded-lg border border-green-100 bg-gray-0 px-8 py-6 shadow-card-1">
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
                      {isQuestionLoading
                        ? "오늘의 질문을 불러오는 중입니다."
                        : todayQuestion?.content ||
                          "오늘의 질문을 불러올 수 없어요."}
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
          )}
        </View>
      </TabScrollView>
    </ScreenContainer>
  );
}
