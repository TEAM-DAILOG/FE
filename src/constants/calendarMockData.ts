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

export function buildMockSchedules(): MockScheduleItem[] {
  const today = dayjs();
  const at = (offsetDays: number) =>
    today.add(offsetDays, "day").format("YYYY-MM-DD");

  return [
    {
      id: "1",
      date: at(-10),
      categoryColor: "blue",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "2",
      date: at(-10),
      categoryColor: "green",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "3",
      date: at(-3),
      categoryColor: "brown",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "4",
      date: at(-3),
      categoryColor: "purple",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "5",
      date: at(5),
      categoryColor: "pink",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "6",
      date: at(1),
      categoryColor: "blue",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "7",
      date: at(1),
      categoryColor: "green",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "8",
      date: at(1),
      categoryColor: "purple",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
  ];
}

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

const MOCK_DIARY_TITLE = "일기 제목";
const MOCK_DIARY_CONTENT =
  "Lorem ipsum dolor sit amet consectetur. Nulla non pellentesque eu mattis nunc. Egestas mattis nunc pharetra egestas.";

function buildThreadItem(
  date: string,
  imageCount: number,
  isUnread?: boolean
): ThreadItem {
  return {
    date,
    summary: "AI 일기 요약 한 줄",
    title: MOCK_DIARY_TITLE,
    content: MOCK_DIARY_CONTENT,
    imageCount,
    isUnread,
  };
}

export function buildMockThreadItems(month: string): ThreadItem[] {
  const base = dayjs(month).startOf("month");
  return [
    buildThreadItem(base.date(28).format("YYYY-MM-DD"), 3, true),
    buildThreadItem(base.date(21).format("YYYY-MM-DD"), 0, true),
    buildThreadItem(base.date(17).format("YYYY-MM-DD"), 1),
    buildThreadItem(base.date(13).format("YYYY-MM-DD"), 2),
    buildThreadItem(base.date(9).format("YYYY-MM-DD"), 0),
    buildThreadItem(base.date(5).format("YYYY-MM-DD"), 3),
    buildThreadItem(base.date(2).format("YYYY-MM-DD"), 1),
  ];
}

export function buildMockPastThreadItems(month: string): ThreadItem[] {
  const items: ThreadItem[] = [];

  for (let monthsAgo = 1; monthsAgo <= 2; monthsAgo++) {
    const base = dayjs(month).subtract(monthsAgo, "month").startOf("month");
    items.push(
      buildThreadItem(base.date(25).format("YYYY-MM-DD"), 2),
      buildThreadItem(base.date(14).format("YYYY-MM-DD"), 0),
      buildThreadItem(base.date(4).format("YYYY-MM-DD"), 1)
    );
  }

  return items;
}

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
