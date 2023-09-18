import { parseArgs } from "./imports.ts";
import {
  isNotString,
  isUndefined,
  mergeArraysByMatchingKeys,
  msToTime,
} from "./functions.ts";

async function main() {
  const start = performance.now();
  const { m, s, k, c, o, h, d } = parseArgs(Deno.args);

  console.log("Welcome to the gpt thing");

  if (d) {
    console.dir(parseArgs(Deno.args));
  }

  if (h) {
    console.log(`
      -m: main file
      -s: source to be joined with main
      -k: main file key to consider
      -c: source file key to consider. This will be same as -k if not set.
      -o: output file name (defaults to output.json)
      -d: debug mode for more console output
    `);
    return 1;
  }

  if ([m, s, k].some(isUndefined)) {
    console.log("-m, -s, -k must be set, see -h for info");
    return 1;
  }

  if ([m, s, k].some(isNotString)) {
    console.log("-m, -s, -k must be set, see -h for info");
    return 1;
  }

  const input = JSON.parse(await Deno.readTextFile(m));
  const source = JSON.parse(await Deno.readTextFile(s));

  const keyA = k;
  const keyB = c ? c : k;

  const output = mergeArraysByMatchingKeys(input, source, keyA, keyB);

  const outfile = o ? o : "output.json";

  await Deno.writeTextFile(outfile, JSON.stringify(output));

  const finish = performance.now();
  const delta = finish - start;
  console.log(
    `Went through ${input.length} lines of input and merged it with ${source.length} lines of data in ${
      msToTime(delta)
    }`,
  );
}

main();
