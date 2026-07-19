// API 성공 응답 타입
export interface ApiSuccessResponse<T> {
  resultType: "SUCCESS";
  message: string;
  data: T;
}

// API 실패 응답 타입
export interface ApiErrorResponse {
  resultType: "FAIL";
  code: number;
  errorCode: string;
  reason: string;
  data: null;
}

// API 공통 응답 타입
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
