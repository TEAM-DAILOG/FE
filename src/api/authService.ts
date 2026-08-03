import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import type {
  ResetPasswordParams,
  ChangePasswordParams,
  CheckPasswordParams,
  CheckSignupEmailResponse,
  LoginParams,
  LoginResponse,
  ResetPasswordEmailParams,
  SendResetPasswordEmailResponse,
  LogoutParams,
  SendSignupEmailVerificationResponse,
  SignupParams,
  SignupResponse,
  SignupEmailParams,
  VerifyResetPasswordEmailParams,
  VerifyResetPasswordEmailResponse,
  VerifySignupEmailCodeParams,
  VerifySignupEmailCodeResponse,
} from "@/src/types/auth/auth.types";

function createSignupFormData(params: SignupParams) {
  const formData = new FormData();

  formData.append("email", params.email);
  formData.append("emailVerificationToken", params.emailVerificationToken);
  formData.append("password", params.password);
  formData.append("name", params.name);
  formData.append("termsOfServiceAgreed", String(params.termsOfServiceAgreed));
  formData.append("privacyPolicyAgreed", String(params.privacyPolicyAgreed));

  if (typeof params.pushNotificationAgreed === "boolean") {
    formData.append(
      "pushNotificationAgreed",
      String(params.pushNotificationAgreed)
    );
  }

  if (params.profileImage) {
    formData.append("profileImage", params.profileImage as unknown as Blob);
  }

  return formData;
}

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

  signup: (params: SignupParams) =>
    baseApi
      .post<ApiSuccessResponse<SignupResponse>>(
        "/api/v1/auth/signup",
        createSignupFormData(params),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data.data),

  login: (params: LoginParams) =>
    baseApi
      .post<ApiSuccessResponse<LoginResponse>>("/api/v1/auth/login", params)
      .then((res) => res.data.data),

  logout: (params: LogoutParams) =>
    baseApi
      .post<ApiSuccessResponse<null>>("/api/v1/auth/logout", params)
      .then((res) => res.data.data),

  withdraw: () =>
    baseApi
      .delete<ApiSuccessResponse<null>>("/api/v1/auth/withdraw")
      .then((res) => res.data.data),

  checkPassword: (params: CheckPasswordParams) =>
    baseApi
      .post<ApiSuccessResponse<null>>("/api/v1/auth/password/check", params)
      .then((res) => res.data),

  changePassword: (params: ChangePasswordParams) =>
    baseApi
      .patch<ApiSuccessResponse<null>>("/api/v1/auth/password", params)
      .then((res) => res.data),

  sendResetPasswordEmail: (params: ResetPasswordEmailParams) =>
    baseApi
      .post<
        ApiSuccessResponse<SendResetPasswordEmailResponse>
      >("/api/v1/auth/password/reset/email/verification/send", params)
      .then((res) => res.data.data),

  verifyResetPasswordEmail: (params: VerifyResetPasswordEmailParams) =>
    baseApi
      .post<
        ApiSuccessResponse<VerifyResetPasswordEmailResponse>
      >("/api/v1/auth/password/reset/email/verification/verify", params)
      .then((res) => res.data.data),

  resetPassword: (params: ResetPasswordParams) =>
    baseApi
      .patch<ApiSuccessResponse<null>>("/api/v1/auth/password/reset", params)
      .then((res) => res.data),
};
