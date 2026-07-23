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
