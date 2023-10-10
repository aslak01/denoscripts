import { type DataItem } from "csv/mod.ts";
import { parse } from "csv/parse.ts";

export async function writeJson(
  data: DataItem[],
  outfile: string,
) {
  await Deno.writeTextFile(outfile, JSON.stringify(data));
}

export async function readCsv(
  file: string,
) {
  const f = await Deno.readTextFile(file);
  const data = parse(f, { skipFirstRow: true });
  return data;
}
