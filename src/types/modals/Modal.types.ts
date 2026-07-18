export type ModalType = string;

export type ModalOptions = {
  props?: Record<string, unknown>;
  onConfirm?: () => Promise<void> | void;
};

export type BaseModal = {
  isModalOpen: boolean;
  modalType: ModalType;
  options: {
    onConfirm?: () => Promise<void> | void;
  };
  modalProps?: Record<string, unknown>;

  openModal: (type: ModalType, options?: ModalOptions) => void;
  closeModal: () => void;
};
