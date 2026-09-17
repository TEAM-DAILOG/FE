import { useQuery } from "@tanstack/react-query";

import { diaryService } from "@/src/api/diaryService";

export function useGetDiaries(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["diaries"],
    queryFn: () => diaryService.getDiaries(),
    enabled: options?.enabled,
  });
}
