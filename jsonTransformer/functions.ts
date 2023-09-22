export function isUndefined(variable: unknown): boolean {
  return typeof variable === "undefined";
}

export function isString(variable: unknown): boolean {
  return typeof variable === "string";
}

export function isNotString(x: unknown): boolean {
  return isString(x) === false;
}

export function msToTime(ms: number) {
  const hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  const minutes = Math.floor(ms / 60000);
  ms %= 60000;
  const seconds = Math.floor(ms / 1000);
  ms %= 1000;

  const timeArray = [];
  if (hours) timeArray.push(`${hours}hr${hours > 1 ? "s" : ""}`);
  if (minutes) timeArray.push(`${minutes}min${minutes > 1 ? "s" : ""}`);
  if (seconds) timeArray.push(`${seconds}s`);
  if (ms) timeArray.push(`${ms}ms`);

  return timeArray.join(" ");
}

export function unixTimeToNoStr(unix: number): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("nb-NO", options).format(new Date(unix));
}

export function norDtStrToDt(dateString: string, sep = "."): Date {
  const [day, month, year] = dateString.split(sep).map(Number);
  const jsMonth = month - 1;
  return new Date(year, jsMonth, day);
}

export function norDtStrToUnixT(dateString: string, sep = "."): number {
  const [day, month, year] = dateString.split(sep).map(Number);
  const jsMonth = month - 1;
  return new Date(year, jsMonth, day).getTime();
}
