import type { CategoryColor } from "@/src/types/categories/category.types";

export type CalendarMode = "schedule" | "diary";

export type CalendarDayInfo = {
  categoryColors?: CategoryColor[];
  hasDiary?: boolean;
};
