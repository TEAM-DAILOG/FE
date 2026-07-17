import { Text, View } from "react-native";

import ExclamationIcon from "@/assets/icons/exclamationIcon.svg";
import { Button } from "@/src/components/common";

export type DiaryEmptyStateProps = {
  onPressWriteFree: () => void;
};

export function DiaryEmptyState({ onPressWriteFree }: DiaryEmptyStateProps) {
  return (
    <View className="flex-1 justify-between px-4 pb-12">
      <View className="flex-1 items-center justify-center gap-3">
        <ExclamationIcon width={96} height={96} color="#4D826C" />
        <Text className="text-center text-green-600 text-b-02-sb">
          오늘 계획된 일정이 없어 질문을 생성하지 못했어요
        </Text>
      </View>

      <Button
        label="자유일기 작성하기"
        variant="stroke-green"
        onPress={onPressWriteFree}
      />
    </View>
  );
}
