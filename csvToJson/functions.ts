import { parse } from "./imports.ts";

export async function writeJson(
  data: CsvRow[],
  outfile: string,
) {
  await Deno.writeTextFile(outfile, JSON.stringify(data));
}

type CsvRow = Record<string, string | undefined>;

export async function readCsv(
  file: string,
) {
  const f = await Deno.readTextFile(file);
  const data = parse(f, { skipFirstRow: true });
  return data;
}
