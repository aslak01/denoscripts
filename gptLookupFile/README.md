# gptLookupFile

checks all the strings lines of an input file with the prompt defined in a
prompt file on chatgpt, and outputs the result to json

call

```bash
deno task lookup -i short.txt -p prompt.txt -k $(pass show openai/fetchkey)
```

### JSON

added partial support for json lookups with the -j flag, need to edit main.ts to
setup a template for parsing the json into a string for now
