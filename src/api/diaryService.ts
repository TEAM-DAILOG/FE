import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type {
  DeleteDiaryResponse,
  GetDiariesResponse,
  GetDiaryDetailResponse,
} from "@/src/types/diaries/diary.types";

export const diaryService = {
  getDiaries: () =>
    baseApi
      .get<ApiSuccessResponse<GetDiariesResponse>>("/api/v1/diaries")
      .then((res) => res.data.data),

  getDiaryDetail: (diaryId: number) =>
    baseApi
      .get<
        ApiSuccessResponse<GetDiaryDetailResponse>
      >(`/api/v1/diaries/${diaryId}`)
      .then((res) => res.data.data),

  deleteDiary: (diaryId: number) =>
    baseApi
      .delete<
        ApiSuccessResponse<DeleteDiaryResponse>
      >(`/api/v1/diaries/${diaryId}`)
      .then((res) => res.data.data),
};
