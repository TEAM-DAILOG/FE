import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import { toDiaryFormData } from "@/src/types/diaries/diary.mappers";
import type {
  CreateDiaryParams,
  CreateDiaryResponse,
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
};
