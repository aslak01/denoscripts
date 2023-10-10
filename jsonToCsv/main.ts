import { join } from "path/join.ts";
import { parse } from "flags/mod.ts";
import { writeToCSV } from "./functions.ts";

async function main() {
  try {
    const { i, o } = parse(Deno.args);
    const inputFileName = i;
    const start = performance.now();
    const inputFile = join("./", inputFileName);
    const json = JSON.parse(await Deno.readTextFile(inputFile));
    const outputFileName = o
      ? o + ".csv"
      : inputFileName.split(".")[0] + "-out.csv";

    try {
      await writeToCSV(json, outputFileName);
    } catch (err) {
      console.error(err);
    }

    const finish = performance.now();
    const delta = finish - start;
    console.log(
      "wrote " + json.length + " lines to file " + outputFileName + " in " +
        delta + "ms",
    );
  } catch (err) {
    console.error(err);
  }
}

main();
