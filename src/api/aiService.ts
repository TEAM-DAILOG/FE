import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type { TodayQuestionResponse } from "@/src/types/ai/ai.types";

export const aiService = {
  getTodayQuestion: () =>
    baseApi
      .get<
        ApiSuccessResponse<TodayQuestionResponse>
      >("/api/v1/ai/questions/today")
      .then((res) => res.data.data),
};
