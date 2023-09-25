export function isUndefined(variable: unknown): boolean {
  return typeof variable === "undefined";
}

export async function readInputFile(inputFile: string) {
  try {
    const inputFileInfo = await Deno.stat(inputFile);

    if (inputFileInfo.isFile !== true) {
      console.error(
        `The provided "${inputFile}" is not a valid file.`,
      );
      return;
    }

    const inputFileContent = await Deno.readTextFile(inputFile);

    return inputFileContent ? JSON.parse(inputFileContent) : [];
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      console.error("file does not exists");
    }
  }
  return [];
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

export function norDtStrToISODt(dateString: string, sep = "."): string {
  const [day, month, year] = dateString.split(sep).map(Number);
  return `${year}-${month}-${day}`;
}

export function dtToISODt(date: Date): string {
  return `${date.getFullYear()}-${
    (date.getMonth() + 1).toString().padStart(2, "0")
  }-${date.getDate().toString().padStart(2, "0")}`;
}

export function norDtStrToUnixT(dateString: string, sep = "."): number {
  const [day, month, year] = dateString.split(sep).map(Number);
  const jsMonth = month - 1;
  return new Date(year, jsMonth, day).getTime();
}
