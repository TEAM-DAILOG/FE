import type { TimeWheelValue, Weekday } from "@/src/components/alarm";
import {
  toReminderDay,
  toReminderTimeString,
  toTimeWheelValue,
  toWeekday,
} from "@/src/utils/formatReminderAlarm";
import type {
  GetReminderSettingsResponse,
  PatchReminderSettingsParams,
} from "./alarm.types";

// 리마인드 알림 설정 조회 응답을 일기 작성 알림 UI에서 쓰는 형태로 매핑
export function formatReminderSettings(response: GetReminderSettingsResponse) {
  return {
    selectedDays: response.days.map(toWeekday),
    time: toTimeWheelValue(response.time),
  };
}

// 일기 작성 알림 화면 UI를 리마인드 알림 설정 수정 요청으로 변환
export function createPatchReminderSettingsParams(
  selectedDays: Weekday[],
  time: TimeWheelValue
): PatchReminderSettingsParams {
  return {
    days: selectedDays.map(toReminderDay),
    time: toReminderTimeString(time),
  };
}
