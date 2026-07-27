import type { ApiResponse } from "@/src/types/api/api.types";

export function unwrapApiResponse<T>(res: { data: ApiResponse<T> }): T {
  if (res.data.resultType === "FAIL") throw new Error(res.data.reason);
  return res.data.data;
}
