import { useMutation } from "@tanstack/react-query";
import { authService } from "@/src/api/authService";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authService.changePassword,
  });
};
