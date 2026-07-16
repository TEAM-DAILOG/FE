import dayjs from "dayjs";

import { WEEKDAY_LABELS } from "@/src/constants";
import type {
  DatePickerCell,
  ScheduleRepeatValue,
} from "@/src/types/modals/datepickerModal.types";

// YYYY.MM.DD 형식으로 날짜를 포맷하는 함수
export function formatDate(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

const WEEKS_PER_GRID = 6;
const DAYS_PER_WEEK = 7;
const GRID_CELL_COUNT = WEEKS_PER_GRID * DAYS_PER_WEEK;

// 월 기준일(monthAnchor)을 기준으로 일요일 시작 6행 x 7열(42칸) 캘린더 그리드를 생성하는 함수
export function buildCalendarGrid(monthAnchor: string): DatePickerCell[] {
  const startOfMonth = dayjs(monthAnchor).startOf("month");
  const gridStart = startOfMonth.subtract(startOfMonth.day(), "day");

  return Array.from({ length: GRID_CELL_COUNT }, (_, index) => {
    const current = gridStart.add(index, "day");
    return {
      date: current.format("YYYY-MM-DD"),
      day: current.date(),
      isCurrentMonth: current.month() === startOfMonth.month(),
    };
  });
}

// 42칸의 날짜 배열을 7개씩 끊어 6주 배열로 변환하는 함수
export function chunkIntoWeeks(cells: DatePickerCell[]): DatePickerCell[][] {
  const weeks: DatePickerCell[][] = [];
  for (let i = 0; i < cells.length; i += DAYS_PER_WEEK) {
    weeks.push(cells.slice(i, i + DAYS_PER_WEEK));
  }
  return weeks;
}

// ISO 날짜 문자열(YYYY-MM-DD)을 YYYY.MM.DD 형식으로 포맷하는 함수
export function formatScheduleDate(dateStr: string) {
  return dayjs(dateStr).format("YYYY.MM.DD");
}

// 요일 배열(weekdays)을 "월, 수요일"과 같은 문자열로 포맷하는 함수
export function formatWeekdays(weekdays: number[]) {
  const sorted = [...weekdays].sort((a, b) => a - b);
  const labels = sorted.map((day) => WEEKDAY_LABELS[day]);

  return labels
    .map((label, index) =>
      index === labels.length - 1 ? `${label}요일` : label
    )
    .join(", ");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 이메일 형식이 유효한지 검사하는 함수
export function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

// 비밀번호에 영문, 숫자, 특수문자가 모두 포함되어 있는지 검사하는 함수
export function hasRequiredCharacters(password: string) {
  return (
    /[A-Za-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

// 비밀번호 길이가 8자 이상 16자 이하인지 검사하는 함수
export function hasValidLength(password: string) {
  return password.length >= 8 && password.length <= 16;
}

// 초 단위 시간을 mm:ss 형식 문자열로 변환하는 함수
export function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

// 반복 설정값(ScheduleRepeatValue)을 화면에 보여줄 한 줄 요약 문자열로 변환하는 함수
export function formatScheduleRepeatSummary(
  value: ScheduleRepeatValue
): string {
  switch (value.mode) {
    case "none":
      return "없음";

    case "multi": {
      const [first, ...rest] = value.dates;
      if (!first) return "없음";
      return rest.length > 0
        ? `다중 | ${formatScheduleDate(first)} 외 ${rest.length}`
        : `다중 | ${formatScheduleDate(first)}`;
    }

    case "range":
      return `기간 | ${formatScheduleDate(value.startDate)} ~ ${formatScheduleDate(value.endDate)}`;

    case "weekly":
      return value.weekdays.length > 0
        ? `매주 | ${formatWeekdays(value.weekdays)}`
        : "없음";

    case "monthly":
      return `매월 | ${dayjs(value.startDate).date()}일`;

    case "yearly":
      return `매년 | ${dayjs(value.startDate).month() + 1}월 ${dayjs(
        value.startDate
      ).date()}일`;

    default:
      return "없음";
  }
}
