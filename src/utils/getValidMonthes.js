export const getValidMonthes = (arr = [], dateProp) => {
  let monthList = new Array();
  arr.forEach((item) => {
    const month = item[dateProp].slice(item[dateProp].indexOf(".") + 1);
    if (!monthList.some((item) => item === month)) {
      monthList.push(month);
    }
  });
  return monthList;
};
export const getValidYears = () => {
  const date = new Date();
  let currentYear = date.getFullYear();
  const iterations = currentYear + 1 - 2026;
  let years = [];
  for (let index = 0; index < iterations; index++) {
    years = [...years, currentYear.toString()];
    currentYear--;
  }
  return years;
};
