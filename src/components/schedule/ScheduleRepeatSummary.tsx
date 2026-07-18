import { Text, View } from "react-native";

import type { ScheduleRepeatValue } from "@/src/types/modals/datepickerModal.types";
import { getScheduleRepeatSummary } from "@/src/utils";

type ScheduleRepeatSummaryProps = {
  value: ScheduleRepeatValue;
  textClassName?: string;
};

// 반복 일정 설정값 텍스트 컴포넌트
export function ScheduleRepeatSummary({
  value,
  textClassName,
}: ScheduleRepeatSummaryProps) {
  const summary = getScheduleRepeatSummary(value);

  if (!summary) {
    return <Text className={textClassName}>없음</Text>;
  }

  return (
    <View className="flex-row items-center gap-1.5">
      <Text className={textClassName}>{summary.mode}</Text>
      <Text className={textClassName}>|</Text>
      <View className="flex-row items-center gap-1">
        {summary.parts.map((part, index) => (
          <Text key={index} className={textClassName}>
            {part.text}
          </Text>
        ))}
      </View>
    </View>
  );
}
