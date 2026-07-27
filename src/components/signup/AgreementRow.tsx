import { Pressable, Text, View } from "react-native";

import CheckCircleIcon from "@/assets/icons/checkCircleIcon.svg";

type AgreementRowProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onPressDetail?: () => void;
};

export function AgreementRow({
  label,
  checked,
  onToggle,
  onPressDetail,
}: AgreementRowProps) {
  const iconColor = checked ? "#2F3131" : "#AEB2B0";

  return (
    <View className="flex-row items-center">
      <Pressable
        className="h-5 w-5 items-center justify-center"
        hitSlop={8}
        onPress={onToggle}
      >
        <CheckCircleIcon width={20} height={20} color={iconColor} />
      </Pressable>
      <Pressable onPress={onToggle} hitSlop={8}>
        <Text className="ml-2 text-gray-800 text-b-03-r">{label}</Text>
      </Pressable>

      {onPressDetail ? (
        <Pressable
          className="ml-3 border-b border-gray-400"
          onPress={onPressDetail}
          hitSlop={8}
        >
          <Text className="text-gray-400 text-b-04-r">보기</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
