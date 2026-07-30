import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import { toDiaryFormData } from "@/src/types/diaries/diary.mappers";
import type {
  CreateDiaryParams,
  CreateDiaryResponse,
  DeleteDiaryResponse,
  GetDiariesResponse,
  GetDiaryDetailResponse,
} from "@/src/types/diaries/diary.types";

export const diaryService = {
  postDiary: (params: CreateDiaryParams) =>
    baseApi
      .post<ApiSuccessResponse<CreateDiaryResponse>>(
        "/api/v1/diaries",
        toDiaryFormData(params),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data.data),

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
