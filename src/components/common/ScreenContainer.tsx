import { PropsWithChildren } from "react";
import { View } from "react-native";

// 모든 페이지의 공통 레이아웃 래퍼
type Edge = "top" | "bottom" | "left" | "right";

const EDGE_CLASS: Record<Edge, string> = {
  top: "pt-safe",
  bottom: "pb-safe",
  left: "pl-safe",
  right: "pr-safe",
};

type ScreenContainerProps = PropsWithChildren<{
  edges?: Edge[];
  className?: string;
}>;

export function ScreenContainer({
  children,
  edges = ["top", "bottom"],
  className,
}: ScreenContainerProps) {
  const edgeClassName = edges.map((edge) => EDGE_CLASS[edge]).join(" ");

  return (
    <View
      className={`flex-1 bg-[#F5F9F6] px-4 py-8 ${edgeClassName} ${className ?? ""}`}
    >
      {children}
    </View>
  );
}
