import dayjs from "dayjs";
import { useState } from "react";
import { Text, View } from "react-native";

import { ScheduleCheckItem } from "@/src/components/common/ScheduleCheckItem";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { UpcomingSchedule } from "@/src/types/calendar/schedulePanel.types";
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

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id
          ? { ...schedule, checked: !schedule.checked }
          : schedule
      )
    );
  };

  const handlePressAddSchedule = () => {
    closeModal();
    onPressAddSchedule();
  };

  return (
    <View className="min-h-[342px] w-full gap-4 rounded-xl bg-white px-4 py-5">
      <Text className="text-gray-900 text-b-02-m">
        {dayjs(date).format("YYYY년 M월 D일")}
      </Text>

      <View className="flex-1 gap-2">
        {schedules.length === 0 ? (
          <View className="flex-1 items-start justify-start gap-3">
            <Text className="text-gray-900 text-b-02-r">
              오늘 계획된 일정이 없어요.
            </Text>
            <AddScheduleButton onPress={handlePressAddSchedule} />
          </View>
        ) : (
          <View className="flex-1 justify-between">
            <View className="flex-1 gap-2">
              {schedules.map((schedule) => (
                <ScheduleCheckItem
                  key={schedule.id}
                  categoryLabel={schedule.categoryLabel}
                  categoryColor={schedule.categoryColor}
                  description={schedule.description}
                  checked={schedule.checked}
                  onToggle={() => toggleSchedule(schedule.id)}
                />
              ))}
            </View>
            <AddScheduleButton onPress={handlePressAddSchedule} />
          </View>
        )}
      </View>
    </View>
  );
}
