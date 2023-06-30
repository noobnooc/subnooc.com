// write a function that does the same as "number.toFixed(n)"
// but omit the trailing zeros
export function toFixed(value: number, n = 1) {
  const str = value.toFixed(n);
  if (str.indexOf(".") !== -1) {
    return str.replace(/\.?0+$/, "");
  } else {
    return str;
  }
}

export function prettifyNumber(n: number): string {
  if (Math.abs(n) >= 100000000) {
    return toFixed(n / 100000000) + " 亿";
  } else if (Math.abs(n) >= 10000) {
    return toFixed(n / 10000) + " 万";
  } else {
    return Intl.NumberFormat("en-US").format(n);
  }
}
