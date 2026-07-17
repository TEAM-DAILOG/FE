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

// 일정 날짜(date)를 D-n / 월.일 / 요일 조각으로 분리하는 함수
export function getScheduleDday(date: string) {
  const diff = dayjs(date).startOf("day").diff(dayjs().startOf("day"), "day");
  const ddayLabel = diff <= 0 ? "D-DAY" : `D-${diff}`;
  const dateLabel = dayjs(date).format("M.D");
  const weekdayLabel = `(${WEEKDAY_LABELS[dayjs(date).day()]})`;

  return { ddayLabel, dateLabel, weekdayLabel };
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
