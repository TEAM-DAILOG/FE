import { useMutation } from "@tanstack/react-query";

import { authService } from "@/src/api/authService";
import type {
  VerifySignupEmailCodeParams,
  VerifySignupEmailCodeResponse,
} from "@/src/types/auth/auth.types";

export function useVerifySignupEmailCode() {
  return useMutation<
    VerifySignupEmailCodeResponse,
    Error,
    VerifySignupEmailCodeParams
  >({
    mutationFn: authService.verifySignupEmailCode,
    meta: {
      skipGlobalErrorToast: true,
    },
  });
}
