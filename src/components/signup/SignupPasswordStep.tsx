import { Text, View } from "react-native";

import CloseIcon from "@/assets/icons/closeIcon.svg";
import CheckIcon from "@/assets/icons/lightCheckIcon.svg";
import { Button, TextField } from "@/src/components/common";
import { cn } from "@/src/lib/cn";
import { hasRequiredCharacters, hasValidLength } from "@/src/utils";

import { SignupProgressBar } from "./SignupProgressBar";

type SignupPasswordStepProps = {
  password: string;
  onChangePassword: (value: string) => void;
  confirmPassword: string;
  onChangeConfirmPassword: (value: string) => void;
  onPressNext: () => void;
};

type RuleStatus = "neutral" | "valid" | "invalid";

const RULE_ICON_COLOR: Record<RuleStatus, string> = {
  neutral: "#7A7F7E",
  valid: "#2365AC",
  invalid: "#AC2823",
};

function RuleText({ status, label }: { status: RuleStatus; label: string }) {
  return (
    <View className="flex-row items-center">
      <Text
        className={cn(
          "text-b-03-m",
          status === "valid" && "text-notification-2",
          status === "invalid" && "text-notification-1",
          status === "neutral" && "text-gray-600"
        )}
      >
        {label}
      </Text>
      {status === "invalid" ? (
        <CloseIcon width={20} height={20} color={RULE_ICON_COLOR.invalid} />
      ) : (
        <CheckIcon width={20} height={20} color={RULE_ICON_COLOR[status]} />
      )}
    </View>
  );
}

export function SignupPasswordStep({
  password,
  onChangePassword,
  confirmPassword,
  onChangeConfirmPassword,
  onPressNext,
}: SignupPasswordStepProps) {
  const isRequiredCharactersValid = hasRequiredCharacters(password);
  const isLengthValid = hasValidLength(password);
  const isPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const canGoNext =
    isRequiredCharactersValid && isLengthValid && isPasswordMatch;

  function ruleStatus(satisfied: boolean): RuleStatus {
    if (password.length === 0) return "neutral";
    return satisfied ? "valid" : "invalid";
  }

  return (
    <View className="flex-1 px-4 pb-12 pt-5">
      <View className="w-full">
        <SignupProgressBar currentStep={3} />

        <Text className="mt-7 text-gray-900 text-h-01">
          로그인에 사용하실{"\n"}비밀번호를 입력해주세요.
        </Text>

        <View className="mt-10 gap-7">
          <View className="gap-2">
            <View className="gap-3">
              <Text className="text-gray-900 text-b-02-m">비밀번호</Text>
              <TextField
                type="input"
                placeholder="비밀번호를 입력하세요."
                secureTextEntry
                value={password}
                onChangeText={onChangePassword}
              />
            </View>
            <View className="flex-row gap-2">
              <RuleText
                status={ruleStatus(isRequiredCharactersValid)}
                label="영어, 숫자, 특수문자 포함"
              />
              <RuleText
                status={ruleStatus(isLengthValid)}
                label="8자 이상 16자 이하"
              />
            </View>
          </View>

          <View className="gap-2">
            <View className="gap-3">
              <Text className="text-gray-900 text-b-02-m">비밀번호 확인</Text>
              <TextField
                type="input"
                placeholder="비밀번호를 한 번 더 입력하세요."
                secureTextEntry
                value={confirmPassword}
                onChangeText={onChangeConfirmPassword}
              />
            </View>
            {confirmPassword.length > 0 ? (
              <Text
                className={cn(
                  "text-b-03-m",
                  isPasswordMatch
                    ? "text-notification-2"
                    : "text-notification-1"
                )}
              >
                {isPasswordMatch
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 불일치합니다."}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      <Button
        label="다음"
        className="mt-auto"
        disabled={!canGoNext}
        onPress={onPressNext}
      />
    </View>
  );
}
