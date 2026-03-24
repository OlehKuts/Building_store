import { useDispatch, useSelector } from "react-redux";
import { ArticleItem } from "./ArticleItem";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  removeArticle,
  changeDescription,
  changeImgUrl,
  changePrice,
  writeOffArticle,
  rebuyArticle,
  changeTitle,
  applyIncome,
  selectFilteredArticles,
  setSearchTerm,
  selectSearchTerm,
} from "../store/articleSlice";
import OrderForm from "./OrderForm";

const ArticleList = ({ onAddExpense, onAddIncome, displayAlert }) => {
  const dispatch = useDispatch();
  const filteredArticles = useSelector(selectFilteredArticles);
  const searchTerm = useSelector(selectSearchTerm);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const onAddOrder = (newOrder) => {
    setCurrentOrders((prev) => [...prev, newOrder]);
  };
  const onDeleteOrder = (orderId) => {
    setCurrentOrders((prev) =>
      [...prev].filter((item) => item.orderId !== orderId),
    );
  };
  const onMuteOrder = (orderId, mutedOrder) =>
    setCurrentOrders((prev) =>
      [...prev].map((item) => (item.orderId === orderId ? mutedOrder : item)),
    );
  const onDeleteArticle = (articleId) => {
    dispatch(removeArticle(articleId));
  };
  const onChangeTitle = (newTitle, articleId) => {
    dispatch(changeTitle({ id: articleId, changes: { title: newTitle } }));
  };
  const onChangeDescription = (newDescription, articleId) => {
    dispatch(
      changeDescription({
        id: articleId,
        changes: { description: newDescription },
      }),
    );
  };
  const onChangeImgUrl = (newImgUrl, articleId) => {
    dispatch(changeImgUrl({ id: articleId, changes: { imgUrl: newImgUrl } }));
  };
  const onChangePrice = (newPrice, articleId) => {
    dispatch(changePrice({ id: articleId, changes: { price: newPrice } }));
  };
  const onWriteOffArticle = (newAmount, articleId) => {
    dispatch(
      writeOffArticle({ id: articleId, changes: { amount: newAmount } }),
    );
  };
  const onRebuyArticle = (articleChanges) => {
    const { amount, purchasePrice, price, articleId } = articleChanges;
    dispatch(
      rebuyArticle({
        id: articleId,
        changes: {
          price,
          purchasePrice,
          amount,
          articleExpense: purchasePrice * amount,
        },
      }),
    );
  };
  const [currentOrders, setCurrentOrders] = useLocalStorage(
    "current_orders",
    [],
  );

  const onClearCurrentOrders = () => {
    setCurrentOrders([]);
  };
  const onApplyIncome = (orderList) => {
    const updates = orderList.map(
      ({
        articleId,
        stockBalance,
        articleIncome,
        orderPrice,
        orderAmount,
      }) => ({
        id: articleId,
        changes: {
          amount: stockBalance - orderAmount,
          articleIncome: articleIncome + orderPrice,
        },
      }),
    );
    dispatch(applyIncome(updates));
  };
  return (
    <div className="mainContainer">
      <div className="articleListContainer">
        <h5 style={{ marginBottom: "0", paddingBottom: "0" }}>Товари</h5>
        <hr />
        <div>
          {" "}
          <div>
            {" "}
            <input
              className="searchInput"
              placeholder="Назва товару..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {filteredArticles.length ? (
          <div className="articleList">
            {filteredArticles.map((item) => (
              <ArticleItem
                key={item.id}
                article={item}
                onDeleteArticle={onDeleteArticle}
                onChangeDescription={onChangeDescription}
                onChangeImgUrl={onChangeImgUrl}
                onChangePrice={onChangePrice}
                onWriteOffArticle={onWriteOffArticle}
                onRebuyArticle={onRebuyArticle}
                onChangeTitle={onChangeTitle}
                onAddOrder={onAddOrder}
                onAddExpense={onAddExpense}
                displayAlert={displayAlert}
              />
            ))}
          </div>
        ) : (
          <div id="noArticles">Товарів не знайдено!</div>
        )}
      </div>
      {currentOrders.length ? (
        <div className="orderFormDiv">
          <OrderForm
            orderList={currentOrders}
            onApplyIncome={onApplyIncome}
            onDeleteOrder={onDeleteOrder}
            onMuteOrder={onMuteOrder}
            onClearCurrentOrders={onClearCurrentOrders}
            onAddIncome={onAddIncome}
            displayAlert={displayAlert}
          />
        </div>
      ) : null}
    </div>
  );
};
export default ArticleList;
