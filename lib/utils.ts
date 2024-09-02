export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}
export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function formatToDate(date: Date): string {
  const format = date.toLocaleString("ko", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return format;
}

export function formatToTime(date: Date): string {
  const format = date.toLocaleString("ko-KR", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return format;
}
