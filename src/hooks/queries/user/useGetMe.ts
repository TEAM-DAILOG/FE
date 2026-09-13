import { useQuery } from "@tanstack/react-query";
import { userService } from "@/src/api/userService";

export const useGetMe = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userService.getMe,
    enabled: options?.enabled,
  });
};
