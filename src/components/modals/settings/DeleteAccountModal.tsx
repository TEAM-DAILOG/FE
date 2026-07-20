import { useState } from "react";
import { Text, View } from "react-native";

import { Button, TextField } from "@/src/components/common";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { DeleteAccountModalProps } from "@/src/types/modals/settingModal.types";

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
    <View className="w-full items-start gap-10 rounded-xl bg-gray-0 pt-5">
      <View className="w-full items-center gap-4 px-4">
        <Text className="w-full border-b border-gray-200 pb-2 text-gray-900 text-b-02-m">
          회원탈퇴
        </Text>

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
      </View>

      <View className="w-full flex-row">
        <Button
          label="취소"
          variant="fill-gray"
          onPress={closeModal}
          className="w-0 flex-1 rounded-t-none rounded-bl-xl rounded-br-none"
        />
        <Button
          label="확인"
          disabled={!canConfirm}
          variant="fill-green"
          onPress={handleConfirm}
          className="w-0 flex-1 rounded-t-none rounded-bl-none rounded-br-xl"
        />
      </View>
    </View>
  );
}
