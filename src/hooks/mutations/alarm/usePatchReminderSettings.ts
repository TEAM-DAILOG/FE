import { alarmService } from "@/src/api/alarmService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchReminderSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: alarmService.patchReminderSettings,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["reminderSettings"] });
    },
  });
};
