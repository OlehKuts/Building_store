import { configureStore } from "@reduxjs/toolkit"; // аналог застарілог createStore()
import articles from "./articleSlice";
import expenses from "./expenseSlice";
import incomes from "./incomeSlice"


const stringMiddleware = (store) => (next) => (action) =>  { // next is dispatch
        if (typeof action === "string") {
            return next({type: action})
        }
        return next(action)
}
 

export const store = configureStore({
    reducer: {articles, expenses, incomes},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== "production",// працюватиме тільки в режимі розробки, а не в продакшн
})