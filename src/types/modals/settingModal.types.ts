export type EditProfileModalResult = {
  email: string;
  nickname: string;
  photoUri: string | null;
};

export type EditProfileModalProps = {
  initialEmail: string;
  initialNickname: string;
  onSave: (result: EditProfileModalResult) => void;
};

export type ChangePasswordModalResult = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordModalProps = {
  onSave: (result: ChangePasswordModalResult) => void;
};
