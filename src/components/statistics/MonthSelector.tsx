import { Pressable, Text } from "react-native";

import DownIcon from "@/assets/icons/downIcon.svg";
import { cn } from "@/src/lib/cn";

export type MonthSelectorProps = {
  year: number;
  month: number;
  onPress?: () => void;
  className?: string;
};

export function MonthSelector({
  year,
  month,
  onPress,
  className,
}: MonthSelectorProps) {
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
