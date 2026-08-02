import { alarmService } from "@/src/api/alarmService";
import { useQuery } from "@tanstack/react-query";

export const useGetAlarmSettings = () => {
  return useQuery({
    queryKey: ["alarmSettings"],
    queryFn: alarmService.getAlarmSettings,
  });
};
