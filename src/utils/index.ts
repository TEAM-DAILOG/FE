import dayjs from "dayjs";

import { WEEKDAY_LABELS } from "@/src/constants";
import type {
  DatePickerCell,
  ScheduleRepeatSummary,
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

// 반복 설정값(ScheduleRepeatValue)을 화면에 보여줄 모드/구분선/컨텐츠 조각으로 변환하는 함수
export function getScheduleRepeatSummary(
  value: ScheduleRepeatValue
): ScheduleRepeatSummary | null {
  switch (value.mode) {
    case "none":
      return null;

    case "multi": {
      const [first, ...rest] = value.dates;
      if (!first) return null;
      return {
        mode: "다중",
        parts:
          rest.length > 0
            ? [
                { type: "date", text: formatScheduleDate(first) },
                { type: "etc", text: `외 ${rest.length}` },
              ]
            : [{ type: "date", text: formatScheduleDate(first) }],
      };
    }

    case "range":
      return {
        mode: "기간",
        parts: [
          { type: "date", text: formatScheduleDate(value.startDate) },
          { type: "etc", text: "~" },
          { type: "date", text: formatScheduleDate(value.endDate) },
        ],
      };

    case "weekly":
      return value.weekdays.length > 0
        ? {
            mode: "매주",
            parts: [{ type: "etc", text: formatWeekdays(value.weekdays) }],
          }
        : null;

    case "monthly":
      return {
        mode: "매월",
        parts: [{ type: "etc", text: `${dayjs(value.startDate).date()}일` }],
      };

    case "yearly":
      return {
        mode: "매년",
        parts: [
          {
            type: "etc",
            text: `${dayjs(value.startDate).month() + 1}월 ${dayjs(
              value.startDate
            ).date()}일`,
          },
        ],
      };

    default:
      return null;
  }
}
