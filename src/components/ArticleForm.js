import { add } from "../store/articleSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { AutoCalculatedPrice } from "./AutoCalculatedPrice";
import { defaultImgUrl } from "../temporaryData/temporaryData";
import { getCurrentStringDate } from "../utils/getCurrentStringDate";

const ArticleForm = ({ settings, onAddExpense, displayAlert }) => {
  const { profitCoefficient, sections, basicImgUrl } = settings;
  const dispatch = useDispatch();
  const purchaseDate = getCurrentStringDate();
  return (
    <div className="superFormContainer">
      <div className="superForm">
        <h5>Додай новий товар</h5>
        <hr />
        <Formik
          initialValues={{
            title: "",
            id: null,
            price: 0,
            amount: 0,
            section: "",
            purchasePrice: 0,
            description: "",
            imgUrl: basicImgUrl || defaultImgUrl,
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(2, "Введіть назву товару!")
              .max(70, "Не більше 70-ти символів у назві!")
              .required("Це поле обов'язкове!"),
            price: Yup.number()
              .min(0.2, "Мін. вартість - 20 копійок.")
              .required("Заповніть поле!"),
            purchasePrice: Yup.number().required("Заповніть поле!"),
            amount: Yup.number()
              .min(1, "Mін. кількість - 1 товар!")
              .integer("Дозволено тільки цілі числа!")
              .required("Вкажіть кількість товару!"),
            section: Yup.string().required("Оберіть категорію!"),
            description: Yup.string().max(
              300,
              "Дозволено не більше 300 символів!",
            ),
          })}
          onSubmit={(values, { resetForm }) => {
            const basicId = nanoid();
            const newArticle = {
              ...values,
              id: basicId,
              articleExpense: values.purchasePrice * values.amount,
              articleIncome: 0,
            };
            const newExpense = {
              articleId: basicId,
              id: nanoid(),
              expenseType: "primary",
              expenseArticleAmount: values.amount,
              expenseDate: purchaseDate,
              expenseSum: values.purchasePrice * values.amount,
              articleTitle: values.title,
            };
            dispatch(add(newArticle));
            onAddExpense(newExpense);
            displayAlert("Товар додано успішно!", "success");
            resetForm();
          }}
        >
          <Form>
            <Field name="title" placeholder="назва товару..." type="text" />
            <ErrorMessage className="errorMsg" name="title" component="div" />
            <Field as="select" name="section" id="section">
              <option value="">Оберіть категорію</option>
              {sections.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Field>
            <ErrorMessage className="errorMsg" name="section" component="div" />

            <Field
              as="textarea"
              name="description"
              placeholder="Опис товару..."
              rows={2}
              cols="30"
            />
            <ErrorMessage
              className="errorMsg"
              name="description"
              component="div"
            />
            <label htmlFor="imgUrl">Посилання на фото</label>
            <Field
              as="textarea"
              name="imgUrl"
              placeholder="посилання на фото..."
              rows="3"
              cols="30"
            />

            <div className="formPricesDiv">
              <div>
                {" "}
                <label htmlFor="purchasePrice">Закупівельна ціна, грн</label>
                <Field
                  type="number"
                  name="purchasePrice"
                  placeholder=""
                  step="0.1"
                  min="0"
                />
                <ErrorMessage
                  className="errorMsg"
                  name="purchasePrice"
                  component="div"
                />
              </div>
              <div>
                <label htmlFor="price">Ціна,грн</label>
                <Field type="number" name="price" step="0.1" min="0.1" />
                <ErrorMessage
                  className="errorMsg"
                  name="price"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="amount">Кількість товару, шт</label>
                <Field type="number" name="amount" step="1" min="0" />
                <ErrorMessage
                  className="errorMsg"
                  name="amount"
                  component="div"
                />
              </div>
            </div>
            <AutoCalculatedPrice profitCoefficient={profitCoefficient} />

            <button type="submit" className="btn btn-outline-primary">
              Додати товар
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ArticleForm;
