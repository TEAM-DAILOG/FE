import { PropsWithChildren } from "react";
import { View } from "react-native";

// 모든 페이지의 공통 레이아웃 래퍼
type ScreenVariant = "default" | "stack";

const VARIANT_BG: Record<ScreenVariant, string> = {
  default: "bg-bg",
  stack: "bg-gray-0",
};

type ScreenContainerProps = PropsWithChildren<{
  variant?: ScreenVariant;
  className?: string;
}>;

export function ScreenContainer({
  children,
  variant = "default",
  className,
}: ScreenContainerProps) {
  return (
    <View className={cn("flex-1", VARIANT_BG[variant], className)}>
      {children}
    </View>
  );
}
