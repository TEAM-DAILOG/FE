export type DeviceType = "IOS" | "ANDROID";

export type LoginParams = {
  email: string;
  password: string;
  deviceId?: string | null;
  deviceType?: DeviceType | null;
};

export type LoginUser = {
  userId: number;
  email: string | null;
  name: string;
  profileImageUrl: string | null;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: LoginUser;
};

export type ReissueAccessTokenResponse = {
  accessToken: string;
};

export type SignupEmailParams = {
  email: string;
};

export type CheckSignupEmailResponse = {
  isAvailable: boolean;
};

export type SendSignupEmailVerificationResponse = {
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
};

export type VerifySignupEmailCodeParams = {
  email: string;
  code: string;
};

export type VerifySignupEmailCodeResponse = {
  emailVerificationToken: string;
  expiresInSeconds: number;
};

export type SignupParams = {
  email: string;
  emailVerificationToken: string;
  password: string;
  name: string;
  profileImage?: SignupProfileImage | null;
  termsOfServiceAgreed: boolean;
  privacyPolicyAgreed: boolean;
  pushNotificationAgreed?: boolean | null;
};

export type SignupProfileImage = {
  uri: string;
  name: string;
  type: string;
};

export type SignupResponse = {
  userId: number;
  email: string | null;
  name: string;
  profileImageUrl: string | null;
};

export interface CheckPasswordParams {
  currentPassword: string;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordEmailParams {
  email: string;
}

export interface SendResetPasswordEmailResponse {
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
}

export interface VerifyResetPasswordEmailParams {
  email: string;
  code: string;
}

export interface VerifyResetPasswordEmailResponse {
  passwordResetToken: string;
  expiresInSeconds: number;
}

export interface ResetPasswordParams {
  email: string;
  passwordResetToken: string;
  newPassword: string;
}
