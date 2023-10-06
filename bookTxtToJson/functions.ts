export function parseTxt(txt: string) {
  const chapters = txt.split(/(CHAPTER.+)\n/).filter(Boolean);

  type Chapter = {
    title: string;
    pages: string;
  };
  type Chapters = Chapter[];

  const pairs = chapters.reduce(
    (result: Chapters, currentValue: string, index) => {
      if (index % 2 === 0) {
        const pair = {
          "title": currentValue,
          "pages": chapters[index + 1],
        };

        result.push(pair);
      }
      return result;
    },
    [],
  );

  function trimArrayWithRulesRecursive(
    array: string[],
    index = 0,
    encounteredEmptyLine = true,
  ): string[] {
    if (index >= array.length) {
      return [];
    }

    const str = array[index].trim();

    if (str !== "") {
      encounteredEmptyLine = false;
      const rest = trimArrayWithRulesRecursive(array, index + 1, false);
      return [str, ...rest];
    } else {
      if (!encounteredEmptyLine) {
        encounteredEmptyLine = true;
        const rest = trimArrayWithRulesRecursive(array, index + 1, true);
        return [str, ...rest];
      } else {
        return trimArrayWithRulesRecursive(array, index + 1, true);
      }
    }
  }

  function trimFinalEmptyLines(arr: string[]): string[] {
    const final = arr.at(-1);
    if (final === "") arr.pop();
    return arr;
  }

  function sepText(chapter: string) {
    const trimmed = trimArrayWithRulesRecursive(chapter.split("\n"));
    return trimFinalEmptyLines(trimmed);
  }

  const bookData = pairs.map((pair) => {
    return {
      "title": pair.title,
      "pages": sepText(pair.pages),
    };
  });

  return bookData;
}
