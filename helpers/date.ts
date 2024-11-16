export function displayDate(dateString: string): string {
  return Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
  }).format(new Date(dateString));
}

// 根据参数中的 timestamp 计算距离现在的时间
export function displayTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 60 * 1000) {
    return "刚刚";
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))} 分钟前`;
  } else if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 60 * 1000))} 小时前`;
  } else if (diff < 30 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))} 天前`;
  } else {
    return Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
    }).format(new Date(timestamp));
  }
}
