import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { DiaryThreadCard } from "@/src/components/calendar/DiaryThreadCard";
import { Divider } from "@/src/components/common";
import type { ThreadItem } from "@/src/types/calendar/diaryPanel.types";
import {
  getThreadDateParts,
  getThreadMonthKey,
  getThreadMonthLabelParts,
} from "@/src/utils";
import { groupThreadItemsByMonth } from "@/src/utils/groupThreadItemsByMonth";

type ThreadTabProps = {
  month: string;
  items: ThreadItem[];
};

export function ThreadTab({ month, items }: ThreadTabProps) {
  const router = useRouter();
  const groups = groupThreadItemsByMonth(items);
  const currentMonthKey = getThreadMonthKey(month);

  const openDiaryDetail = (diaryId: number) => {
    router.push({ pathname: "/diary/[id]", params: { id: String(diaryId) } });
  };

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
                        <View className="bg-notification size-1.5 rounded-full" />
                      ) : null}
                    </View>
                  </View>

                  <Pressable onPress={() => openDiaryDetail(item.diaryId)}>
                    <DiaryThreadCard item={item} />
                  </Pressable>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
