import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type {
  GetMeResponse,
  UpdateMeParams,
  UpdateMeResponse,
} from "@/src/types/user/user.types";

function createUpdateMeFormData(params: UpdateMeParams) {
  const formData = new FormData();

  formData.append("name", params.name);
  formData.append("email", params.email);

  if (params.profileImage) {
    formData.append("profileImage", params.profileImage as unknown as Blob);
  }

  return formData;
}

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
