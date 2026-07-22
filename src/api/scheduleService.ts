import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type {
  CreateScheduleParams,
  CreateScheduleResponse,
  GetSchedulesParams,
  GetSchedulesResponse,
} from "@/src/types/schedules/schedule.types";

export const scheduleService = {
  getSchedules: (params?: GetSchedulesParams) =>
    baseApi
      .get<ApiSuccessResponse<GetSchedulesResponse>>("/api/v1/schedules", {
        params,
      })
      .then((res) => res.data.data),

  getUpcomingSchedules: () =>
    baseApi
      .get<
        ApiSuccessResponse<GetSchedulesResponse>
      >("/api/v1/schedules/upcoming")
      .then((res) => res.data.data),

  createSchedule: (params: CreateScheduleParams) =>
    baseApi
      .post<
        ApiSuccessResponse<CreateScheduleResponse>
      >("/api/v1/schedules", params)
      .then((res) => res.data.data),
};
