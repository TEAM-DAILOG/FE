import { alarmService } from "@/src/api/alarmService";
import { useQuery } from "@tanstack/react-query";

export const useGetAlarmSettings = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["alarmSettings"],
    queryFn: alarmService.getAlarmSettings,
    enabled: options?.enabled,
  });
};
