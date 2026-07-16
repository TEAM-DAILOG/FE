import { Pressable, Text, View } from "react-native";

import { cn } from "@/src/lib/cn";
import { DATE_PICKER_TABS } from "@/src/constants";
import type { DatePickerTabKey } from "@/src/types/modals/datepickerModal.types";

type DatePickerTabsProps = {
  activeTab: DatePickerTabKey;
  onChangeTab: (tab: DatePickerTabKey) => void;
};

export function DatePickerTabs({
  activeTab,
  onChangeTab,
}: DatePickerTabsProps) {
  return (
    <View className="flex-row flex-wrap gap-1">
      {DATE_PICKER_TABS.map((tab) => (
        <Pressable
          key={tab.key}
          onPress={() => onChangeTab(tab.key)}
          className={cn(
            "items-center justify-center rounded-[100px] px-2 py-0.5",
            activeTab === tab.key ? "bg-green-600" : "bg-gray-100"
          )}
        >
          <Text
            className={cn(
              activeTab === tab.key
                ? "text-gray-0 text-b-03-m"
                : "text-gray-600 text-b-03-r"
            )}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
