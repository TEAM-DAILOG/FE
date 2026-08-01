import { useQuery } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";

export function useGetSchedulesByDiary(diaryId: number) {
  return useQuery({
    queryKey: ["aiSchedules", diaryId],
    queryFn: () => aiService.getSchedulesByDiary(diaryId),
  });
}