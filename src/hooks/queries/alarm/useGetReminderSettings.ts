import { alarmService } from "@/src/api/alarmService";
import { useQuery } from "@tanstack/react-query";

export const useGetReminderSettings = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["reminderSettings"],
    queryFn: alarmService.getReminderSettings,
    enabled: options?.enabled,
  });
};
