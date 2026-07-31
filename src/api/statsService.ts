import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type {
  GetCompletedSchedulesParams,
  GetCompletedSchedulesResponse,
  GetPendingSchedulesParams,
  GetPendingSchedulesResponse,
  GetStatsResponse,
} from "@/src/types/stats/stats.types";

export const statsService = {
  getStats: () =>
    baseApi
      .get<ApiSuccessResponse<GetStatsResponse>>("/api/v1/stats")
      .then((res) => res.data.data),

  getPendingSchedules: (params?: GetPendingSchedulesParams) =>
    baseApi
      .get<
        ApiSuccessResponse<GetPendingSchedulesResponse>
      >("/api/v1/stats/schedules/pending", { params })
      .then((res) => res.data.data),

  getCompletedSchedules: (params?: GetCompletedSchedulesParams) =>
    baseApi
      .get<
        ApiSuccessResponse<GetCompletedSchedulesResponse>
      >("/api/v1/stats/schedules/completed", { params })
      .then((res) => res.data.data),
};
