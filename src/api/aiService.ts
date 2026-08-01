import { baseApi } from "@/src/api/baseApi";
import type {
  CreateAiAnswerResponse,
  GetAiAnswerResponse,
  RecommendedSchedulesByDiaryResponse,
  RecommendedSchedulesResponse,
  TodayQuestionResponse,
} from "@/src/types/ai/ai.types";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";

export const aiService = {
  getTodayQuestion: () =>
    baseApi
      .get<ApiSuccessResponse<TodayQuestionResponse>>(
        "/api/v1/ai/questions/today"
      )
      .then((res) => res.data.data),

  postSchedules: () =>
    baseApi
      .post<ApiSuccessResponse<RecommendedSchedulesResponse>>(
        "/api/v1/ai/schedules"
      )
      .then((res) => res.data.data),

  getSchedules: () =>
    baseApi
      .get<ApiSuccessResponse<RecommendedSchedulesResponse>>(
        "/api/v1/ai/schedules"
      )
      .then((res) => res.data.data),

  postRegenerateSchedules: () =>
    baseApi
      .post<ApiSuccessResponse<RecommendedSchedulesResponse>>(
        "/api/v1/ai/schedules/regenerate"
      )
      .then((res) => res.data.data),

  getSchedulesByDiary: (diaryId: number) =>
    baseApi
      .get<ApiSuccessResponse<RecommendedSchedulesByDiaryResponse>>(
        "/api/v1/ai/schedules/" + diaryId
      )
      .then((res) => res.data.data),

  postAnswer: (diaryId: number) =>
    baseApi
      .post<ApiSuccessResponse<CreateAiAnswerResponse>>(
        "/api/v1/ai/answer/" + diaryId
      )
      .then((res) => res.data.data),

  getAnswer: (diaryId: number) =>
    baseApi
      .get<ApiSuccessResponse<GetAiAnswerResponse>>(
        "/api/v1/ai/answer/" + diaryId
      )
      .then((res) => res.data.data),
};
