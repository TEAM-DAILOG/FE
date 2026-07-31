import { Text, View } from "react-native";

import { CalendarGrid } from "@/src/components/calendar/CalendarGrid";
import { useCompleteSchedule } from "@/src/hooks/mutations/schedules/useCompleteSchedule";
import type { CalendarDayInfo } from "@/src/types/calendar/calendarGrid.types";
import type { UpcomingSchedule } from "@/src/types/calendar/schedulePanel.types";
import { getScheduleDday } from "@/src/utils";
import { buildScheduleCheckboxAction } from "@/src/utils/buildScheduleCheckboxAction";
import { ScheduleItem } from "../common";

type SchedulePanelProps = {
  month: string;
  onDayPress?: (date: string, isCurrentMonth: boolean) => void;
  getDayInfo?: (date: string, isCurrentMonth: boolean) => CalendarDayInfo;
  upcomingSchedules: UpcomingSchedule[];
};

export function SchedulePanel({
  month,
  onDayPress,
  getDayInfo,
  upcomingSchedules,
}: SchedulePanelProps) {
  const completeScheduleMutation = useCompleteSchedule();

  const toggleSchedule = (id: string, checked: boolean) => {
    completeScheduleMutation.mutate({
      scheduleId: Number(id),
      isCompleted: !checked,
    });
  };

  const pendingVariables = completeScheduleMutation.variables;
  const isMutationSettled =
    completeScheduleMutation.isPending || completeScheduleMutation.isSuccess;

  const visibleSchedules = upcomingSchedules.map((schedule) => ({
    ...schedule,
    checked:
      isMutationSettled && pendingVariables?.scheduleId === Number(schedule.id)
        ? pendingVariables.isCompleted
        : schedule.checked,
  }));

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

                  <ScheduleItem
                    categoryLabel={schedule.categoryLabel}
                    categoryColor={schedule.categoryColor}
                    description={schedule.description}
                    action={buildScheduleCheckboxAction(schedule, {
                      checked: schedule.checked,
                      onToggle: () =>
                        toggleSchedule(schedule.id, schedule.checked),
                    })}
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
