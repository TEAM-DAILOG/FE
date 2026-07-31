import { useState } from "react";
import { ScrollView } from "react-native";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import { MonthlyCategoryStatCard } from "@/src/components/statistics";
import { useGetStatsDetail } from "@/src/hooks/queries/stats/useGetStatsDetail";
import {
  toCategoryBarChartItem,
  toTopCategory,
} from "@/src/types/stats/stats.mappers";
import { formatYearMonth } from "@/src/utils/formatDate";

export default function StatisticDetailScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { year, month } = formatYearMonth(selectedDate);
  const { data } = useGetStatsDetail({ year, month });

  const categoryStats = (data?.categoryRankInfo ?? []).map(
    toCategoryBarChartItem
  );

  const topCategory = toTopCategory(data?.mostFrequentCategory ?? null);

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="일정 통계" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 40,
        }}
      >
        <MonthlyCategoryStatCard
          date={selectedDate}
          topCategory={topCategory}
          data={categoryStats}
          onSelectMonth={setSelectedDate}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
