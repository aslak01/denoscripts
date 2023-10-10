import { join } from "path/join.ts";
import { parse } from "flags/mod.ts";
import { parseTxt } from "./functions.ts";

async function main() {
  try {
    const start = performance.now();
    const { i, o } = parse(Deno.args);
    const inputFileName = i;

    const inputFile = join("./", inputFileName);
    const data = await Deno.readTextFile(inputFile);

    const json = parseTxt(data);
    const outputFileName = o
      ? o + ".json"
      : inputFileName.split(".")[0] + "-out.json";

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
