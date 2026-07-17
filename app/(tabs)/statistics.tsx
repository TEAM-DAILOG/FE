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

const RECOMMEND_ITEMS = [
  {
    id: "1",
    categoryLabel: "CATEGORY",
    categoryColor: "#6A92AF",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: "2",
    categoryLabel: "CATEGORY",
    categoryColor: "#C49C64",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: "3",
    categoryLabel: "CATEGORY",
    categoryColor: "#A381BB",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function StatisticsScreen() {
  return (
    <ScreenContainer>
      <LogoHeader />

      <TabScrollView>
        <View className="gap-7 px-4 pb-10 pt-5">
          <MonthAchieveCard
            month={12}
            achievementRate={20}
            onPressIncomplete={() => {}}
          />

          <ScheduleStatSection />

          <Divider className="border-green-200" />

          <ScheduleRecommendSection items={RECOMMEND_ITEMS} />
        </View>
      </TabScrollView>
    </ScreenContainer>
  );
}
