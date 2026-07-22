import { CategoryColor } from "../categories/category.types";

// 일정별 카테고리 관련 타입
export type ScheduleCategory = {
  categoryId: number;
  categoryName: string;
  categoryColor: CategoryColor;
};

// 일정 반복 유형 ENUM
export type ScheduleRepeatType = "NONE" | "MULTIPLE" | "PERIOD" | "WEEKLY";

// 일정 아이템 타입
export type Schedule = {
  scheduleId: number;
  category: ScheduleCategory;
  title: string;
  content: string;
  date: string;
  groupId: number | null;
  isCompleted: boolean;
  repeatType: ScheduleRepeatType;
  repeatStartDate: string | null;
  repeatEndDate: string | null;
  repeatDays: string | null;
  createdAt: string;
  updatedAt: string | null;
};

// 일정 목록 조회 요청 파라미터 타입
export type GetSchedulesParams = {
  startDate?: string;
  endDate?: string;
  categoryId?: number;
  isCompleted?: boolean;
};

// 전체 일정 목록 조회/가까운 일정 조회 요청 응답값 타입
export type GetSchedulesResponse = {
  schedules: Schedule[];
};

// 일정 등록 요청 파라미터 타입
export type CreateScheduleParams = {
  categoryId: number;
  title: string;
  content: string;
  date: string;
  repeatType: ScheduleRepeatType;
  repeatStartDate?: string;
  repeatEndDate?: string;
  repeatDays?: string;
};

// 일정 등록 요청 응답값 타입
export type CreateScheduleResponse = {
  scheduleId: number;
  groupId: number | null;
  createdCount: number;
};
