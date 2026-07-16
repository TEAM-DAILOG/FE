import dayjs from "dayjs";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import LeftIcon from "@/assets/icons/leftIcon.svg";
import RightIcon from "@/assets/icons/rightIcon.svg";
import { cn } from "@/src/lib/cn";

export type MonthPickerBoxProps = {
  initialDate: string;
  onSelect: (date: string) => void;
};

const MONTH_COLUMN_COUNT = 4;
const MONTH_ROWS = Array.from({ length: 12 / MONTH_COLUMN_COUNT }, (_, row) =>
  Array.from(
    { length: MONTH_COLUMN_COUNT },
    (_, col) => row * MONTH_COLUMN_COUNT + col
  )
);

export function MonthPickerBox({ initialDate, onSelect }: MonthPickerBoxProps) {
  const [viewYear, setViewYear] = useState(() => dayjs(initialDate).year());
  const selectedYear = dayjs(initialDate).year();
  const selectedMonth = dayjs(initialDate).month();

  const goPrevYear = () => setViewYear((prev) => prev - 1);
  const goNextYear = () => setViewYear((prev) => prev + 1);

  const handleSelectMonth = (month: number) => {
    onSelect(dayjs().year(viewYear).month(month).date(1).format("YYYY-MM-DD"));
  };

  return (
    <View className="w-[180px] rounded-lg bg-gray-0 p-3 shadow-dropdown">
      <View className="flex-row items-center justify-between border-b border-gray-100 pb-2">
        <Text className="text-gray-900 text-b-03-sb">{viewYear}년</Text>
        <View className="flex-row items-center gap-1">
          <Pressable onPress={goPrevYear} hitSlop={8}>
            <LeftIcon width={20} height={20} color="#020303" />
          </Pressable>
          <Pressable onPress={goNextYear} hitSlop={8}>
            <RightIcon width={20} height={20} color="#020303" />
          </Pressable>
        </View>
      </View>

      <View className="gap-2">
        {MONTH_ROWS.map((row) => (
          <View key={row[0]} className="flex-row justify-between">
            {row.map((month) => {
              const isSelected =
                viewYear === selectedYear && month === selectedMonth;

              return (
                <Pressable
                  key={month}
                  onPress={() => handleSelectMonth(month)}
                  className="aspect-square size-9 items-center justify-center"
                >
                  <Text
                    className={cn(
                      isSelected
                        ? "text-green-600 text-b-04-sb"
                        : "text-gray-800 text-b-04-r"
                    )}
                  >
                    {month + 1}월
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
