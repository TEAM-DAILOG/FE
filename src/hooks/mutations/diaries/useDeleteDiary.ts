import { useMutation, useQueryClient } from "@tanstack/react-query";

import { diaryService } from "@/src/api/diaryService";
import type { DeleteDiaryResponse } from "@/src/types/diaries/diary.types";

export function useDeleteDiary() {
  const queryClient = useQueryClient();

  return useMutation<DeleteDiaryResponse, Error, number>({
    mutationFn: (diaryId) => diaryService.deleteDiary(diaryId),
    onSuccess: (_data, diaryId) => {
      queryClient.removeQueries({ queryKey: ["diaries", diaryId] });
      queryClient.invalidateQueries({ queryKey: ["diaries"], exact: true });
    },
  });
}
