import { join } from "path/join.ts";
import { parse } from "flags/mod.ts";
import { readCsv, writeJson } from "./functions.ts";

async function main() {
  const start = performance.now();
  const { i, o, h } = parse(Deno.args);

  if (h) {
    console.log(`
      -i: input file
      -o: output file name (defaults to output.json)
      -d: debug mode for more console output
    `);
    return 1;
  }

  try {
    const inputFile = join("./", i);
    const json = await readCsv(inputFile);
    const outputFileName = o ? o + ".json" : i.split(".")[0] + "-out" + ".json";

    await writeJson(json, outputFileName);

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
