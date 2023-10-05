export function parseTxt(txt: string) {
  const chapters = txt.split(/\n(CHAPTER [IVXLCDM]+)\n/).filter(Boolean);

  const bookData = chapters.map((chapter) => {
    // Split the chapter into lines
    const lines = chapter.split("\n").filter(Boolean);

    // Initialize variables
    const chapterData = [];
    let currentPage = [];
    let linesCount = 0;

    // Process each line
    for (const line of lines) {
      if (linesCount >= 30) {
        // Page limit reached, start a new page
        chapterData.push(currentPage);
        currentPage = [];
        linesCount = 0;
      }

      // Add the line to the current page
      currentPage.push(line);

      if (line.trim() === "") {
        // Treat blank lines as paragraph breaks, start a new page
        chapterData.push(currentPage);
        currentPage = [];
        linesCount = 0;
      } else {
        // Count non-blank lines
        linesCount++;
      }
    }

    if (currentPage.length > 0) {
      chapterData.push(currentPage);
    }

    return chapterData;
  });
  return bookData;
}
