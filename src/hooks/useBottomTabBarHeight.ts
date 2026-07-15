import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 60;
// 피그마 스펙: 인디케이터 유무와 무관하게 네비 아래 여백은 34px.
const TAB_BAR_BOTTOM_GAP = 34;

export function useBottomTabBarOffset() {
  const insets = useSafeAreaInsets();
  const margin = TAB_BAR_BOTTOM_GAP - insets.bottom;
  return insets.bottom > 0 ? insets.bottom + margin : TAB_BAR_BOTTOM_GAP;
}

export function useBottomTabBarHeight() {
  return useBottomTabBarOffset() + TAB_BAR_HEIGHT;
}
