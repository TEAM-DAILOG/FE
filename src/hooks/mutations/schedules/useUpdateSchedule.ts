import { useMutation, useQueryClient } from "@tanstack/react-query";

import { scheduleService } from "@/src/api/scheduleService";
import type {
  ScheduleScope,
  UpdateScheduleParams,
  UpdateScheduleResponse,
} from "@/src/types/schedules/schedule.types";

type UpdateScheduleVariables = {
  scheduleId: number;
  scope: ScheduleScope;
  params: UpdateScheduleParams;
};

export function useUpdateSchedule() {
  const queryClient = useQueryClient();

  return useMutation<UpdateScheduleResponse, Error, UpdateScheduleVariables>({
    mutationFn: ({ scheduleId, scope, params }) =>
      scheduleService.updateSchedule(scheduleId, scope, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}
