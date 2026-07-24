import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useState } from "react";

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
import { useGetSchedules } from "@/src/hooks/queries/useGetSchedules";
import { useUpcomingSchedules } from "@/src/hooks/queries/useUpcomingSchedules";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { CalendarMode } from "@/src/types/calendar/calendarGrid.types";
import type {
  Category,
  CategoryColor,
} from "@/src/types/categories/category.types";
import { formatScheduleItem } from "@/src/utils/formatScheduleItem";

// 카테고리 관리 화면과 데이터 연동 후 목록 API로 교체 예정
const DUMMY_CATEGORIES: Category[] = [
  { id: "1", name: "CATEGORY 1", color: "BLUE" },
  { id: "2", name: "CATEGORY 2", color: "BROWN" },
  { id: "3", name: "CATEGORY 3", color: "GREEN" },
  { id: "4", name: "CATEGORY 4", color: "PURPLE" },
  { id: "5", name: "CATEGORY 5", color: "PINK" },
];

export default function CalendarScreen() {
  const router = useRouter();
  const openModal = useBaseModal((state) => state.openModal);

  const [mode, setMode] = useState<CalendarMode>("schedule");
  const [viewMonth, setViewMonth] = useState(() =>
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    DUMMY_CATEGORIES.map((category) => category.id)
  );
  const [isAiSummaryEnabled, setIsAiSummaryEnabled] = useState(false);

  // 선택한 달의 일정 목록 조회
  const { data: schedulesData } = useGetSchedules({
    startDate: dayjs(viewMonth).startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs(viewMonth).endOf("month").format("YYYY-MM-DD"),
  });
  const schedules = schedulesData?.schedules ?? [];

  // 선택한 달의 일정 목록을 사용 형식에 맞게 변환
  const monthScheduleItems = schedules.map(formatScheduleItem);

  // 가까운 일정 목록 조회
  const { data: upcomingData } = useUpcomingSchedules();

  // 가까운 일정 목록을 사용 형식에 맞게 변환
  const nearbySchedules = (upcomingData?.schedules ?? []).map(
    formatScheduleItem
  );

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
        onPressAddSchedule: () => router.push("/schedule"),
      },
    });
  };

  return (
    <ScreenContainer>
      <DateHeader
        date={viewMonth}
        onSelectMonth={setViewMonth}
        categories={DUMMY_CATEGORIES}
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
