import { WEEKDAYS } from "@/src/constants";
import type { ScheduleRepeatValue } from "@/src/types/modals/datepickerModal.types";
import type { CreateScheduleParams } from "@/src/types/schedules/schedule.types";

type FormatCreateScheduleParamsInput = {
  categoryId: number;
  title: string;
  content: string;
  date: string;
  repeat: ScheduleRepeatValue;
};

// 데이트피커에서 만들어진 반복 설정과 폼 입력값을 일정 등록 요청 파라미터로 변환하는 함수
export function formatCreateScheduleParams({
  categoryId,
  title,
  content,
  date,
  repeat,
}: FormatCreateScheduleParamsInput): CreateScheduleParams {
  const base = {
    categoryId,
    title: title.trim(),
    content: content.trim() || undefined,
  };

  switch (repeat.mode) {
    case "none":
      return { ...base, repeatType: "NONE", date };

    case "multi":
      return { ...base, repeatType: "MULTIPLE", repeatDates: repeat.dates };

    case "range":
      return {
        ...base,
        repeatType: "PERIOD",
        repeatStartDate: repeat.startDate,
        repeatEndDate: repeat.endDate,
      };

    case "weekly":
      return {
        ...base,
        repeatType: "WEEKLY",
        repeatStartDate: repeat.startDate,
        repeatEndDate: repeat.endDate,
        repeatDays: repeat.weekdays.map((day) => WEEKDAYS[day].code).join(","),
      };

    case "monthly":
      return {
        ...base,
        repeatType: "MONTHLY",
        repeatStartDate: repeat.startDate,
        repeatEndDate: repeat.endDate,
      };

    case "yearly":
      return {
        ...base,
        repeatType: "YEARLY",
        repeatStartDate: repeat.startDate,
        repeatEndDate: repeat.endDate,
      };
  }
}
