import { Text, View } from "react-native";

import { CalendarGrid } from "@/src/components/calendar/CalendarGrid";
import { useCompleteSchedule } from "@/src/hooks/mutations/schedules/useCompleteSchedule";
import { useUpcomingSchedules } from "@/src/hooks/queries/schedules/useUpcomingSchedules";
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
  const { dataUpdatedAt } = useUpcomingSchedules();

  const toggleSchedule = (id: string, checked: boolean) => {
    completeScheduleMutation.mutate({
      scheduleId: Number(id),
      isCompleted: !checked,
    });
  };

  const pendingVariables = completeScheduleMutation.variables;
  const isOptimisticOverrideValid =
    completeScheduleMutation.submittedAt > dataUpdatedAt;
  const isMutationSettled =
    (completeScheduleMutation.isPending ||
      completeScheduleMutation.isSuccess) &&
    isOptimisticOverrideValid;

  const visibleSchedules = upcomingSchedules.map((schedule) => ({
    ...schedule,
    checked:
      isMutationSettled && pendingVariables?.scheduleId === Number(schedule.id)
        ? pendingVariables.isCompleted
        : schedule.checked,
  }));

  const scheduleGroups = visibleSchedules.reduce<
    { date: string; schedules: typeof visibleSchedules }[]
  >((groups, schedule) => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.date === schedule.date) {
      lastGroup.schedules.push(schedule);
    } else {
      groups.push({ date: schedule.date, schedules: [schedule] });
    }
    return groups;
  }, []);

  return (
    <View className="flex-col gap-7 px-4">
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
            scheduleGroups.map((group) => {
              const { ddayLabel, dateLabel, weekdayLabel } = getScheduleDday(
                group.date
              );

              return (
                <View key={group.date} className="gap-2">
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

                  <View className="gap-2">
                    {group.schedules.map((schedule) => (
                      <ScheduleItem
                        key={schedule.id}
                        categoryLabel={schedule.categoryLabel}
                        categoryColor={schedule.categoryColor}
                        description={schedule.description}
                        action={buildScheduleCheckboxAction(schedule, {
                          checked: schedule.checked,
                          onToggle: () =>
                            toggleSchedule(schedule.id, schedule.checked),
                        })}
                      />
                    ))}
                  </View>
                </View>
              );
            })
          )}
        </View>
      </View>
    </View>
  );
}
