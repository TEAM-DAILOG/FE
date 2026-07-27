import type { CategoryColor } from "@/src/types/categories/category.types";
import type { ScheduleRepeatType } from "@/src/types/schedules/schedule.types";

export type UpcomingSchedule = {
  id: string;
  date: string; // YYYY-MM-DD
  categoryLabel: string;
  categoryColor: CategoryColor;
  description: string;
  memo: string | null;
  checked: boolean;
  groupId: number | null;
  repeatType: ScheduleRepeatType;
  repeatStartDate: string | null;
  repeatEndDate: string | null;
  repeatDays: string | null;
  repeatDates: string[] | null;
  isLastDayOfMonth: boolean;
};
