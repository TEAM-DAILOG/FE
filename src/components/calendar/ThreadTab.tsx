import dayjs from "dayjs";
import { Text, View } from "react-native";

import { Divider } from "@/src/components/common";
import { DiaryCard } from "@/src/components/common/DiaryCard";
import { WEEKDAY_LABELS } from "@/src/constants";
import type { ThreadItem } from "@/src/types/calendar/diaryPanel.types";

type ThreadTabProps = {
  month: string;
  items: ThreadItem[];
};

type ThreadGroup = {
  month: string;
  items: ThreadItem[];
};

function groupByMonth(items: ThreadItem[]): ThreadGroup[] {
  const groups: ThreadGroup[] = [];

  for (const item of items) {
    const month = dayjs(item.date).format("YYYY년 M월");
    const lastGroup = groups[groups.length - 1];

    if (lastGroup?.month === month) {
      lastGroup.items.push(item);
    } else {
      groups.push({ month, items: [item] });
    }
  }

  return groups;
}

export function ThreadTab({ month, items }: ThreadTabProps) {
  const groups = groupByMonth(items);
  const currentMonthLabel = dayjs(month).format("YYYY년 M월");

  return (
    <View className="gap-4">
      {groups.map((group, index) => (
        <View key={group.month} className="gap-4">
          {index > 0 && <Divider className="mb-2 mt-3 border-green-100" />}

          {group.month !== currentMonthLabel && (
            <View className="self-start rounded-s bg-gray-100 px-2 py-1">
              <Text className="text-gray-800 text-b-02-sb">{group.month}</Text>
            </View>
          )}

          {group.items.map((item) => (
            <View key={item.date} className="gap-2">
              <View className="flex-row items-start">
                <Text className="text-gray-900 text-b-03-m">
                  {dayjs(item.date).format("D")} (
                  {WEEKDAY_LABELS[dayjs(item.date).day()]})
                </Text>
                {item.isUnread ? (
                  <View className="size-1.5 rounded-full bg-notification" />
                ) : null}
              </View>

              <DiaryCard variant="summary" summary={item.summary} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
