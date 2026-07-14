import type { DatePickerModalProps } from "@/src/types/modals/datepickerModal.types";
import { useBaseModal } from "@/src/store/modals/baseModal";

import { ModalBackground } from "./ModalBackground";
import { DatePickerModal } from "./schedule/DatePickerModal";

export function ModalPage() {
  const isModalOpen = useBaseModal((state) => state.isModalOpen);
  const modalType = useBaseModal((state) => state.modalType);
  const modalProps = useBaseModal((state) => state.modalProps);

  if (!isModalOpen) return null;

  return (
    <ModalBackground>
      {modalType === "scheduleDatePickerModal" ? (
        <DatePickerModal {...(modalProps as unknown as DatePickerModalProps)} />
      ) : null}
    </ModalBackground>
  );
}
