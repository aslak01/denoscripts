import { type DataItem } from "csv/mod.ts";
import { objHasKeys } from "./functions.ts";

type Transformed = {
  browser: string;
  version: string;
  device: string;
  uuid: string;
  visitors: string;
  percent: string;
};

export function transform(row: DataItem): Transformed {
  if (objHasKeys(row, ["visitors", "browser", "device"])) {
    const { visitors, device } = row;

    const total = 113177659;
    const percent = (Number(visitors) / total) * 100;

    const [browser, version] = row.browser.split(" ");

    return {
      browser,
      version: version ? version : "Unknown",
      device,
      uuid: crypto.randomUUID(),
      visitors,
      percent: percent.toFixed(5),
    };
  } else {
    throw new Error(`Not a valid object: ${row}`);
  }
}
