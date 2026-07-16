import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import DownIcon from "@/assets/icons/downIcon.svg";
import {
  CATEGORY_DOT_CLASS_NAMES,
  CATEGORY_TEXT_CLASS_NAMES,
} from "@/src/constants/categorycolors";
import { cn } from "@/src/lib/cn";
import type { CategoryColor } from "@/src/types/categories/category.types";

import { CategoryAccordion } from "./CategoryAccordion";
import {
  CategoryBarChart,
  type CategoryBarChartItem,
} from "./CategoryBarChart";
import { DetailToggleButton } from "./DetailToggleButton";

export type MonthlyCategoryStatCardProps = {
  year: number;
  month: number;
  topCategory: { label: string; color: CategoryColor };
  data: CategoryBarChartItem[];
  onPressMonth?: () => void;
  className?: string;
};

export function MonthlyCategoryStatCard({
  year,
  month,
  topCategory,
  data,
  onPressMonth,
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
        <Pressable
          className="flex-row items-center gap-1"
          onPress={onPressMonth}
        >
          <Text className="text-gray-900 text-h-01">
            {year}년 {month}월
          </Text>
          <DownIcon width={24} height={24} color="#020303" />
        </Pressable>

        <View className="flex-row flex-wrap items-center gap-1">
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
