import { baseApi } from "@/src/api/baseApi";
import { createUpdateMeFormData } from "@/src/types/user/user.mappers";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type {
  GetMeResponse,
  UpdateMeParams,
  UpdateMeResponse,
} from "@/src/types/user/user.types";

export const userService = {
  getMe: () =>
    baseApi
      .get<ApiSuccessResponse<GetMeResponse>>("/api/v1/users/me")
      .then((res) => res.data.data),

  updateMe: (params: UpdateMeParams) =>
    baseApi
      .patch<ApiSuccessResponse<UpdateMeResponse>>(
        "/api/v1/users/me",
        createUpdateMeFormData(params),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data.data),
};
