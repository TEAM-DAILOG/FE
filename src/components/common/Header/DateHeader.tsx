import { Pressable, Text, View } from "react-native";

import DownIcon from "@/assets/icons/downIcon.svg";
import MenuIcon from "@/assets/icons/menuIcon.svg";
import SwitchIcon from "@/assets/icons/switchIcon.svg";
import { cn } from "@/src/lib/cn";

import { HeaderContainer } from "./HeaderContainer";

export type DateHeaderProps = {
  onPressLabel?: () => void;
  onPressToggle?: () => void;
  onPressMenu?: () => void;
  className?: string;
};

export function DateHeader({
  onPressLabel,
  onPressToggle,
  onPressMenu,
  className,
}: DateHeaderProps) {
  const now = new Date();
  const dateLabel = `${now.getFullYear()}년 ${now.getMonth() + 1}월`;

  return (
    <HeaderContainer
      className={cn("border-gray-100", className)}
      contentClassName="justify-between"
    >
      <Pressable
        className="flex-row items-center gap-0.5"
        onPress={onPressLabel}
      >
        <Text className="text-green-700 text-h-01">{dateLabel}</Text>
        <DownIcon width={24} height={24} color="#3B6352" />
      </Pressable>

      <View className="flex-row items-center gap-2">
        <Pressable
          className="h-6 flex-row items-center gap-0.5 rounded-[100px] bg-green-100 px-2 py-1"
          onPress={onPressToggle}
        >
          <Text className="text-green-700 text-b-05-m">일기전환</Text>
          <SwitchIcon width={16} height={16} color="#3B6352" />
        </Pressable>
        <Pressable
          className="size-6 items-center justify-center rounded-[100px] bg-green-100"
          onPress={onPressMenu}
        >
          <MenuIcon width={24} height={24} color="#020303" />
        </Pressable>
      </View>
    </HeaderContainer>
  );
}
