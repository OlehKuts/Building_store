import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const expensesAdapter = createEntityAdapter();
const initialState = expensesAdapter.getInitialState({});

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, { payload }) => {
      expensesAdapter.addOne(state, payload);
    },
    getExpenseFromStorage: (state, { payload }) => {
      expensesAdapter.setAll(state, payload);
    },
    removeExpense: (state, { payload }) => {
      expensesAdapter.removeOne(state, payload);
    },
    removeAllExpenses: expensesAdapter.removeAll,
  },
});

export const { selectAll: selectAllExpenses } = expensesAdapter.getSelectors(
  (state) => state.expenses,
);
// selectors
export const getTotalExpenseSum = createSelector(
  selectAllExpenses,
  (expenses) => expenses.reduce((acc, current) => acc + current.expenseSum, 0),
);

export const selectReversedExpenses = createSelector(
  selectAllExpenses,
  (expenses) => expenses.reverse(),
);

const { actions, reducer } = expenseSlice;

export default reducer;
export const {
  addExpense,
  getExpenseFromStorage,
  removeAllExpenses,
  removeExpense,
} = actions;
