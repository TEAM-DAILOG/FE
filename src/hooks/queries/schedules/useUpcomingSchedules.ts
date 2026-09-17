import { useQuery } from "@tanstack/react-query";

import { scheduleService } from "@/src/api/scheduleService";

export function useUpcomingSchedules(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["schedules", "upcoming"],
    queryFn: scheduleService.getUpcomingSchedules,
    enabled: options?.enabled,
  });
}
