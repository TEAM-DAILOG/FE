import { Keyboard, Text, View } from "react-native";

import { TextField } from "@/src/components/common/TextField";
import { cn } from "@/src/lib/cn";
import { formatTimer } from "@/src/utils";

export const CODE_LENGTH = 6;

export type CodeCheckStatus = "idle" | "invalid" | "valid";

type PasswordCodeStepProps = {
  code: string;
  onChangeCode: (value: string) => void;
  remainingSeconds: number;
  codeCheckStatus: CodeCheckStatus;
};

export function PasswordCodeStep({
  code,
  onChangeCode,
  remainingSeconds,
  codeCheckStatus,
}: PasswordCodeStepProps) {
  return (
    <View className="w-full flex-col gap-3">
      <Text className="text-gray-900 text-b-02-m">인증코드</Text>
      <View className="flex-col gap-2">
        <TextField
          type="input"
          placeholder="인증코드를 입력하세요."
          keyboardType="number-pad"
          maxLength={CODE_LENGTH}
          value={code}
          onChangeText={(text) => {
            onChangeCode(text);
            if (text.length === CODE_LENGTH) {
              Keyboard.dismiss();
            }
          }}
          rightText={formatTimer(remainingSeconds)}
        />
        {codeCheckStatus !== "idle" && (
          <Text
            className={cn(
              "text-b-03-m",
              codeCheckStatus === "valid"
                ? "text-notification-2"
                : "text-notification-1"
            )}
          >
            {codeCheckStatus === "valid"
              ? "인증코드가 일치합니다."
              : "인증코드가 불일치합니다."}
          </Text>
        )}
      </View>
    </View>
  );
}
