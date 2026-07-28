import { useBaseModal } from "@/src/store/modals/baseModal";
import type { DeleteCategoryModalProps } from "@/src/types/modals/categoryModal.types";
import type { DatePickerModalProps } from "@/src/types/modals/datepickerModal.types";
import type {
  ChangePasswordModalProps,
  DeleteAccountModalProps,
  EditProfileModalProps,
} from "@/src/types/modals/settingModal.types";

import {
  ScheduleListModal,
  type ScheduleListModalProps,
} from "./calendar/ScheduleListModal";
import { DeleteCategoryModal } from "./category/DeleteCategoryModal";
import { ModalBackground } from "./ModalBackground";
import { DatePickerModal } from "./schedule/DatePickerModal";
import {
  DeleteScheduleModal,
  DeleteScheduleModalProps,
} from "./schedule/DeleteScheduleModal";
import { ChangePasswordModal } from "./settings/ChangePasswordModal";
import { DeleteAccountModal } from "./settings/DeleteAccountModal";
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
      {modalType === "changePasswordModal" ? (
        <ChangePasswordModal
          {...(modalProps as unknown as ChangePasswordModalProps)}
        />
      ) : null}
      {modalType === "deleteAccountModal" ? (
        <DeleteAccountModal
          {...(modalProps as unknown as DeleteAccountModalProps)}
        />
      ) : null}
      {modalType === "deleteCategoryModal" ? (
        <DeleteCategoryModal
          {...(modalProps as unknown as DeleteCategoryModalProps)}
        />
      ) : null}
      {modalType === "deleteScheduleModal" ? (
        <DeleteScheduleModal
          {...(modalProps as unknown as DeleteScheduleModalProps)}
        />
      ) : null}
    </ModalBackground>
  );
}
