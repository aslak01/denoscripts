import { type DataItem } from "csv/mod.ts";
export function transform(csvRow: DataItem): DataItem {
  // Check if "browser" is a property in csvRow
  if (!("browser" in csvRow)) {
    throw new Error("not a browserlist entry");
  }
  if (typeof csvRow?.browser !== "string") {
    throw new Error("not a browserlist entry");
  }

  // Split the "browser" string into browser and version
  const [browser, version] = csvRow.browser.split(" ");

  // Update the "browser" property with the parsed browser
  csvRow.browser = browser;

  // Create a new property "version" with the parsed version
  csvRow.version = version;

  console.log(csvRow);
  return csvRow;
}
