import { useMutation } from "@tanstack/react-query";

import { authService } from "@/src/api/authService";
import type { LoginParams, LoginResponse } from "@/src/types/auth/auth.types";

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: authService.login,
  });
}
