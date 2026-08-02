import BambooLogo from "@/assets/images/bambooLogo.svg";
import {
  Divider,
  LogoHeader,
  ScreenContainer,
  TabScrollView,
} from "@/src/components/common";
import { PillButton, PushAlarmCard } from "@/src/components/settings";
import { usePatchAlarmSettings } from "@/src/hooks/mutations/alarm/usePatchAlarmSettings";
import { useChangePassword } from "@/src/hooks/mutations/auth/useChangePassword";
import { useLogout } from "@/src/hooks/mutations/auth/useLogout";
import { useUpdateMe } from "@/src/hooks/mutations/user/useUpdateMe";
import { useGetAlarmSettings } from "@/src/hooks/queries/alarm/useGetAlarmSettings";
import { useGetReminderSettings } from "@/src/hooks/queries/alarm/useGetReminderSettings";
import { useGetMe } from "@/src/hooks/queries/user/useGetMe";
import { useBaseModal } from "@/src/store/modals/baseModal";
import { useToastStore } from "@/src/store/toast/toastStore";
import { formatReminderSettings } from "@/src/types/alarm/alarm.mappers";
import type {
  ChangePasswordModalResult,
  EditProfileModalResult,
} from "@/src/types/modals/settingModal.types";
import { formatTimeWheelValue } from "@/src/utils/formatTimeWheelValue";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const openModal = useBaseModal((state) => state.openModal);
  const showToast = useToastStore((state) => state.showToast);
  const logoutMutation = useLogout();
  const changePasswordMutation = useChangePassword();
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isDiaryWriteEnabled, setIsDiaryWriteEnabled] = useState(false);
  const [isDiaryReplyEnabled, setIsDiaryReplyEnabled] = useState(false);

  const { data: me } = useGetMe();
  const { data: alarmSettings } = useGetAlarmSettings();
  const { data: reminderSettings } = useGetReminderSettings();
  const updateMeMutation = useUpdateMe();
  const patchAlarmSettingsMutation = usePatchAlarmSettings();

  const diaryWriteTimeLabel = reminderSettings
    ? formatTimeWheelValue(formatReminderSettings(reminderSettings).time)
    : "";

  useEffect(() => {
    if (!alarmSettings) {
      return;
    }
    setIsPushEnabled(alarmSettings.isPush);
    setIsDiaryWriteEnabled(alarmSettings.isDiary);
    setIsDiaryReplyEnabled(alarmSettings.isDiaryReply);
  }, [alarmSettings]);

  const handleChangePushEnabled = (value: boolean) => {
    patchAlarmSettingsMutation.mutate({ isPush: value });
  };

  const handleChangeDiaryWriteEnabled = (value: boolean) => {
    patchAlarmSettingsMutation.mutate({ isDiary: value });
  };

  const handleChangeDiaryReplyEnabled = (value: boolean) => {
    patchAlarmSettingsMutation.mutate({ isDiaryReply: value });
  };

  const email = me?.email ?? "";
  const nickname = me?.name ?? "";
  const photoUri = me?.profileImageUrl ?? null;

  const handleLogout = () => {
    if (logoutMutation.isPending) {
      return;
    }

    logoutMutation.mutate();
  };

  const openChangePasswordModal = () => {
    openModal("changePasswordModal", {
      props: {
        onSave: (result: ChangePasswordModalResult) => {
          changePasswordMutation.mutate(result, {
            onSuccess: () => {
              showToast("비밀번호가 변경되었습니다.");
            },
            onError: () => {
              showToast("기존 비밀번호가 일치하지 않습니다.");
            },
          });
        },
      },
    });
  };

  const openDeleteAccountModal = () => {
    openModal("deleteAccountModal", {
      props: {
        onConfirm: () => {
          // TODO: 회원탈퇴 API 연동 및 로그아웃 처리
          showToast("회원탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
        },
      },
    });
  };

  const openEditProfileModal = () => {
    openModal("editProfileModal", {
      props: {
        initialEmail: email,
        initialNickname: nickname,
        initialPhotoUri: photoUri,
        onSave: ({
          email: nextEmail,
          nickname: nextNickname,
          photoUri: nextPhotoUri,
        }: EditProfileModalResult) => {
          updateMeMutation.mutate(
            {
              name: nextNickname,
              email: nextEmail,
              profileImage: nextPhotoUri
                ? {
                    uri: nextPhotoUri,
                    name: "profile.jpg",
                    type: "image/jpeg",
                  }
                : null,
            },
            {
              onSuccess: () => {
                showToast("내 정보가 수정되었습니다.");
              },
              onError: () => {
                showToast("이미 사용 중인 이메일이거나 오류가 발생했습니다.");
              },
            }
          );
        },
      },
    });
  };

  return (
    <ScreenContainer>
      <LogoHeader />

      <TabScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          <View className="items-center gap-3 pt-6">
            <View className="items-center gap-2">
              <View className="size-[84px] items-center justify-center overflow-hidden rounded-lg bg-white">
                {photoUri ? (
                  <Image source={{ uri: photoUri }} className="size-full" />
                ) : (
                  <BambooLogo width={84} height={84} color="#4D826C" />
                )}
              </View>
              <Text className="text-gray-900 text-b-02-m">{nickname}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <PillButton
                label="비밀번호 변경"
                onPress={openChangePasswordModal}
              />
              <PillButton label="내 정보 수정" onPress={openEditProfileModal} />
            </View>
          </View>

          <Divider className="mt-6 border-green-200" />

          <View className="px-4 pt-6">
            <Text className="text-gray-900 text-b-02-m">알림 설정</Text>

            <PushAlarmCard
              className="mt-4"
              isPushEnabled={isPushEnabled}
              onChangePushEnabled={handleChangePushEnabled}
              isDiaryWriteEnabled={isDiaryWriteEnabled}
              onChangeDiaryWriteEnabled={handleChangeDiaryWriteEnabled}
              diaryWriteTimeLabel={diaryWriteTimeLabel}
              onPressDiaryWriteTime={() => router.push("/alarm")}
              isDiaryReplyEnabled={isDiaryReplyEnabled}
              onChangeDiaryReplyEnabled={handleChangeDiaryReplyEnabled}
            />
          </View>

          <View className="flex-1 items-start justify-end gap-3 px-4 pb-10">
            <Pressable
              className="border-b border-gray-400 pb-0.5"
              disabled={logoutMutation.isPending}
              onPress={handleLogout}
            >
              <Text className="text-gray-400 text-b-04-m">로그아웃</Text>
            </Pressable>
            <Pressable
              className="border-b border-gray-400 pb-0.5"
              onPress={openDeleteAccountModal}
            >
              <Text className="text-gray-400 text-b-04-m">회원탈퇴</Text>
            </Pressable>
          </View>
        </View>
      </TabScrollView>
    </ScreenContainer>
  );
}
