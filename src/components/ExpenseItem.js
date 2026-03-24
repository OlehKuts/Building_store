import ListGroup from "react-bootstrap/ListGroup";
import { Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { removeExpense } from "../store/expenseSlice";
import {
  cancelExpenseTransaction,
  selectAllArticles,
  // selectArticleWithId,
} from "../store/articleSlice";
import { store } from "../store/store";

export const ExpenseItem = ({ expense, displayAlert }) => {
  const {
    expenseType,
    articleTitle,
    id,
    articleId,
    expenseDate,
    expenseArticleAmount,
    expenseSum,
  } = expense;
  const dispatch = useDispatch();
  const neededArticle = selectAllArticles(store.getState()).find(
    (item) => item.id === articleId,
  ); // instead so far the selectById created selector
  // const articleById = useSelector(selectArticleWithId("pJaQLoh7sh2adJOEEzVR3"));

  return (
    <ListGroup.Item
      variant={expenseType === "rebuy" ? "warning" : "primary"}
      className="d-flex expenseItem"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{articleTitle}</div>
        {expenseDate}
      </div>
      <div>{expenseArticleAmount} шт. </div>
      <div style={{ marginLeft: "20px" }}>{expenseSum} </div>
      <div> грн</div>
      <div>
        <Trash
          className="d-inline-block"
          color="red"
          onClick={() => {
            dispatch(removeExpense(id));
            dispatch(
              cancelExpenseTransaction({
                id: articleId,
                changes: {
                  articleExpense: neededArticle.articleExpense - expenseSum,
                },
              }),
            );
            displayAlert("Видалено закупку товару!", "info");
          }}
          title={"Відмінити закупку товару"}
          style={{ marginLeft: "10px", cursor: "pointer" }}
        />
      </div>
    </ListGroup.Item>
  );
};
