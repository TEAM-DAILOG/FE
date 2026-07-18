import dayjs from "dayjs";
import { Pressable, Text, View } from "react-native";

import LeftIcon from "@/assets/icons/leftIcon.svg";
import RightIcon from "@/assets/icons/rightIcon.svg";

type DatePickerHeaderProps = {
  month: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export function DatePickerHeader({
  month,
  onPrevMonth,
  onNextMonth,
}: DatePickerHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-gray-900 text-b-02-m">
        {dayjs(month).format("YYYY년 M월")}
      </Text>
      <View className="flex-row items-center gap-2">
        <Pressable onPress={onPrevMonth} hitSlop={8}>
          <LeftIcon width={24} height={24} color="#020303" />
        </Pressable>
        <Pressable onPress={onNextMonth} hitSlop={8}>
          <RightIcon width={24} height={24} color="#020303" />
        </Pressable>
      </View>
    </View>
  );
}
