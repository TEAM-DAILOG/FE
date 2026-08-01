import { useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import {
  CATEGORY_DOT_CLASS_NAMES,
  CATEGORY_TEXT_CLASS_NAMES,
} from "@/src/constants/categoryColors";
import { cn } from "@/src/lib/cn";
import type { CategoryColor } from "@/src/types/categories/category.types";

import { CategoryAccordion } from "./CategoryAccordion";
import {
  CategoryBarChart,
  type CategoryBarChartItem,
} from "./CategoryBarChart";
import { DetailToggleButton } from "./DetailToggleButton";
import { MonthSelector } from "./MonthSelector";

export type MonthlyCategoryStatCardProps = {
  date: Date;
  topCategory: { label: string; color: CategoryColor } | null;
  data: CategoryBarChartItem[];
  onSelectMonth?: (date: Date) => void;
  className?: string;
};

export function MonthlyCategoryStatCard({
  date,
  topCategory,
  data,
  onSelectMonth,
  className,
}: MonthlyCategoryStatCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <View
      className={cn(
        "w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white px-6 pb-4 pt-6",
        className
      )}
    >
      <View className="w-full gap-2">
        <MonthSelector date={date} onSelectDate={onSelectMonth} />

        <View className="flex-row flex-wrap items-center gap-1">
          {topCategory ? (
            <>
              <Text className="text-gray-900 text-b-04-m">
                이번 달 일정이 제일 많았던 카테고리는
              </Text>
              <View className="flex-row items-center gap-0.5">
                <View
                  className={cn(
                    "h-4 w-4 rounded-full",
                    CATEGORY_DOT_CLASS_NAMES[topCategory.color]
                  )}
                />
                <Text
                  className={cn(
                    "text-b-04-sb",
                    CATEGORY_TEXT_CLASS_NAMES[topCategory.color]
                  )}
                >
                  {topCategory.label}
                </Text>
              </View>
              <Text className="text-gray-900 text-b-04-m">입니다.</Text>
            </>
          ) : (
            <Text className="text-gray-900 text-b-04-m">
              등록된 카테고리가 없어요
            </Text>
          )}
        </View>
      </View>

      <CategoryBarChart data={data} />

      <DetailToggleButton
        label="자세히 보기"
        isOpen={isDetailOpen}
        onPress={() => setIsDetailOpen((prev) => !prev)}
      />

      {isDetailOpen && (
        <Animated.View
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(100)}
          className="w-full"
        >
          <CategoryAccordion groups={data} />
        </Animated.View>
      )}
    </View>
  );
}
