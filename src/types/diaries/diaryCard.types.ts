import type { ImageSourcePropType } from "react-native";

export type DiaryCardVariant =
  | "no-image"
  | "one-image"
  | "two-images"
  | "three-images";

type DiaryCardBaseProps = {
  containerClassName?: string;
};

export type DiaryCardNoImageProps = DiaryCardBaseProps & {
  variant: "no-image";
  title: string;
  content: string;
};

export type DiaryCardOneImageProps = DiaryCardBaseProps & {
  variant: "one-image";
  title: string;
  content: string;
  images: [ImageSourcePropType];
};

export type DiaryCardTwoImagesProps = DiaryCardBaseProps & {
  variant: "two-images";
  title: string;
  content: string;
  images: [ImageSourcePropType, ImageSourcePropType];
};

export type DiaryCardThreeImagesProps = DiaryCardBaseProps & {
  variant: "three-images";
  title: string;
  content: string;
  images: [ImageSourcePropType, ImageSourcePropType, ImageSourcePropType];
};

export type DiaryCardProps =
  | DiaryCardNoImageProps
  | DiaryCardOneImageProps
  | DiaryCardTwoImagesProps
  | DiaryCardThreeImagesProps;

export type DiaryCardImageVariant = "one-image" | "two-images" | "three-images";
