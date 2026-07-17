import { Pressable, Text } from "react-native";

import DownIcon from "@/assets/icons/downIcon.svg";
import { cn } from "@/src/lib/cn";
import { formatYearMonth } from "@/src/utils/formatDate";

export type MonthSelectorProps = {
  date: Date;
  onPress?: () => void;
  className?: string;
};

export function MonthSelector({
  date,
  onPress,
  className,
}: MonthSelectorProps) {
  const { year, month } = formatYearMonth(date);

  return (
    <Pressable
      className={cn("flex-row items-center gap-1", className)}
      onPress={onPress}
    >
      <Text className="text-gray-900 text-h-01">
        {year}년 {month}월
      </Text>
      <DownIcon width={24} height={24} color="#020303" />
    </Pressable>
  );
}
