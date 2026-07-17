import { useState } from "react";
import { Image, type LayoutChangeEvent, Text, View } from "react-native";

import { cn } from "@/src/lib/cn";
import type {
  DiaryCardImageVariant,
  DiaryCardProps,
  DiaryCardVariant,
} from "@/src/types/diaries/diaryCard.types";

const IMAGE_GAP_PX = 8;

const CONTENT_LINE_COUNTS: Record<
  Exclude<DiaryCardVariant, "summary">,
  number
> = {
  "no-image": 5,
  "one-image": 3,
  "two-images": 3,
  "three-images": 5,
};

const IMAGE_CONTAINER_CLASS_NAMES: Record<DiaryCardImageVariant, string> = {
  "one-image": "w-full items-center",
  "two-images": "w-full flex-row gap-2",
  "three-images": "w-full flex-row gap-2",
};

export function DiaryCard(props: DiaryCardProps) {
  const [rowWidth, setRowWidth] = useState(0);

  const handleImageRowLayout = (event: LayoutChangeEvent) => {
    setRowWidth(event.nativeEvent.layout.width);
  };

  if (props.variant === "summary") {
    return (
      <View
        className={cn(
          "h-12 w-full justify-center rounded-xl bg-gray-0 px-4 shadow-card-1",
          props.containerClassName
        )}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-gray-900 text-b-03-m"
        >
          {props.summary}
        </Text>
      </View>
    );
  }

  const imageVariant = props.variant === "no-image" ? null : props.variant;

  const images = props.variant === "no-image" ? [] : props.images;

  const tileCount = Math.max(images.length, 2);

  const tileSize = rowWidth
    ? (rowWidth - IMAGE_GAP_PX * (tileCount - 1)) / tileCount
    : 0;

  return (
    <View
      className={cn(
        "w-full gap-2 rounded-xl bg-gray-0 px-4 py-3 shadow-card-1",
        props.containerClassName
      )}
    >
      {imageVariant ? (
        <View
          className={IMAGE_CONTAINER_CLASS_NAMES[imageVariant]}
          onLayout={handleImageRowLayout}
        >
          {images.map((source, index) => (
            <Image
              key={`${imageVariant}-${index}`}
              source={source}
              resizeMode="cover"
              style={{ width: tileSize, height: tileSize }}
            />
          ))}
        </View>
      ) : null}

      <View className="gap-1">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-gray-900 text-b-03-sb"
        >
          {props.title}
        </Text>

        <Text
          numberOfLines={CONTENT_LINE_COUNTS[props.variant]}
          ellipsizeMode="tail"
          className="text-gray-800 text-b-04-m"
        >
          {props.content}
        </Text>
      </View>
    </View>
  );
}
