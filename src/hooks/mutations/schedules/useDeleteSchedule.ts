import { useMutation, useQueryClient } from "@tanstack/react-query";

import { scheduleService } from "@/src/api/scheduleService";
import type {
  DeleteScheduleResponse,
  ScheduleScope,
} from "@/src/types/schedules/schedule.types";

type DeleteScheduleVariables = {
  scheduleId: number;
  scope: ScheduleScope;
};

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
