import { View } from "react-native";

import { cn } from "@/src/lib/cn";
import { clampPercentage } from "@/src/utils/clampPercentage";

export type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clampedValue = clampPercentage(value);

  return (
    <View className={cn("h-3 w-full rounded-full bg-gray-100", className)}>
      <View
        className="h-3 rounded-full bg-green-600"
        style={{ width: `${clampedValue}%` }}
      />
    </View>
  );
}
