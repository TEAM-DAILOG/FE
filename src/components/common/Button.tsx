import { Pressable, Text, type PressableProps } from "react-native";

import { cn } from "@/src/lib/cn";

export type ButtonVariant = "fill-green" | "fill-gray" | "stroke-green";

export type ButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  variant?: ButtonVariant;
  className?: string;
};

const VARIANT_STYLES: Record<
  ButtonVariant,
  { container: string; label: string }
> = {
  "fill-green": {
    container: "bg-green-600",
    label: "text-gray-0",
  },
  "fill-gray": {
    container: "bg-gray-100",
    label: "text-gray-700",
  },
  "stroke-green": {
    container: "bg-white border border-green-600",
    label: "text-green-600",
  },
};

export function Button({
  label,
  variant = "fill-green",
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const { container, label: labelStyle } = VARIANT_STYLES[variant];

  return (
    <Pressable
      className={cn(
        "h-12 w-full items-center justify-center rounded-lg px-2.5",
        disabled ? "bg-gray-200" : container,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <Text
        className={cn("text-b-02-sb", disabled ? "text-gray-400" : labelStyle)}
      >
        {label}
      </Text>
    </Pressable>
  );
}
