// 알림 설정 조회 API 응답 타입
export interface GetAlarmSettingsResponse {
  alarmId: number;
  isPush: boolean;
  isDiary: boolean;
  isDiaryReply: boolean;
}

// 알림 설정 수정 API 요청 타입
export interface PatchAlarmSettingsParams {
  isPush?: boolean;
  isDiary?: boolean;
  isDiaryReply?: boolean;
}

// 알림 설정 수정 API 응답 타입
export type PatchAlarmSettingsResponse = GetAlarmSettingsResponse;

export type ReminderDay = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

// 리마인드 알림 설정 조회 API 응답 타입
export interface GetReminderSettingsResponse {
  reminderId: number;
  days: ReminderDay[];
  time: string;
}

// 리마인드 알림 설정 수정 API 요청 타입
export interface PatchReminderSettingsParams {
  days: ReminderDay[];
  time: string;
}

// 리마인드 알림 설정 수정 API 응답 타입
export type PatchReminderSettingsResponse = GetReminderSettingsResponse;

export type DeviceType = "IOS" | "ANDROID";

// FCM 토큰 등록 API 요청 타입
export interface RegisterPushTokenParams {
  fcmToken: string;
  deviceType: DeviceType;
}

// FCM 토큰 등록 API 응답 타입
export interface RegisterPushTokenResponse {
  tokenId: number;
  fcmToken: string;
  deviceType: DeviceType;
}
