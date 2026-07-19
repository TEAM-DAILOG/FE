export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function formatYearMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return { year, month };
}