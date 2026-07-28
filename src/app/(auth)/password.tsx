import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import { useSendResetPasswordEmail } from "@/src/hooks/mutations/auth/useSendResetPasswordEmail";
import { useVerifyResetPasswordEmail } from "@/src/hooks/mutations/auth/useVerifyResetPasswordEmail";
import { useResetPassword } from "@/src/hooks/mutations/auth/useResetPassword";
import { BackHeader, Button, ScreenContainer } from "@/src/components/common";
import {
  CODE_LENGTH,
  type CodeCheckStatus,
  PasswordCodeStep,
  PasswordEmailStep,
  PasswordResetStep,
} from "@/src/components/password";
import {
  hasRequiredCharacters,
  hasValidLength,
  isValidEmail,
} from "@/src/utils";

type Step = "email" | "code" | "reset";

const STEP_TITLE: Record<Step, string> = {
  email: "회원가입 시 입력한\n이메일을 입력해주세요",
  code: "이메일로 전송받은\n인증코드를 입력해주세요",
  reset: "사용하실 새로운\n비밀번호를 입력해주세요",
};

const PREVIOUS_STEP: Partial<Record<Step, Step>> = {
  code: "email",
  reset: "code",
};

const CODE_TIMER_SECONDS = 180;

export default function PasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");

  const [email, setEmail] = useState("");

  const [code, setCode] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(CODE_TIMER_SECONDS);
  const [codeCheckStatus, setCodeCheckStatus] =
    useState<CodeCheckStatus>("idle");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordResetToken, setPasswordResetToken] = useState("");

  const { mutate: sendResetPasswordEmail, isPending: isSendingEmail } =
    useSendResetPasswordEmail();
  const { mutate: verifyResetPasswordEmail, isPending: isVerifyingCode } =
    useVerifyResetPasswordEmail();
  const { mutate: resetPassword, isPending: isResettingPassword } =
    useResetPassword();

  useEffect(() => {
    if (step !== "code") return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const isEmailValid = isValidEmail(email);

  const isPasswordRuleValid =
    hasRequiredCharacters(newPassword) && hasValidLength(newPassword);
  const isPasswordMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  function handleBack() {
    const previousStep = PREVIOUS_STEP[step];
    if (previousStep) {
      setStep(previousStep);
      return;
    }
    router.back();
  }

  function handleChangeCode(value: string) {
    setCode(value);
    setCodeCheckStatus("idle");
  }

  function handlePrimaryPress() {
    if (step === "email") {
      sendResetPasswordEmail(
        { email },
        {
          onSuccess: (data) => {
            setRemainingSeconds(data.expiresInSeconds);
            setCodeCheckStatus("idle");
            setStep("code");
          },
        }
      );
      return;
    }

    if (step === "code") {
      if (codeCheckStatus === "valid") {
        setStep("reset");
        return;
      }
      verifyResetPasswordEmail(
        { email, code },
        {
          onSuccess: (data) => {
            setPasswordResetToken(data.passwordResetToken);
            setCodeCheckStatus("valid");
          },
          onError: () => {
            setCodeCheckStatus("invalid");
          },
        }
      );
      return;
    }

    resetPassword(
      { email, passwordResetToken, newPassword },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  }

  const primaryButtonLabel =
    step === "reset"
      ? "비밀번호 재설정 완료"
      : step === "code"
        ? codeCheckStatus === "valid"
          ? "다음"
          : "인증하기"
        : "이메일 인증하기";

  const isPrimaryButtonDisabled =
    step === "email"
      ? !isEmailValid || isSendingEmail
      : step === "code"
        ? code.length < CODE_LENGTH || isVerifyingCode
        : !(isPasswordRuleValid && isPasswordMatch) || isResettingPassword;

  return (
    <ScreenContainer>
      <BackHeader
        label="비밀번호 찾기"
        background="bg"
        onPressBack={handleBack}
      />
      <Pressable
        className="flex-1"
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View className="flex-1 items-start justify-between px-4 pb-[48px] pt-10">
          <View className="w-full flex-1 flex-col gap-10">
            <Text className="text-gray-900 text-h-01">{STEP_TITLE[step]}</Text>

            {step === "email" && (
              <PasswordEmailStep email={email} onChangeEmail={setEmail} />
            )}

            {step === "code" && (
              <PasswordCodeStep
                code={code}
                onChangeCode={handleChangeCode}
                remainingSeconds={remainingSeconds}
                codeCheckStatus={codeCheckStatus}
              />
            )}

            {step === "reset" && (
              <PasswordResetStep
                newPassword={newPassword}
                onChangeNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                onChangeConfirmPassword={setConfirmPassword}
              />
            )}
          </View>

          <Button
            label={primaryButtonLabel}
            disabled={isPrimaryButtonDisabled}
            onPress={handlePrimaryPress}
          />
        </View>
      </Pressable>
    </ScreenContainer>
  );
}
