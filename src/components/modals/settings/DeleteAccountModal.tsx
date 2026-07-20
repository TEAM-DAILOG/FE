import { useState } from "react";
import { Text, View } from "react-native";

import { TextField } from "@/src/components/common";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { DeleteAccountModalProps } from "@/src/types/modals/settingModal.types";

import { SettingsModalContainer } from "./SettingsModalContainer";

const CONFIRM_PHRASE = "안내를 확인했으며 탈퇴하겠습니다.";

export function DeleteAccountModal({ onConfirm }: DeleteAccountModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);

  const [confirmText, setConfirmText] = useState("");

  const canConfirm = confirmText === CONFIRM_PHRASE;

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm();
    closeModal();
  };

  return (
    <SettingsModalContainer
      title="회원탈퇴"
      confirmLabel="확인"
      canConfirm={canConfirm}
      onConfirm={handleConfirm}
    >
      <View className="w-full items-start gap-2">
        <Text className="text-gray-900 text-b-02-sb">
          회원 탈퇴를 진행하시겠습니까?
        </Text>
        <Text className="text-gray-900 text-b-03-r">
          {
            "회원 탈퇴 시 작성한 일정 및 일기는 복구 불가능합니다.\n탈퇴를 진행하시려면 아래 녹색 문구를 정확히 입력해 주세요."
          }
        </Text>
        <Text className="text-green-600 text-b-03-r">{CONFIRM_PHRASE}</Text>
      </View>

      <TextField
        value={confirmText}
        onChangeText={setConfirmText}
        placeholder={CONFIRM_PHRASE}
      />
    </SettingsModalContainer>
  );
}
