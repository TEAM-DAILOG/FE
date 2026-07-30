import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import {
  BackHeader,
  ProgressBar,
  ScreenContainer,
} from "@/src/components/common";
import {
  DetailToggleButton,
  MonthSelector,
  ScheduleListGroup,
  type ScheduleListGroupEntry,
} from "@/src/components/statistics";
import { useGetCompletedSchedules } from "@/src/hooks/queries/stats/useGetCompletedSchedules";
import { useGetPendingSchedules } from "@/src/hooks/queries/stats/useGetPendingSchedules";
import { formatYearMonth } from "@/src/utils/formatDate";
import { formatStatsScheduleItem } from "@/src/utils/formatStatsScheduleItem";

export default function StatisticIncompleteScreen() {
  const router = useRouter();
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { year, month } = formatYearMonth(selectedDate);

  const { data: pendingData } = useGetPendingSchedules({ year, month });
  const { data: completedData } = useGetCompletedSchedules({ year, month });

  const incompleteSchedules = [...(pendingData?.incompletedSchedules ?? [])]
    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
    .map(formatStatsScheduleItem);
  const completedSchedules = [...(completedData?.completedSchedules ?? [])]
    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
    .map(formatStatsScheduleItem);

  // 미완료 일정을 오늘 날짜로 다시 등록할 수 있도록 일정등록 화면으로 이동
  const handleReRegister = (schedule: ScheduleListGroupEntry) => {
    router.push({
      pathname: "/schedule",
      params: {
        title: schedule.description,
        categoryColor: schedule.categoryColor,
        date: dayjs().format("YYYY-MM-DD"),
      },
    });
  };

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="미완료 일정" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 40,
        }}
      >
        <View className="w-full gap-4 rounded-2xl border border-gray-100 bg-gray-0 px-3 py-4">
          <View className="w-full gap-3">
            <View className="flex-row items-center justify-between">
              <MonthSelector
                date={selectedDate}
                onSelectDate={setSelectedDate}
              />

              <Text className="text-gray-800 text-b-02-m">
                일정 달성률{" "}
                <Text className="text-green-600 text-b-02-sb">
                  {pendingData?.completionRate ?? 0}%
                </Text>
              </Text>
            </View>

            <ProgressBar value={pendingData?.completionRate ?? 0} />
          </View>

          <ScheduleListGroup
            title={
              <Text className="text-gray-900 text-b-02-m">
                미완료된 일정이{" "}
                <Text className="text-green-600 text-b-02-sb">
                  {pendingData?.incompletedScheduleCount ??
                    incompleteSchedules.length}
                </Text>
                개 있어요.
              </Text>
            }
            schedules={incompleteSchedules}
            action={(schedule) => ({
              type: "button",
              label: "일정재등록",
              onPress: () => handleReRegister(schedule),
            })}
          />

          <DetailToggleButton
            label="완료 일정 펼치기"
            isOpen={isCompletedOpen}
            onPress={() => setIsCompletedOpen((prev) => !prev)}
          />

          {isCompletedOpen && (
            <Animated.View
              entering={FadeIn.duration(100)}
              exiting={FadeOut.duration(100)}
              className="w-full"
            >
              <ScheduleListGroup
                title={
                  <Text className="text-gray-900 text-b-03-m">
                    <Text className="text-green-600 text-b-03-sb">
                      {completedData?.completedScheduleCount ??
                        completedSchedules.length}
                    </Text>
                    개의 완료된 일정
                  </Text>
                }
                schedules={completedSchedules}
                action={{ type: "none" }}
              />
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
