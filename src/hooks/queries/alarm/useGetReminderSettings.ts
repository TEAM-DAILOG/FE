import { alarmService } from "@/src/api/alarmService";
import { useQuery } from "@tanstack/react-query";

export const useGetReminderSettings = () => {
  return useQuery({
    queryKey: ["reminderSettings"],
    queryFn: alarmService.getReminderSettings,
  });
};
