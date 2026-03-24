import { Accordion } from "react-bootstrap";
import { selectReversedIncomes } from "../store/incomeSlice";
import { IncomeItem } from "./IncomeItem";
import { useSelector } from "react-redux";

export const IncomeList = () => {
  const reversedIncomes = useSelector(selectReversedIncomes);
  return (
    <>
      <h5>Перелік транзакцій</h5>
      <hr />

      {reversedIncomes.length ? (
        <Accordion defaultKey="0" style={{ width: "60%" }}>
          {reversedIncomes.map((item) => (
            <IncomeItem key={item.id} income={item} eventKey={item.id} />
          ))}
        </Accordion>
      ) : (
        <div>Список транзакцій пустий</div>
      )}
    </>
  );
};
