import { useState } from "react";
import {
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

type TextFieldType = "input" | "textarea";
type TextFieldSize = "default" | "modal";

type TextFieldProps = Omit<
  TextInputProps,
  "editable" | "multiline" | "style" | "className"
> & {
  type?: TextFieldType;
  size?: TextFieldSize;
  disabled?: boolean;
  rightText?: string;
  containerClassName?: string;
  inputClassName?: string;
};

export function TextField({
  type = "input",
  size = "default",
  disabled = false,
  rightText,
  containerClassName = "",
  inputClassName = "",
  onFocus,
  onBlur,
  ...textInputProps
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isTextarea = type === "textarea";

  return (
    <View
      className={`flex-row rounded-xl border bg-white ${
        size === "modal" ? "w-[326px] max-w-full self-center" : "w-full"
      } ${
        isTextarea ? "h-[108px] items-start p-3" : "h-12 items-center px-3"
      } ${
        isFocused ? "border-gray-400" : "border-gray-200"
      } ${disabled ? "opacity-50" : ""} ${containerClassName}`}
    >
      <TextInput
        {...textInputProps}
        editable={!disabled}
        multiline={isTextarea}
        placeholderTextColor="#949997"
        textAlignVertical={isTextarea ? "top" : "center"}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        className={`flex-1 font-suit text-b-03-r text-gray-800 ${
          isTextarea ? "self-stretch p-0 text-left" : "h-full p-0"
        } ${inputClassName}`}
      />

      {rightText ? (
        <Text className="ml-3 self-center font-suit text-b-03-r text-green-600">
          {rightText}
        </Text>
      ) : null}
    </View>
  );
}