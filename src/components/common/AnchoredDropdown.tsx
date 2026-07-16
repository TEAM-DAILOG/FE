import { Modal, Pressable, View, useWindowDimensions } from "react-native";
import type { PropsWithChildren } from "react";

export type AnchorLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AnchoredDropdownProps = PropsWithChildren<{
  visible: boolean;
  anchor: AnchorLayout | null;
  align: "left" | "right";
  onRequestClose: () => void;
}>;

export function AnchoredDropdown({
  visible,
  anchor,
  align,
  onRequestClose,
  children,
}: AnchoredDropdownProps) {
  const { width: windowWidth } = useWindowDimensions();

  if (!visible || !anchor) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onRequestClose}>
      <Pressable
        className="absolute inset-0 bg-white/20"
        onPress={onRequestClose}
      >
        <View
          style={{
            position: "absolute",
            top: anchor.y + anchor.height + 2,
            ...(align === "left"
              ? { left: anchor.x }
              : { right: windowWidth - (anchor.x + anchor.width) }),
          }}
        >
          <Pressable onPress={() => {}}>{children}</Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
