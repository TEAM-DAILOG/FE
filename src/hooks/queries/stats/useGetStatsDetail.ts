import { useQuery } from "@tanstack/react-query";

import { statsService } from "@/src/api/statsService";
import type { GetStatsDetailParams } from "@/src/types/stats/stats.types";

export function useGetStatsDetail(params?: GetStatsDetailParams) {
  return useQuery({
    queryKey: ["stats", "detail", params],
    queryFn: () => statsService.getStatsDetail(params),
  });
}
