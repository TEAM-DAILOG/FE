import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import CalendarIcon from "@/assets/icons/calendarIcon.svg";
import { BackHeader, Divider, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { CategoryChip } from "@/src/components/common/CategoryChip";
import { TextField } from "@/src/components/common/TextField";
import { ScheduleRepeatSummary } from "@/src/components/schedule/ScheduleRepeatSummary";
import { useScheduleForm } from "@/src/hooks/schedules/useScheduleForm";
import { cn } from "@/src/lib/cn";

export default function ScheduleAddScreen() {
  const {
    isEdit,
    title,
    setTitle,
    categories,
    categoryId,
    toggleCategory,
    memo,
    setMemo,
    dateLabel,
    repeat,
    canSave,
    isSaving,
    isDeleting,
    scrollViewRef,
    handleMemoFocus,
    openDatePicker,
    handleSave,
    handleDelete,
  } = useScheduleForm();

  return (
    <ScreenContainer variant="stack">
      <BackHeader label={isEdit ? "일정수정" : "일정등록"} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerClassName="px-4 pt-5 pb-6"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-6">
            {/* 제목 + 카테고리 */}
            <View className="gap-4">
              {/* 제목 */}
              <View className="gap-3">
                <Text className="text-gray-900 text-b-02-m">제목</Text>
                <TextField
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              {/* 카테고리 */}
              <View className="gap-3">
                <Text className="text-gray-900 text-b-02-m">카테고리</Text>
                <View className="flex-row flex-wrap gap-2">
                  {categories.map((category) => (
                    <CategoryChip
                      key={category.id}
                      color={category.color}
                      label={category.name}
                      selected={categoryId === category.id}
                      onPress={() => toggleCategory(category.id)}
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* 구분선 */}
            <Divider className="-mx-4 border-gray-100" thickness={2} />

            {/* 날짜 + 반복 */}
            <View className="gap-4">
              {/* 날자 */}
              <Pressable
                onPress={openDatePicker}
                className="flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-3"
              >
                <Text className="text-gray-900 text-b-02-m">날짜</Text>
                <View className="flex-row items-center gap-1">
                  <CalendarIcon width={24} height={24} color="#020303" />
                  <Text className="text-gray-800 text-b-03-r">{dateLabel}</Text>
                </View>
              </Pressable>

              {/* 반복 */}
              <Pressable
                onPress={openDatePicker}
                className="flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-3"
              >
                <Text className="text-gray-900 text-b-02-m">반복</Text>
                <ScheduleRepeatSummary
                  value={repeat}
                  textClassName={cn(
                    "text-b-03-m",
                    repeat.mode === "none" ? "text-gray-400" : "text-gray-800"
                  )}
                />
              </Pressable>
            </View>

            {/* 구분선 */}
            <Divider className="-mx-4 border-gray-100" thickness={2} />

            {/* 메모 */}
            <View className="gap-3">
              <Text className="text-gray-900 text-b-02-m">메모</Text>
              <TextField
                type="textarea"
                placeholder="기억해야 할 정보를 메모하세요!"
                value={memo}
                onChangeText={setMemo}
                onFocus={handleMemoFocus}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="flex-col gap-3 px-4 pb-12 pt-2">
        {isEdit && (
          <Button
            label={isDeleting ? "삭제 중" : "삭제"}
            variant="stroke-green"
            disabled={isDeleting || isSaving}
            onPress={handleDelete}
          />
        )}
        <Button
          label={isSaving ? "저장 중" : "저장"}
          variant="fill-green"
          disabled={!canSave || isSaving || isDeleting}
          onPress={handleSave}
        />
      </View>
    </ScreenContainer>
  );
}
