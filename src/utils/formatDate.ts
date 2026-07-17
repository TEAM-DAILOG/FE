export function formatYearMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return { year, month };
}
