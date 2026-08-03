import { useEffect, useState } from "react";
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
import { usePatchAlarmSettings } from "@/src/hooks/mutations/alarm/usePatchAlarmSettings";
import { usePatchReminderSettings } from "@/src/hooks/mutations/alarm/usePatchReminderSettings";
import { useGetReminderSettings } from "@/src/hooks/queries/alarm/useGetReminderSettings";
import {
  createPatchReminderSettingsParams,
  formatReminderSettings,
} from "@/src/types/alarm/alarm.mappers";
import { formatTimeWheelValue } from "@/src/utils/formatTimeWheelValue";

export default function AlarmScreen() {
  const { data: reminderSettings } = useGetReminderSettings();
  const patchAlarmSettingsMutation = usePatchAlarmSettings();
  const patchReminderSettingsMutation = usePatchReminderSettings();

  // 이 화면은 PushAlarmCard에서 isDiary가 true일 때만 진입 가능하므로 true로 시작
  const [isDiaryWriteEnabled, setIsDiaryWriteEnabled] = useState(true);
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([]);
  const [time, setTime] = useState<TimeWheelValue | null>(null);

  useEffect(() => {
    if (!reminderSettings) {
      return;
    }
    const { selectedDays: days, time: reminderTime } =
      formatReminderSettings(reminderSettings);
    setSelectedDays(days);
    setTime(reminderTime);
  }, [reminderSettings]);

  const handleChangeDiaryWriteEnabled = (value: boolean) => {
    setIsDiaryWriteEnabled(value);
    patchAlarmSettingsMutation.mutate({ isDiary: value });
  };

  const handleToggleDay = (day: Weekday) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    if (!time) {
      return;
    }

    patchReminderSettingsMutation.mutate(
      createPatchReminderSettingsParams(selectedDays, time)
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
              onValueChange={handleChangeDiaryWriteEnabled}
            />
          </View>

          {isDiaryWriteEnabled && time ? (
            <Text className="self-end text-green-900 text-b-03-m">
              {formatTimeWheelValue(time)}
            </Text>
          ) : null}
        </View>

        {isDiaryWriteEnabled && time ? (
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
        <Button
          label="저장"
          onPress={handleSave}
          disabled={
            !isDiaryWriteEnabled ||
            !time ||
            patchReminderSettingsMutation.isPending
          }
        />
      </View>
    </ScreenContainer>
  );
}
