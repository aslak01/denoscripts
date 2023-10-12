import { join } from "path/join.ts";
import { parse } from "flags/mod.ts";
import { readCsv, writeToCSV } from "./functions.ts";
import { transform } from "./transform.ts";

async function main() {
  const start = performance.now();
  const { i, o, h, d } = parse(Deno.args);

  if (h) {
    console.log(`
      This scripts assumes you have edited
      "transform.ts" to export your transform function
      with the name "transform".

      -i: input file
      -o: output file name (defaults to output.json)
      -d: debug mode for more console output
    `);
    return 1;
  }

  try {
    const inputFileName = i;
    const inputFile = join("./", inputFileName);
    const json = await readCsv(inputFile);
    const outputFileName = o || inputFileName + "-out.csv";

    const massaged = json.map(
      transform,
    ).filter((b) => Number(b.visitors) > 1000).filter((b) =>
      !Object.values(b).some((v) =>
        typeof v === "string" && (v.includes("Unknown") || v.includes("N/A"))
      )
    );

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
