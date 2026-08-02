import { Text, View } from "react-native";

import CloseIcon from "@/assets/icons/closeIcon.svg";
import CheckIcon from "@/assets/icons/lightCheckIcon.svg";
import { TextField } from "@/src/components/common/TextField";
import { PASSWORD_MAX_LENGTH } from "@/src/constants/inputLimits";
import { cn } from "@/src/lib/cn";
import { hasRequiredCharacters, hasValidLength } from "@/src/utils";

type PasswordResetStepProps = {
  newPassword: string;
  onChangeNewPassword: (value: string) => void;
  confirmPassword: string;
  onChangeConfirmPassword: (value: string) => void;
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

export function PasswordResetStep({
  newPassword,
  onChangeNewPassword,
  confirmPassword,
  onChangeConfirmPassword,
}: PasswordResetStepProps) {
  const isPasswordMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  function ruleStatus(satisfied: boolean): RuleStatus {
    if (newPassword.length === 0) return "neutral";
    return satisfied ? "valid" : "invalid";
  }

  return (
    <View className="w-full flex-col gap-6">
      <View className="w-full flex-col gap-3">
        <Text className="text-gray-900 text-b-02-m">비밀번호</Text>
        <View className="flex-col gap-2">
          <TextField
            type="input"
            placeholder="비밀번호를 입력하세요."
            secureTextEntry
            value={newPassword}
            onChangeText={onChangeNewPassword}
            maxLength={PASSWORD_MAX_LENGTH}
          />
          <View className="flex-row gap-2">
            <RuleText
              status={ruleStatus(hasRequiredCharacters(newPassword))}
              label="영어, 숫자, 특수문자 포함"
            />
            <RuleText
              status={ruleStatus(hasValidLength(newPassword))}
              label="8자 이상 16자 이하"
            />
          </View>
        </View>
      </View>
      <View className="w-full flex-col gap-3">
        <Text className="text-gray-900 text-b-02-m">비밀번호 확인</Text>
        <View className="flex-col gap-2">
          <TextField
            type="input"
            placeholder="비밀번호를 한 번 더 입력하세요."
            secureTextEntry
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            maxLength={PASSWORD_MAX_LENGTH}
          />
          {confirmPassword.length > 0 && (
            <Text
              className={cn(
                "text-b-03-m",
                isPasswordMatch ? "text-notification-2" : "text-notification-1"
              )}
            >
              {isPasswordMatch
                ? "비밀번호가 일치합니다."
                : "비밀번호가 불일치합니다."}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
