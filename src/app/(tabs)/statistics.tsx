import { useRouter } from "expo-router";
import { View } from "react-native";

import {
  Divider,
  LogoHeader,
  ScreenContainer,
  TabScrollView,
} from "@/src/components/common";
import {
  MonthAchieveCard,
  ScheduleRecommendSection,
  ScheduleStatSection,
} from "@/src/components/statistics";
import { useRegenerateSchedules } from "@/src/hooks/mutations/ai/useRegenerateSchedules";
import { useGetStats } from "@/src/hooks/queries/stats/useGetStats";
import { useRequireAuth } from "@/src/hooks/useRequireAuth";

export default function StatisticsScreen() {
  const router = useRouter();
  const { isAuthenticated, requireAuth } = useRequireAuth();
  const { data } = useGetStats({ enabled: isAuthenticated });
  const recommendedSchedules = data?.recommendedSchedules ?? [];

  const regenerateSchedules = useRegenerateSchedules();

  const handleAddSchedule = (id: string) => {
    const schedule = recommendedSchedules.find(
      (item) => item.recommendId === Number(id)
    );
    if (!schedule) return;

    requireAuth(() =>
      router.push({
        pathname: "/schedule",
        params: {
          title: schedule.scheduleTitle,
          categoryId: String(schedule.categoryId),
          categoryColor: schedule.categoryColor,
        },
      })
    );
  };

  return (
    <ScreenContainer>
      <LogoHeader />

      <TabScrollView>
        <View className="gap-7 px-4">
          <MonthAchieveCard
            month={data?.lastMonth ?? 0}
            achievementRate={data?.lastMonthCompletionRate ?? 0}
            onPressIncomplete={() =>
              requireAuth(() => router.push("/statistic/incomplete"))
            }
          />

          <ScheduleStatSection />

          <Divider className="border-green-200" />

          <ScheduleRecommendSection
            items={recommendedSchedules.map((schedule) => ({
              id: String(schedule.recommendId),
              categoryLabel: schedule.categoryTitle,
              categoryColor: schedule.categoryColor,
              description: schedule.scheduleTitle,
            }))}
            onPressAdd={handleAddSchedule}
            onPressRefresh={() =>
              requireAuth(() => regenerateSchedules.mutate())
            }
            isRefreshDisabled={
              !isAuthenticated || regenerateSchedules.isPending
            }
          />
        </View>
      </TabScrollView>
    </ScreenContainer>
  );
}
