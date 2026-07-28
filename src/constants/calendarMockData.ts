import dayjs from "dayjs";

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

export function buildMockSchedules(): MockScheduleItem[] {
  const today = dayjs();
  const at = (offsetDays: number) =>
    today.add(offsetDays, "day").format("YYYY-MM-DD");

  return [
    {
      id: "1",
      date: at(-10),
      categoryColor: "BLUE",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "2",
      date: at(-10),
      categoryColor: "GREEN",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "3",
      date: at(-3),
      categoryColor: "BROWN",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "4",
      date: at(-3),
      categoryColor: "PURPLE",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "5",
      date: at(5),
      categoryColor: "PINK",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "6",
      date: at(1),
      categoryColor: "BLUE",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "7",
      date: at(1),
      categoryColor: "GREEN",
      categoryLabel: "CATEGORY",
      description: "Lorem ipsum dolor sit amet consectetur.",
      checked: false,
    },
    {
      id: "8",
      date: at(1),
      categoryColor: "PURPLE",
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
    categoryColor: schedule.categoryColor,
    description: schedule.description,
    memo: null,
    checked: schedule.checked,
    groupId: null,
    repeatType: "NONE",
    repeatStartDate: null,
    repeatEndDate: null,
    repeatDays: null,
    repeatDates: null,
    isLastDayOfMonth: false,
  }));
}
