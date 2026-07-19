import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import typoLogo from "@/assets/images/typoLogo.png";
import { Button, ScreenContainer } from "@/src/components/common";
import { TextField } from "@/src/components/common/TextField";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        className="flex-1"
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingTop: 154,
            paddingBottom: 34,
          }}
        >
          <View className="w-full items-center">
            <Image
              source={typoLogo}
              className="h-8 w-[145px]"
              resizeMode="contain"
              accessibilityLabel="DAILOG"
            />
          </View>

          <View className="mt-7 w-full">
            <View className="gap-4">
              <View className="gap-3">
                <Text className="text-gray-900 text-b-02-m">이메일</Text>
                <TextField
                  placeholder="이메일을 입력하세요."
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  returnKeyType="next"
                />
              </View>

              <View className="gap-3">
                <Text className="text-gray-900 text-b-02-m">비밀번호</Text>
                <TextField
                  placeholder="비밀번호를 입력하세요."
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>

            <View className="mt-4 flex-row items-center justify-between">
              <Link href="/signup" asChild>
                <Pressable hitSlop={8}>
                  <Text className="text-gray-600 text-b-04-r">회원가입</Text>
                </Pressable>
              </Link>
              <Text className="text-gray-600 text-b-04-r">비밀번호 찾기</Text>
            </View>

            <Button
              label="로그인"
              className="mt-5"
              onPress={Keyboard.dismiss}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
