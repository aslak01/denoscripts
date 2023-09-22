import { join } from "./imports.ts";
import { writeToCSV } from "./functions.ts";

async function main() {
  try {
    const inputFileName = Deno.args[0];
    const start = performance.now();
    const inputFile = join("./", inputFileName);
    const json = JSON.parse(await Deno.readTextFile(inputFile));
    const outputFileName = inputFileName.split(".")[0] + ".csv";

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
