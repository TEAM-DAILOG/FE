import { isAxiosError } from "axios";

import type { ApiErrorResponse } from "@/src/types/api/api.types";

const DEFAULT_ERROR_MESSAGE = "요청 중 오류가 발생했습니다.";

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.reason ?? DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
}
