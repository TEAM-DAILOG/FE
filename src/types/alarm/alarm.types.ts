// 알림 설정 조회 API 응답 타입
export interface GetAlarmSettingsResponse {
  alarmId: number;
  isPush: boolean;
  isDiary: boolean;
  isDiaryReply: boolean;
}
