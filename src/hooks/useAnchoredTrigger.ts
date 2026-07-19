import { useRef, useState } from "react";
import { View } from "react-native";

import type { AnchorLayout } from "@/src/components/common/AnchoredDropdown";

// 트리거 요소의 화면상 위치를 측정해 AnchoredDropdown을 그 아래에 띄울 수 있게 해주는 훅
export function useAnchoredTrigger() {
  const triggerRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState<AnchorLayout | null>(null);

  const open = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setVisible(true);
    });
  };

  const close = () => setVisible(false);

  return { triggerRef, visible, anchor, open, close };
}
