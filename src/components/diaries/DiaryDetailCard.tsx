import { Image, Text, View } from "react-native";

import { Divider } from "@/src/components/common";
import { cn } from "@/src/lib/cn";

export type DiaryDetailCardProps = {
  title: string;
  content: string;
  images?: string[]; // 0~3장
  containerClassName?: string;
};

export function DiaryDetailCard({
  title,
  content,
  images = [],
  containerClassName,
}: DiaryDetailCardProps) {
  return (
    <View
      className={cn(
        "gap-2 rounded-xl border border-gray-100 bg-white p-3",
        containerClassName
      )}
    >
      <Text className="text-green-800 text-b-01">{title}</Text>
      <Divider className="border-gray-100" />
      <Text className="text-gray-800 text-b-02-m">{content}</Text>

      {images.length > 0 ? (
        <View key={images.length} className="flex-row gap-2">
          {images.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              className={cn(
                "aspect-square rounded-s bg-green-100",
                images.length === 1 ? "w-1/2" : "flex-1"
              )}
            />
          ))}
        </View>
      ) : (
        // TODO: 이미지 업로드 기능 붙기 전까지 임시 placeholder
        // (실제 이미지 생기면 위 images.length > 0 분기만 타게 됨)
        <View className="aspect-square w-1/2 rounded-s bg-green-100" />
      )}
    </View>
  );
}
