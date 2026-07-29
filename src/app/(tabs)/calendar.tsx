import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

import { DiaryPanel, SchedulePanel } from "@/src/components/calendar";
import {
  DateHeader,
  ScreenContainer,
  TabScrollView,
} from "@/src/components/common";
import {
  buildMockDiaryDays,
  buildMockPastThreadItems,
  buildMockThreadItems,
} from "@/src/constants/calendarMockData";
import { useGetCategories } from "@/src/hooks/queries/category/useGetCategories";
import { useGetSchedules } from "@/src/hooks/queries/schedules/useGetSchedules";
import { useUpcomingSchedules } from "@/src/hooks/queries/schedules/useUpcomingSchedules";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { CalendarMode } from "@/src/types/calendar/calendarGrid.types";
import type { CategoryColor } from "@/src/types/categories/category.types";
import type { Schedule } from "@/src/types/schedules/schedule.types";
import { formatScheduleItem } from "@/src/utils/formatScheduleItem";

export default function CalendarScreen() {
  const router = useRouter();
  const openModal = useBaseModal((state) => state.openModal);

  const [mode, setMode] = useState<CalendarMode>("schedule");
  const [viewMonth, setViewMonth] = useState(() =>
    dayjs().format("YYYY-MM-DD")
  );
  const [isAiSummaryEnabled, setIsAiSummaryEnabled] = useState(false);

  // 카테고리 목록 조회
  const { data: categoriesData } = useGetCategories();
  const categories = categoriesData ?? [];

  // 카테고리별 노출 여부
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const hasInitializedCategoryFilter = useRef(false);
  useEffect(() => {
    if (categoriesData && !hasInitializedCategoryFilter.current) {
      hasInitializedCategoryFilter.current = true;
      setSelectedCategoryIds(categoriesData.map((category) => category.id));
    }
  }, [categoriesData]);

  const isCategoryVisible = (schedule: Schedule) =>
    categoriesData === undefined ||
    selectedCategoryIds.includes(String(schedule.category.categoryId));

  // 선택한 달의 일정 목록 조회
  const { data: schedulesData } = useGetSchedules({
    startDate: dayjs(viewMonth).startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs(viewMonth).endOf("month").format("YYYY-MM-DD"),
  });
  // 노출 카테고리로 필터링한 일정 목록
  const schedules = (schedulesData?.schedules ?? []).filter(isCategoryVisible);

  // 선택한 달의 일정 목록을 사용 형식에 맞게 변환
  const monthScheduleItems = schedules.map(formatScheduleItem);

  // 가까운 일정 목록 조회
  const { data: upcomingData } = useUpcomingSchedules();

  // 가까운 일정 목록을 노출 카테고리로 필터링 후 사용 형식에 맞게 변환
  const nearbySchedules = (upcomingData?.schedules ?? [])
    .filter(isCategoryVisible)
    .map(formatScheduleItem);

  // 각 일정의 날짜별 카테고리 색상 정보 매핑
  const scheduleDays: Record<string, CategoryColor[]> = {};
  for (const schedule of schedules) {
    const key = dayjs(schedule.date).format("YYYY-MM-DD");
    scheduleDays[key] = [
      ...(scheduleDays[key] ?? []),
      schedule.category.categoryColor,
    ];
  }

  // 일기 API 연동 이후 대체 예정
  const threadItems = [
    ...buildMockThreadItems(viewMonth),
    ...buildMockPastThreadItems(viewMonth),
  ];

  // 일기 API 연동 이후 대체 예정
  const diaryDays = buildMockDiaryDays(threadItems, viewMonth);

  const getDayInfo = (date: string) => ({
    categoryColors: scheduleDays[date],
    hasDiary: diaryDays[date],
  });

  const openScheduleListModal = (date: string) => {
    openModal("scheduleListModal", {
      props: {
        date,
        schedules: monthScheduleItems.filter(
          (schedule) => schedule.date === date
        ),
        onPressAddSchedule: () =>
          router.push({
            pathname: "/schedule",
            params: { date },
          }),
      },
    });
  };

  return (
    <ScreenContainer>
      <DateHeader
        date={viewMonth}
        onSelectMonth={setViewMonth}
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        onChangeSelectedCategoryIds={setSelectedCategoryIds}
        onPressCategorySettings={() => router.push("/category")}
        isAiSummaryEnabled={isAiSummaryEnabled}
        onChangeAiSummaryEnabled={setIsAiSummaryEnabled}
        onPressToggle={() =>
          setMode((prev) => (prev === "schedule" ? "diary" : "schedule"))
        }
      />
      <TabScrollView>
        {mode === "schedule" ? (
          <SchedulePanel
            month={viewMonth}
            onDayPress={(date) => openScheduleListModal(date)}
            getDayInfo={getDayInfo}
            upcomingSchedules={nearbySchedules}
          />
        ) : (
          <DiaryPanel
            month={viewMonth}
            getDayInfo={getDayInfo}
            threadItems={threadItems}
            isAiSummaryEnabled={isAiSummaryEnabled}
          />
        )}
      </TabScrollView>
    </ScreenContainer>
  );
}
