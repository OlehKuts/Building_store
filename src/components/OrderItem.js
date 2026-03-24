import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useMemo, useState } from "react";
import { Trash } from "react-bootstrap-icons";
import { ListGroup } from "react-bootstrap";
import { cutBigString } from "../utils/cutBigString";

export const OrderItem = ({
  order,
  onDeleteOrder,
  onMuteOrder,
  displayAlert,
}) => {
  const {
    articleTitle,
    orderId,
    articlePrice,
    orderAmount,
    stockBalance,
    articleIncome,
  } = order;
  const [finalAmount, setFinalAmount] = useState(orderAmount);
  const newOrderPrice = useMemo(() => {
    return orderAmount * articlePrice;
  }, [orderAmount]);
  return (
    <>
      <Card className="text-center orderCard">
        <Card.Header className="orderHeader">
          <strong title={articleTitle}>
            {cutBigString(articleTitle, 22)}{" "}
          </strong>
          <small className="text-muted">({stockBalance})</small>
          <Trash
            color="red"
            className="d-inline-block trashOrder"
            onClick={() => onDeleteOrder(orderId)}
          />
        </Card.Header>
        <Card.Body>
          <ListGroup.Item className="mb-3 orderPriceAmountLine">
            <span>Ціна: {articlePrice} грн</span>
            <span>
              {" "}
              Кількість:{" "}
              <Badge pill bg="secondary" text="light" className="lg">
                {orderAmount}
              </Badge>{" "}
              шт.
            </span>
          </ListGroup.Item>

          <Card.Text>
            <input
              className="orderItemAmount"
              type="number"
              min={0}
              max={stockBalance}
              value={finalAmount}
              onChange={(e) => {
                setFinalAmount(+e.target.value);
              }}
              onInput={(e) => {
                if (e.target.value > stockBalance) {
                  e.target.value = stockBalance;
                }
              }}
            />{" "}
            шт.
            <Button
              variant="primary"
              style={{ marginLeft: "8px" }}
              onClick={() => {
                if (finalAmount > stockBalance) {
                  displayAlert(
                    "Замовлення товару перевищує наявну кількість!",
                    "danger",
                  );
                  return;
                }
                if (!finalAmount) {
                  displayAlert("Не змінено!", "danger");
                  return;
                }
                const mutedOrder = {
                  ...order,
                  orderAmount: finalAmount,
                  orderPrice: finalAmount * articlePrice,
                };
                onMuteOrder(orderId, mutedOrder);
                displayAlert("Замовлення змінено!", "success");
              }}
            >
              Змінити
            </Button>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          Загалом: {newOrderPrice} грн
        </Card.Footer>
      </Card>
    </>
  );
};
