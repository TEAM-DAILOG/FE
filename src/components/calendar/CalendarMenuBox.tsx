import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";

import CheckIcon from "@/assets/icons/checkCircleIcon.svg";
import DownIcon from "@/assets/icons/downIcon.svg";
import RightIcon from "@/assets/icons/rightIcon.svg";
import UpIcon from "@/assets/icons/upIcon.svg";
import { Divider } from "@/src/components/common/Divider";
import { Toggle } from "@/src/components/common/Toggle";
import { CATEGORY_DOT_CLASS_NAMES } from "@/src/constants/categoryColors";
import { cn } from "@/src/lib/cn";
import type { Category } from "@/src/types/categories/category.types";

export type CalendarMenuBoxProps = {
  categories: Category[];
  selectedCategoryIds: string[];
  onChangeSelectedCategoryIds: (ids: string[]) => void;
  onPressCategorySettings: () => void;
  isAiSummaryEnabled: boolean;
  onChangeAiSummaryEnabled: (value: boolean) => void;
};

function CheckSlot({ checked }: { checked: boolean }) {
  if (!checked) return <View className="size-4" />;

  return (
    <View className="size-4 items-center justify-center">
      <CheckIcon width={16} height={16} color="#020303" />
    </View>
  );
}

export function CalendarMenuBox({
  categories,
  selectedCategoryIds,
  onChangeSelectedCategoryIds,
  onPressCategorySettings,
  isAiSummaryEnabled,
  onChangeAiSummaryEnabled,
}: CalendarMenuBoxProps) {
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  const allCategoryIds = categories.map((category) => category.id);
  const isAllSelected =
    allCategoryIds.length > 0 &&
    allCategoryIds.every((id) => selectedCategoryIds.includes(id));

  const toggleAll = () => {
    onChangeSelectedCategoryIds(isAllSelected ? [] : allCategoryIds);
  };

  const toggleCategory = (id: string) => {
    onChangeSelectedCategoryIds(
      selectedCategoryIds.includes(id)
        ? selectedCategoryIds.filter((categoryId) => categoryId !== id)
        : [...selectedCategoryIds, id]
    );
  };

  return (
    <View className="w-[206px] gap-2 rounded-[20px] border border-gray-100 bg-gray-0 px-4 py-3">
      <View className="flex-col gap-1">
        <Pressable
          onPress={() => setIsCategoryListOpen((prev) => !prev)}
          className="flex-row items-center justify-between"
        >
          <Text className="text-gray-900 text-b-05-m">카테고리 노출</Text>
          {isCategoryListOpen ? (
            <DownIcon width={16} height={16} color="#3B6352" />
          ) : (
            <UpIcon width={16} height={16} color="#3B6352" />
          )}
        </Pressable>

        {isCategoryListOpen ? (
          <Animated.View
            entering={FadeIn.duration(300).easing(Easing.in(Easing.ease))}
            exiting={FadeOut.duration(300).easing(Easing.in(Easing.ease))}
            className="gap-0.5"
          >
            <Pressable
              onPress={toggleAll}
              className="flex-row items-center gap-2"
            >
              <CheckSlot checked={isAllSelected} />
              <View className="flex-row items-center justify-center gap-1 py-1">
                <View className="gap-0.5">
                  <View className="flex-row gap-0.5">
                    <View className="size-[5px] rounded-full bg-category-01-1" />
                    <View className="size-[5px] rounded-full bg-category-02-1" />
                  </View>
                  <View className="flex-row gap-0.5">
                    <View className="size-[5px] rounded-full bg-category-03-1" />
                    <View className="size-[5px] rounded-full bg-category-04-1" />
                  </View>
                </View>
                <Text className="text-gray-900 text-cap-r">전체보기</Text>
              </View>
            </Pressable>

            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => toggleCategory(category.id)}
                className="flex-row items-center gap-2"
              >
                <CheckSlot
                  checked={selectedCategoryIds.includes(category.id)}
                />
                <View className="flex-row items-center justify-center gap-1 py-1">
                  <View
                    className={cn(
                      "size-3 rounded-full",
                      CATEGORY_DOT_CLASS_NAMES[category.color]
                    )}
                  />
                  <Text className="text-gray-900 text-cap-r">
                    {category.name}
                  </Text>
                </View>
              </Pressable>
            ))}
          </Animated.View>
        ) : null}
      </View>

      <Divider className="border-gray-100" />

      <Pressable
        onPress={onPressCategorySettings}
        className="flex-row items-center justify-between"
      >
        <Text className="text-gray-900 text-b-05-m">카테고리 설정</Text>
        <RightIcon width={16} height={16} color="#3B6352" />
      </Pressable>

      <Divider className="border-gray-100" />

      <View className="flex-row items-center justify-between">
        <Text className="text-gray-900 text-b-05-m">AI 일기요약</Text>
        <Toggle
          size="sm"
          value={isAiSummaryEnabled}
          onValueChange={onChangeAiSummaryEnabled}
        />
      </View>
    </View>
  );
}
