export type DiaryType = "QUESTION" | "FREE";

// 일기 작성 API 타입
export type DiaryImageFile = {
  uri: string;
  name: string;
  type: string;
};

export type CreateDiaryParams = {
  title: string;
  content: string;
  questionId?: number;
  date: string;
  images?: DiaryImageFile[];
};

export type CreateDiaryResponse = {
  diaryId: number;
  userId: number;
  date: string;
  diaryType: DiaryType;
  diaryTitle: string;
  content: string;
  aiSummary: string | null;
};
