import { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ArticleForm from "./components/ArticleForm";
import ArticleList from "./components/ArticleList";
import { IncomeList } from "./components/IncomeList";
import { ExpenseList } from "./components/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  selectAllExpenses,
  getExpenseFromStorage,
} from "./store/expenseSlice";
import {
  addIncome,
  getIncomeFromStorage,
  selectAllIncomes,
} from "./store/incomeSlice";
import { store } from "./store/store";
import { AppNavbar } from "./components/AppNavbar";
import { Routes, Route } from "react-router-dom";
import { Statistic } from "./components/Statistic";
import { NotFound } from "./components/NotFound";
import Alert from "react-bootstrap/Alert";
import { defaultImgUrl, defaultSections } from "./temporaryData/temporaryData";
import { AppFooter } from "./components/AppFooter";
import { getFromStorage, selectAllArticles } from "./store/articleSlice";
import { DataClearance } from "./components/DataClearance";
import { BasicParams } from "./components/BasicParams";
import { PrimaryNotification } from "./components/PrimaryNotification";
import { Modal } from "./components/Modal";

export const App = () => {
  const dispatch = useDispatch();
  const [storageExpenses, setStorageExpenses] = useLocalStorage(
    "storage_expenses",
    [],
  );
  const [storageIncomes, setStorageIncomes] = useLocalStorage(
    "storage_incomes",
    [],
  );
  const [storageArticles, setStorageArticles] = useLocalStorage(
    "storage_articles",
    [],
  );
  const [showPrimaryNotification, setShowPrimaryNotificaiton] = useState(false);
  const expenseList = selectAllExpenses(store.getState());
  const incomeList = selectAllIncomes(store.getState());
  const articleList = selectAllArticles(store.getState());
  const testExpenses = useSelector((state) => state.expenses);
  const testIncomes = useSelector((state) => state.incomes);
  const onAddExpense = (newExpense) => {
    dispatch(addExpense(newExpense));
  };
  const onAddIncome = (newIncome) => {
    dispatch(addIncome(newIncome));
  };

  const [settings, setSettings] = useLocalStorage("building_store_settings", {
    profitCoefficient: 1.4,
    sections: defaultSections,
    basicImgUrl: defaultImgUrl,
  });

  const handleNewSettings = (newSettings) => {
    setSettings(() => ({
      ...newSettings,
      sections: newSettings.sections.split(","),
    }));
  };
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("warning");
  const displayAlert = (message = " ", variant = "warning", delay = 3000) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, delay);
  };
  useEffect(() => {
    dispatch(getExpenseFromStorage(storageExpenses));
    dispatch(getIncomeFromStorage(storageIncomes));
    dispatch(getFromStorage(storageArticles));
  }, []);
  useEffect(() => {
    setStorageExpenses(selectAllExpenses(store.getState()));
  }, [expenseList, testExpenses]);
  useEffect(() => {
    setStorageIncomes(selectAllIncomes(store.getState()));
  }, [incomeList, testIncomes]);
  useEffect(() => {
    setStorageArticles(selectAllArticles(store.getState()));
  }, [articleList, testExpenses]); // оновлення товарів у localStorage при оновленні в store
  useEffect(() => {
    if (!storageArticles.length) {
      setShowPrimaryNotificaiton(true);
    }
  }, []);
  return (
    <>
      <div className="App">
        {showAlert ? (
          <Alert
            className={`invokedAlert ${showAlert ? "active" : ""}`}
            variant={alertVariant}
          >
            {alertMessage}
          </Alert>
        ) : null}
        <AppNavbar />
        <Routes>
          <Route
            path="/"
            element={
              <ArticleList
                onAddExpense={onAddExpense}
                onAddIncome={onAddIncome}
                displayAlert={displayAlert}
              />
            }
          />
          <Route
            path="/newArticle"
            element={
              <ArticleForm
                settings={settings}
                onAddExpense={onAddExpense}
                displayAlert={displayAlert}
              />
            }
          />
          <Route
            path="/expenses"
            element={<ExpenseList displayAlert={displayAlert} />}
          />
          <Route path="/incomes" element={<IncomeList />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/settings">
            <Route
              path="basicParams"
              element={
                <BasicParams
                  settings={settings}
                  handleNewSettings={handleNewSettings}
                  displayAlert={displayAlert}
                />
              }
            />
            <Route
              path="dataClearance"
              element={<DataClearance displayAlert={displayAlert} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <AppFooter />
      <Modal open={showPrimaryNotification}>
        <PrimaryNotification
          displayAlert={displayAlert}
          closeModal={() => setShowPrimaryNotificaiton(false)}
        />
      </Modal>
    </>
  );
};

export default App;
