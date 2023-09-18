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

export function mergeArraysByMatchingKeys<A, B>(
  arrayA: A[],
  arrayB: B[],
  keyA: keyof A,
  keyB: keyof B,
): (A & B)[] {
  const mergedArray: (A & B)[] = [];

  for (const itemA of arrayA) {
    const matchingItemB = arrayB.find((itemB) => itemA[keyA] === itemB[keyB]);
    if (matchingItemB) {
      const mergedItem = { ...itemA, ...matchingItemB };
      mergedArray.push(mergedItem);
    }
  }

  return mergedArray;
}
