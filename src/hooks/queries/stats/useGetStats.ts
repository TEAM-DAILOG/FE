import { useQuery } from "@tanstack/react-query";

import { statsService } from "@/src/api/statsService";

export function useGetStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: statsService.getStats,
  });
}
