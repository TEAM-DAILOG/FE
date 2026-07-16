import { useBaseModal } from "@/src/store/modals/baseModal";
import type { DatePickerModalProps } from "@/src/types/modals/datepickerModal.types";

import { ScheduleListModal, type ScheduleListModalProps } from "./calendar/ScheduleListModal";
import { ModalBackground } from "./ModalBackground";
import { DatePickerModal } from "./schedule/DatePickerModal";

export function ModalPage() {
  const isModalOpen = useBaseModal((state) => state.isModalOpen);
  const modalType = useBaseModal((state) => state.modalType);
  const modalProps = useBaseModal((state) => state.modalProps);

  if (!isModalOpen) return null;

  return (
    <ModalBackground>
      {modalType === "datePickerModal" ? (
        <DatePickerModal {...(modalProps as unknown as DatePickerModalProps)} />
      ) : null}
      {modalType === "scheduleListModal" ? (
        <ScheduleListModal
          {...(modalProps as unknown as ScheduleListModalProps)}
        />
      ) : null}
    </ModalBackground>
  );
}
