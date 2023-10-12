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
  if (objHasKeys(row, ["visitors", "browser", "device", "percent"])) {
    const { visitors, device, percent } = row;
    const [browser, version] = row.browser.split(" ");

    return {
      browser,
      version: version ? version : "Unknown",
      device,
      uuid: crypto.randomUUID(),
      visitors,
      percent,
    };
  } else {
    throw new Error(`Not a valid object: ${row}`);
  }
}
