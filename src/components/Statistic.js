import Table from "react-bootstrap/Table";
import {
  getTotalIncomeSumByType,
  selectAllIncomes,
  selectReversedIncomes,
} from "../store/incomeSlice";
import { useSelector } from "react-redux";
import {
  getTotalExpenseSum,
  selectAllExpenses,
  selectReversedExpenses,
} from "../store/expenseSlice";
import {
  getMonthlyExpenses,
  getMonthlyIncomes,
  mergeMontlyTotal,
} from "../utils/getMonthlyTotal";
import {
  absentArticlesSelector,
  selectAllArticles,
  selectRawArticles,
} from "../store/articleSlice";
import { store } from "../store/store";
import { useEffect, useMemo, useState } from "react";
import { simpleMonthConverter } from "../utils/monthConverter";
import { MonthlyExpensesReport } from "../PdfReports/MonthlyExpensesReport";
import { PdfLink } from "../PdfReports/PdfLink";
import { getValidMonthes, getValidYears } from "../utils/getValidMonthes";
import { MonthlyIncomesReport } from "../PdfReports/MonthlyIncomesReport";
import { SimpleDoc } from "../PdfReports/SimpleDoc";
import { YearlyReport } from "../PdfReports/YearlyReport";
import { getCurrentStringDate } from "../utils/getCurrentStringDate";
import { BasicCatalog } from "../catalogs/BasicCatalog";

