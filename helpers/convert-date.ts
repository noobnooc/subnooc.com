export function convertDate(dateString: string): string {
  let date = new Date(dateString);

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
