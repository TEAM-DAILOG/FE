import {
  Image,
  Text,
  type ImageSourcePropType,
  useWindowDimensions,
  View,
} from "react-native";

import { cn } from "@/src/lib/cn";

export type DiaryCardVariant =
  | "summary"
  | "no-image"
  | "one-image"
  | "two-images"
  | "three-images";

type DiaryCardBaseProps = {
  containerClassName?: string;
};

type DiaryCardSummaryProps = DiaryCardBaseProps & {
  variant: "summary";
  summary: string;
};

type DiaryCardNoImageProps = DiaryCardBaseProps & {
  variant: "no-image";
  title: string;
  content: string;
};

type DiaryCardOneImageProps = DiaryCardBaseProps & {
  variant: "one-image";
  title: string;
  content: string;
  images: readonly [ImageSourcePropType];
};

type DiaryCardTwoImagesProps = DiaryCardBaseProps & {
  variant: "two-images";
  title: string;
  content: string;
  images: readonly [ImageSourcePropType, ImageSourcePropType];
};

type DiaryCardThreeImagesProps = DiaryCardBaseProps & {
  variant: "three-images";
  title: string;
  content: string;
  images: readonly [
    ImageSourcePropType,
    ImageSourcePropType,
    ImageSourcePropType,
  ];
};

export type DiaryCardProps =
  | DiaryCardSummaryProps
  | DiaryCardNoImageProps
  | DiaryCardOneImageProps
  | DiaryCardTwoImagesProps
  | DiaryCardThreeImagesProps;

type DiaryCardImageVariant =
  | "one-image"
  | "two-images"
  | "three-images";

const CARD_SHADOW_STYLE = {
  shadowColor: "#3B6352",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 1,
} as const;

const CONTENT_LINE_COUNTS: Record<
  Exclude<DiaryCardVariant, "summary">,
  number
> = {
  "no-image": 5,
  "one-image": 3,
  "two-images": 3,
  "three-images": 5,
};

const IMAGE_CONTAINER_CLASS_NAMES: Record<
  DiaryCardImageVariant,
  string
> = {
  "one-image": "w-full items-center",
  "two-images": "w-full flex-row gap-2",
  "three-images": "w-full flex-row gap-2",
};

const MULTI_IMAGE_CLASS_NAME = "aspect-square flex-1";

export function DiaryCard(props: DiaryCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const maxSingleImageSize = screenWidth / 2;

  if (props.variant === "summary") {
    return (
      <View
        style={CARD_SHADOW_STYLE}
        className={cn(
          "h-12 w-full justify-center rounded-xl bg-[#FCFDFD] px-5",
          props.containerClassName,
        )}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-b-02-m text-gray-800"
        >
          {props.summary}
        </Text>
      </View>
    );
  }

  const imageVariant =
    props.variant === "no-image" ? null : props.variant;

  const images = props.variant === "no-image" ? [] : props.images;

  return (
    <View
      style={CARD_SHADOW_STYLE}
      className={cn(
        "w-full gap-2 rounded-xl bg-[#FCFDFD] px-4 py-3",
        props.containerClassName,
      )}
    >
      {imageVariant ? (
        <View className={IMAGE_CONTAINER_CLASS_NAMES[imageVariant]}>
          {images.map((source, index) => (
            <Image
              key={`${imageVariant}-${index}`}
              source={source}
              resizeMode="cover"
              style={
                imageVariant === "one-image"
                  ? {
                      width: maxSingleImageSize,
                      height: maxSingleImageSize,
                    }
                  : undefined
              }
              className={
                imageVariant === "one-image"
                  ? ""
                  : MULTI_IMAGE_CLASS_NAME
              }
            />
          ))}
        </View>
      ) : null}

      <View className="gap-1">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-b-02-sb text-gray-800"
        >
          {props.title}
        </Text>

        <Text
          numberOfLines={CONTENT_LINE_COUNTS[props.variant]}
          ellipsizeMode="tail"
          className="text-b-04-r text-gray-800"
        >
          {props.content}
        </Text>
      </View>
    </View>
  );
}