export const Statistic = () => {
  const {
    totalSum: totalIncomeSum,
    totalCard,
    totalCash,
  } = useSelector(getTotalIncomeSumByType);
  const totalExpsenseSum = useSelector(getTotalExpenseSum);
  const profitSum = totalIncomeSum - totalExpsenseSum;
  const allExpenses = selectAllExpenses(store.getState());
  const testExpenses = useSelector((state) => state.expenses);
  const testIncomes = useSelector((state) => state.incomes);
  const allIncomes = selectAllIncomes(store.getState());
  const [mergedTotal, setMergedTotal] = useState([]);
  const reversedExpenses = useSelector(selectReversedExpenses);
  const reversedIncomes = useSelector(selectReversedIncomes);
  const flattenIncomes = reversedIncomes.reduce((acc, current) => {
    const flattenOrders = current.orders.flatMap((item) => ({
      ...item,
      purchaseDate: current.purchaseDate,
      paymentType: current.paymentType,
    }));
    return [...acc, ...flattenOrders];
  }, []);
  const expenseMonthes = getValidMonthes(reversedExpenses, "expenseDate");
  const incomeMonthes = getValidMonthes(flattenIncomes, "purchaseDate");
  const years = getValidYears();
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [chosenExpenseMonth, setChosenExpenseMonth] = useState("");
  const [chosenIncomeMonth, setChosenIncomeMonth] = useState("");
  const [chosenYear, setChosenYear] = useState("");
  const articleList = selectAllArticles(store.getState());
  const absentArticles = useSelector(absentArticlesSelector);
  const rawArticles = useSelector(selectRawArticles);

  const totalMonthlyExpenses = useMemo(() => {
    return [...filteredExpenses].reduce((acc, current) => {
      return acc + current.expenseSum;
    }, 0);
  }, [filteredExpenses]);
  const totalMonthlyIncomes = useMemo(() => {
    return [...filteredIncomes].reduce((acc, current) => {
      return acc + current.orderPrice;
    }, 0);
  }, [filteredIncomes]);
  const filteredYearlyTotal = useMemo(() => {
    return mergedTotal.length && chosenYear
      ? [...mergedTotal].filter((item) => item.month.includes(chosenYear))
      : [];
  }, [chosenYear, mergedTotal]);
  useEffect(() => {
    setMergedTotal(
      mergeMontlyTotal(
        getMonthlyExpenses(allExpenses),
        getMonthlyIncomes(allIncomes),
      ),
    );
  }, [testExpenses, testIncomes]);
  useEffect(() => {
    setFilteredExpenses(
      [...allExpenses].filter(
        (item) =>
          item.expenseDate.slice(item.expenseDate.indexOf(".") + 1) ===
          chosenExpenseMonth,
      ),
    );
  }, [chosenExpenseMonth]);
  useEffect(() => {
    setFilteredIncomes(
      [...flattenIncomes].filter(
        (item) =>
          item.purchaseDate.slice(item.purchaseDate.indexOf(".") + 1) ===
          chosenIncomeMonth,
      ),
    );
  }, [chosenIncomeMonth]);

  return (
    <div className="statistic">
      <div className="financialExponents">
        <h3>Фінансові показники</h3>
        <hr />
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Місяць</th>
              <th>Доходи, готівка</th>
              <th>Доходи, карта</th>
              <th>Витрати</th>
              <th>Різниця</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Загалом</td>
              <td>{totalCash}</td>
              <td>{totalCard}</td>
              <td>{totalExpsenseSum}</td>
              <td>{profitSum}</td>
            </tr>
            {mergedTotal.length ? (
              <>
                {mergedTotal.map((item) => (
                  <tr key={item.month}>
                    <td>{simpleMonthConverter(item.month)}</td>
                    <td>{item.incomeTotalCash}</td>
                    <td>{item.incomeTotalCard}</td>
                    <td>{item.expenseTotal}</td>
                    <td>{item.difference}</td>
                  </tr>
                ))}
              </>
            ) : null}
          </tbody>
        </Table>
      </div>
      <div className="reports">
        <h5>Звіти</h5>
        <h6>Місячний звіт по витратах</h6>
        <div style={{ marginBottom: "20px" }}>
          <select
            name="expenseMonthes"
            id="expenseMonthes"
            value={chosenExpenseMonth}
            onChange={(e) => setChosenExpenseMonth(e.target.value)}
          >
            <option value={""}>Оберіть місяць</option>
            {expenseMonthes.map((item) => (
              <option key={item} value={item}>
                {simpleMonthConverter(item)}
              </option>
            ))}
          </select>
        </div>
        {chosenExpenseMonth ? (
          <PdfLink
            filename={`Витрати за {${simpleMonthConverter(chosenExpenseMonth)}.pdf`}
            linkName={"Завантажити місячний звіт"}
            document={
              <MonthlyExpensesReport
                monthlyExpenses={filteredExpenses}
                chosenMonth={chosenExpenseMonth}
                totalMonthlyExpenses={totalMonthlyExpenses}
              />
            }
          />
        ) : null}
        <hr />
        <h6>Місячний звіт по доходах</h6>
        <div>
          <select
            name="incomeMonthes"
            id="incomeMonthes"
            value={chosenIncomeMonth}
            onChange={(e) => setChosenIncomeMonth(e.target.value)}
          >
            <option value={""}>Оберіть місяць</option>
            {incomeMonthes.map((item) => (
              <option key={item} value={item}>
                {simpleMonthConverter(item)}
              </option>
            ))}
          </select>
        </div>
        {chosenIncomeMonth ? (
          <PdfLink
            filename={`Доходи за ${simpleMonthConverter(chosenIncomeMonth)}.pdf`}
            linkName={"Завантажити місячний звіт"}
            document={
              <MonthlyIncomesReport
                monthlyIncomes={filteredIncomes}
                chosenMonth={chosenIncomeMonth}
                totalMonthlyIncomes={totalMonthlyIncomes}
              />
            }
          />
        ) : null}
        <hr />
        <h6>Річний звіт</h6>
        <div>
          <select
            name="years"
            id="financialYears"
            value={chosenYear}
            onChange={(e) => setChosenYear(e.target.value)}
          >
            <option value={""}>Оберіть рік</option>
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {chosenYear ? (
          <PdfLink
            filename={`Річний звіт ${chosenYear}.pdf`}
            linkName={"Завантажити річний звіт"}
            document={
              <YearlyReport
                yearlyData={filteredYearlyTotal}
                chosenYear={chosenYear}
              />
            }
          />
        ) : null}
        <hr />
        <h6>Каталог товарів</h6>
        <PdfLink
          filename={`Каталог товарів на ${getCurrentStringDate()}.pdf`}
          linkName={"Завантажити каталог"}
          document={
            <BasicCatalog
              catalogArticles={articleList}
              currentDate={getCurrentStringDate()}
              catalogName={"Повний каталог товарів станом на "}
            />
          }
        />
        <hr />
        {absentArticles.length ? (
          <>
            <h6>Перелік відсутніх товарів</h6>
            <PdfLink
              filename={`Перелік відсутніх товарів на ${getCurrentStringDate()}.pdf`}
              linkName={"Завантажити перелік"}
              document={
                <BasicCatalog
                  catalogArticles={absentArticles}
                  currentDate={getCurrentStringDate()}
                  catalogName={"Перелік відсутніх товарів станом на "}
                />
              }
            />
          </>
        ) : (
          <h6>Усі товари з каталогу є в наявності</h6>
        )}

        <hr />
        <h6>Дані про товари в форматі json</h6>
        <PdfLink
          filename={`Каталог_json станом на ${getCurrentStringDate()}.pdf`}
          linkName="Завантажити"
          document={
            <SimpleDoc content={JSON.stringify(rawArticles, null, 2)} />
          }
        />
      </div>
    </div>
  );
};
