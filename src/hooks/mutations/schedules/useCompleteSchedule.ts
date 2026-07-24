import { useMutation, useQueryClient } from "@tanstack/react-query";

import { scheduleService } from "@/src/api/scheduleService";
import type { CompleteScheduleResponse } from "@/src/types/schedules/schedule.types";

export function useCompleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation<CompleteScheduleResponse, Error, number>({
    mutationFn: scheduleService.completeSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}
