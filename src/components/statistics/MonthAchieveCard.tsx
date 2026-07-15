import { Pressable, Text, View } from "react-native";

import RightIcon from "@/assets/icons/rightIcon.svg";
import { ProgressBar } from "@/src/components/common";
import { cn } from "@/src/lib/cn";
import { clampPercentage } from "@/src/utils/clampPercentage";

export type MonthAchieveCardProps = {
  month: number;
  achievementRate: number;
  onPressIncomplete?: () => void;
  className?: string;
};

export function MonthAchieveCard({
  month,
  achievementRate,
  onPressIncomplete,
  className,
}: MonthAchieveCardProps) {
  const clampedRate = clampPercentage(achievementRate);

  return (
    <View
      className={cn(
        "items-end gap-3 rounded-xl border border-green-100 bg-gray-0 px-3 py-4",
        className
      )}
    >
      <View className="w-full gap-2">
        <Text className="text-green-800 text-b-02-m">
          지난 달({month}월)의 일정 달성률은{" "}
          <Text className="text-green-600 text-b-02-sb">{clampedRate}%</Text>
          입니다.
        </Text>

        <ProgressBar value={clampedRate} />
      </View>

      <Pressable className="flex-row items-center" onPress={onPressIncomplete}>
        <Text className="text-green-700 text-b-04-r">미완료 일정 보기</Text>
        <RightIcon width={20} height={20} color="#3B6352" />
      </Pressable>
    </View>
  );
}
