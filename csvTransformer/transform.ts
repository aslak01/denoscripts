type ObjectWithStringPropertyKeys = { [key: string]: string };
import { type DataItem } from "csv/mod.ts";

function objHasKeys(
  item: unknown,
  keysToCheck: string[],
): item is ObjectWithStringPropertyKeys {
  if (!item || Array.isArray(item)) {
    return false; // It's either not an object or an array
  }

  // Check that all required keys have string values
  return keysToCheck.every((key) =>
    typeof item === "object" && key in item &&
    typeof (item as ObjectWithStringPropertyKeys)[key] === "string"
  );
}

export function transform(row: DataItem): DataItem {
  if (objHasKeys(row, ["visitors", "browser", "device"])) {
    const { visitors, device } = row;

    const total = 113177659;
    const percent = (Number(visitors) / total) * 100;

    const [browser, version] = row.browser.split(" ");

    return {
      browser,
      version: version ? version : "Unknown",
      device,
      visitors,
      percent: percent.toFixed(10),
    };
  } else {
    throw new Error(`Not a valid object: ${row}`);
  }
}
