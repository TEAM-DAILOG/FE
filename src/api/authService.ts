import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type {
  CheckSignupEmailResponse,
  LoginParams,
  LoginResponse,
  SendSignupEmailVerificationResponse,
  SignupEmailParams,
  VerifySignupEmailCodeParams,
  VerifySignupEmailCodeResponse,
} from "@/src/types/auth/auth.types";

export const authService = {
  checkSignupEmail: (params: SignupEmailParams) =>
    baseApi
      .post<
        ApiSuccessResponse<CheckSignupEmailResponse>
      >("/api/v1/auth/signup/email/check", params)
      .then((res) => res.data.data),

  sendSignupEmailVerification: (params: SignupEmailParams) =>
    baseApi
      .post<
        ApiSuccessResponse<SendSignupEmailVerificationResponse>
      >("/api/v1/auth/signup/email/verification/send", params)
      .then((res) => res.data.data),

  verifySignupEmailCode: (params: VerifySignupEmailCodeParams) =>
    baseApi
      .post<
        ApiSuccessResponse<VerifySignupEmailCodeResponse>
      >("/api/v1/auth/signup/email/verification/verify", params)
      .then((res) => res.data.data),

  login: (params: LoginParams) =>
    baseApi
      .post<ApiSuccessResponse<LoginResponse>>("/api/v1/auth/login", params)
      .then((res) => res.data.data),
};
