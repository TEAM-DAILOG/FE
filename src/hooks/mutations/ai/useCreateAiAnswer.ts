import { useMutation, useQueryClient } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";
import type { CreateAiAnswerResponse } from "@/src/types/ai/ai.types";

export function useCreateAiAnswer() {
  const queryClient = useQueryClient();

  return useMutation<CreateAiAnswerResponse, Error, number>({
    mutationFn: (diaryId: number) => aiService.postAnswer(diaryId),
    onSuccess: (_data, diaryId) => {
      queryClient.invalidateQueries({ queryKey: ["aiAnswer", diaryId] });
    },
  });
}