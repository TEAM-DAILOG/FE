import { baseApi } from "@/src/api/baseApi";
import type {
  RecommendedSchedulesResponse,
  TodayQuestionResponse,
} from "@/src/types/ai/ai.types";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";

export const aiService = {
  getTodayQuestion: () =>
    baseApi
      .get<
        ApiSuccessResponse<TodayQuestionResponse>
      >("/api/v1/ai/questions/today")
      .then((res) => res.data.data),

  postSchedules: () =>
    baseApi
      .post<
        ApiSuccessResponse<RecommendedSchedulesResponse>
      >("/api/v1/ai/schedules")
      .then((res) => res.data.data),

  getSchedules: () =>
    baseApi
      .get<
        ApiSuccessResponse<RecommendedSchedulesResponse>
      >("/api/v1/ai/schedules")
      .then((res) => res.data.data),

  postRegenerateSchedules: () =>
    baseApi
      .post<
        ApiSuccessResponse<RecommendedSchedulesResponse>
      >("/api/v1/ai/schedules/regenerate")
      .then((res) => res.data.data),
};
