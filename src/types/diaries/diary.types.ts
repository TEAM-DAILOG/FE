// 일기 작성 유형 ENUM
export type DiaryType = "FREE" | "QUESTION";

// 일기 아이템 타입
export type Diary = {
  diaryId: number;
  userId: number;
  diaryType: DiaryType;
  diaryTitle: string;
  content: string;
  aiSummary: string | null;
  date: string | null;
  images: string[];
};

// 일기 목록 조회 요청 응답값 타입
export type GetDiariesResponse = Diary[];

// 일기 상세 조회 요청 응답값 타입
export type GetDiaryDetailResponse = Diary & {
  questionContent: string | null;
};

// 일기 삭제 요청 응답값 타입
export type DeleteDiaryResponse = {
  generatedMaps: unknown[];
  raw: unknown[];
  affected: number;
};
