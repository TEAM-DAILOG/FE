import { useMutation, useQueryClient } from "@tanstack/react-query";

import { scheduleService } from "@/src/api/scheduleService";
import type {
  CompleteScheduleResponse,
  CompleteScheduleVariables,
} from "@/src/types/schedules/schedule.types";

export function useCompleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation<
    CompleteScheduleResponse,
    Error,
    CompleteScheduleVariables
  >({
    mutationFn: ({ scheduleId, isCompleted }) =>
      scheduleService.completeSchedule(scheduleId, isCompleted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}
