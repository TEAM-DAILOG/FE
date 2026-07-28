import { useMutation } from "@tanstack/react-query";
import { authService } from "@/src/api/authService";

export const useCheckPassword = () => {
  return useMutation({
    mutationFn: authService.checkPassword,
  });
};
