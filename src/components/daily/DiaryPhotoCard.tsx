import { Image, Pressable, Text, View } from "react-native";

import CloseIcon from "@/assets/icons/closeIcon.svg";
import ImageIcon from "@/assets/icons/imageIcon.svg";

export type DiaryPhotoCardProps = {
  photos: string[];
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
  maxCount?: number;
};

export function DiaryPhotoCard({
  photos,
  onAddPhoto,
  onRemovePhoto,
  maxCount = 3,
}: DiaryPhotoCardProps) {
  const canAddMore = photos.length < maxCount;

  if (photos.length === 0) {
    return (
      <View className="gap-3">
        <Text className="text-gray-900 text-b-02-m">오늘의 사진</Text>
        <Pressable
          className="w-full items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-4"
          onPress={onAddPhoto}
        >
          <ImageIcon width={48} height={48} color="#3B6352" />
          <Text className="text-green-700 text-b-03-sb">
            사진 추가(0/{maxCount})
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="gap-3">
      <Text className="text-gray-900 text-b-02-m">오늘의 사진</Text>

      <View className="w-full items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-4">
        <View className="flex-row gap-4">
          {photos.map((uri, index) => (
            <View key={`${uri}-${index}`} className="relative size-[100px]">
              <Image source={{ uri }} className="size-[100px]" />
              <Pressable
                className="absolute right-1 top-1 size-5 items-center justify-center rounded-full bg-white/40"
                onPress={() => onRemovePhoto(index)}
              >
                <CloseIcon width={18} height={18} color="#020303" />
              </Pressable>
            </View>
          ))}
        </View>

        {canAddMore ? (
          <Pressable onPress={onAddPhoto}>
            <Text className="text-green-700 text-b-03-sb">
              사진 추가({photos.length}/{maxCount})
            </Text>
          </Pressable>
        ) : (
          <Text className="text-green-700 text-b-03-sb">
            사진 추가({photos.length}/{maxCount})
          </Text>
        )}
      </View>
    </View>
  );
}
