import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useBaseModal } from "@/src/store/modals/baseModal";

export function ModalBackground({ children }: PropsWithChildren) {
  const isModalOpen = useBaseModal((state) => state.isModalOpen);
  const closeModal = useBaseModal((state) => state.closeModal);

  return (
    <Modal
      visible={isModalOpen}
      transparent
      animationType="fade"
      onRequestClose={closeModal}
    >
      {/* RN Modal은 안드로이드에서 별도의 네이티브 윈도우로 렌더링되어
          루트의 GestureHandlerRootView 밖에 놓이므로, 모달 안에서
          GestureDetector(예: 일정 스와이프)가 동작하려면 여기서 다시 감싸야 함 */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1">
          <Pressable
            onPress={closeModal}
            className="absolute inset-0 bg-gray-900/60"
          />
          <View
            pointerEvents="box-none"
            className="flex-1 items-center justify-center px-4"
          >
            <KeyboardAvoidingView
              className="w-full"
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              {children}
            </KeyboardAvoidingView>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}
