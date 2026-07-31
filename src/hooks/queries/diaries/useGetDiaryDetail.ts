import { useQuery } from "@tanstack/react-query";

import { diaryService } from "@/src/api/diaryService";

export function useGetDiaryDetail(diaryId: number) {
  return useQuery({
    queryKey: ["diaries", diaryId],
    queryFn: () => diaryService.getDiaryDetail(diaryId),
    enabled: Number.isFinite(diaryId),
  });
}
