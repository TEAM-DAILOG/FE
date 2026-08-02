import { alarmService } from "@/src/api/alarmService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchAlarmSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: alarmService.patchAlarmSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alarmSettings"] });
    },
  });
};
