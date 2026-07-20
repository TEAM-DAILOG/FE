import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable } from "react-native";

import { useBaseModal } from "@/src/store/modals/baseModal";

function stopPropagation() {}

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
      <Pressable
        onPress={closeModal}
        className="flex-1 items-center justify-center bg-gray-900/60 px-4"
      >
        <KeyboardAvoidingView
          className="w-full"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Pressable onPress={stopPropagation} className="w-full">
            {children}
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}
