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
  type ScheduleRecommendItemData,
  ScheduleRecommendSection,
  ScheduleStatSection,
} from "@/src/components/statistics";

const RECOMMEND_ITEMS: ScheduleRecommendItemData[] = [
  {
    id: "1",
    categoryLabel: "CATEGORY",
    categoryColor: "blue",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: "2",
    categoryLabel: "CATEGORY",
    categoryColor: "brown",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: "3",
    categoryLabel: "CATEGORY",
    categoryColor: "purple",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function StatisticsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <LogoHeader />

      <TabScrollView>
        <View className="gap-7 px-4 pb-10 pt-5">
          <MonthAchieveCard
            month={12}
            achievementRate={20}
            onPressIncomplete={() => router.push("/statistic/incomplete")}
          />

          <ScheduleStatSection />

          <Divider className="border-green-200" />

          <ScheduleRecommendSection items={RECOMMEND_ITEMS} />
        </View>
      </TabScrollView>
    </ScreenContainer>
  );
}
