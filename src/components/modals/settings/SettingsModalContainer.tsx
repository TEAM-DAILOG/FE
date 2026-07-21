import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";

import { useBaseModal } from "@/src/store/modals/baseModal";

import { ModalActionButtons } from "../ModalActionButtons";

type SettingsModalContainerProps = PropsWithChildren<{
  title: string;
  confirmLabel: string;
  canConfirm: boolean;
  onConfirm: () => void;
}>;

export function SettingsModalContainer({
  title,
  confirmLabel,
  canConfirm,
  onConfirm,
  children,
}: SettingsModalContainerProps) {
  const closeModal = useBaseModal((state) => state.closeModal);

  return (
    <View className="w-full items-start gap-10 rounded-xl bg-gray-0 pt-5">
      <View className="w-full items-center gap-4 px-4">
        <Text className="w-full border-b border-gray-200 pb-2 text-gray-900 text-b-02-m">
          {title}
        </Text>
        {children}
      </View>

      <ModalActionButtons
        confirmLabel={confirmLabel}
        disabled={!canConfirm}
        onCancel={closeModal}
        onConfirm={onConfirm}
      />
    </View>
  );
}
