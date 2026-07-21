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
