import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { CATEGORY_DOT_CLASS_NAMES } from "@/src/constants/categorycolors";
import { cn } from "@/src/lib/cn";
import type { CategoryColor } from "@/src/types/categories/category.types";

export type CategoryScheduleItem = {
  id: string;
  name: string;
  date: string;
};

export type CategoryBarChartItem = {
  id: string;
  label: string;
  count: number;
  color: CategoryColor;
  schedules?: CategoryScheduleItem[];
};

export type CategoryBarChartProps = {
  data: CategoryBarChartItem[];
  maxBarHeight?: number;
  className?: string;
};

// 최소 막대 높이
const MIN_BAR_HEIGHT = 12;
// 카운트 라벨이 막대 위에 있을 여유 공간
const COUNT_LABEL_SPACE = 22;

export function CategoryBarChart({
  data,
  maxBarHeight = 125,
  className,
}: CategoryBarChartProps) {
  const maxCount = Math.max(1, ...data.map((item) => item.count));
  const trackHeight = maxBarHeight + COUNT_LABEL_SPACE;

  return (
    <View
      className={cn(
        "w-full flex-row items-end justify-between gap-2",
        className
      )}
    >
      {data.map((item) => (
        <CategoryBar
          key={item.id}
          item={item}
          trackHeight={trackHeight}
          height={
            item.count === 0
              ? 0
              : Math.max(
                  MIN_BAR_HEIGHT,
                  Math.round((item.count / maxCount) * maxBarHeight)
                )
          }
        />
      ))}
    </View>
  );
}

function CategoryBar({
  item,
  height,
  trackHeight,
}: {
  item: CategoryBarChartItem;
  height: number;
  trackHeight: number;
}) {
  const animatedHeight = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withTiming(height, { duration: 550 });
  }, [animatedHeight, height]);

  const barStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  return (
    <View className="flex-1 items-center gap-2">
      <View
        style={{ height: trackHeight }}
        className="w-full items-center justify-end gap-1"
      >
        <Text className="text-gray-900 text-b-04-sb">{item.count}회</Text>
        <Animated.View
          className={cn(
            "w-full max-w-[40px] rounded-t",
            CATEGORY_DOT_CLASS_NAMES[item.color]
          )}
          style={barStyle}
        />
      </View>
      <Text numberOfLines={1} className="text-center text-gray-900 text-b-05-m">
        {item.label}
      </Text>
    </View>
  );
}
