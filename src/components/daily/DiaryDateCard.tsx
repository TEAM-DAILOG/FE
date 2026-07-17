import { Pressable, Text, View } from "react-native";

import CalendarIcon from "@/assets/icons/calendarIcon.svg";
import { formatDate } from "@/src/utils/formatDate";

export type DiaryDateCardProps = {
  date: Date;
  onPress: () => void;
};

export function DiaryDateCard({ date, onPress }: DiaryDateCardProps) {
  return (
    <View className="flex-row items-center justify-between rounded-lg border border-gray-100 bg-white p-3">
      <Text className="text-gray-900 text-b-02-m">
        <Text className="text-green-600">* </Text>
        날짜
      </Text>

      {/* TODO: 날짜 선택 모달 머지되면 onPress에서 모달 열도록 연결 */}
      <Pressable className="flex-row items-center gap-1" onPress={onPress}>
        <CalendarIcon width={24} height={24} color="#020303" />
        <Text className="text-gray-800 text-b-03-r">{formatDate(date)}</Text>
      </Pressable>
    </View>
  );
}
