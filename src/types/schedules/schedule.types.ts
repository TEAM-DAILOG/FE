import { CategoryColor } from "../categories/category.types";

// 일정별 카테고리 관련 타입
export type ScheduleCategory = {
  categoryId: number;
  categoryName: string;
  categoryColor: CategoryColor;
};

// 일정 반복 유형 ENUM
export type ScheduleRepeatType =
  | "NONE"
  | "MULTIPLE"
  | "PERIOD"
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY";

// 반복 요일 ENUM
export type WeekdayCode = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

// 일정의 반복 설정 관련 필드
export type ScheduleRepeatFields = {
  repeatType: ScheduleRepeatType;
  repeatStartDate: string | null;
  repeatEndDate: string | null;
  repeatDays: string | null;
  repeatDates: string[] | null;
  isLastDayOfMonth: boolean;
};

// 일정 아이템 타입
export type Schedule = {
  scheduleId: number;
  category: ScheduleCategory;
  title: string;
  content: string | null;
  date: string;
  groupId: number | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
} & ScheduleRepeatFields;

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
  content?: string;
  date?: string;
  repeatType: ScheduleRepeatType;
  repeatStartDate?: string;
  repeatEndDate?: string;
  repeatDays?: string;
  repeatDates?: string[];
  isLastDayOfMonth?: boolean;
};

// 일정 등록 요청 응답값 타입
export type CreateScheduleResponse = {
  scheduleId: number;
  groupId: number | null;
  createdCount: number;
};

// 일정 완료 처리 요청 응답값 타입
export type CompleteScheduleResponse = {
  scheduleId: number;
  isCompleted: boolean;
};

// 일정 완료 처리 요청 변수 타입
export type CompleteScheduleVariables = {
  scheduleId: number;
  isCompleted: boolean;
};

// 일정 수정 및 삭제 유형 타입
export type ScheduleScope = "SINGLE" | "ALL";

// 일정 수정 요청 파라미터 타입
export type UpdateScheduleParams = {
  categoryId?: number;
  title?: string;
  content?: string | null;
  date?: string;
  repeatType?: ScheduleRepeatType;
  repeatStartDate?: string | null;
  repeatEndDate?: string | null;
  repeatDays?: string | null;
  repeatDates?: string[];
  isLastDayOfMonth?: boolean;
};

// 일정 수정(SINGLE) 응답값 타입
export type UpdateScheduleSingleResponse = {
  scheduleId: number;
  categoryId: number;
  title: string;
  content: string | null;
  date: string;
  groupId: number | null;
  isCompleted: boolean;
  repeatType: ScheduleRepeatType;
  repeatStartDate: string | null;
  repeatEndDate: string | null;
  repeatDays: string | null;
  isLastDayOfMonth: boolean;
};

// 일정 수정(ALL) 응답값 타입
export type UpdateScheduleAllResponse = {
  scheduleId: number | null;
  groupId: number | null;
  createdCount: number;
  updatedCount: number;
  deletedCount: number;
};

// 일정 수정 응답값 타입
export type UpdateScheduleResponse =
  | UpdateScheduleSingleResponse
  | UpdateScheduleAllResponse;

// 일정 수정 요청 변수 타입
export type UpdateScheduleVariables = {
  scheduleId: number;
  scope: ScheduleScope;
  params: UpdateScheduleParams;
};

// 일정 삭제 요청 응답값 타입
export type DeleteScheduleResponse = {
  scheduleId: number;
};

// 일정 삭제 요청 변수 타입
export type DeleteScheduleVariables = {
  scheduleId: number;
  scope: ScheduleScope;
};
