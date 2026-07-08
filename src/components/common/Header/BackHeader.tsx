import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

import LeftIcon from "@/assets/icons/leftIcon.svg";
import { cn } from "@/src/lib/cn";

import { HeaderContainer } from "./HeaderContainer";

export type BackHeaderProps = {
  label?: string;
  onPressBack?: () => void;
  background?: "gray-0" | "bg";
  className?: string;
};

export function BackHeader({
  label,
  onPressBack,
  background = "gray-0",
  className,
}: BackHeaderProps) {
  const router = useRouter();

  return (
    <HeaderContainer
      className={cn(background === "bg" ? "bg-bg" : "bg-gray-0", className)}
      contentClassName="gap-1"
    >
      <Pressable onPress={onPressBack ?? (() => router.back())}>
        <LeftIcon width={24} height={24} color="#020303" />
      </Pressable>
      {label && <Text className="text-gray-800 text-h-01">{label}</Text>}
    </HeaderContainer>
  );
}
