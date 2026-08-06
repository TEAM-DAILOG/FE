import type { Period, TimeWheelValue, Weekday } from "@/src/components/alarm";
import type { ReminderDay } from "@/src/types/alarm/alarm.types";

const REMINDER_DAY_TO_WEEKDAY: Record<ReminderDay, Weekday> = {
  MON: "mon",
  TUE: "tue",
  WED: "wed",
  THU: "thu",
  FRI: "fri",
  SAT: "sat",
  SUN: "sun",
};

const WEEKDAY_TO_REMINDER_DAY: Record<Weekday, ReminderDay> = {
  mon: "MON",
  tue: "TUE",
  wed: "WED",
  thu: "THU",
  fri: "FRI",
  sat: "SAT",
  sun: "SUN",
};

export function toWeekday(day: ReminderDay): Weekday {
  return REMINDER_DAY_TO_WEEKDAY[day];
}

export function toReminderDay(day: Weekday): ReminderDay {
  return WEEKDAY_TO_REMINDER_DAY[day];
}

// "HH:mm" -> TimeWheelValue(오전/오후, 12시간제)
export function toTimeWheelValue(time: string): TimeWheelValue {
  const [hour24, minute] = time.split(":").map(Number);
  const period: Period = hour24 < 12 ? "am" : "pm";
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return { period, hour, minute };
}

// TimeWheelValue(오전/오후, 12시간제) -> "HH:mm:ss+09:00"
export function toReminderTimeString(time: TimeWheelValue): string {
  const hour24 = toHour24(time.period, time.hour);
  const hh = String(hour24).padStart(2, "0");
  const mm = String(time.minute).padStart(2, "0");

  return `${hh}:${mm}:00+09:00`;
}

// 12시간제 -> 24시간제
function toHour24(period: Period, hour: number): number {
  if (period === "am") {
    return hour === 12 ? 0 : hour;
  }
  return hour === 12 ? 12 : hour + 12;
}
