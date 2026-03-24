import ListGroup from "react-bootstrap/ListGroup";
import { ExpenseItem } from "./ExpenseItem";
import { useSelector } from "react-redux";
import { selectReversedExpenses } from "../store/expenseSlice";

export const ExpenseList = ({ displayAlert }) => {
  const reversedExpenses = useSelector(selectReversedExpenses);
  return (
    <>
      <h5>Перелік витрат</h5>
      <ListGroup>
        {reversedExpenses.length ? (
          reversedExpenses.map((item) => (
            <ExpenseItem
              expense={item}
              key={item.id}
              displayAlert={displayAlert}
            />
          ))
        ) : (
          <div>Список витрат пустий</div>
        )}
      </ListGroup>
    </>
  );
};
