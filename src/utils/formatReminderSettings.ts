import type { Period, TimeWheelValue, Weekday } from "@/src/components/alarm";
import type {
  GetReminderSettingsResponse,
  ReminderDay,
} from "@/src/types/alarm/alarm.types";

const REMINDER_DAY_TO_WEEKDAY: Record<ReminderDay, Weekday> = {
  MON: "mon",
  TUE: "tue",
  WED: "wed",
  THU: "thu",
  FRI: "fri",
  SAT: "sat",
  SUN: "sun",
};

// time(24시간제)를 TimeWheelPicker(오전/오후,시,분) 형태로 변환
function toTimeWheelValue(time: string): TimeWheelValue {
  const [hour24, minute] = time.split(":").map(Number);
  const period: Period = hour24 < 12 ? "am" : "pm";
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return { period, hour, minute };
}

// 리마인드 알림 설정 조회 응답을 일기 작성 알림 UI에 쓰는 형태로 매핑
export function formatReminderSettings(response: GetReminderSettingsResponse) {
  return {
    selectedDays: response.days.map((day) => REMINDER_DAY_TO_WEEKDAY[day]),
    time: toTimeWheelValue(response.time),
  };
}
