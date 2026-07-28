import type { CategoryColorApi } from "@/src/types/categories/category.types";

// 미완료 일정 조회 요청 파라미터 타입
export type GetPendingSchedulesParams = {
  year?: number;
  month?: number;
};

// 완료된 일정 조회 요청 파라미터 타입
export type GetCompletedSchedulesParams = {
  year?: number;
  month?: number;
};

// 통계 일정 항목 타입
export type StatsSchedule = {
  scheduleId: number;
  title: string;
  date: string;
  categoryId: number;
  categoryName: string;
  categoryColor: CategoryColorApi;
};

// 미완료 일정 조회 응답값 타입
export type GetPendingSchedulesResponse = {
  incompletedScheduleCount: number;
  incompletedScheduleRate: number;
  targetYear: number;
  targetMonth: number;
  incompletedSchedules: StatsSchedule[];
};

// 완료된 일정 조회 응답값 타입
export type GetCompletedSchedulesResponse = {
  completedScheduleCount: number;
  targetYear: number;
  targetMonth: number;
  completedSchedules: StatsSchedule[];
};
