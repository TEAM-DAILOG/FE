import { useQuery } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";

export function useGetAiAnswer(diaryId: number, enabled = true) {
  return useQuery({
    queryKey: ["aiAnswer", diaryId],
    queryFn: () => aiService.getAnswer(diaryId),
    enabled,
    retry: false,
  });
}