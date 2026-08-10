import { alarmService } from "@/src/api/alarmService";
import { tokenStorage } from "@/src/lib/tokenStorage";
import { useMutation } from "@tanstack/react-query";

export const usePostPushToken = () => {
  return useMutation({
    mutationFn: alarmService.postPushToken,
    meta: { skipGlobalErrorToast: true },
    onSuccess: (data) => {
      tokenStorage.setPushTokenId(data.tokenId);
    },
  });
};
