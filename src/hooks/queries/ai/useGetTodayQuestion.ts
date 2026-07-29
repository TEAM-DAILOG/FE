import { useQuery } from "@tanstack/react-query";
import { aiService } from "@/src/api/aiService";

export function useGetTodayQuestion() {
  return useQuery({
    queryKey: ["todayQuestion"],
    queryFn: aiService.getTodayQuestion,
  });
}
