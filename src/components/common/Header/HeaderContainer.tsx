import { PropsWithChildren } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/src/lib/cn";

type HeaderContainerProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
}>;

export function HeaderContainer({
  children,
  className,
  contentClassName,
}: HeaderContainerProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      className={cn(
        "w-full border-b border-solid border-green-100 bg-bg",
        className
      )}
    >
      <View className={cn("h-14 flex-row items-center px-4", contentClassName)}>
        {children}
      </View>
    </SafeAreaView>
  );
}
