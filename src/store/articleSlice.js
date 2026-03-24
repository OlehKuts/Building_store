import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const articlesAdapter = createEntityAdapter(); // повертає готовий обєкт з методами, селекторами(повертають кусок store) та ін.

const initialState = articlesAdapter.getInitialState({
  searchTerm: "",
});

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    add: (state, action) => {
      articlesAdapter.addOne(state, action.payload);
    },
    getFromStorage: (state, action) => {
      articlesAdapter.setAll(state, action.payload);
    },
    getSavedArticles: (state, action) => {
      articlesAdapter.setAll(state, action.payload);
    },
    removeArticle: (state, action) => {
      articlesAdapter.removeOne(state, action.payload);
    },
    changeTitle: (state, { payload }) => {
      articlesAdapter.updateOne(state, payload);
    },
    changeDescription: (state, action) => {
      articlesAdapter.updateOne(state, action.payload);
    },
    changePrice: (state, { payload }) => {
      articlesAdapter.updateOne(state, payload);
    },
    changeImgUrl: (state, action) => {
      articlesAdapter.updateOne(state, action.payload);
    },
    cancelExpenseTransaction: (state, { payload }) => {
      articlesAdapter.updateOne(state, payload);
    },
    writeOffArticle: (state, action) => {
      articlesAdapter.updateOne(state, action.payload);
    },
    rebuyArticle: (state, action) => {
      articlesAdapter.updateOne(state, action.payload);
    },
    applyIncome: articlesAdapter.updateMany,
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
});

export const { selectAll: selectAllArticles, selectById } =
  articlesAdapter.getSelectors((state) => state.articles);
export const getAllArticles = (state) => state.articles;
export const selectSearchTerm = (state) => state.articles.searchTerm;
// selectors created by "createSelector"
export const absentArticlesSelector = createSelector(
  selectAllArticles,
  (articles) => articles.filter((item) => !item.amount),
);

export const selectFilteredArticles = createSelector(
  [selectAllArticles, selectSearchTerm],
  (articles, searchTerm) =>
    !searchTerm
      ? articles.reverse()
      : articles
          .filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .reverse(),
);
export const selectRawArticles = createSelector(selectAllArticles, (articles) =>
  articles.map((item) => ({
    ...item,
    articleIncome: 0,
    articleExpense: 0,
    amount: 0,
    description:
      item.description.length > 110
        ? item.description.slice(0, 110)
        : item.description,
  })),
);

const { actions, reducer } = articleSlice;

export default reducer;
export const {
  add,
  removeArticle,
  getFromStorage,
  getSavedArticles,
  changeImgUrl,
  changeDescription,
  changePrice,
  changeTitle,
  writeOffArticle,
  rebuyArticle,
  applyIncome,
  setSearchTerm,
  cancelExpenseTransaction,
} = actions;
