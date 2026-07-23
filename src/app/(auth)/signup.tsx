import { router } from "expo-router";
import { useEffect, useState } from "react";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import {
  type SignupCodeCheckStatus,
  SignupCodeStep,
  SignupEmailStep,
  SignupPasswordStep,
  SignupProfileStep,
  SignupTermsStep,
} from "@/src/components/signup";
import { useSendSignupEmailVerification } from "@/src/hooks/mutations/useSendSignupEmailVerification";
import { useVerifySignupEmailCode } from "@/src/hooks/mutations/useVerifySignupEmailCode";
import { getErrorMessage } from "@/src/utils/getErrorMessage";

type SignupStep = "terms" | "email" | "code" | "password" | "profile";

const PREVIOUS_STEP: Partial<Record<SignupStep, SignupStep>> = {
  email: "terms",
  code: "email",
  password: "code",
  profile: "password",
};

const CODE_TIMER_SECONDS = 180;

export default function SignUpScreen() {
  const [step, setStep] = useState<SignupStep>("terms");

  const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
  const [pushNotificationAgreed, setPushNotificationAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(CODE_TIMER_SECONDS);
  const [codeCheckStatus, setCodeCheckStatus] =
    useState<SignupCodeCheckStatus>("idle");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [codeErrorMessage, setCodeErrorMessage] = useState("");
  const [emailVerificationToken, setEmailVerificationToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const sendSignupEmailVerification = useSendSignupEmailVerification();
  const verifySignupEmailCode = useVerifySignupEmailCode();

  useEffect(() => {
    if (step !== "code") return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  function handleToggleAll() {
    const nextValue = !(
      termsOfServiceAgreed &&
      privacyPolicyAgreed &&
      pushNotificationAgreed
    );

    setTermsOfServiceAgreed(nextValue);
    setPrivacyPolicyAgreed(nextValue);
    setPushNotificationAgreed(nextValue);
  }

  function handleBack() {
    const previousStep = PREVIOUS_STEP[step];

    if (previousStep) {
      setStep(previousStep);
      return;
    }

    router.back();
  }

  function handleNext() {
    if (step === "terms") {
      setStep("email");
      return;
    }
    if (step === "email") {
      if (emailVerificationToken) {
        setStep("password");
        return;
      }

      setEmailErrorMessage("");
      sendSignupEmailVerification.mutate(
        { email },
        {
          onSuccess: ({ expiresInSeconds }) => {
            setCode("");
            setRemainingSeconds(expiresInSeconds);
            setCodeCheckStatus("idle");
            setCodeErrorMessage("");
            setEmailVerificationToken("");
            setStep("code");
          },
          onError: (error) => {
            setEmailErrorMessage(getErrorMessage(error));
          },
        }
      );
      return;
    }
    if (step === "code") {
      if (codeCheckStatus === "valid" && emailVerificationToken) {
        setStep("password");
        return;
      }
      setCodeErrorMessage("");
      verifySignupEmailCode.mutate(
        { email, code },
        {
          onSuccess: ({ emailVerificationToken }) => {
            setEmailVerificationToken(emailVerificationToken);
            setCodeCheckStatus("valid");
            setStep("password");
          },
          onError: (error) => {
            setEmailVerificationToken("");
            setCodeCheckStatus("invalid");
            setCodeErrorMessage(getErrorMessage(error));
          },
        }
      );
      return;
    }
    if (step === "password") {
      setStep("profile");
    }
  }

  function handleChangeCode(value: string) {
    setCode(value);
    setCodeCheckStatus("idle");
    setCodeErrorMessage("");
  }

  function handleChangeEmail(value: string) {
    setEmail(value);
    setEmailErrorMessage("");
    setCode("");
    setCodeCheckStatus("idle");
    setCodeErrorMessage("");
    setEmailVerificationToken("");
  }

  function handleResendCode() {
    setCodeErrorMessage("");
    sendSignupEmailVerification.mutate(
      { email },
      {
        onSuccess: ({ expiresInSeconds }) => {
          setCode("");
          setCodeCheckStatus("idle");
          setEmailVerificationToken("");
          setRemainingSeconds(expiresInSeconds);
        },
        onError: (error) => {
          setCodeErrorMessage(getErrorMessage(error));
        },
      }
    );
  }

  function renderStep() {
    switch (step) {
      case "terms":
        return (
          <SignupTermsStep
            termsOfServiceAgreed={termsOfServiceAgreed}
            privacyPolicyAgreed={privacyPolicyAgreed}
            pushNotificationAgreed={pushNotificationAgreed}
            onToggleTermsOfService={() =>
              setTermsOfServiceAgreed((prev) => !prev)
            }
            onTogglePrivacyPolicy={() =>
              setPrivacyPolicyAgreed((prev) => !prev)
            }
            onTogglePushNotification={() =>
              setPushNotificationAgreed((prev) => !prev)
            }
            onToggleAll={handleToggleAll}
            onPressTermsDetail={() => router.push("/terms-of-service")}
            onPressPrivacyDetail={() => router.push("/privacy-policy")}
            onPressNext={handleNext}
          />
        );
      case "email":
        return (
          <SignupEmailStep
            email={email}
            onChangeEmail={handleChangeEmail}
            errorMessage={emailErrorMessage}
            isPending={sendSignupEmailVerification.isPending}
            onPressNext={handleNext}
          />
        );
      case "code":
        return (
          <SignupCodeStep
            code={code}
            onChangeCode={handleChangeCode}
            remainingSeconds={remainingSeconds}
            codeCheckStatus={codeCheckStatus}
            errorMessage={codeErrorMessage}
            isResending={sendSignupEmailVerification.isPending}
            isVerifying={verifySignupEmailCode.isPending}
            onPressResend={handleResendCode}
            onPressNext={handleNext}
          />
        );
      case "password":
        return (
          <SignupPasswordStep
            password={password}
            onChangePassword={setPassword}
            confirmPassword={confirmPassword}
            onChangeConfirmPassword={setConfirmPassword}
            onPressNext={handleNext}
          />
        );
      case "profile":
        return (
          <SignupProfileStep
            nickname={nickname}
            onChangeNickname={setNickname}
            onPressImageUpload={() => {}}
            onPressComplete={handleNext}
          />
        );
    }
  }

  return (
    <ScreenContainer>
      <BackHeader label="회원가입" background="bg" onPressBack={handleBack} />
      {renderStep()}
    </ScreenContainer>
  );
}
