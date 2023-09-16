import { readCsv } from "./functions.ts";

Deno.bench(function readOneCsv() {
  readCsv("./finnes.csv");
});
