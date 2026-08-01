import { useMutation, useQueryClient } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";
import type { RecommendedSchedulesResponse } from "@/src/types/ai/ai.types";

export function useRegenerateSchedules() {
  const queryClient = useQueryClient();

  return useMutation<RecommendedSchedulesResponse, Error, void>({
    mutationFn: aiService.postRegenerateSchedules,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}
