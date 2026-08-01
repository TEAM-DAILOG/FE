import type { CategoryBarChartItem } from "@/src/components/statistics/CategoryBarChart";
import type {
  StatsDetailCategory,
  StatsDetailCategoryRank,
} from "@/src/types/stats/stats.types";
import { formatScheduleDate } from "@/src/utils";

// 카테고리별 사용 순위 항목을 카테고리 막대그래프가 쓰는 형태로 변환
export function toCategoryBarChartItem(
  category: StatsDetailCategoryRank
): CategoryBarChartItem {
  return {
    id: String(category.categoryId),
    label: category.categoryName,
    count: category.count,
    color: category.categoryColor,
    schedules: category.schedules.map((schedule) => ({
      id: String(schedule.scheduleId),
      name: schedule.title,
      date: formatScheduleDate(schedule.date),
    })),
  };
}

// 가장 많이 사용한 카테고리를 카드가 쓰는 형태로 변환
export function toTopCategory(category: StatsDetailCategory | null) {
  if (!category) return null;

  return { label: category.categoryName, color: category.categoryColor };
}
