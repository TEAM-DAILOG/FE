import { Text, View } from "react-native";

import { Checkbox } from "@/src/components/common/Checkbox";

export type ScheduleCheckItemProps = {
  categoryLabel: string;
  categoryColor: string; // e.g. "#5B8FD9"
  description: string;
  checked: boolean;
  onToggle: () => void;
};

export function ScheduleCheckItem({
  categoryLabel,
  categoryColor,
  description,
  checked,
  onToggle,
}: ScheduleCheckItemProps) {
  return (
    <View
      className="w-full flex-row items-center justify-between rounded-xl border bg-gray-0 px-3 py-2"
      style={{ borderColor: `${categoryColor}33` }}
    >
      {/* 왼쪽: 카테고리 dot + 텍스트 */}
      <View className="flex-1 gap-0.5">
        <View className="flex-row items-center gap-1">
          <View
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: categoryColor }}
          />
          <Text className="text-b-05-b" style={{ color: categoryColor }}>
            {categoryLabel.toUpperCase()}
          </Text>
        </View>
        <Text numberOfLines={1} className="text-gray-800 text-b-03-m">
          {description}
        </Text>
      </View>

      {/* 오른쪽: 체크박스 (공용 컴포넌트) */}
      <Checkbox checked={checked} onToggle={onToggle} />
    </View>
  );
}

export default ScheduleCheckItem;
