import { useBaseModal } from "@/src/store/modals/baseModal";
import type { DatePickerModalProps } from "@/src/types/modals/datepickerModal.types";
import type { EditProfileModalProps } from "@/src/types/modals/settingModal.types";

import {
  ScheduleListModal,
  type ScheduleListModalProps,
} from "./calendar/ScheduleListModal";
import { ModalBackground } from "./ModalBackground";
import { DatePickerModal } from "./schedule/DatePickerModal";
import { EditProfileModal } from "./settings/EditProfileModal";

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
      {modalType === "editProfileModal" ? (
        <EditProfileModal
          {...(modalProps as unknown as EditProfileModalProps)}
        />
      ) : null}
    </ModalBackground>
  );
}
