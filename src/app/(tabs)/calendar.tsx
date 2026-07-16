import dayjs from "dayjs";
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
import type { CalendarMode } from "@/src/types/calendar/calendarGrid.types";

export default function CalendarScreen() {
  const [mode, setMode] = useState<CalendarMode>("schedule");
  const [viewMonth] = useState(() => dayjs().format("YYYY-MM-DD"));

  const schedules = buildMockSchedules(viewMonth);
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

  return (
    <ScreenContainer>
      <DateHeader
        onPressToggle={() =>
          setMode((prev) => (prev === "schedule" ? "diary" : "schedule"))
        }
      />
      <TabScrollView>
        {mode === "schedule" ? (
          <SchedulePanel
            month={viewMonth}
            getDayInfo={getDayInfo}
            upcomingSchedules={upcomingSchedules}
          />
        ) : (
          <DiaryPanel
            month={viewMonth}
            getDayInfo={getDayInfo}
            threadItems={threadItems}
          />
        )}
      </TabScrollView>
    </ScreenContainer>
  );
}
