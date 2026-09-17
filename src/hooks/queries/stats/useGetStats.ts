import { useQuery } from "@tanstack/react-query";

import { statsService } from "@/src/api/statsService";

export function useGetStats(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["stats"],
    queryFn: statsService.getStats,
    enabled: options?.enabled,
  });
}
