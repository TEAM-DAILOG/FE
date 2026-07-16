import { useRef, useState, type ComponentRef } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import CloseIcon from "@/assets/icons/closeIcon.svg";
import InfoIcon from "@/assets/icons/infoIcon.svg";
import { Button, ScheduleItem } from "@/src/components/common";
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
  className?: string;
};

export function ScheduleRecommendSection({
  items,
  onPressAdd,
  onPressRefresh,
  className,
}: ScheduleRecommendSectionProps) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [infoTop, setInfoTop] = useState(0);
  const infoIconRef = useRef<ComponentRef<typeof Pressable>>(null);

  const openInfo = () => {
    infoIconRef.current?.measureInWindow((_x, y, _width, height) => {
      setInfoTop(y + height + 4);
      setIsInfoVisible(true);
    });
  };

  return (
    <View className={cn("gap-4", className)}>
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-900 text-h-02">일정 추천</Text>

        <Pressable
          ref={infoIconRef}
          onPress={() => (isInfoVisible ? setIsInfoVisible(false) : openInfo())}
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
        label="다른 일정 추천받기"
        variant="fill-green"
        onPress={onPressRefresh}
      />

      {/* info */}
      <Modal
        transparent
        visible={isInfoVisible}
        animationType="fade"
        onRequestClose={() => setIsInfoVisible(false)}
      >
        <Pressable
          onPress={() => setIsInfoVisible(false)}
          className="absolute inset-0 bg-bg/30"
        />

        <View
          style={{ position: "absolute", top: infoTop }}
          className="right-4 w-[219px] flex-row items-center justify-center gap-1 rounded-lg border border-gray-100 bg-gray-0 px-3 py-2"
        >
          <Text numberOfLines={1} className="shrink text-gray-900 text-b-04-r">
            작성하신 일기를 기반으로 추천됩니다.
          </Text>
          <Pressable onPress={() => setIsInfoVisible(false)} hitSlop={8}>
            <CloseIcon width={16} height={16} color="#020303" />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
