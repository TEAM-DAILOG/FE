import { Text, View } from "react-native";

import { Divider } from "@/src/components/common";
import { DiaryCard } from "@/src/components/common/DiaryCard";
import type { ThreadItem } from "@/src/types/calendar/diaryPanel.types";
import {
  getThreadDateParts,
  getThreadMonthKey,
  getThreadMonthLabelParts,
} from "@/src/utils";

type ThreadTabProps = {
  month: string;
  items: ThreadItem[];
  isAiSummaryEnabled: boolean;
};

// 임시 함수
function DiaryThreadCard({ item }: { item: ThreadItem }) {
  const images = item.images.slice(0, 3);

  if (images.length === 0) {
    return (
      <DiaryCard variant="no-image" title={item.title} content={item.content} />
    );
  }

  if (images.length === 1) {
    return (
      <DiaryCard
        variant="one-image"
        title={item.title}
        content={item.content}
        images={[{ uri: images[0] }]}
      />
    );
  }

  if (images.length === 2) {
    return (
      <DiaryCard
        variant="two-images"
        title={item.title}
        content={item.content}
        images={[{ uri: images[0] }, { uri: images[1] }]}
      />
    );
  }

  return (
    <DiaryCard
      variant="three-images"
      title={item.title}
      content={item.content}
      images={[{ uri: images[0] }, { uri: images[1] }, { uri: images[2] }]}
    />
  );
}

type ThreadGroup = {
  monthKey: string;
  date: string;
  items: ThreadItem[];
};

function groupByMonth(items: ThreadItem[]): ThreadGroup[] {
  const groups: ThreadGroup[] = [];

  for (const item of items) {
    const monthKey = getThreadMonthKey(item.date);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup?.monthKey === monthKey) {
      lastGroup.items.push(item);
    } else {
      groups.push({ monthKey, date: item.date, items: [item] });
    }
  }

  return groups;
}

export function ThreadTab({
  month,
  items,
  isAiSummaryEnabled,
}: ThreadTabProps) {
  const groups = groupByMonth(items);
  const currentMonthKey = getThreadMonthKey(month);

  return (
    <View className="gap-4">
      {groups.map((group, index) => {
        const { yearLabel, monthLabel } = getThreadMonthLabelParts(group.date);

        return (
          <View key={group.monthKey} className="gap-4">
            {index > 0 && <Divider className="mb-2 mt-3 border-green-100" />}

            {group.monthKey !== currentMonthKey && (
              <View className="flex-row items-center gap-1 self-start rounded-s bg-gray-100 px-2 py-1">
                <Text className="text-gray-800 text-b-02-sb">{yearLabel}</Text>
                <Text className="text-gray-800 text-b-02-sb">{monthLabel}</Text>
              </View>
            )}

            {group.items.map((item) => {
              const { dayLabel, weekdayLabel } = getThreadDateParts(item.date);

              return (
                <View key={item.diaryId} className="gap-2">
                  <View className="flex-row items-start gap-1">
                    <Text className="text-gray-900 text-b-03-m">
                      {dayLabel}
                    </Text>
                    <View className="flex-row items-start">
                      <Text className="text-gray-900 text-b-03-m">
                        {weekdayLabel}
                      </Text>
                      {item.isUnread ? (
                        <View className="size-1.5 rounded-full bg-notification" />
                      ) : null}
                    </View>
                  </View>

                  {isAiSummaryEnabled ? (
                    <DiaryCard variant="summary" summary={item.summary} />
                  ) : (
                    <DiaryThreadCard item={item} />
                  )}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
