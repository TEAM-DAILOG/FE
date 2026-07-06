
import { useState, useEffect } from "react";
import { View, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { cn } from "@/src/lib/cn";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";


const TAB_ICONS = {
  index: "house.fill",
  calendar: "calendar",
  statistics: "chart.bar.fill",
  settings: "gearshape.fill",
} as const;

export function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
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
    const backgroundColor = animationProgress.value > 0.5 ? "#F5F9F6" : "#FCFDFD";
    return {
      backgroundColor,
    };
  });

  return (
    <View
      className="absolute left-[16px] top-[750px] h-[60px] w-[358px] flex-row items-center gap-[8px]"
    >
      {/* ----------------- 왼쪽 박스 영역 ----------------- */}
      {!isOpen ? (
        <View
          className="h-[60px] w-[290px] flex-row items-center justify-between rounded-full bg-[#FCFDFD] px-3"
          style={{
            shadowColor: "#4D826C",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.14,
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName =
              TAB_ICONS[route.name as keyof typeof TAB_ICONS] ?? "house.fill";
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
                  "h-[40px] w-[52px] items-center justify-center rounded-full p-[10px]",
                  isFocused ? "bg-[#4D826C]" : "bg-[#FCFDFD]"
                )}
                style={{ outlineStyle: "none" } as any}
              >
                <IconSymbol
                  name={iconName}
                  size={24}
                  color={isFocused ? "#FFFFFF" : "#A2C9B1"}
                />
              </Pressable>
            );
          })}
        </View>
      ) : (
        // 플러스 버튼 열린 상태 (일정등록 | 일기작성)
        <View
          className="h-[60px] w-[290px] flex-row items-center justify-center gap-[40px] rounded-full bg-[#FCFDFD] px-[28px] border-[1px] border-[#4D826C]"
          style={{
            shadowColor: "#4D826C",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.14,
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          {/* 일정등록 버튼 */}
          <Pressable
            onPress={() => {
              console.log("일정등록 클릭"); // 터미널 확인용 로그
              setIsOpen(false);
              router.push("/schedule");
            }}
            className="h-[24px] w-[55px] flex-row items-center justify-center gap-[8px]"
          >
            <Text
              style={{
                fontFamily: "SUIT-SemiBold",
                fontWeight: "600",
                fontSize: 16,
                lineHeight: 24, // 16px * 150%
                letterSpacing: -0.32, // 16px * -2%
                textAlign: "center",
                color: "#4D826C",
              }}
            >
              일정등록
            </Text>
            <IconSymbol
              name="calendar.badge.plus"
              size={28}
              color="#4D826C"
            />
          </Pressable>

          {/* 가운데 세로 구분선 */}
          <View className="h-[20px] w-[1px] bg-[#4D826C]" />

          {/* 일기작성 버튼 */}
          <Pressable
            onPress={() => {
              console.log("일기작성 클릭"); // 터미널 확인용 로그
              setIsOpen(false);
              router.push("/diary/write");
            }}
            className="h-[24px] w-[55px] flex-row items-center justify-center gap-[8px]"
          >
            <Text
              style={{
                fontFamily: "SUIT-SemiBold",
                fontWeight: "600",
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: -0.32,
                textAlign: "center",
                color: "#4D826C",
              }}
            >
              일기작성
            </Text>
            <IconSymbol
              name="square.and.pencil"
              size={28}
              color="#4D826C"
            />
          </Pressable>
        </View>
      )}

      {/* ----------------- 오른쪽 박스: 플러스 / 엑스 버튼 ----------------- */}
      <Animated.View
        className="h-[60px] w-[60px] items-center justify-center rounded-full p-[10px]"
        style={[
          animatedBoxStyle,
          {
            shadowColor: "#4D826C",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.14,
            shadowRadius: 16,
            elevation: 6,
          },
        ]}
      >
        <Pressable
          onPress={() => setIsOpen(!isOpen)}
          className="h-full w-full items-center justify-center rounded-full bg-transparent"
          style={{ outlineStyle: "none" } as any}
        >
          <IconSymbol
            name={isOpen ? "xmark" : "plus"}
            size={24}
            color="#4D826C"
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default BottomTabBar;
