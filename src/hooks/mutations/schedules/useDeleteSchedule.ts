import { useMutation, useQueryClient } from "@tanstack/react-query";

import { scheduleService } from "@/src/api/scheduleService";
import type {
  DeleteScheduleResponse,
  DeleteScheduleVariables,
} from "@/src/types/schedules/schedule.types";

export function useDeleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation<DeleteScheduleResponse, Error, DeleteScheduleVariables>({
    mutationFn: ({ scheduleId, scope }) =>
      scheduleService.deleteSchedule(scheduleId, scope),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}
