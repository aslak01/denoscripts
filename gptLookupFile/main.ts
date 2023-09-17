import { parseArgs } from "./imports.ts";
import { isUndefined } from "./functions.ts";

async function main() {
  const start = performance.now();
  const { i, k, p, h, d } = parseArgs(Deno.args);

  console.log("Welcome to the gpt thing");

  if (d) {
    console.dir(parseArgs(Deno.args));
  }

  if (h) {
    console.log(`
      use -i to set input file. 
      it should be a list of strings separated by \\n

      use -p to set template file.
      it should be a txt file with a template to be passed
      to chatgpt. use {search} to indicate where to input data.

      use -k to set chatgpt api key
    `);
    return 1;
  }

  if ([i, k, p].some(isUndefined)) {
    console.log("-i, -k & -p needs to be set");
    return 1;
  }

  const template = await Deno.readTextFile(p);
  const input = await Deno.readTextFile(i);
  const strings = input.split("\n");

  const templates = strings.map((str) => template.replace("{search}", str));

  try {
    const cleanedData = [];

    for (const [i, template] of templates) {
      const s = performance.now();
      const req = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${k}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{
            "role": "system",
            "content": "You are looking up information and creating JSON",
          }, { "role": "user", "content": template }],
          "temperature": 0,
        }),
      };
      if (d) {
        console.log(req);
      }
      const res = await fetch(
        "https://api.openai.com/v1/chat/completions",
        req,
      );
      if (res.ok) {
        const data = await res.json();
        cleanedData.push(data);
        const fin = performance.now();
        const diff = fin - s;
        console.log("checked template " + i + " in " + diff + " ms");
      } else {
        console.error(`Error: ${res.status} - ${res.statusText}`);
      }
    }
    const outfile = i.split(".")[0] + ".json";

    await Deno.writeTextFile(outfile, JSON.stringify(cleanedData));
  } catch (err) {
    console.error("Error contacting gpt: " + err);
  }
  const finish = performance.now();
  const delta = finish - start;
  console.log(
    "checked out and output " + templates.length + " lines to file in " +
      delta + "ms",
  );
}

main();
