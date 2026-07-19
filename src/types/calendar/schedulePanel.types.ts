import type { CategoryColor } from "@/src/types/categories/category.types";

export type UpcomingSchedule = {
  id: string;
  date: string; // YYYY-MM-DD
  categoryLabel: string;
  categoryColor: CategoryColor;
  description: string;
  checked: boolean;
};
