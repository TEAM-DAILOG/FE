import dayjs from "dayjs";
import { useState } from "react";
import { Text, View } from "react-native";

import { CalendarGrid } from "@/src/components/calendar/CalendarGrid";
import { ScheduleCheckItem } from "@/src/components/common/ScheduleCheckItem";
import type { CalendarDayInfo } from "@/src/types/calendar/calendarGrid.types";
import type { UpcomingSchedule } from "@/src/types/calendar/schedulePanel.types";
import { getScheduleDday } from "@/src/utils";

type SchedulePanelProps = {
  month: string;
  onDayPress?: (date: string, isCurrentMonth: boolean) => void;
  getDayInfo?: (date: string, isCurrentMonth: boolean) => CalendarDayInfo;
  upcomingSchedules: UpcomingSchedule[];
};

const UPCOMING_RANGE_DAYS = 7;

export function SchedulePanel({
  month,
  onDayPress,
  getDayInfo,
  upcomingSchedules,
}: SchedulePanelProps) {
  const [schedules, setSchedules] = useState(upcomingSchedules);

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const today = dayjs().startOf("day");
  const visibleSchedules = schedules
    .filter((s) => {
      const diff = dayjs(s.date).startOf("day").diff(today, "day");
      return diff >= 0 && diff <= UPCOMING_RANGE_DAYS;
    })
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  return (
    <View className="flex-col gap-7 px-4 pt-5">
      <CalendarGrid
        month={month}
        mode="schedule"
        onDayPress={onDayPress}
        getDayInfo={getDayInfo}
      />

      <View className="gap-4">
        <Text className="text-gray-900 text-h-02">가까운 일정</Text>

        <View className="flex-col gap-3">
          {visibleSchedules.length === 0 ? (
            <Text className="text-gray-800 text-b-03-r">
              다음 일주일 이내에 등록된 일정이 없습니다.
            </Text>
          ) : (
            visibleSchedules.map((schedule) => {
              const { ddayLabel, dateLabel, weekdayLabel } = getScheduleDday(
                schedule.date
              );

              return (
                <View key={schedule.id} className="gap-2">
                  <View className="flex-row items-center gap-1">
                    <Text className="text-gray-800 text-b-04-m">
                      {ddayLabel}
                    </Text>
                    <View className="flex-row items-center gap-0.5">
                      <Text className="text-gray-800 text-b-04-m">
                        {dateLabel}
                      </Text>
                      <Text className="text-gray-800 text-b-04-m">
                        {weekdayLabel}
                      </Text>
                    </View>
                  </View>

                  <ScheduleCheckItem
                    categoryLabel={schedule.categoryLabel}
                    categoryColor={schedule.categoryColor}
                    description={schedule.description}
                    checked={schedule.checked}
                    onToggle={() => toggleSchedule(schedule.id)}
                  />
                </View>
              );
            })
          )}
        </View>
      </View>
    </View>
  );
}
