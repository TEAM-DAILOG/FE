import { useQuery } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";

export function useGetAiAnswer(diaryId: number) {
  return useQuery({
    queryKey: ["aiAnswer", diaryId],
    queryFn: () => aiService.getAnswer(diaryId),
    retry: false,
  });
}