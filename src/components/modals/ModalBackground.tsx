import { PropsWithChildren } from "react";
import { Modal, Pressable } from "react-native";

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
      <Pressable
        onPress={closeModal}
        className="flex-1 items-center justify-center bg-gray-900/60 px-4"
      >
        <Pressable onPress={() => {}} className="w-full">
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
