import { useState } from "react";
import { Text, View } from "react-native";

import {
  TimeWheelPicker,
  WeekdaySelector,
  type TimeWheelValue,
  type Weekday,
} from "@/src/components/alarm";
import {
  BackHeader,
  Button,
  Divider,
  ScreenContainer,
  Toggle,
} from "@/src/components/common";
import { formatTimeWheelValue } from "@/src/utils/formatTimeWheelValue";

export default function AlarmScreen() {
  const [isDiaryWriteEnabled, setIsDiaryWriteEnabled] = useState(true);
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([
    "mon",
    "wed",
    "fri",
  ]);
  const [time, setTime] = useState<TimeWheelValue>({
    period: "pm",
    hour: 9,
    minute: 30,
  });

  const handleToggleDay = (day: Weekday) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
    );
  };

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="일기 작성 알림" />

      <View className="mx-4 mt-5 gap-3 rounded-lg border border-green-100 bg-white px-3 py-4">
        <View className="gap-2">
          <View className="flex-row items-start justify-between">
            <Text className="text-green-900 text-b-02-m">일기 작성 알림</Text>
            <Toggle
              value={isDiaryWriteEnabled}
              onValueChange={setIsDiaryWriteEnabled}
            />
          </View>

          {isDiaryWriteEnabled ? (
            <Text className="self-end text-green-900 text-b-03-m">
              {formatTimeWheelValue(time)}
            </Text>
          ) : null}
        </View>

        {isDiaryWriteEnabled ? (
          <>
            <Divider className="border-green-100" />

            <WeekdaySelector
              selectedDays={selectedDays}
              onToggleDay={handleToggleDay}
            />

            <TimeWheelPicker value={time} onChange={setTime} />
          </>
        ) : null}
      </View>

      <View className="flex-1 justify-end px-4 pb-12">
        <Button label="저장" />
      </View>
    </ScreenContainer>
  );
}
