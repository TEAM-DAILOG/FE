import dayjs from "dayjs";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { ScheduleItem } from "@/src/components/common";
import { useCompleteSchedule } from "@/src/hooks/mutations/schedules/useCompleteSchedule";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { UpcomingSchedule } from "@/src/types/calendar/schedulePanel.types";
import { buildScheduleCheckboxAction } from "@/src/utils/buildScheduleCheckboxAction";
import { AddScheduleButton } from "../../common/AddScheduleButton";

export type ScheduleListModalProps = {
  date: string;
  schedules: UpcomingSchedule[];
  onPressAddSchedule: () => void;
};

export function ScheduleListModal({
  date,
  schedules: initialSchedules,
  onPressAddSchedule,
}: ScheduleListModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);
  const [schedules, setSchedules] = useState(initialSchedules);
  const completeScheduleMutation = useCompleteSchedule();

  const setChecked = (id: string, checked: boolean) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id ? { ...schedule, checked } : schedule
      )
    );
  };

  const toggleSchedule = (id: string) => {
    const target = schedules.find((schedule) => schedule.id === id);
    if (!target) return;

    const nextChecked = !target.checked;

    setChecked(id, nextChecked);
    completeScheduleMutation.mutate(
      { scheduleId: Number(id), isCompleted: nextChecked },
      { onError: () => setChecked(id, target.checked) }
    );
  };

  const handlePressAddSchedule = () => {
    closeModal();
    onPressAddSchedule();
  };

  const hasFewSchedules = schedules.length <= 3;
  const hasManySchedules = schedules.length > 5;

  const scheduleItems = schedules.map((schedule) => (
    <ScheduleItem
      key={schedule.id}
      categoryLabel={schedule.categoryLabel}
      categoryColor={schedule.categoryColor}
      description={schedule.description}
      action={buildScheduleCheckboxAction(schedule, {
        checked: schedule.checked,
        onToggle: () => toggleSchedule(schedule.id),
      })}
    />
  ));

  return (
    <View className="max-h-[488px] min-h-[342px] w-full gap-4 rounded-xl bg-white px-4 py-5">
      <Text className="text-gray-900 text-b-02-m">
        {dayjs(date).format("YYYY년 M월 D일")}
      </Text>

      {schedules.length === 0 ? (
        <View className="flex-1 items-start justify-start gap-3">
          <Text className="text-gray-900 text-b-02-r">
            오늘 계획된 일정이 없어요.
          </Text>
          <AddScheduleButton onPress={handlePressAddSchedule} />
        </View>
      ) : hasFewSchedules ? (
        <View className="flex-1 justify-between">
          <View className="gap-2">{scheduleItems}</View>
          <AddScheduleButton onPress={handlePressAddSchedule} />
        </View>
      ) : (
        <View className="gap-4">
          {hasManySchedules ? (
            <ScrollView
              className="max-h-[347px]"
              contentContainerClassName="gap-2"
              showsVerticalScrollIndicator={false}
            >
              {scheduleItems}
            </ScrollView>
          ) : (
            <View className="gap-2">{scheduleItems}</View>
          )}
          <AddScheduleButton onPress={handlePressAddSchedule} />
        </View>
      )}
    </View>
  );
}
