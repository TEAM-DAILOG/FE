import { Text, View } from "react-native";

import { AddButton } from "@/src/components/common/AddButton";
import { cn } from "@/src/lib/cn";

export type ScheduleRecommendItemProps = {
  categoryLabel: string;
  categoryColor: string;
  description: string;
  buttonLabel?: string;
  size?: "md" | "sm";
  onPressAdd?: () => void;
  className?: string;
};

const SIZE_STYLES = {
  md: {
    container: "shadow-card-2",
    content: "flex-1 gap-1",
    categoryText: "text-b-03-sb",
    descriptionText: "text-b-03-m",
  },
  sm: {
    container: "",
    content: "flex-1 gap-0.5",
    categoryText: "text-b-04-sb",
    descriptionText: "text-b-04-m",
  },
} as const;

export function ScheduleRecommendItem({
  categoryLabel,
  categoryColor,
  description,
  buttonLabel = "일정추가",
  size = "md",
  onPressAdd,
  className,
}: ScheduleRecommendItemProps) {
  const styles = SIZE_STYLES[size];

  return (
    <View
      className={cn(
        "w-full flex-row items-center justify-between rounded-lg bg-gray-0 p-2.5",
        styles.container,
        className
      )}
    >
      <View className={styles.content}>
        <View className="flex-row items-center gap-1">
          <View
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: categoryColor }}
          />
          <Text
            className={styles.categoryText}
            style={{ color: categoryColor }}
          >
            {categoryLabel.toUpperCase()}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          className={cn("text-green-800", styles.descriptionText)}
        >
          {description}
        </Text>
      </View>

      <AddButton label={buttonLabel} onPress={onPressAdd} className="ml-2" />
    </View>
  );
}
