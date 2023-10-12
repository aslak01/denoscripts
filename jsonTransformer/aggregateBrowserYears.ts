type BrowserWithYearAndData = {
  browser: string;
  version: string;
  device: string;
  uuid: string;
  visitors: string;
  percent: string;
  released: string;
};

type YearData = {
  year: number;
  browsers: string[];
  totalVisitors: number;
  totalPercent: number;
};

function aggregateOnYear(
  browserinfo: BrowserWithYearAndData[],
): YearData[] {
  const result: YearData[] = [];
  return browserinfo.reduce((accumulator, b) => {
    const { browser, version, device, visitors, percent, released } = b;
    const year = Number(released);

    if (!accumulator[year]) {
      accumulator[year] = {
        year,
        totalVisitors: 0,
        totalPercent: 0,
        browsers: [],
      };
    }

    accumulator[year].browsers.push(
      `${browser} ${version} ${device} - ${Number(percent).toFixed(3)}`,
    );
    accumulator[year].totalVisitors += Number(visitors);
    accumulator[year].totalPercent += Number(percent);

    return accumulator;
  }, result);
}

function sortArrayByYear(
  arr: YearData[],
): YearData[] {
  return arr.sort((a, b) => a.year - b.year);
}

export function aggregateAndSortOnYear(
  browserinfo: BrowserWithYearAndData[],
): YearData[] {
  const aggregatedData = aggregateOnYear(browserinfo);
  const sortedData = sortArrayByYear(Object.values(aggregatedData));
  return sortedData;
}
