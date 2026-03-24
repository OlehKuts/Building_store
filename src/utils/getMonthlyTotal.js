export const getMonthlyExpenses = (arr = []) => {
  let seen = new Array();
  arr.forEach((item) => {
    const month = item.expenseDate.slice(item.expenseDate.indexOf(".") + 1);
    const value = { month, total: item.expenseSum };
    if (!seen.some((item) => item.month === month)) {
      seen.push(value);
    } else {
      seen = [...seen].map((item) =>
        item.month === month
          ? { ...item, total: item.total + value.total }
          : item,
      );
    }
  });
  return seen;
};
export const getMonthlyIncomes = (arr = []) => {
  let seen = new Array();
  arr.forEach((item) => {
    const month = item.purchaseDate.slice(item.purchaseDate.indexOf(".") + 1);
    const { paymentType: type } = item;
    const value = {
      month,
      totalCash: type === "Готівка" ? item.totalPrice : 0,
      totalCard: type === "Карта" ? item.totalPrice : 0,
    };
    if (!seen.some((item) => item.month === month)) {
      seen.push(value);
    } else {
      seen = [...seen].map((item) =>
        item.month === month
          ? {
              ...item,
              totalCard: item.totalCard + value.totalCard,
              totalCash: item.totalCash + value.totalCash,
            }
          : item,
      );
    }
  });
  return seen;
};

export const mergeMontlyTotal = (exp, inc) => {
  let finalArr = exp.map((item) => ({
    month: item.month,
    expenseTotal: item.total,
    incomeTotalCard: 0,
    incomeTotalCash: 0,
    difference: 0 - item.total,
  }));
  inc.forEach((item) => {
    finalArr = [...finalArr].map((current) =>
      current.month === item.month
        ? {
            ...current,
            incomeTotalCard: item.totalCard,
            incomeTotalCash: item.totalCash,
            difference: item.totalCard + item.totalCash - current.expenseTotal,
          }
        : current,
    );
  });
  return finalArr;
};
