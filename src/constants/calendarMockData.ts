import dayjs from "dayjs";

import type { ThreadItem } from "@/src/types/calendar/diaryPanel.types";
import type { UpcomingSchedule } from "@/src/types/calendar/schedulePanel.types";
import type { CategoryColor } from "@/src/types/categories/category.types";

export type MockScheduleItem = {
  id: string;
  date: string; // YYYY-MM-DD
  categoryColor: CategoryColor;
  categoryLabel: string;
  description: string;
  checked: boolean;
};

const CATEGORY_HEX_COLORS: Record<CategoryColor, string> = {
  blue: "#6A92AF",
  brown: "#C49C64",
  green: "#79A659",
  purple: "#A381BB",
  pink: "#BD7593",
};

// 일정 캘린더의 날짜별 점 표시와 "가까운 일정" 목록이 같은 원본에서 파생되도록 하나의 리스트로 관리
export function buildMockSchedules(month: string): MockScheduleItem[] {
  const base = dayjs(month).startOf("month");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

  return [
    {
      id: "1",
      date: base.date(3).format("YYYY-MM-DD"),
      categoryColor: "blue",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "2",
      date: base.date(3).format("YYYY-MM-DD"),
      categoryColor: "green",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "3",
      date: base.date(10).format("YYYY-MM-DD"),
      categoryColor: "brown",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "4",
      date: base.date(10).format("YYYY-MM-DD"),
      categoryColor: "purple",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "5",
      date: base.date(18).format("YYYY-MM-DD"),
      categoryColor: "pink",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "6",
      date: tomorrow,
      categoryColor: "blue",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "7",
      date: tomorrow,
      categoryColor: "green",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "8",
      date: tomorrow,
      categoryColor: "purple",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
  ];
}

// 일정 리스트 중 해당 달에 속하는 항목만 날짜별 카테고리 색상 목록으로 변환 (캘린더 그리드 점 표시용)
export function buildMockScheduleDays(
  schedules: MockScheduleItem[],
  month: string
): Record<string, CategoryColor[]> {
  const start = dayjs(month).startOf("month");
  const end = dayjs(month).endOf("month");
  const days: Record<string, CategoryColor[]> = {};

  for (const schedule of schedules) {
    const date = dayjs(schedule.date);
    if (date.isBefore(start, "day") || date.isAfter(end, "day")) continue;

    const key = date.format("YYYY-MM-DD");
    days[key] = [...(days[key] ?? []), schedule.categoryColor];
  }

  return days;
}

// 일정 리스트를 "가까운 일정" 패널이 쓰는 형태(hex 색상)로 변환
export function buildMockUpcomingSchedules(
  schedules: MockScheduleItem[]
): UpcomingSchedule[] {
  return schedules.map((schedule) => ({
    id: schedule.id,
    date: schedule.date,
    categoryLabel: schedule.categoryLabel,
    categoryColor: CATEGORY_HEX_COLORS[schedule.categoryColor],
    description: schedule.description,
    checked: schedule.checked,
  }));
}

export function buildMockThreadItems(month: string): ThreadItem[] {
  const base = dayjs(month).startOf("month");
  return [
    {
      date: base.date(28).format("YYYY-MM-DD"),
      summary: "AI 일기 요약 한 줄",
      isUnread: true,
    },
    {
      date: base.date(21).format("YYYY-MM-DD"),
      summary: "AI 일기 요약 한 줄",
      isUnread: true,
    },
    {
      date: base.date(17).format("YYYY-MM-DD"),
      summary: "AI 일기 요약 한 줄",
    },
    {
      date: base.date(13).format("YYYY-MM-DD"),
      summary: "AI 일기 요약 한 줄",
    },
    {
      date: base.date(9).format("YYYY-MM-DD"),
      summary: "AI 일기 요약 한 줄",
    },
    {
      date: base.date(5).format("YYYY-MM-DD"),
      summary: "AI 일기 요약 한 줄",
    },
    {
      date: base.date(2).format("YYYY-MM-DD"),
      summary: "AI 일기 요약 한 줄",
    },
  ];
}

// 과거 달 스레드는 API 페이지네이션 연동 전까지 최근 2개월치 mock으로 대체
export function buildMockPastThreadItems(month: string): ThreadItem[] {
  const items: ThreadItem[] = [];

  for (let monthsAgo = 1; monthsAgo <= 2; monthsAgo++) {
    const base = dayjs(month).subtract(monthsAgo, "month").startOf("month");
    items.push(
      {
        date: base.date(25).format("YYYY-MM-DD"),
        summary: "AI 일기 요약 한 줄",
      },
      {
        date: base.date(14).format("YYYY-MM-DD"),
        summary: "AI 일기 요약 한 줄",
      },
      {
        date: base.date(4).format("YYYY-MM-DD"),
        summary: "AI 일기 요약 한 줄",
      }
    );
  }

  return items;
}

// 스레드(작성된 일기) 목록에 있는 날짜만큼 일기 캘린더에 초록 아이콘으로 표시되도록 같은 리스트에서 파생
export function buildMockDiaryDays(
  threadItems: ThreadItem[],
  month: string
): Record<string, boolean> {
  const start = dayjs(month).startOf("month");
  const end = dayjs(month).endOf("month");
  const days: Record<string, boolean> = {};

  for (const item of threadItems) {
    const date = dayjs(item.date);
    if (date.isBefore(start, "day") || date.isAfter(end, "day")) continue;

    days[date.format("YYYY-MM-DD")] = true;
  }

  return days;
}
