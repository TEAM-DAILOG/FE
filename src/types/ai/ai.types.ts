import type { CategoryColor } from "@/src/types/categories/category.types";

// 오늘의 질문 조회 응답 타입
export interface TodayQuestionResponse {
  questionId: number;
  content: string;
  targetDate: string;
}

// AI 일정 추천 최초 생성 및 조회 응답 타입
export type RecommendedSchedule = {
  recommendId: number;
  categoryId: number;
  categoryTitle: string;
  categoryColor: CategoryColor;
  scheduleTitle: string;
  isAdded: boolean;
};

export type RecommendedSchedulesResponse = {
  recommendedScheduleCount: number;
  recommendedSchedules: RecommendedSchedule[];
};
