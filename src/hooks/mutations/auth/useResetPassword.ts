import { useMutation } from "@tanstack/react-query";
import { authService } from "@/src/api/authService";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authService.resetPassword,
  });
};
