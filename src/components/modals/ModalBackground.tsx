import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  View,
} from "react-native";

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
    </Modal>
  );
}
