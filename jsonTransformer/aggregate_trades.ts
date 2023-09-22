import { d3 } from "./imports.ts";
import { norDtStrToUnixT } from "./functions.ts";

type FinnesData = {
  date: string;
  company: string;
  number: string;
  id: string;
};

type NormalisedFinnesData = {
  date: number;
  number: number;
  id: string;
};

export function aggregateTrades(input: FinnesData[]) {
  function normaliseTrades(trade: FinnesData): NormalisedFinnesData {
    const date = norDtStrToUnixT(trade.date);
    const number = Number(trade.number);
    return { date, number, id: trade.id };
  }

  const normalisedInput = input
    .map(normaliseTrades)
    .sort((a, b) => a.date - b.date);

  const uniqueIds = [...new Set(normalisedInput.map((item) => item.id))];

  type CumulativeSums = Record<string, number>;
  const result: CumulativeSums[] = [];
  const cumulativeSums: CumulativeSums = {};

  for (const item of normalisedInput) {
    const { date, number, id } = item;

    // Initialize the cumulative sum for this uniqueId if not done already
    if (!cumulativeSums[id]) {
      cumulativeSums[id] = 0;
    }

    // Update the cumulative sum for this uniqueId
    cumulativeSums[id] += number;

    // Check if the date already exists in the result array
    const existingItem = result.find((item) => item.date === date);

    if (!existingItem) {
      // If the date doesn't exist, create a new object and add it to the result array
      const newItem: CumulativeSums = {
        date,
        ...cumulativeSums,
      };
      result.push(newItem);
    } else {
      // If the date exists, update the existing object with the new cumulative sums
      existingItem[id] = cumulativeSums[id];
    }
  }

  const parseTime = d3.timeFormat("%d.%m.%Y");
  for (const item of result) {
    for (const uniqueId of uniqueIds) {
      if (item[uniqueId] === undefined) {
        item[uniqueId] = 0;
      }
    }
  }
  // return result.map((it) => ({ ...it, date: parseTime(it.date) }));
  return result;
}
