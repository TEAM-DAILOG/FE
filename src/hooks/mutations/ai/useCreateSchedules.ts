import { useMutation } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";
import type { CreateRecommendedSchedulesResponse } from "@/src/types/ai/ai.types";

export function useCreateSchedules() {
  return useMutation<CreateRecommendedSchedulesResponse, Error, void>({
    mutationFn: aiService.postSchedules,
  });
}
