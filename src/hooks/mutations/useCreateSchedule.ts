import { useMutation } from "@tanstack/react-query";

import { scheduleService } from "@/src/api/scheduleService";
import type {
  CreateScheduleParams,
  CreateScheduleResponse,
} from "@/src/types/schedules/schedule.types";

export function useCreateSchedule() {
  return useMutation<CreateScheduleResponse, Error, CreateScheduleParams>({
    mutationFn: scheduleService.createSchedule,
  });
}
