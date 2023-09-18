import { parseArgs } from "./imports.ts";
import { isUndefined, msToTime } from "./functions.ts";

async function main() {
  const start = performance.now();
  const { i, k, p, h, d, l } = parseArgs(Deno.args);

  console.log("Welcome to the gpt thing");

  if (d) {
    console.dir(parseArgs(Deno.args));
  }

  if (h) {
    console.log(`
      -i: set input file. 
      it should be a list of strings separated by \\n

      -p: set template file.
      it should be a txt file with a template to be passed
      to chatgpt. use {search} to indicate where to input data.

      -k: set chatgpt api key
      
      -d: debug mode (more console logs)

      -l: local mode - no requests to gpt sent
    `);
    return 1;
  }

  if ([i, k, p].some(isUndefined)) {
    console.log("-i, -k & -p needs to be set");
    return 1;
  }

  const template = await Deno.readTextFile(p);
  if (d) console.log(template);
  const input = await Deno.readTextFile(i);
  const strings = input.trim().split("\n");

  const templates = strings.map((str) => template.replace("{search}", str));

  if (d) {
    console.log(templates[0]);
  }
  try {
    const cleanedData = [];

    for (const [idx, text] of templates.entries()) {
      const s = performance.now();
      const content = {
        "model": "gpt-3.5-turbo",
        "messages": [{
          "role": "system",
          "content": "You are looking up information and creating JSON",
        }, { "role": "user", "content": text }],
        "temperature": 0,
      };
      const req = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${k}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      };

      if (!l) {
        const res = await fetch(
          "https://api.openai.com/v1/chat/completions",
          req,
        );
        if (res.ok) {
          const data = await res.json();
          cleanedData.push(data);
          const fin = performance.now();
          const diff = fin - s;
          console.log(
            "checked template " + idx + " in " + msToTime(diff),
          );
        } else {
          console.error(`Error: ${res.status} - ${res.statusText}`);
        }
      }
      const outfile = i.split(".")[0] + ".json";

      const responses = cleanedData.map((gpt) =>
        JSON.parse(gpt.choices[0].message.content)
      );

      if (d) console.log(responses);

      await Deno.writeTextFile(outfile, JSON.stringify(responses));
      if (d) {
        const debugOutfile = outfile.split(".")[0] + "_debug." +
          outfile.split(".")[1];
        await Deno.writeTextFile(debugOutfile, JSON.stringify(cleanedData));
      }
    }
  } catch (err) {
    console.error("Error contacting gpt: " + err);
  }
  const finish = performance.now();
  const delta = finish - start;
  console.log(
    "checked out and output " + templates.length + " lines to file in " +
      msToTime(delta),
  );
}

main();
