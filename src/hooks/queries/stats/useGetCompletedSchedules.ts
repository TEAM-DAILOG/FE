import { useQuery } from "@tanstack/react-query";

import { statsService } from "@/src/api/statsService";
import type { GetCompletedSchedulesParams } from "@/src/types/stats/stats.types";

export function useGetCompletedSchedules(
  params?: GetCompletedSchedulesParams
) {
  return useQuery({
    queryKey: ["stats", "schedules", "completed", params],
    queryFn: () => statsService.getCompletedSchedules(params),
  });
}
