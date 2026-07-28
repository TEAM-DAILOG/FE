import { useMutation } from "@tanstack/react-query";
import { authService } from "@/src/api/authService";

export const useVerifyResetPasswordEmail = () => {
  return useMutation({
    mutationFn: authService.verifyResetPasswordEmail,
  });
};
