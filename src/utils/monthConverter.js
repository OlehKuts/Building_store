const ukrMonthes = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const monthConverter = (fullDateStr) => {
  const basicStr = fullDateStr.slice(fullDateStr.indexOf(".") + 1);
  const year = basicStr.slice(basicStr.indexOf(".") + 1);
  const month = +basicStr.slice(0, basicStr.indexOf("."));
  return `${ukrMonthes[month - 1]} ${year}`;
};
export const simpleMonthConverter = (simpleDateStr) => {
  const year = simpleDateStr.slice(simpleDateStr.indexOf(".") + 1);
  const month = +simpleDateStr.slice(0, simpleDateStr.indexOf("."));
  return `${ukrMonthes[month - 1]} ${year}`;
};
