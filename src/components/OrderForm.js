import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { paymentTypes } from "../temporaryData/temporaryData";
import Card from "react-bootstrap/Card";
import { OrderItem } from "./OrderItem";
import { nanoid } from "@reduxjs/toolkit";
import { scrollToTop } from "../utils/scrollToTop";
import { getCurrentStringDate } from "../utils/getCurrentStringDate";

const OrderForm = ({
  orderList,
  onDeleteOrder,
  onMuteOrder,
  onClearCurrentOrders,
  onApplyIncome,
  onAddIncome,
  displayAlert,
}) => {
  const purchaseDate = getCurrentStringDate();

  const totalPrice = useMemo(() => {
    return orderList.reduce((acc, currentValue) => {
      return acc + currentValue.orderPrice;
    }, 0);
  }, [orderList]);
  return (
    <div className="purchaseFormContainer">
      <h6>Кошик</h6>
      <div>
        {orderList.length
          ? orderList.map((item) => (
              <OrderItem
                key={item.orderId}
                order={item}
                onDeleteOrder={onDeleteOrder}
                onMuteOrder={onMuteOrder}
                displayAlert={displayAlert}
              />
            ))
          : null}
      </div>
      {orderList.length ? (
        <>
          <Card className="text-center orderCard">
            <Card.Header>
              <small className="text-muted">Сума замовлення: </small>
              <strong>{totalPrice} </strong>
              <small> грн</small>
            </Card.Header>
          </Card>
          <Formik
            initialValues={{ paymentType: paymentTypes[0] }}
            validationSchema={Yup.object({
              paymentType: Yup.string().required("Оберіть тип оплати!"),
            })}
            onSubmit={(values, { resetForm }) => {
              const newIncome = {
                paymentType: values.paymentType,
                id: nanoid(),
                purchaseDate,
                totalPrice,
                orders: orderList,
              };
              // alert(JSON.stringify(newIncome, null, 2));
              onAddIncome(newIncome);
              onApplyIncome(orderList);
              onClearCurrentOrders();
              displayAlert("Замовлення успішно оформлено!", "success");
              scrollToTop();
              resetForm();
            }}
          >
            <Form>
              <div>
                <Field
                  as="select"
                  name="paymentType"
                  id="paymentType"
                  className="paymentTypeSelect"
                >
                  <option value="" disabled>
                    Оберіть тип оплати
                  </option>
                  {paymentTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  className="errorMsg"
                  name="paymentType"
                  component="div"
                />
              </div>
              <div>
                <button type="submit" className="btn btn-success mt-3">
                  Оформити замовлення
                </button>
              </div>
            </Form>
          </Formik>
        </>
      ) : null}
    </div>
  );
};

export default OrderForm;
