import { parseArgs, yahooFinance } from "./imports.ts";
import { dtToISODt, isUndefined, msToTime, norDtStrToDt } from "./functions.ts";

async function main() {
  const start = performance.now();
  const { i, h, d, l, m } = parseArgs(Deno.args);

  console.log("Welcome to the yfinance thing");

  if (d) {
    console.dir(parseArgs(Deno.args));
  }

  if (h) {
    console.log(`
      -i: set input file. 

      -d: debug mode (more console logs)

      -l: local mode - no net requests sent
    `);
    return 1;
  }

  if (isUndefined(i)) {
    console.log("-i needs to be set");
    return 1;
  }

  const input = JSON.parse(await Deno.readTextFile(i));

  if (d) {
    console.log(input.lenght, "lines of input");
  }
  try {
    const updatedData = [];
    const modifier = m ? "." + m : "";

    for (const stock of input) {
      const s = performance.now();

      const symbol = stock.id + modifier;
      const date = norDtStrToDt(stock.date);
      const date2 = new Date(date);
      date2.setDate(date2.getDate() + 1);
      const period1 = date.toISOString();
      const period2 = date2.toISOString();

      const queryOptions = { period1, period2 };
      const isSale = Number(stock.number) > 0;

      console.log(typeof symbol, symbol, queryOptions);

      let response;

      const query = symbol;
      try {
        response = await yahooFinance.historical(
          query,
          queryOptions,
        );
      } catch (error) {
        if (error instanceof yahooFinance.errors.FailedYahooValidationError) {
          // See the validation docs for examples of how to handle this
          // error.result will be a partially validated / coerced result.
        } else if (error instanceof yahooFinance.errors.HTTPError) {
          // Probably you just want to log and skip these
          console.warn(
            `Skipping yf.lookup ("${symbol}"): [${error.name}] ${error.message}`,
          );
          return;
        } else {
          // Same here
          console.warn(
            `Something went wrong. Skipping yf.lookup ("${symbol}"): [${error.name}] ${error.message}`,
          );
          return;
        }
      }

      const quote = response && response[0];

      const price = isSale ? quote?.high : quote?.low;

      const valuedStock = { ...stock, price };
      updatedData.push(valuedStock);
      const fin = performance.now();
      const diff = fin - s;
      console.log(
        "checked out " + stock.id + " in " + msToTime(diff),
      );
    }

    const outfile = i.split(".")[0] + "-result" + ".json";

    await Deno.writeTextFile(outfile, JSON.stringify(updatedData));
  } catch (err) {
    console.error("Error contacting yahoo finance: " + err);
  }
  const finish = performance.now();
  const delta = finish - start;
  console.log(
    "added stock price to " + input.length + " stocks in " + msToTime(delta),
  );
}

main();
