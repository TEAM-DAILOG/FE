import { Text, View } from "react-native";

import { AddButton } from "@/src/components/common/AddButton";
import { Checkbox } from "@/src/components/common/Checkbox";
import {
  CATEGORY_BORDER_CLASS_NAMES,
  CATEGORY_DOT_CLASS_NAMES,
  CATEGORY_TEXT_CLASS_NAMES,
} from "@/src/constants/categorycolors";
import { cn } from "@/src/lib/cn";
import type { CategoryColor } from "@/src/types/categories/category.types";

export type ScheduleItemAction =
  | { type: "checkbox"; checked: boolean; onToggle: () => void }
  | { type: "button"; label: string; onPress?: () => void }
  | { type: "none" };

export type ScheduleItemProps = {
  categoryLabel: string;
  categoryColor: CategoryColor;
  description: string;
  date?: string;
  action: ScheduleItemAction;
  className?: string;
};

export function ScheduleItem({
  categoryLabel,
  categoryColor,
  description,
  date,
  action,
  className,
}: ScheduleItemProps) {
  // 버튼/체크박스가 있으면 오른쪽 공간이 좁아 날짜를 위에 따로 쌓고,
  // 액션이 없는(완료) 항목은 카테고리 줄 오른쪽에 날짜를 나란히 붙인다.
  const isDateInline = action.type === "none";

  return (
    <View
      className={cn(
        "w-full flex-row items-center justify-between rounded-xl border bg-gray-0 px-3 py-2",
        CATEGORY_BORDER_CLASS_NAMES[categoryColor],
        className
      )}
    >
      <View className="flex-1 gap-1">
        {date && !isDateInline && (
          <Text className="text-cap-r text-gray-600">{date}</Text>
        )}

        <View className="gap-0.5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <View
                className={cn(
                  "h-4 w-4 rounded-full",
                  CATEGORY_DOT_CLASS_NAMES[categoryColor]
                )}
              />
              <Text
                className={cn(
                  "text-b-05-b",
                  CATEGORY_TEXT_CLASS_NAMES[categoryColor]
                )}
              >
                {categoryLabel.toUpperCase()}
              </Text>
            </View>
            {date && isDateInline && (
              <Text className="text-cap-r text-gray-600">{date}</Text>
            )}
          </View>
          <Text numberOfLines={1} className="text-gray-800 text-b-03-m">
            {description}
          </Text>
        </View>
      </View>

      {action.type === "checkbox" && (
        <Checkbox
          checked={action.checked}
          onToggle={action.onToggle}
          className="ml-2"
        />
      )}
      {action.type === "button" && (
        <AddButton
          label={action.label}
          onPress={action.onPress}
          className="ml-2"
        />
      )}
    </View>
  );
}
