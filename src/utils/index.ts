import dayjs from "dayjs";

import { WEEKDAYS } from "@/src/constants";
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

// 일정 날짜(date)를 D-n / 월.일 / 요일 조각으로 분리하는 함수
export function getScheduleDday(date: string) {
  const diff = dayjs(date).startOf("day").diff(dayjs().startOf("day"), "day");
  const ddayLabel = diff <= 0 ? "D-DAY" : `D-${diff}`;
  const dateLabel = dayjs(date).format("M.D");
  const weekdayLabel = `(${WEEKDAYS[dayjs(date).day()].label})`;

  return { ddayLabel, dateLabel, weekdayLabel };
}

// 일기 스레드를 월 단위로 묶기 위한 고유 키(YYYY-MM)를 생성하는 함수
export function getThreadMonthKey(date: string | null) {
  return date ? dayjs(date).format("YYYY-MM") : "미정";
}

// 일기 스레드의 날짜(date)를 년(YYYY년)과 월(M월) 레이블 조각으로 분리하는 함수
export function getThreadMonthLabelParts(date: string | null) {
  if (!date) return { yearLabel: "", monthLabel: "날짜 미정" };

  const yearLabel = dayjs(date).format("YYYY년");
  const monthLabel = dayjs(date).format("M월");

  return { yearLabel, monthLabel };
}

// 일기 스레드의 날짜(date)를 일(day) 숫자와 (요일) 레이블 조각으로 분리하는 함수
export function getThreadDateParts(date: string | null) {
  if (!date) return { dayLabel: "-", weekdayLabel: "" };

  const dayLabel = dayjs(date).format("D");
  const weekdayLabel = `(${WEEKDAYS[dayjs(date).day()].label})`;

  return { dayLabel, weekdayLabel };
}

// 요일 배열(weekdays)을 "월, 수요일"과 같은 문자열로 포맷하는 함수
export function formatWeekdays(weekdays: number[]) {
  const sorted = [...weekdays].sort((a, b) => a - b);
  const labels = sorted.map((day) => WEEKDAYS[day].label);

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
        parts: [
          {
            type: "etc",
            text: value.isLastDayOfMonth
              ? "말일"
              : `${dayjs(value.startDate).date()}일`,
          },
        ],
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

// 매월/매년 반복은 최소 한 번은 반복돼야 하므로, 종료일로 고를 수 있는 가장 이른 날짜를 계산하는 함수
export function getMinRecurEndDate(
  repeatType: "weekly" | "monthly" | "yearly",
  startDate: string
) {
  if (repeatType === "yearly") {
    return dayjs(startDate).add(1, "year").format("YYYY-MM-DD");
  }
  if (repeatType === "monthly") {
    return dayjs(startDate).add(1, "month").format("YYYY-MM-DD");
  }
  return startDate;
}
