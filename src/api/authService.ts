import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type { LoginParams, LoginResponse } from "@/src/types/auth/auth.types";

export const authService = {
  login: (params: LoginParams) =>
    baseApi
      .post<ApiSuccessResponse<LoginResponse>>("/api/v1/auth/login", params)
      .then((res) => res.data.data),
};
