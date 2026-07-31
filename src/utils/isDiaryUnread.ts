import type { Diary } from "@/src/types/diaries/diary.types";

// AI가 아직 요약하지 않은 일기인지 여부로 안읽음 상태를 판단하는 함수
export function isDiaryUnread(diary: Diary) {
  return diary.aiSummary === null;
}
