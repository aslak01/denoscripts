import { join } from "./imports.ts";
import { readCsv, writeJson } from "./functions.ts";

async function main() {
  const inputFileName = Deno.args[0];

  try {
    const start = performance.now();
    const inputFile = join("./", inputFileName);
    const data = await Deno.readTextFile(inputFile);
    console.log(data);

    const json = "";
    const outputFileName = inputFileName.split(".")[0] + ".json";

    await Deno.writeTextFile(outputFileName, JSON.stringify(json));

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
