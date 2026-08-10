import { alarmService } from "@/src/api/alarmService";
import { useMutation } from "@tanstack/react-query";

export const usePostPushToken = () => {
  return useMutation({
    mutationFn: alarmService.postPushToken,
    meta: { skipGlobalErrorToast: true },
  });
};
