import { PropsWithChildren } from "react";
import { View } from "react-native";

// 모든 페이지의 공통 레이아웃 래퍼
// 사용법: app/** 라우트 파일에서 최상단을 이걸로 감싸서 사용
//
// variant: (tabs)/(auth)는 기본 배경(bg-bg), (stacks)로 쌓이는 화면은
// "stack" variant(bg-gray-0)로 구분해서 씀
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
    <View
      className={`flex-1 px-4 py-[34px] ${VARIANT_BG[variant]} ${className ?? ""}`}
    >
      {children}
    </View>
  );
}
