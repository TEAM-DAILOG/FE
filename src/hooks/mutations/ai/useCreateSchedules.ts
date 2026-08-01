import { useMutation, useQueryClient } from "@tanstack/react-query";

import { aiService } from "@/src/api/aiService";
import type { RecommendedSchedulesResponse } from "@/src/types/ai/ai.types";

export function useCreateSchedules() {
  const queryClient = useQueryClient();

  return useMutation<RecommendedSchedulesResponse, Error, void>({
    mutationFn: aiService.postSchedules,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aiSchedules"] });
      // 통계 메인 화면도 같은 "오늘의 추천 일정"을 보여주므로 함께 무효화
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}
