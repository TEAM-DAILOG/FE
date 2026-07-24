import dayjs from "dayjs";

import type { UpcomingSchedule } from "@/src/types/calendar/schedulePanel.types";
import type { Schedule } from "@/src/types/schedules/schedule.types";

// 전체/가까운 일정 목록 응답을 일정 패널이 쓰는 형태로 매핑하는 함수
export function formatScheduleItem(schedule: Schedule): UpcomingSchedule {
  return {
    id: String(schedule.scheduleId),
    date: dayjs(schedule.date).format("YYYY-MM-DD"),
    categoryLabel: schedule.category.categoryName,
    categoryColor: schedule.category.categoryColor,
    description: schedule.title,
    checked: schedule.isCompleted,
  };
}
