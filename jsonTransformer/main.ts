import { parseArgs } from "./imports.ts";
import { isUndefined, msToTime } from "./functions.ts";
import { transform } from "./transformer.ts";

async function main() {
  const start = performance.now();
  const { i, o, h, d } = parseArgs(Deno.args);

  if (d) {
    console.dir(parseArgs(Deno.args));
  }

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

  if (isUndefined(i)) {
    console.log("-i input file must be set");
    return 1;
  }

  const input = JSON.parse(await Deno.readTextFile(i));

  const output = transform(input);

  const outfile = o ? o : "output.json";

  await Deno.writeTextFile(outfile, JSON.stringify(output));

  const finish = performance.now();
  const delta = finish - start;
  console.log(
    `Transformed ${input.length} lines of input into ${output.length} lines of data and wrote it to ${outfile} in ${
      msToTime(delta)
    }`,
  );
}

main();
