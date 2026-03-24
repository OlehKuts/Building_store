import ListGroup from "react-bootstrap/ListGroup";
import { Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeExpense } from "../store/expenseSlice";
import {
  cancelExpenseTransaction,
  selectArticleById,
} from "../store/articleSlice";

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
  const articleById = useSelector((state) =>
    selectArticleById(state, articleId),
  );
  console.log(expense);
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
                  articleExpense: articleById.articleExpense - expenseSum,
                  amount: articleById.amount - expenseArticleAmount,
                },
              }),
            );
            displayAlert("Видалено закупку товару!", "info");
            console.log(articleById);
          }}
          title={"Відмінити закупку товару"}
          style={{ marginLeft: "10px", cursor: "pointer" }}
        />
      </div>
    </ListGroup.Item>
  );
};
