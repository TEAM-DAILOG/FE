import { useMutation, useQueryClient } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";
import type { RecommendedSchedulesResponse } from "@/src/types/ai/ai.types";

export function useCreateSchedules() {
  const queryClient = useQueryClient();

  return useMutation<RecommendedSchedulesResponse, Error, void>({
    mutationFn: aiService.postSchedules,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aiSchedules"] });
    },
  });
}
