import { getThreadMonthKey } from "@/src/utils";
import type {
  ThreadGroup,
  ThreadItem,
} from "@/src/types/calendar/diaryPanel.types";

// 일기 스레드 아이템을 월 단위로 묶는 함수
export function groupThreadItemsByMonth(items: ThreadItem[]): ThreadGroup[] {
  const groups: ThreadGroup[] = [];

  for (const item of items) {
    const monthKey = getThreadMonthKey(item.date);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup?.monthKey === monthKey) {
      lastGroup.items.push(item);
    } else {
      groups.push({ monthKey, date: item.date, items: [item] });
    }
  }

  return groups;
}
