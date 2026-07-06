// src/components/schedule/ScheduleCheckItem.tsx
import { Pressable, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

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
    <View className="h-[48px] w-full flex-row items-center justify-between">
      {/* 왼쪽: 카테고리 dot + 텍스트 */}
      <View className="flex-1 flex-row items-start gap-[8px] pr-[12px]">
        <View
          className="mt-[4px] h-[8px] w-[8px] rounded-full"
          style={{ backgroundColor: categoryColor }}
        />
        <View className="flex-1">
          <Text
            style={{
              fontFamily: "SUIT-SemiBold",
              fontWeight: "600",
              fontSize: 11,
              letterSpacing: 0.2,
              color: categoryColor,
            }}
          >
            {categoryLabel.toUpperCase()}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "SUIT-Regular",
              fontSize: 14,
              lineHeight: 20,
              color: "#3A3A3A",
            }}
          >
            {description}
          </Text>
        </View>
      </View>

      {/* 오른쪽: 체크박스 (공용 컴포넌트) */}
      <Pressable
        onPress={onToggle}
        hitSlop={8}
        className={
          "h-[20px] w-[20px] items-center justify-center rounded-[4px] border-[1.5px] " +
          (checked ? "border-[#4D826C] bg-[#4D826C]" : "border-[#D9E3DC] bg-transparent")
        }
        style={{ outlineStyle: "none" } as any}
      >
        {checked && <IconSymbol name="checkmark" size={12} color="#FFFFFF" />}
      </Pressable>
    </View>
  );
}

export default ScheduleCheckItem;