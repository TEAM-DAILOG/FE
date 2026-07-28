import { useQuery } from "@tanstack/react-query";

import { statsService } from "@/src/api/statsService";
import type { GetPendingSchedulesParams } from "@/src/types/stats/stats.types";

export function useGetPendingSchedules(params?: GetPendingSchedulesParams) {
  return useQuery({
    queryKey: ["stats", "schedules", "pending", params],
    queryFn: () => statsService.getPendingSchedules(params),
  });
}
