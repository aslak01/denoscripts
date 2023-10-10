import { type DataItem } from "csv/mod.ts";
import { CsvStringifyStream } from "csv/csv_stringify_stream.ts";

export async function writeToCSV(
  data: DataItem[],
  outfile: string,
  useHeaders = true,
) {
  const f = await Deno.open(outfile, {
    write: true,
    create: true,
  });

  const readable = ReadableStream.from(data);

  let opts;

  if (useHeaders) {
    const columns = Object.keys(data[0]);
    opts = { columns };
  }

  await readable.pipeThrough(new CsvStringifyStream(opts))
    .pipeThrough(new TextEncoderStream()).pipeTo(f.writable);
}
