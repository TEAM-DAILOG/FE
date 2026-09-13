import { router } from "expo-router";
import { Text, View } from "react-native";

import { useBaseModal } from "@/src/store/modals/baseModal";

import { ModalActionButtons } from "../ModalActionButtons";

export function LoginRequiredModal() {
  const closeModal = useBaseModal((state) => state.closeModal);

  const handleConfirm = () => {
    closeModal();
    router.push("/login");
  };

  return (
    <View className="w-full flex-col rounded-xl bg-white">
      <View className="items-center justify-center gap-5 px-[30px] py-10">
        <View className="gap-3">
          <View className="flex-col items-center justify-center">
            <Text className="text-gray-900 text-b-02-m">
              로그인이 필요한 서비스입니다.
            </Text>
          </View>

          <Text className="text-gray-900 text-b-04-m">
            로그인 창으로 이동하시겠어요?
          </Text>
        </View>
      </View>

      <ModalActionButtons
        confirmLabel="이동"
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
    </View>
  );
}
