import { useQuery } from "@tanstack/react-query";

import { scheduleService } from "@/src/api/scheduleService";
import type { GetSchedulesParams } from "@/src/types/schedules/schedule.types";

export function useGetSchedules(params?: GetSchedulesParams) {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: () => scheduleService.getSchedules(params),
  });
}
