import { useQuery } from "@tanstack/react-query";

import { diaryService } from "@/src/api/diaryService";

export function useGetDiaries() {
  return useQuery({
    queryKey: ["diaries"],
    queryFn: () => diaryService.getDiaries(),
  });
}
