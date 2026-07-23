import { Keyboard, Text, View } from "react-native";

import { Button, TextField } from "@/src/components/common";
import { cn } from "@/src/lib/cn";
import { formatTimer } from "@/src/utils";

import { SignupProgressBar } from "./SignupProgressBar";

export const SIGNUP_CODE_LENGTH = 6;

export type SignupCodeCheckStatus = "idle" | "invalid" | "valid";

type SignupCodeStepProps = {
  code: string;
  onChangeCode: (value: string) => void;
  remainingSeconds: number;
  codeCheckStatus: SignupCodeCheckStatus;
  errorMessage?: string;
  isResending?: boolean;
  isVerifying?: boolean;
  onPressResend: () => void;
  onPressNext: () => void;
};

export function SignupCodeStep({
  code,
  onChangeCode,
  remainingSeconds,
  codeCheckStatus,
  errorMessage,
  isResending = false,
  isVerifying = false,
  onPressResend,
  onPressNext,
}: SignupCodeStepProps) {
  const canVerify = code.length === SIGNUP_CODE_LENGTH;

  return (
    <View className="flex-1 px-4 pb-12 pt-5">
      <View className="w-full">
        <SignupProgressBar currentStep={2} />

        <Text className="mt-7 text-gray-900 text-h-01">
          이메일로 전송받은{"\n"}인증코드를 입력해주세요.
        </Text>

        <View className="mt-10 gap-2">
          <View className="gap-3">
            <Text className="text-gray-900 text-b-02-m">인증코드</Text>
            <TextField
              type="input"
              placeholder="인증코드를 입력하세요."
              keyboardType="number-pad"
              maxLength={SIGNUP_CODE_LENGTH}
              value={code}
              onChangeText={(text) => {
                onChangeCode(text);
                if (text.length === SIGNUP_CODE_LENGTH) {
                  Keyboard.dismiss();
                }
              }}
              rightText={formatTimer(remainingSeconds)}
            />
          </View>

          {errorMessage || codeCheckStatus !== "idle" ? (
            <Text
              className={cn(
                "text-b-03-m",
                !errorMessage && codeCheckStatus === "valid"
                  ? "text-notification-2"
                  : "text-notification-1"
              )}
            >
              {errorMessage ??
                (codeCheckStatus === "valid"
                  ? "인증코드가 일치합니다."
                  : "인증코드가 불일치합니다.")}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="mt-auto gap-3">
        <Button
          label={isResending ? "재전송 중" : "인증코드 재전송하기"}
          variant="stroke-green"
          disabled={isResending}
          onPress={onPressResend}
        />
        <Button
          label={isVerifying ? "인증 중" : "이메일 인증하기"}
          disabled={!canVerify || isVerifying}
          onPress={onPressNext}
        />
      </View>
    </View>
  );
}
