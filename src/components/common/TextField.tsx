import { useState } from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";

import { cn } from "@/src/lib/cn";

export type TextFieldType = "input" | "textarea";

export type TextFieldProps = Omit<
  TextInputProps,
  "editable" | "multiline" | "style" | "className"
> & {
  type?: TextFieldType;
  disabled?: boolean;
  rightText?: string;
  containerClassName?: string;
  inputClassName?: string;
};

export function TextField({
  type = "input",
  disabled = false,
  rightText,
  containerClassName,
  inputClassName,
  onFocus,
  onBlur,
  ...textInputProps
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isTextarea = type === "textarea";

  return (
    <View
      className={cn(
        "w-full flex-row rounded-xl border bg-white",
        isTextarea ? "h-[108px] items-start p-3" : "h-12 items-center p-3",
        isFocused ? "border-gray-400" : "border-gray-200",
        disabled && "opacity-50",
        containerClassName
      )}
    >
      <TextInput
        {...textInputProps}
        editable={!disabled}
        multiline={isTextarea}
        placeholderTextColor="#949997"
        textAlignVertical={isTextarea ? "top" : "center"}
        className={cn(
          "flex-1 text-gray-800 text-b-03-m",
          isTextarea ? "self-stretch p-0 text-left" : "h-full p-0",
          inputClassName
        )}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
      />

      {rightText ? (
        <Text className="ml-3 self-center text-green-600 text-b-03-sb">
          {rightText}
        </Text>
      ) : null}
    </View>
  );
}
