import axios, {
  AxiosError,
  create,
  type InternalAxiosRequestConfig,
} from "axios";

import { tokenStorage } from "@/src/lib/tokenStorage";
import { useAuthStore } from "@/src/store/auth/authStore";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/src/types/api/api.types";
import type { ReissueAccessTokenResponse } from "@/src/types/auth/auth.types";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshTokenPromise: Promise<string> | null = null;

// 공통 axios 인스턴스
export const baseApi = create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

async function reissueAccessToken() {
  const refreshToken = await tokenStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh Token이 없습니다.");
  }

  const response = await axios.post<
    ApiSuccessResponse<ReissueAccessTokenResponse>
  >(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/auth/token/reissue`,
    { refreshToken },
    {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const newAccessToken = response.data.data.accessToken;
  await tokenStorage.setAccessToken(newAccessToken);

  return newAccessToken;
}

baseApi.interceptors.request.use(async (config) => {
  const accessToken = await tokenStorage.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

baseApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshTokenPromise) {
        refreshTokenPromise = reissueAccessToken().finally(() => {
          refreshTokenPromise = null;
        });
      }

      const newAccessToken = await refreshTokenPromise;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return baseApi(originalRequest);
    } catch (refreshError) {
      await tokenStorage.clearTokens();
      useAuthStore.getState().clearAuthenticated();

      return Promise.reject(refreshError);
    }
  }
);
