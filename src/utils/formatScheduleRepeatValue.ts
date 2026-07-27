import { WEEKDAYS } from "@/src/constants";
import type { ScheduleRepeatValue } from "@/src/types/modals/datepickerModal.types";
import type { ScheduleRepeatType } from "@/src/types/schedules/schedule.types";

type FormatScheduleRepeatValueInput = {
  repeatType?: ScheduleRepeatType;
  repeatStartDate?: string | null;
  repeatEndDate?: string | null;
  repeatDays?: string | null;
  repeatDates?: string[];
  isLastDayOfMonth?: boolean;
  date: string;
};

// 일정 목록 API 응답의 반복 정보를 수정 화면 초기값(ScheduleRepeatValue)으로 변환하는 함수
export function formatScheduleRepeatValue({
  repeatType,
  repeatStartDate,
  repeatEndDate,
  repeatDays,
  repeatDates,
  isLastDayOfMonth,
  date,
}: FormatScheduleRepeatValueInput): ScheduleRepeatValue {
  if (repeatType === "MULTIPLE") {
    return {
      mode: "multi",
      dates: repeatDates?.length ? repeatDates : [date],
    };
  }

  if (!repeatStartDate || !repeatEndDate) return { mode: "none" };

  switch (repeatType) {
    case "PERIOD":
      return {
        mode: "range",
        startDate: repeatStartDate,
        endDate: repeatEndDate,
      };

    case "WEEKLY": {
      const weekdays = (repeatDays ?? "")
        .split(",")
        .filter(Boolean)
        .map((code) => WEEKDAYS.findIndex((weekday) => weekday.code === code))
        .filter((index) => index !== -1);

      return {
        mode: "weekly",
        weekdays,
        startDate: repeatStartDate,
        endDate: repeatEndDate,
      };
    }

    case "MONTHLY":
      return {
        mode: "monthly",
        startDate: repeatStartDate,
        endDate: repeatEndDate,
        isLastDayOfMonth: isLastDayOfMonth ?? false,
      };

    case "YEARLY":
      return {
        mode: "yearly",
        startDate: repeatStartDate,
        endDate: repeatEndDate,
      };

    default:
      return { mode: "none" };
  }
}
