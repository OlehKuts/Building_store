import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { getCurrentStringDate } from "../utils/getCurrentStringDate";

const incomesAdapter = createEntityAdapter();
const initialState = incomesAdapter.getInitialState({});

const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      incomesAdapter.addOne(state, action.payload);
    },
    getIncomeFromStorage: (state, { payload }) => {
      incomesAdapter.setAll(state, payload);
    },
    removeAllIncomes: incomesAdapter.removeAll,
  },
});

export const { selectAll: selectAllIncomes } = incomesAdapter.getSelectors(
  (state) => state.incomes,
);

export const getTotalIncomeSum = createSelector(selectAllIncomes, (incomes) =>
  incomes.reduce((acc, current) => acc + current.totalPrice, 0),
);
export const getTotalIncomeSumByType = createSelector(
  selectAllIncomes,
  (incomes) => {
    const finalTotal = incomes.reduce(
      (acc, current) =>
        current.paymentType === "Готівка"
          ? { ...acc, totalCash: acc.totalCash + current.totalPrice }
          : { ...acc, totalCard: acc.totalCard + current.totalPrice },
      { totalCash: 0, totalCard: 0 },
    );
    return {
      ...finalTotal,
      totalSum: finalTotal.totalCard + finalTotal.totalCash,
    };
  },
);
export const getDailyIncomeSum = createSelector(selectAllIncomes, (incomes) =>
  incomes
    .filter((item) => item.purchaseDate === getCurrentStringDate())
    .reduce((acc, current) => acc + current.totalPrice, 0),
);
export const selectReversedIncomes = createSelector(
  selectAllIncomes,
  (incomes) => incomes.reverse(),
);

const { actions, reducer } = incomeSlice;

export default reducer;
export const { addIncome, getIncomeFromStorage, removeAllIncomes } = actions;
