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
    memo: schedule.content,
    checked: schedule.isCompleted,
    groupId: schedule.groupId,
    repeatType: schedule.repeatType,
    repeatStartDate: schedule.repeatStartDate
      ? dayjs(schedule.repeatStartDate).format("YYYY-MM-DD")
      : null,
    repeatEndDate: schedule.repeatEndDate
      ? dayjs(schedule.repeatEndDate).format("YYYY-MM-DD")
      : null,
    repeatDays: schedule.repeatDays,
    isLastDayOfMonth: schedule.isLastDayOfMonth,
  };
}
