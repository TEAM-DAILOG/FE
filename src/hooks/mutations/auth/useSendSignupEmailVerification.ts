import { useMutation } from "@tanstack/react-query";

import { authService } from "@/src/api/authService";
import type {
  SendSignupEmailVerificationResponse,
  SignupEmailParams,
} from "@/src/types/auth/auth.types";

export function useSendSignupEmailVerification() {
  return useMutation<
    SendSignupEmailVerificationResponse,
    Error,
    SignupEmailParams
  >({
    mutationFn: authService.sendSignupEmailVerification,
    meta: {
      skipGlobalErrorToast: true,
    },
  });
}
