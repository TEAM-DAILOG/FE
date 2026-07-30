import dayjs from "dayjs";
import { useState } from "react";
import { Text, View } from "react-native";

import { Checkbox } from "@/src/components/common/Checkbox";
import { useBaseModal } from "@/src/store/modals/baseModal";

import { ModalActionButtons } from "./ModalActionButtons";

type DeleteTarget = "일정" | "일기";

const CONFIRM_TEXT: Record<
  DeleteTarget,
  { question: string; caption: string }
> = {
  일정: {
    question: "일정을 삭제할까요?",
    caption: "삭제된 일정은 복구할 수 없어요.",
  },
  일기: {
    question: "일기를 삭제할까요?",
    caption: "삭제된 일기는 복구할 수 없어요.",
  },
};

export type DeleteConfirmModalProps = {
  target: DeleteTarget;
  date?: string;
  description?: string;
  isRepeating?: boolean;
  onConfirm: (scope: "SINGLE" | "ALL") => void;
};

export function DeleteConfirmModal({
  target,
  date,
  description,
  isRepeating = false,
  onConfirm,
}: DeleteConfirmModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const handleConfirm = () => {
    onConfirm(isRepeating && isDeletingAll ? "ALL" : "SINGLE");
    closeModal();
  };

  const { question, caption } = CONFIRM_TEXT[target];

  return (
    <View className="w-full flex-col rounded-xl bg-white">
      <View className="items-center justify-center gap-5 px-[30px] py-10">
        <View className="gap-3">
          <View className="flex-col items-center justify-center">
            {date || description ? (
              <View className="flex-row items-center gap-1.5">
                {date && (
                  <Text className="text-green-600 text-b-03-m">
                    {dayjs(date).format("M월 D일")}
                  </Text>
                )}
                {date && description && (
                  <View className="h-3 w-[1px] bg-green-200" />
                )}
                {description && (
                  <Text
                    numberOfLines={1}
                    className="text-green-600 text-b-03-m"
                  >
                    {description}
                  </Text>
                )}
              </View>
            ) : null}
            <Text className="text-gray-900 text-b-02-m">{question}</Text>
          </View>

          <Text className="text-gray-900 text-b-04-m">{caption}</Text>
        </View>

        {isRepeating && (
          <View className="flex-row items-center gap-1.5">
            <Checkbox
              checked={isDeletingAll}
              onToggle={() => setIsDeletingAll((prev) => !prev)}
              color="#3B6352"
              size={20}
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
