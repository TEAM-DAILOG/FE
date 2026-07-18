import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { CalendarGrid } from "@/src/components/calendar/CalendarGrid";
import { ThreadTab } from "@/src/components/calendar/ThreadTab";
import { cn } from "@/src/lib/cn";
import type { CalendarDayInfo } from "@/src/types/calendar/calendarGrid.types";
import type {
  DiaryPanelTab,
  ThreadItem,
} from "@/src/types/calendar/diaryPanel.types";

type DiaryPanelProps = {
  month: string;
  onDayPress?: (date: string, isCurrentMonth: boolean) => void;
  getDayInfo?: (date: string, isCurrentMonth: boolean) => CalendarDayInfo;
  threadItems: ThreadItem[];
  isAiSummaryEnabled: boolean;
};

const TABS: { key: DiaryPanelTab; label: string }[] = [
  { key: "calendar", label: "캘린더" },
  { key: "thread", label: "스레드" },
];

export function DiaryPanel({
  month,
  onDayPress,
  getDayInfo,
  threadItems,
  isAiSummaryEnabled,
}: DiaryPanelProps) {
  const [tab, setTab] = useState<DiaryPanelTab>("calendar");

  return (
    <View className="flex-1 gap-4">
      <View className="flex-row gap-2 border-b border-gray-200 px-4 pt-3">
        {TABS.map(({ key, label }) => (
          <Pressable
            key={key}
            onPress={() => setTab(key)}
            className={cn(
              "-mb-px flex-1 items-center border-b px-2.5 py-2",
              tab === key ? "border-green-700" : "border-transparent"
            )}
          >
            <Text
              className={cn(
                tab === key
                  ? "text-green-700 text-b-02-sb"
                  : "text-gray-400 text-b-02-m"
              )}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-1 px-4">
        {tab === "calendar" ? (
          <CalendarGrid
            month={month}
            mode="diary"
            onDayPress={onDayPress}
            getDayInfo={getDayInfo}
          />
        ) : (
          <ThreadTab
            month={month}
            items={threadItems}
            isAiSummaryEnabled={isAiSummaryEnabled}
          />
        )}
      </View>
    </View>
  );
}
