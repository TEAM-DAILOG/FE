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
  buildMockScheduleDays,
  buildMockSchedules,
  buildMockThreadItems,
  buildMockUpcomingSchedules,
} from "@/src/constants/calendarMockData";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { CalendarMode } from "@/src/types/calendar/calendarGrid.types";
import type { Category } from "@/src/types/categories/category.types";

// 카테고리 관리 화면과 데이터 연동 후 목록 API로 교체 예정
const DUMMY_CATEGORIES: Category[] = [
  { id: "1", name: "CATEGORY 1", color: "blue" },
  { id: "2", name: "CATEGORY 2", color: "brown" },
  { id: "3", name: "CATEGORY 3", color: "green" },
  { id: "4", name: "CATEGORY 4", color: "purple" },
  { id: "5", name: "CATEGORY 5", color: "pink" },
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

  const schedules = buildMockSchedules();
  const scheduleDays = buildMockScheduleDays(schedules, viewMonth);
  const upcomingSchedules = buildMockUpcomingSchedules(schedules);

  const threadItems = [
    ...buildMockThreadItems(viewMonth),
    ...buildMockPastThreadItems(viewMonth),
  ];
  const diaryDays = buildMockDiaryDays(threadItems, viewMonth);

  const getDayInfo = (date: string) => ({
    categoryColors: scheduleDays[date],
    hasDiary: diaryDays[date],
  });

  const openScheduleListModal = (date: string) => {
    openModal("scheduleListModal", {
      props: {
        date,
        schedules: upcomingSchedules.filter(
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
            upcomingSchedules={upcomingSchedules}
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
