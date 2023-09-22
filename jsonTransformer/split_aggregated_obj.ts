import { unixTimeToNoStr } from "./functions.ts";

type InputObject = {
  date: number;
  [key: string]: number;
};

type TransformedObject = {
  number: number;
  id: string;
  date: string; // ISO string
  company: string;
};

export function splitObj(input: InputObject): TransformedObject[] {
  const { date, ...rest } = input;

  const transformedArray: TransformedObject[] = [];

  for (const key in rest) {
    if (Object.prototype.hasOwnProperty.call(rest, key)) {
      const transformedItem: TransformedObject = {
        id: key,
        number: rest[key],
        date: unixTimeToNoStr(Number(date)),
        company: "Startsaldo",
      };
      transformedArray.push(transformedItem);
    }
  }

  return transformedArray;
}
