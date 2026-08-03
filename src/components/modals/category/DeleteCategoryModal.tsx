import { Text, View } from "react-native";

import {
  CATEGORY_DOT_CLASS_NAMES,
  CATEGORY_TEXT_CLASS_NAMES,
} from "@/src/constants/categoryColors";
import { cn } from "@/src/lib/cn";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { DeleteCategoryModalProps } from "@/src/types/modals/categoryModal.types";

import { ModalActionButtons } from "../ModalActionButtons";

export function DeleteCategoryModal({
  categoryName,
  categoryColor,
  onConfirm,
}: DeleteCategoryModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <View className="w-full overflow-hidden rounded-xl bg-white">
      <View className="items-center gap-3 px-4 py-10">
        <View className="flex-row items-center gap-1">
          <View
            className={cn(
              "h-6 w-6 rounded-full",
              CATEGORY_DOT_CLASS_NAMES[categoryColor]
            )}
          />
          <Text
            numberOfLines={1}
            className={cn(
              "shrink text-b-02-sb",
              CATEGORY_TEXT_CLASS_NAMES[categoryColor]
            )}
          >
            {categoryName}
          </Text>
          <Text className="text-gray-900 text-b-02-m">를 삭제할까요?</Text>
        </View>
        <Text className="text-gray-900 text-b-04-m">
          등록된 일정은 삭제되지 않아요
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
