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
