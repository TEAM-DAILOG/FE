import dayjs from "dayjs";
import { Pressable, Text, View } from "react-native";

import DownIcon from "@/assets/icons/downIcon.svg";
import MenuIcon from "@/assets/icons/menuIcon.svg";
import SwitchIcon from "@/assets/icons/switchIcon.svg";
import { CalendarMenuBox } from "@/src/components/calendar/CalendarMenuBox";
import { AnchoredDropdown } from "@/src/components/common/AnchoredDropdown";
import { MonthPickerBox } from "@/src/components/common/MonthPickerBox";
import { useAnchoredTrigger } from "@/src/hooks/useAnchoredTrigger";
import { cn } from "@/src/lib/cn";
import type { Category } from "@/src/types/categories/category.types";

import { HeaderContainer } from "./HeaderContainer";

export type DateHeaderProps = {
  date?: string;
  onSelectMonth: (date: string) => void;
  categories: Category[];
  selectedCategoryIds: string[];
  onChangeSelectedCategoryIds: (ids: string[]) => void;
  onPressCategorySettings: () => void;
  isAiSummaryEnabled: boolean;
  onChangeAiSummaryEnabled: (value: boolean) => void;
  onPressToggle?: () => void;
  className?: string;
};

export function DateHeader({
  date,
  onSelectMonth,
  categories,
  selectedCategoryIds,
  onChangeSelectedCategoryIds,
  onPressCategorySettings,
  isAiSummaryEnabled,
  onChangeAiSummaryEnabled,
  onPressToggle,
  className,
}: DateHeaderProps) {
  const monthPicker = useAnchoredTrigger();
  const menu = useAnchoredTrigger();

  const currentDate = date ?? dayjs().format("YYYY-MM-DD");
  const dateLabel = dayjs(currentDate).format("YYYY년 M월");

  const handleSelectMonth = (nextDate: string) => {
    onSelectMonth(nextDate);
    monthPicker.close();
  };

  const handlePressCategorySettings = () => {
    menu.close();
    onPressCategorySettings();
  };

  return (
    <HeaderContainer
      className={cn("border-gray-100", className)}
      contentClassName="justify-between"
    >
      <Pressable
        ref={monthPicker.triggerRef}
        className="flex-row items-center gap-0.5"
        onPress={monthPicker.open}
      >
        <Text className="text-green-700 text-h-01">{dateLabel}</Text>
        <DownIcon width={24} height={24} color="#3B6352" />
      </Pressable>

      <AnchoredDropdown
        visible={monthPicker.visible}
        anchor={monthPicker.anchor}
        align="left"
        onRequestClose={monthPicker.close}
      >
        <MonthPickerBox
          initialDate={currentDate}
          onSelect={handleSelectMonth}
        />
      </AnchoredDropdown>

      <View className="flex-row items-center gap-2">
        <Pressable
          className="h-6 flex-row items-center gap-0.5 rounded-[100px] bg-green-100 px-2 py-1"
          onPress={onPressToggle}
        >
          <Text className="text-green-700 text-b-05-m">일기전환</Text>
          <SwitchIcon width={16} height={16} color="#3B6352" />
        </Pressable>

        <Pressable
          ref={menu.triggerRef}
          className="size-6 items-center justify-center rounded-[100px] bg-green-100"
          onPress={menu.open}
        >
          <MenuIcon width={24} height={24} color="#020303" />
        </Pressable>
      </View>

      <AnchoredDropdown
        visible={menu.visible}
        anchor={menu.anchor}
        align="right"
        onRequestClose={menu.close}
      >
        <CalendarMenuBox
          categories={categories}
          selectedCategoryIds={selectedCategoryIds}
          onChangeSelectedCategoryIds={onChangeSelectedCategoryIds}
          onPressCategorySettings={handlePressCategorySettings}
          isAiSummaryEnabled={isAiSummaryEnabled}
          onChangeAiSummaryEnabled={onChangeAiSummaryEnabled}
        />
      </AnchoredDropdown>
    </HeaderContainer>
  );
}
