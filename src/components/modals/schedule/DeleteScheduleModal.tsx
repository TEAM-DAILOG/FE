import dayjs from "dayjs";
import { Text, View } from "react-native";

import { useBaseModal } from "@/src/store/modals/baseModal";

import { ModalActionButtons } from "../ModalActionButtons";

export type DeleteScheduleModalProps = {
  date: string;
  description: string;
  onConfirm: () => void;
};

export function DeleteScheduleModal({
  date,
  description,
  onConfirm,
}: DeleteScheduleModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <View className="h-[203px] w-full flex-col items-center justify-between rounded-xl bg-white">
      <View className="flex-1 items-center justify-center gap-3">
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
          <Text className="text-gray-900 text-b-02-m">일정을 삭제할까요?</Text>
        </View>
        <Text className="text-gray-900 text-b-04-m">
          삭제된 일정은 복구할 수 없어요.
        </Text>
      </View>

      <ModalActionButtons
        confirmLabel="삭제"
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
    </View>
  );
}
