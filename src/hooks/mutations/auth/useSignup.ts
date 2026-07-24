import { useMutation } from "@tanstack/react-query";

import { authService } from "@/src/api/authService";
import type { SignupParams, SignupResponse } from "@/src/types/auth/auth.types";

export function useSignup() {
  return useMutation<SignupResponse, Error, SignupParams>({
    mutationFn: authService.signup,
  });
}
