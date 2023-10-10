import { assertEquals } from "assert/mod.ts";
import { readCsv } from "./functions.ts";
import finnesData from "./finnes.json" assert { type: "json" };

Deno.test(async function readTest() {
  assertEquals(await readCsv("./finnes.csv"), finnesData);
});
