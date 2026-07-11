import { Pressable, Text, View } from "react-native";

import RightIcon from "@/assets/icons/rightIcon.svg";
import { Divider, Toggle } from "@/src/components/common";
import { cn } from "@/src/lib/cn";

export type PushAlarmCardProps = {
  isPushEnabled: boolean;
  onChangePushEnabled: (value: boolean) => void;
  isDiaryWriteEnabled: boolean;
  onChangeDiaryWriteEnabled: (value: boolean) => void;
  diaryWriteTimeLabel: string;
  onPressDiaryWriteTime?: () => void;
  isDiaryReplyEnabled: boolean;
  onChangeDiaryReplyEnabled: (value: boolean) => void;
  className?: string;
};

export function PushAlarmCard({
  isPushEnabled,
  onChangePushEnabled,
  isDiaryWriteEnabled,
  onChangeDiaryWriteEnabled,
  diaryWriteTimeLabel,
  onPressDiaryWriteTime,
  isDiaryReplyEnabled,
  onChangeDiaryReplyEnabled,
  className,
}: PushAlarmCardProps) {
  return (
    <View
      className={cn("shadow-card-2 gap-4 rounded-xl bg-white p-3", className)}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-900 text-b-03-m">PUSH 알림</Text>
        <Toggle value={isPushEnabled} onValueChange={onChangePushEnabled} />
      </View>

      {isPushEnabled ? (
        <View className="gap-3">
          <View className="flex-row items-center justify-between pl-6">
            <Text className="text-gray-900 text-b-03-m">일기 작성 알림</Text>
            <Toggle
              value={isDiaryWriteEnabled}
              onValueChange={onChangeDiaryWriteEnabled}
            />
          </View>

          {isDiaryWriteEnabled ? (
            <Pressable
              className="flex-row items-center gap-1 self-end"
              onPress={onPressDiaryWriteTime}
            >
              <Text className="text-gray-900 text-b-03-m">
                {diaryWriteTimeLabel}
              </Text>
              <RightIcon width={20} height={20} color="#020303" />
            </Pressable>
          ) : null}

          <Divider className="ml-6 border-green-100" />

          <View className="flex-row items-center justify-between pl-6">
            <Text className="text-gray-900 text-b-03-m">일기 답장 알림</Text>
            <Toggle
              value={isDiaryReplyEnabled}
              onValueChange={onChangeDiaryReplyEnabled}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
