import { useQuery } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";

export function useGetSchedules() {
  return useQuery({
    queryKey: ["aiSchedules"],
    queryFn: aiService.getSchedules,
  });
}
