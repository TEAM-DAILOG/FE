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

// 오늘 작성된 일기가 없는 경우 (최초 생성/재생성 API 공용)
export const NO_DIARY_CODE = "CONFLICT";
// 오늘의 추천이 이미 생성된 경우 (최초 생성 API 전용)
export const ALREADY_INITIALIZED_CODE = "ALREADY_INITIALIZED";
// 카테고리가 없는 경우 (최초 생성/재생성 API 공용)
export const NO_CATEGORY_CODE = "NO_CATEGORY";
// 더 이상 추천할 일정이 없는 경우 (재생성 API 전용)
export const NO_MORE_RECOMMENDATIONS_CODE = "NO_MORE_RECOMMENDATIONS";
