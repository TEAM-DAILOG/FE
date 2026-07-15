import { Image, Text, View } from "react-native";

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
        containerClassName,
      )}
    >
      <Text className="text-b-02-sb text-gray-900">{title}</Text>
      <View className="h-px bg-gray-100" />
      <Text className="text-b-03-m text-gray-800">{content}</Text>

      {images.length > 0 ? (
        <View className="flex-row gap-2">
          {images.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              className="aspect-square flex-1 rounded-lg bg-green-100"
            />
          ))}
        </View>
      ) : (
        // TODO: 이미지 업로드 기능 붙기 전까지 임시 placeholder
        // (실제 이미지 생기면 위 images.length > 0 분기만 타게 됨)
        <View className="aspect-square w-full rounded-lg bg-green-100" />
      )}
    </View>
  );
}
