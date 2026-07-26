import { Pressable, Text, View } from "react-native";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";

import DownIcon from "@/assets/icons/downIcon.svg";
import CheckIcon from "@/assets/icons/lightCheckIcon.svg";
import { REPEAT_TYPE_OPTIONS } from "@/src/constants";

type RepeatType = "weekly" | "monthly" | "yearly";

type RepeatTypeBoxProps = {
  repeatType: RepeatType;
  onChangeRepeatType: (type: RepeatType) => void;
  isRepeatTypeMenuOpen: boolean;
  onToggleRepeatTypeMenu: () => void;
};

// 반복유형(매주/매월/매년) 드롭다운
export function RepeatTypeBox({
  repeatType,
  onChangeRepeatType,
  isRepeatTypeMenuOpen,
  onToggleRepeatTypeMenu,
}: RepeatTypeBoxProps) {
  return (
    <View className="z-10">
      <Pressable
        onPress={onToggleRepeatTypeMenu}
        className="flex-row items-center justify-between"
      >
        <Text className="text-gray-800 text-b-04-r">반복유형</Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-gray-800 text-b-04-r">
            {
              REPEAT_TYPE_OPTIONS.find((option) => option.key === repeatType)
                ?.label
            }
          </Text>
          <DownIcon width={20} height={20} color="#020303" />
        </View>
      </Pressable>

      {isRepeatTypeMenuOpen ? (
        <Animated.View
          entering={FadeIn.duration(300).easing(Easing.out(Easing.ease))}
          exiting={FadeOut.duration(300).easing(Easing.out(Easing.ease))}
          className="absolute right-0 top-full z-50 mt-1 w-[120px] shadow-dropdown"
        >
          <View className="gap-1.5 overflow-hidden rounded-lg bg-white px-3 py-1.5">
            {REPEAT_TYPE_OPTIONS.map((option) => (
              <Pressable
                key={option.key}
                onPress={() => onChangeRepeatType(option.key)}
                className="flex-row items-center justify-between"
              >
                <Text className="text-gray-800 text-b-04-r">
                  {option.label}
                </Text>
                {repeatType === option.key ? (
                  <CheckIcon width={20} height={20} color="#2F3131" />
                ) : null}
              </Pressable>
            ))}
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
}
