import type { DatePickerTabKey } from "@/src/types/modals/datepickerModal.types";
import type { WeekdayCode } from "@/src/types/schedules/schedule.types";

// 일요일(0)부터 토요일(6)까지의 요일 코드/라벨
export const WEEKDAYS: { code: WeekdayCode; label: string }[] = [
  { code: "SUN", label: "일" },
  { code: "MON", label: "월" },
  { code: "TUE", label: "화" },
  { code: "WED", label: "수" },
  { code: "THU", label: "목" },
  { code: "FRI", label: "금" },
  { code: "SAT", label: "토" },
];

// 데이트피커 상단 탭(기본/다중일정/기간반복/반복일정) 목록
export const DATE_PICKER_TABS: { key: DatePickerTabKey; label: string }[] = [
  { key: "basic", label: "기본" },
  { key: "multi", label: "다중일정" },
  { key: "range", label: "기간반복" },
  { key: "recurring", label: "반복일정" },
];

// 반복일정 탭에서 고를 수 있는 반복 유형(매주/매월/매년) 목록
export const REPEAT_TYPE_OPTIONS: {
  key: "weekly" | "monthly" | "yearly";
  label: string;
}[] = [
  { key: "weekly", label: "매주" },
  { key: "monthly", label: "매월" },
  { key: "yearly", label: "매년" },
];
