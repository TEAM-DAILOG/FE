import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

import DownIcon from "@/assets/icons/downIcon.svg";
import { Divider } from "@/src/components/common";
import { CATEGORY_DOT_CLASS_NAMES } from "@/src/constants/categorycolors";
import { cn } from "@/src/lib/cn";

import type { CategoryBarChartItem } from "./CategoryBarChart";

export type CategoryAccordionProps = {
  groups: CategoryBarChartItem[];
  className?: string;
};

export function CategoryAccordion({ groups, className }: CategoryAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );

  return (
    <View className={cn("w-full gap-3", className)}>
      {groups.map((group, index) => (
        <View key={group.id} className="gap-3">
          {index > 0 && <Divider className="border-green-100" />}
          <CategoryAccordionRow
            group={group}
            isOpen={openIds.includes(group.id)}
            onToggle={() => toggle(group.id)}
          />
        </View>
      ))}
    </View>
  );
}

function CategoryAccordionRow({
  group,
  isOpen,
  onToggle,
}: {
  group: CategoryBarChartItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const schedules = group.schedules ?? [];

  return (
    <Animated.View layout={LinearTransition.duration(200)} className="gap-3">
      <Pressable
        className="flex-row items-center justify-between"
        onPress={onToggle}
      >
        <View className="flex-row items-center gap-1">
          <View
            className={cn(
              "h-5 w-5 rounded-full",
              CATEGORY_DOT_CLASS_NAMES[group.color]
            )}
          />
          <Text className="text-gray-900 text-b-03-m">{group.label}</Text>
        </View>

        <View style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}>
          <DownIcon width={24} height={24} color="#020303" />
        </View>
      </Pressable>

      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(100)}
          className="gap-2"
        >
          {schedules.length === 0 ? (
            <Text className="pl-6 text-gray-800 text-b-04-m">
              등록된 일정이 없어요
            </Text>
          ) : (
            schedules.map((schedule) => (
              <View
                key={schedule.id}
                className="flex-row items-center justify-between pl-6"
              >
                <Text className="text-green-800 text-b-04-m">
                  {schedule.name}
                </Text>
                <Text className="text-gray-400 text-b-05-m">
                  {schedule.date}
                </Text>
              </View>
            ))
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
}
