import { View } from "react-native";

import { Button } from "@/src/components/common";

type ModalActionButtonsProps = {
  cancelLabel?: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
};

export function ModalActionButtons({
  cancelLabel = "취소",
  confirmLabel,
  onCancel,
  onConfirm,
  disabled,
}: ModalActionButtonsProps) {
  return (
    <View className="w-full flex-row">
      <Button
        label={cancelLabel}
        variant="fill-gray"
        onPress={onCancel}
        className="w-0 flex-1 rounded-t-none rounded-bl-xl rounded-br-none"
      />
      <Button
        label={confirmLabel}
        disabled={disabled}
        variant="fill-green"
        onPress={onConfirm}
        className="w-0 flex-1 rounded-t-none rounded-bl-none rounded-br-xl"
      />
    </View>
  );
}
