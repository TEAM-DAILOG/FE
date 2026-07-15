import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import RightIcon from "@/assets/icons/rightIcon.svg";
import { cn } from "@/src/lib/cn";

export type ScheduleStatSectionProps = {
  className?: string;
};

export function ScheduleStatSection({ className }: ScheduleStatSectionProps) {
  const router = useRouter();
  const goToDetail = () => router.push("/statistic/detail");

  return (
    <View className={cn("gap-4", className)}>
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-900 text-h-02">일정 통계</Text>
        <Pressable onPress={goToDetail}>
          <RightIcon width={24} height={24} color="#020303" />
        </Pressable>
      </View>

      <Pressable
        className="rounded-xl bg-gray-0 p-3 shadow-card-2"
        onPress={goToDetail}
      >
        <Text className="text-green-800 text-b-02-m">
          이번 달 일정이 제일 많았던 카테고리는?
        </Text>
      </Pressable>
    </View>
  );
}
