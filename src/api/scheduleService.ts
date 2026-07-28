import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type {
  CompleteScheduleResponse,
  CreateScheduleParams,
  CreateScheduleResponse,
  DeleteScheduleResponse,
  GetSchedulesParams,
  GetSchedulesResponse,
  ScheduleScope,
  UpdateScheduleParams,
  UpdateScheduleResponse,
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

  completeSchedule: (scheduleId: number, isCompleted: boolean) =>
    baseApi
      .patch<
        ApiSuccessResponse<CompleteScheduleResponse>
      >(`/api/v1/schedules/${scheduleId}/complete`, { isCompleted })
      .then((res) => res.data.data),

  updateSchedule: (
    scheduleId: number,
    scope: ScheduleScope,
    params: UpdateScheduleParams
  ) =>
    baseApi
      .patch<
        ApiSuccessResponse<UpdateScheduleResponse>
      >(`/api/v1/schedules/${scheduleId}`, params, { params: { scope } })
      .then((res) => res.data.data),

  deleteSchedule: (scheduleId: number, scope: ScheduleScope) =>
    baseApi
      .delete<
        ApiSuccessResponse<DeleteScheduleResponse>
      >(`/api/v1/schedules/${scheduleId}`, { params: { scope } })
      .then((res) => res.data.data),
};
