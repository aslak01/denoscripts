import { join } from "path/join.ts";
import { readCsv, writeToCSV } from "./functions.ts";
import { transform } from "./transform.ts";

async function main() {
  try {
    const inputFileName = Deno.args[0];
    const start = performance.now();
    const inputFile = join("./", inputFileName);
    const json = await readCsv(inputFile);
    const outputFileName = "output.csv";

    const massaged = json.map(transform);

    try {
      await writeToCSV(massaged, outputFileName);
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
