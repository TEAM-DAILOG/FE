import dayjs from "dayjs";
import { useState } from "react";
import { Text, View } from "react-native";

import { Checkbox } from "@/src/components/common/Checkbox";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { ScheduleScope } from "@/src/types/schedules/schedule.types";

import { ModalActionButtons } from "../ModalActionButtons";

export type DeleteScheduleModalProps = {
  date: string;
  description: string;
  isRepeating: boolean;
  onConfirm: (scope: ScheduleScope) => void;
};

export function DeleteScheduleModal({
  date,
  description,
  isRepeating,
  onConfirm,
}: DeleteScheduleModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const handleConfirm = () => {
    onConfirm(isRepeating && isDeletingAll ? "ALL" : "SINGLE");
    closeModal();
  };

  return (
    <View className="w-full flex-col rounded-xl bg-white">
      <View className="items-center justify-center gap-5 px-[30px] py-10">
        <View className="gap-3">
          <View className="flex-col items-center justify-center">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-green-600 text-b-03-m">
                {dayjs(date).format("M월 D일")}
              </Text>
              <View className="h-3 w-[1px] bg-green-200" />
              <Text numberOfLines={1} className="text-green-600 text-b-03-m">
                {description}
              </Text>
            </View>
            <Text className="text-gray-900 text-b-02-m">
              일정을 삭제할까요?
            </Text>
          </View>

          <Text className="text-gray-900 text-b-04-m">
            삭제된 일정은 복구할 수 없어요.
          </Text>
        </View>

        {isRepeating && (
          <View className="flex-row items-center gap-1.5">
            <Checkbox
              checked={isDeletingAll}
              onToggle={() => setIsDeletingAll((prev) => !prev)}
              color="#3B6352"
            />
            <Text className="text-green-700 text-b-03-m">
              반복 일정을 전부 삭제합니다.
            </Text>
          </View>
        )}
      </View>

      <ModalActionButtons
        confirmLabel="삭제"
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
    </View>
  );
}
