# gptLookupFile

checks all the strings lines of an input file with the prompt defined in a
prompt file on chatgpt, and outputs the result to json

call

```bash
deno run --allow-read=. --allow-write=. --allow-net main.ts -i short.txt -p prompt.txt -k $(pass show openai/apikey)
```
