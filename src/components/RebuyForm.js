import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { nanoid } from "@reduxjs/toolkit";
import { scrollToTop } from "../utils/scrollToTop";
import { getCurrentStringDate } from "../utils/getCurrentStringDate";

const RebuyForm = ({
  article,
  closeModal,
  onRebuyArticle,
  onAddExpense,
  displayAlert,
}) => {
  const { title, price, purchasePrice, amount, id } = article;
  const purchaseDate = getCurrentStringDate();

  return (
    <div>
      <div className="rebuyForm">
        <h5>Докупити товар</h5>
        <hr />
        <h4>{title}</h4>
        <Formik
          initialValues={{
            price: price,
            amount: 0,
            purchasePrice: purchasePrice,
          }}
          validationSchema={Yup.object({
            price: Yup.number().min(
              0.2,
              "Вкажіть ціну! Мінімальна вартість - 20 копійок.",
            ),
            purchasePrice: Yup.number().required("Вкажіть закупівельну ціну!"),
            amount: Yup.number()
              .min(1, "Вкажіть кількість товару для докупки!")
              .integer("Дозволено тільки цілі числа!"),
          })}
          onSubmit={(values) => {
            const articleChanges = {
              ...values,
              amount: amount + values.amount,
              articleId: id,
            };
            const newExpense = {
              articleId: id,
              id: nanoid(),
              expenseDate: purchaseDate,
              expenseSum: values.purchasePrice * values.amount,
              expenseArticleAmount: values.amount,
              expenseType: "rebuy",
              articleTitle: title,
            };
            closeModal();
            onAddExpense(newExpense);
            onRebuyArticle(articleChanges);
            scrollToTop();
            displayAlert(
              `Докуплено ${values.amount} шт. товару "${title}"!`,
              "success",
            );
          }}
        >
          <Form>
            <div className="rebuyFormPart">
              <label htmlFor="purchasePrice">Закупівельна ціна, грн</label>
              <Field
                type="number"
                name="purchasePrice"
                placeholder=""
                step="1"
                min="0"
              />
              <ErrorMessage
                className="errorMsg"
                name="purchasePrice"
                component="div"
              />
            </div>
            <div className="rebuyFormPart">
              <label htmlFor="price">Ціна,грн</label>
              <Field type="number" name="price" step="1" min="0" />
              <ErrorMessage className="errorMsg" name="price" component="div" />
            </div>

            <div className="rebuyFormPart">
              <label htmlFor="amount">Кількість товару докуплено, шт</label>
              <Field type="number" name="amount" step="1" min="0" />
              <ErrorMessage
                className="errorMsg"
                name="amount"
                component="div"
              />
            </div>

            <div className="modalBtnsLine">
              <button type="submit" className="btn btn-outline-primary">
                Докупити
              </button>
              <button className="btn btn-outline-danger" onClick={closeModal}>
                Відміна
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RebuyForm;
