import { ScrollView } from "react-native";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import {
  type CategoryBarChartItem,
  MonthlyCategoryStatCard,
} from "@/src/components/statistics";

const CATEGORY_STATS: CategoryBarChartItem[] = [
  {
    id: "1",
    label: "업무업무업",
    count: 20,
    color: "blue",
    schedules: [
      { id: "1-1", name: "팀 회의", date: "2026.05.21" },
      { id: "1-2", name: "보고서 작성", date: "2026.05.18" },
      { id: "1-3", name: "클라이언트 미팅", date: "2026.05.12" },
    ],
  },
  {
    id: "2",
    label: "약속",
    count: 3,
    color: "brown",
    schedules: [{ id: "2-1", name: "친구 생일 파티", date: "2026.05.09" }],
  },
  {
    id: "3",
    label: "운동",
    count: 6,
    color: "green",
    schedules: [
      { id: "3-1", name: "헬스장", date: "2026.05.20" },
      { id: "3-2", name: "요가 클래스", date: "2026.05.14" },
    ],
  },
  { id: "4", label: "기타", count: 0, color: "pink", schedules: [] },
  {
    id: "5",
    label: "티키탁",
    count: 1,
    color: "purple",
    schedules: [{ id: "5-1", name: "친구 생일 파티", date: "2026.05.09" }],
  },
];

export default function StatisticDetailScreen() {
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
          date={new Date(2026, 4)}
          topCategory={{ label: "업무업무업", color: "blue" }}
          data={CATEGORY_STATS}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
