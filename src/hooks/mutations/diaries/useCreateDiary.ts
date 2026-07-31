import { useMutation, useQueryClient } from "@tanstack/react-query";

import { diaryService } from "@/src/api/diaryService";
import type {
  CreateDiaryParams,
  CreateDiaryResponse,
} from "@/src/types/diaries/diary.types";

export function useCreateDiary() {
  const queryClient = useQueryClient();

  return useMutation<CreateDiaryResponse, Error, CreateDiaryParams>({
    mutationFn: (params) => diaryService.postDiary(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });
}
