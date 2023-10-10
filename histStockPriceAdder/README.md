# histStockPriceAdder

## Broken due to a bug in deno for the moment
the code runs on node tho if you want to try it out

## description
iterates over an array of stock trades and adds a value from yahoo finance

use `-m` to add a modifier to the stock lookup i.e. `OL` to check the symbols on
the Oslo Exchange

```bash
deno run --allow-read --allow-write=. --allow-net main.ts -i input.json -m modifier
```
