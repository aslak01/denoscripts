import { type DataItem } from "csv/mod.ts";
export function transform(csvRow: DataItem): DataItem {
  //
  console.log(csvRow);
  return csvRow;
}
