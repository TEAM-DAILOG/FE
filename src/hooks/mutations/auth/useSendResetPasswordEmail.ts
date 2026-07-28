import { useMutation } from "@tanstack/react-query";
import { authService } from "@/src/api/authService";

export const useSendResetPasswordEmail = () => {
  return useMutation({
    mutationFn: authService.sendResetPasswordEmail,
  });
};
