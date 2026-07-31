import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
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
import { useToastStore } from "@/src/store/toast/toastStore";
import { NO_CATEGORY_CODE, NO_DIARY_CODE } from "@/src/types/ai/ai.types";
import type { ApiErrorResponse } from "@/src/types/api/api.types";
import { getErrorMessage } from "@/src/utils/getErrorMessage";

type RegenerateBlockedReason = "NO_DIARY" | "NO_CATEGORY";

export default function StatisticsScreen() {
  const router = useRouter();
  const { data } = useGetStats();
  const recommendedSchedules = data?.recommendedSchedules ?? [];

  const [regenerateBlockedReason, setRegenerateBlockedReason] =
    useState<RegenerateBlockedReason | null>(null);
  const regenerateSchedules = useRegenerateSchedules();
  const showToast = useToastStore((state) => state.showToast);

  const handleAddSchedule = (id: string) => {
    const schedule = recommendedSchedules.find(
      (item) => item.recommendId === Number(id)
    );
    if (!schedule) return;

    router.push({
      pathname: "/schedule",
      params: {
        title: schedule.scheduleTitle,
        categoryId: String(schedule.categoryId),
        categoryColor: schedule.categoryColor,
      },
    });
  };

  // 다른 일정 추천 버튼 클릭시 실행 함수
  const handlePressRefresh = () => {
    regenerateSchedules.mutate(undefined, {
      onError: (error) => {
        const errorCode = isAxiosError<ApiErrorResponse>(error)
          ? error.response?.data?.errorCode
          : undefined;

        if (errorCode === NO_DIARY_CODE) {
          setRegenerateBlockedReason("NO_DIARY");
          return;
        }
        if (errorCode === NO_CATEGORY_CODE) {
          setRegenerateBlockedReason("NO_CATEGORY");
          return;
        }

        showToast(getErrorMessage(error));
      },
    });
  };

  const refreshLabel =
    regenerateBlockedReason === "NO_DIARY"
      ? "오늘 작성된 일기가 없습니다"
      : regenerateBlockedReason === "NO_CATEGORY"
        ? "카테고리가 없습니다"
        : undefined;

  return (
    <ScreenContainer>
      <LogoHeader />

      <TabScrollView>
        <View className="gap-7 px-4 pb-10 pt-5">
          <MonthAchieveCard
            month={data?.lastMonth ?? 0}
            achievementRate={data?.lastMonthCompletionRate ?? 0}
            onPressIncomplete={() => router.push("/statistic/incomplete")}
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
            onPressRefresh={handlePressRefresh}
            refreshLabel={refreshLabel}
            isRefreshDisabled={
              regenerateBlockedReason !== null || regenerateSchedules.isPending
            }
          />
        </View>
      </TabScrollView>
    </ScreenContainer>
  );
}
