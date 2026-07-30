import { Text, View } from "react-native";

import CalendarIcon from "@/assets/icons/calendarIcon.svg";
import { formatDate } from "@/src/utils/formatDate";

export type DiaryDateCardProps = {
  date: Date;
};

export function DiaryDateCard({ date }: DiaryDateCardProps) {
  return (
    <View className="flex-row items-center justify-between rounded-lg border border-gray-100 bg-white p-3">
      <Text className="text-gray-900 text-b-02-m">
        <Text className="text-green-600">* </Text>
        날짜
      </Text>

      <View className="flex-row items-center gap-1">
        <CalendarIcon width={24} height={24} color="#020303" />
        <Text className="text-gray-800 text-b-03-r">{formatDate(date)}</Text>
      </View>
    </View>
  );
}
