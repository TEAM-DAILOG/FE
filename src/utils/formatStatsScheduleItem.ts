import dayjs from "dayjs";

import type { ScheduleListGroupEntry } from "@/src/components/statistics";
import type { StatsSchedule } from "@/src/types/stats/stats.types";

// 통계 화면(미완료/완료 일정) 응답을 일정 목록 UI가 쓰는 형태로 매핑하는 함수
export function formatStatsScheduleItem(
  schedule: StatsSchedule
): ScheduleListGroupEntry {
  return {
    id: String(schedule.scheduleId),
    date: dayjs(schedule.date).format("YYYY.MM.DD"),
    categoryLabel: schedule.categoryName,
    categoryColor: schedule.categoryColor,
    description: schedule.title,
  };
}
