import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/src/api/userService";

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
