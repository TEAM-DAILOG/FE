import { useQuery } from "@tanstack/react-query";
import { userService } from "@/src/api/userService";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userService.getMe,
  });
};
