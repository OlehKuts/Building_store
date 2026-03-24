import { PostOrder } from "./PostOrder";
import { Cash } from "react-bootstrap-icons";
import { CreditCard } from "react-bootstrap-icons";
import Accordion from "react-bootstrap/Accordion";

export const IncomeItem = ({ income, eventKey }) => {
  const { purchaseDate, paymentType, orders, totalPrice } = income;

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        <div className="accordItemHeader">{purchaseDate} </div>
        <div className="accordItemHeader">{totalPrice} грн</div>
        <div>
          {" "}
          {paymentType === "Готівка" ? (
            <Cash color="forestGreen" size={18} title="Оплата готівкою" />
          ) : (
            <CreditCard color="gold" size={18} title="Оплата картою" />
          )}
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {orders.length
          ? orders.map((item) => (
              <PostOrder postOrder={item} key={item.articleId} />
            ))
          : null}
      </Accordion.Body>
    </Accordion.Item>
  );
};
