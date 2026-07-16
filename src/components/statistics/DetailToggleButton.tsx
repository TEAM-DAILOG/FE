import { Pressable, Text, View } from "react-native";

import DownIcon from "@/assets/icons/downIcon.svg";
import { cn } from "@/src/lib/cn";

export type DetailToggleButtonProps = {
  label: string;
  isOpen: boolean;
  onPress: () => void;
  className?: string;
};

export function DetailToggleButton({
  label,
  isOpen,
  onPress,
  className,
}: DetailToggleButtonProps) {
  return (
    <Pressable
      className={cn(
        "w-full flex-row items-center justify-center gap-1 rounded-xl bg-bg py-1",
        className
      )}
      onPress={onPress}
    >
      <Text className="text-green-600 text-b-04-sb">{label}</Text>
      <View style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}>
        <DownIcon width={20} height={20} color="#4D826C" />
      </View>
    </Pressable>
  );
}
