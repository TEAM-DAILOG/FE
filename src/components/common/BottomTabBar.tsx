import DiaryIcon from "@/assets/icons/diaryIcon.svg";
import ScheduleIcon from "@/assets/icons/scheduleIcon.svg";
import TabCalendarIcon from "@/assets/icons/tabCalendarIcon.svg";
import TabCancleIcon from "@/assets/icons/tabCancleIcon.svg";
import TabHomeIcon from "@/assets/icons/tabHomeIcon.svg";
import TabPlusIcon from "@/assets/icons/tabPlusIcon.svg";
import TabSettingIcon from "@/assets/icons/tabSettingIcon.svg";
import TabStatisticIcon from "@/assets/icons/tabStatisticIcon.svg";
import { useBottomTabBarOffset } from "@/src/hooks/useBottomTabBarHeight";
import { cn } from "@/src/lib/cn";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const CONTENT_FADE_IN = FadeIn.duration(200);
const CONTENT_FADE_OUT = FadeOut.duration(150);

const TAB_ICONS = {
  index: TabHomeIcon,
  calendar: TabCalendarIcon,
  statistics: TabStatisticIcon,
  settings: TabSettingIcon,
} as const;

const TAB_BAR_SHADOW_STYLE = {
  shadowColor: "#4D826C",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.14,
  shadowRadius: 16,
  elevation: 6,
} as const;

export function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const bottomOffset = useBottomTabBarOffset();
  const [isOpen, setIsOpen] = useState(false);

  // 애니메이션 값 설정 (0: 닫힘/플러스, 1: 열림/엑스)
  const animationProgress = useSharedValue(0);

  // 열릴 때 300ms ease-out, 닫힐 때 지정된 스프링값
  useEffect(() => {
    if (isOpen) {
      animationProgress.value = withTiming(1, { duration: 300 });
    } else {
      animationProgress.value = withSpring(0, {
        mass: 1,
        stiffness: 100,
        damping: 15,
      });
    }
  }, [isOpen]);

  // 피그마 디졸브 배경색 계산 (Reanimated 스타일)
  const animatedBoxStyle = useAnimatedStyle(() => {
    const backgroundColor =
      animationProgress.value > 0.5 ? "#F5F9F6" : "#FCFDFD";
    return {
      backgroundColor,
    };
  });

  return (
    <View // BottomTabBar 전체 컨테이너
      className="absolute left-4 right-4 h-[60px] flex-row items-center gap-2"
      style={{
        bottom: bottomOffset,
      }}
    >
      {/* ----------------- 왼쪽 박스 영역 ----------------- */}
      <View
        className="h-[60px] flex-1 rounded-full"
        style={TAB_BAR_SHADOW_STYLE}
      >
        {!isOpen ? (
          <Animated.View
            key="tabs"
            entering={CONTENT_FADE_IN}
            exiting={CONTENT_FADE_OUT}
            collapsable={false}
            className="h-full flex-1 flex-row items-center justify-between overflow-hidden rounded-full bg-gray-0 px-3 py-2.5"
          >
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;
              const TabIcon =
                TAB_ICONS[route.name as keyof typeof TAB_ICONS] ?? TabHomeIcon;
              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };
              return (
                <Pressable
                  key={route.key}
                  onPress={onPress}
                  className={cn(
                    "w-[52px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full p-2.5 web:outline-none",
                    isFocused ? "bg-green-600" : "bg-gray-0"
                  )}
                >
                  <TabIcon
                    width={24}
                    height={24}
                    color={isFocused ? "#FFFFFF" : "#C2DBD1"}
                  />
                </Pressable>
              );
            })}
          </Animated.View>
        ) : (
          // 플러스 버튼 열린 상태 (일정등록 | 일기작성)
          <Animated.View
            key="actions"
            entering={CONTENT_FADE_IN}
            exiting={CONTENT_FADE_OUT}
            collapsable={false}
            className="h-full flex-1 flex-row items-center justify-between overflow-hidden rounded-full border border-green-600 bg-gray-0 py-4"
          >
            {/* 일정등록 버튼 */}
            <Pressable
              onPress={() => {
                setIsOpen(false);
                router.push("/schedule");
              }}
              className="mx-auto flex-row items-center justify-center gap-2"
            >
              <Text className="text-center text-green-600 text-b-02-sb">
                일정등록
              </Text>
              <ScheduleIcon width={28} height={28} color="#4D826C" />
            </Pressable>

            {/* 가운데 세로 구분선 */}
            <View className="h-7 w-[1px] bg-green-600" />

            {/* 일기작성 버튼 */}
            <Pressable
              onPress={() => {
                setIsOpen(false);
                router.push("/diary/write");
              }}
              className="mx-auto flex-row items-center justify-center gap-2"
            >
              <Text className="text-center text-green-600 text-b-02-sb">
                일기작성
              </Text>
              <DiaryIcon width={28} height={28} color="#4D826C" />
            </Pressable>
          </Animated.View>
        )}
      </View>

      {/* ----------------- 오른쪽 박스: 플러스 / 엑스 버튼 ----------------- */}
      <Animated.View
        className="h-[60px] w-[60px] rounded-full"
        style={TAB_BAR_SHADOW_STYLE}
      >
        <Animated.View
          collapsable={false}
          className="h-full w-full items-center justify-center overflow-hidden rounded-full"
          style={animatedBoxStyle}
        >
          <Pressable
            onPress={() => setIsOpen(!isOpen)}
            className="h-full w-full items-center justify-center rounded-full bg-transparent web:outline-none"
          >
            {isOpen ? (
              <Animated.View
                key="cancel"
                entering={CONTENT_FADE_IN}
                exiting={CONTENT_FADE_OUT}
                collapsable={false}
              >
                <TabCancleIcon width={24} height={24} color="#4D826C" />
              </Animated.View>
            ) : (
              <Animated.View
                key="plus"
                entering={CONTENT_FADE_IN}
                exiting={CONTENT_FADE_OUT}
                collapsable={false}
              >
                <TabPlusIcon width={24} height={24} color="#4D826C" />
              </Animated.View>
            )}
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
