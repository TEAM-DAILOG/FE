import { create } from "zustand";

import type { BaseModal } from "@/src/types/modals/Modal.types";

export const useBaseModal = create<BaseModal>((set) => ({
  isModalOpen: false,
  modalType: "",
  options: {},
  modalProps: undefined,

  openModal: (type, options) =>
    set({
      isModalOpen: true,
      modalType: type,
      options: {
        onConfirm: options?.onConfirm,
      },
      modalProps: options?.props,
    }),

  closeModal: () =>
    set({ isModalOpen: false, modalType: "", modalProps: undefined }),
}));
