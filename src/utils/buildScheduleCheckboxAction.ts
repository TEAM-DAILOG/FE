import type { ScheduleItemAction } from "@/src/components/common/ScheduleItem";
import type { UpcomingSchedule } from "@/src/types/calendar/schedulePanel.types";

// UpcomingSchedule 데이터를 ScheduleItem의 체크박스 액션으로 만드는 함수
export function buildScheduleCheckboxAction(
  schedule: UpcomingSchedule,
  { checked, onToggle }: { checked: boolean; onToggle: () => void }
): ScheduleItemAction {
  return {
    type: "checkbox",
    id: schedule.id,
    date: schedule.date,
    groupId: schedule.groupId,
    memo: schedule.memo,
    repeatType: schedule.repeatType,
    repeatStartDate: schedule.repeatStartDate,
    repeatEndDate: schedule.repeatEndDate,
    repeatDays: schedule.repeatDays,
    repeatDates: schedule.repeatDates,
    isLastDayOfMonth: schedule.isLastDayOfMonth,
    checked,
    onToggle,
  };
}
