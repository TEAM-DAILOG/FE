import { baseApi } from "@/src/api/baseApi";
import type {
  GetAlarmSettingsResponse,
  GetReminderSettingsResponse,
  PatchAlarmSettingsParams,
  PatchAlarmSettingsResponse,
  PatchReminderSettingsParams,
  PatchReminderSettingsResponse,
} from "@/src/types/alarm/alarm.types";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";

export const alarmService = {
  getAlarmSettings: () =>
    baseApi
      .get<ApiSuccessResponse<GetAlarmSettingsResponse>>("/api/v1/alarms")
      .then((res) => res.data.data),

  patchAlarmSettings: (params: PatchAlarmSettingsParams) =>
    baseApi
      .patch<
        ApiSuccessResponse<PatchAlarmSettingsResponse>
      >("/api/v1/alarms", params)
      .then((res) => res.data.data),

  getReminderSettings: () =>
    baseApi
      .get<
        ApiSuccessResponse<GetReminderSettingsResponse>
      >("/api/v1/alarms/reminder")
      .then((res) => res.data.data),

  patchReminderSettings: (params: PatchReminderSettingsParams) =>
    baseApi
      .patch<
        ApiSuccessResponse<PatchReminderSettingsResponse>
      >("/api/v1/alarms/reminder", params)
      .then((res) => res.data.data),
};
