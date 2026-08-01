import { Pressable, Text, View } from "react-native";

import CloseIcon from "@/assets/icons/closeIcon.svg";
import InfoIcon from "@/assets/icons/infoIcon.svg";
import {
  AnchoredDropdown,
  Button,
  ScheduleItem,
} from "@/src/components/common";
import { useAnchoredTrigger } from "@/src/hooks/useAnchoredTrigger";
import { cn } from "@/src/lib/cn";
import type { CategoryColor } from "@/src/types/categories/category.types";

export type ScheduleRecommendItemData = {
  id: string;
  categoryLabel: string;
  categoryColor: CategoryColor;
  description: string;
};

export type ScheduleRecommendSectionProps = {
  items: ScheduleRecommendItemData[];
  onPressAdd?: (id: string) => void;
  onPressRefresh?: () => void;
  refreshLabel?: string;
  isRefreshDisabled?: boolean;
  className?: string;
};

export function ScheduleRecommendSection({
  items,
  onPressAdd,
  onPressRefresh,
  refreshLabel = "다른 일정 추천받기",
  isRefreshDisabled,
  className,
}: ScheduleRecommendSectionProps) {
  const info = useAnchoredTrigger();

  return (
    <View className={cn("gap-4", className)}>
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-900 text-h-02">일정 추천</Text>

        <Pressable
          ref={info.triggerRef}
          onPress={() => (info.visible ? info.close() : info.open())}
        >
          <InfoIcon width={24} height={24} color="#020303" />
        </Pressable>
      </View>

      <View className="gap-3">
        {items.map((item) => (
          <ScheduleItem
            key={item.id}
            categoryLabel={item.categoryLabel}
            categoryColor={item.categoryColor}
            description={item.description}
            action={{
              type: "button",
              label: "일정추가",
              onPress: () => onPressAdd?.(item.id),
            }}
          />
        ))}
      </View>

      <Button
        label={refreshLabel}
        variant="fill-green"
        onPress={onPressRefresh}
        disabled={isRefreshDisabled}
      />

      <AnchoredDropdown
        visible={info.visible}
        anchor={info.anchor}
        align="right"
        onRequestClose={info.close}
      >
        <View className="w-[219px] flex-row items-center justify-center gap-1 rounded-lg border border-gray-100 bg-gray-0 px-3 py-2">
          <Text numberOfLines={1} className="shrink text-gray-900 text-b-04-r">
            작성하신 일기를 기반으로 추천됩니다.
          </Text>
          <Pressable onPress={info.close} hitSlop={8}>
            <CloseIcon width={16} height={16} color="#020303" />
          </Pressable>
        </View>
      </AnchoredDropdown>
    </View>
  );
}
