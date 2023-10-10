# json merger

Merges json files by shared key

## running:

```bash
deno task merge -m input.json -s input2.json -k mergeKey
```

### options

```
-m: main file
-s: source to be joined with main
-k: main file key to consider
-c: source file key to consider. This will be same as -k if not set.
-o: output file name (defaults to output.json)
-d: debug mode for more console output
```
