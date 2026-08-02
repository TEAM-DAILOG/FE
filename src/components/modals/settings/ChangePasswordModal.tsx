import { useState } from "react";
import { Text, View } from "react-native";
import { useCheckPassword } from "@/src/hooks/mutations/auth/useCheckPassword";
import CloseIcon from "@/assets/icons/closeIcon.svg";
import CheckIcon from "@/assets/icons/lightCheckIcon.svg";
import { TextField } from "@/src/components/common";
import { PASSWORD_MAX_LENGTH } from "@/src/constants/inputLimits";
import { cn } from "@/src/lib/cn";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { ChangePasswordModalProps } from "@/src/types/modals/settingModal.types";
import { hasRequiredCharacters, hasValidLength } from "@/src/utils";
import { SettingsModalContainer } from "./SettingsModalContainer";

type RuleStatus = "neutral" | "valid" | "invalid";

const RULE_ICON_COLOR: Record<RuleStatus, string> = {
  neutral: "#7A7F7E",
  valid: "#2365AC",
  invalid: "#AC2823",
};

const RULE_TEXT_COLOR: Record<RuleStatus, string> = {
  neutral: "text-gray-600",
  valid: "text-notification-2",
  invalid: "text-notification-1",
};

function RuleText({ status, label }: { status: RuleStatus; label: string }) {
  return (
    <View className="flex-row items-center">
      <Text className={cn("text-b-04-r", RULE_TEXT_COLOR[status])}>
        {label}
      </Text>
      {status === "invalid" ? (
        <CloseIcon width={16} height={16} color={RULE_ICON_COLOR.invalid} />
      ) : (
        <CheckIcon width={16} height={16} color={RULE_ICON_COLOR[status]} />
      )}
    </View>
  );
}

export function ChangePasswordModal({ onSave }: ChangePasswordModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPasswordCheckStatus, setCurrentPasswordCheckStatus] =
    useState<RuleStatus>("neutral");
  const checkPasswordMutation = useCheckPassword();

  const handleChangeCurrentPassword = (value: string) => {
    setCurrentPassword(value);
    setCurrentPasswordCheckStatus("neutral");
  };

  const handleBlurCurrentPassword = () => {
    if (currentPassword.length === 0) return;
    checkPasswordMutation.mutate(
      { currentPassword },
      {
        onSuccess: () => setCurrentPasswordCheckStatus("valid"),
        onError: () => setCurrentPasswordCheckStatus("invalid"),
      }
    );
  };

  const ruleStatus = (satisfied: boolean): RuleStatus => {
    if (newPassword.length === 0) return "neutral";
    return satisfied ? "valid" : "invalid";
  };

  const canSave =
    currentPassword.length > 0 &&
    hasRequiredCharacters(newPassword) &&
    hasValidLength(newPassword) &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ currentPassword, newPassword });
    closeModal();
  };

  return (
    <SettingsModalContainer
      title="비밀번호 변경"
      confirmLabel="저장"
      canConfirm={canSave}
      onConfirm={handleSave}
    >
      <View className="w-full items-start gap-1">
        <View className="w-full items-start gap-3">
          <Text className="text-gray-900 text-b-03-r">기존 비밀번호</Text>
          <TextField
            value={currentPassword}
            onChangeText={handleChangeCurrentPassword}
            onBlur={handleBlurCurrentPassword}
            secureTextEntry
            textContentType="oneTimeCode"
            placeholder="기존 비밀번호를 입력하세요"
          />
        </View>
        {currentPasswordCheckStatus !== "neutral" && (
          <Text
            className={cn(
              "text-b-04-r",
              RULE_TEXT_COLOR[currentPasswordCheckStatus]
            )}
          >
            {currentPasswordCheckStatus === "valid"
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </Text>
        )}
      </View>

      <View className="w-full items-start gap-1">
        <View className="w-full items-start gap-3">
          <Text className="text-gray-900 text-b-03-r">새 비밀번호</Text>
          <TextField
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            textContentType="oneTimeCode"
            placeholder="새 비밀번호를 입력하세요."
            maxLength={PASSWORD_MAX_LENGTH}
          />
        </View>
        <View className="flex-row items-start gap-2">
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

      <View className="w-full items-start gap-1">
        <View className="w-full items-start gap-3">
          <Text className="text-gray-900 text-b-03-r">비밀번호 확인</Text>
          <TextField
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            textContentType="oneTimeCode"
            placeholder="새 비밀번호를 한 번 더 입력하세요."
            maxLength={PASSWORD_MAX_LENGTH}
          />
        </View>
        {confirmPassword.length > 0 && (
          <Text
            className={cn(
              "text-b-04-r",
              RULE_TEXT_COLOR[
                newPassword === confirmPassword ? "valid" : "invalid"
              ]
            )}
          >
            {newPassword === confirmPassword
              ? "비밀번호가 일치합니다."
              : "비밀번호가 불일치합니다."}
          </Text>
        )}
      </View>
    </SettingsModalContainer>
  );
}
