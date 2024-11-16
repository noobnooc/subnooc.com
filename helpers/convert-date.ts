export function displayDate(dateString: string): string {
  return Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
  }).format(new Date(dateString));
}
