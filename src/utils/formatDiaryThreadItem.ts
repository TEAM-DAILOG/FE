import dayjs from "dayjs";

import type { ThreadItem } from "@/src/types/calendar/diaryPanel.types";
import type { Diary } from "@/src/types/diaries/diary.types";

// 일기 목록 응답을 스레드 탭이 쓰는 형태로 매핑하는 함수
export function formatDiaryThreadItem(diary: Diary): ThreadItem {
  return {
    diaryId: diary.diaryId,
    date: dayjs(diary.createdAt).format("YYYY-MM-DD"),
    summary: diary.aiSummary ?? diary.diaryTitle,
    title: diary.diaryTitle,
    content: diary.content,
    images: diary.images ?? [],
  };
}
