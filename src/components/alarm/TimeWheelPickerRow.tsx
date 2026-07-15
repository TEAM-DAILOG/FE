import {
  usePickerItemHeight,
  useScrollContentOffset,
  type PickerItem,
  type RenderItem,
  type RenderItemContainer,
  type RenderItemContainerProps,
} from "@quidone/react-native-wheel-picker";
import { Animated, Text, TouchableWithoutFeedback, View } from "react-native";

const TILT_SCALE = 0.1;

export const noOverlay = () => null;

// 라이브러리 기본 PickerItemContainer와 구조는 동일하게 가져가되,
// opacity와 rotateX 값 자체는 다르게 계산한다:
function WheelRowFrame({
  listRef,
  index,
  item,
  faces,
  renderItem,
  itemTextStyle,
  enableScrollByTapOnItem,
  readOnly,
}: RenderItemContainerProps<PickerItem<any>>) {
  const offset = useScrollContentOffset();
  const height = usePickerItemHeight();

  const inputRange = faces.map((face) => height * (index + face.index));
  // 기존 서서히 사라지는 opacity 대신, 2행 이상 떨어진 행은 안보이도록 투명도 0
  const opacity = offset.interpolate({
    inputRange,
    outputRange: faces.map((face) => (Math.abs(face.index) >= 2 ? 0 : 1)),
    extrapolate: "clamp",
  });
  const rotateX = offset.interpolate({
    inputRange,
    outputRange: faces.map((face) => `${face.deg * TILT_SCALE}deg`),
    extrapolate: "extend",
  });
  const translateY = offset.interpolate({
    inputRange,
    outputRange: faces.map((face) => face.offsetY),
    extrapolate: "extend",
  });

  const content = (
    <Animated.View
      style={[
        {
          height,
          opacity,
          transform: [{ translateY }, { rotateX }, { perspective: 1000 }],
        },
      ]}
    >
      {renderItem({ item, index, itemTextStyle })}
    </Animated.View>
  );

  if (!enableScrollByTapOnItem || readOnly) {
    return content;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => listRef.current?.scrollToIndex({ index, animated: true })}
    >
      {content}
    </TouchableWithoutFeedback>
  );
}

export const renderWheelRowFrame: RenderItemContainer<PickerItem<any>> = ({
  key,
  ...props
}) => <WheelRowFrame key={key} {...props} />;

// 글자 색상은 현재 선택된 값과 비교하여 다르게 렌더링
export function createWheelRowLabel<T>(
  currentValue: T
): RenderItem<PickerItem<T>> {
  function WheelRowLabel({ item }: { item: PickerItem<T> }) {
    return (
      <View className="h-8 items-center justify-center">
        <Text
          className={
            item.value === currentValue
              ? "text-green-700 text-b-02-sb"
              : "text-green-300 text-b-02-m"
          }
        >
          {item.label}
        </Text>
      </View>
    );
  }
  return WheelRowLabel;
}
