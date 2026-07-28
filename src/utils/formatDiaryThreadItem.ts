import dayjs from "dayjs";

import type { ThreadItem } from "@/src/types/calendar/diaryPanel.types";
import type { Diary } from "@/src/types/diaries/diary.types";
import { isDiaryUnread } from "@/src/utils/isDiaryUnread";

// 일기 목록 응답을 스레드 탭이 쓰는 형태로 매핑하는 함수
export function formatDiaryThreadItem(diary: Diary): ThreadItem {
  return {
    diaryId: diary.diaryId,
    date: dayjs(diary.createdAt).format("YYYY-MM-DD"),
    summary: diary.aiSummary ?? "AI 일기 요약을 받지 못했어요",
    title: diary.diaryTitle,
    content: diary.content,
    images: diary.images ?? [],
    isUnread: isDiaryUnread(diary),
  };
}
