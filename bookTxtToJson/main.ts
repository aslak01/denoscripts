import { join } from "./imports.ts";
import { parseTxt } from "./functions.ts";

async function main() {
  const inputFileName = Deno.args[0];

  try {
    const start = performance.now();
    const inputFile = join("./", inputFileName);
    const data = await Deno.readTextFile(inputFile);

    const json = parseTxt(data);
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
