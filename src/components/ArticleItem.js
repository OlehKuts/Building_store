import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import { InfoSquare } from "react-bootstrap-icons";
import { BookmarkStar } from "react-bootstrap-icons";
import { CardText } from "react-bootstrap-icons";
import { cutBigString } from "../utils/cutBigString";
import { checkImage } from "../utils/checkImageUrl";
import { useEffect, useState, useMemo } from "react";
import { defaultImgUrl } from "../temporaryData/temporaryData";
import { Modal } from "../components/Modal";
import WriteOffCard from "./WriteOffCard";
import RebuyForm from "./RebuyForm";
import { nanoid } from "@reduxjs/toolkit";
import { ChangeDescBox } from "./ChangeDescBox";
import InfoCard from "./InfoCard";

export const ArticleItem = ({
  article,
  onDeleteArticle,
  onChangeDescription,
  onChangeImgUrl,
  onChangePrice,
  onWriteOffArticle,
  onRebuyArticle,
  onChangeTitle,
  onAddOrder,
  onAddExpense,
  displayAlert,
}) => {
  const {
    id,
    title,
    price,
    amount,
    articleExpense,
    imgUrl,
    description,
    articleIncome,
  } = article;
  const [showRebuyModal, setShowRebuyModal] = useState(false);
  const [showWriteOffModal, setShowWriteOffModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [displayedImgUrl, setDisplayedImgUrl] = useState(imgUrl);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showImgUrlArea, setShowImgUrlArea] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newImgUrl, setNewImgUrl] = useState(imgUrl);
  const [newPrice, setNewPrice] = useState(price);
  const [orderAmount, setOrderAmount] = useState("");
  const sendNewOrder = () => {
    const newOrder = {
      orderId: nanoid(),
      articleId: id,
      articleTitle: title,
      orderAmount,
      stockBalance: amount,
      articlePrice: price,
      orderPrice,
      articleIncome,
    };
    onAddOrder(newOrder);
    setOrderAmount("");
  };
  const replaceValueFn = (e, onChangeFn, changingValue, setShowFn) => {
    if (e.key === "Enter") {
      onChangeFn(changingValue, id);
      setShowFn(false);
    }
    if (e.key === "Escape") {
      setShowFn(false);
    }
  };
  const orderPrice = useMemo(() => {
    return orderAmount * price;
  }, [orderAmount]);
  useEffect(() => {
    checkImage(imgUrl).then((isValid) => {
      if (!isValid) {
        setDisplayedImgUrl(defaultImgUrl);
      } else {
        setDisplayedImgUrl(imgUrl);
      }
    });
  }, [imgUrl, newImgUrl]);

  return (
    <div className="aritcleCardContainer">
      <Card className="text-center articleCard">
        {showTitleInput ? (
          <Card.Text>
            <input
              className="articleCardInput"
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.target.value.length > 70) {
                  displayAlert(
                    "Дозволена довжина назви товару - не більше 70-ти символів!",
                    "danger",
                  );
                  return;
                }
                replaceValueFn(e, onChangeTitle, newTitle, setShowTitleInput);
              }}
            />
          </Card.Text>
        ) : (
          <Card.Header className="cardHeader">
            <span onClick={() => setShowTitleInput(true)} title={title}>
              {cutBigString(title, 50)}
            </span>
            <small className="text-muted" title={`${amount} шт. в наявності`}>
              {" "}
              ({amount})
            </small>
            <Trash
              pointerEvents={amount ? "none" : "auto"}
              color={amount ? "gray" : "red"}
              className="d-inline-block trashArticle"
              onClick={() => {
                onDeleteArticle(id);
                displayAlert(`Видалено товар "${title}" з каталогу!`);
              }}
              title={"Видалити товар"}
            />
          </Card.Header>
        )}
        {showImgUrlArea ? (
          <Card.Text>
            <textarea
              autoFocus
              cols={45}
              rows={5}
              value={newImgUrl}
              onChange={(e) => setNewImgUrl(e.target.value)}
              onKeyDown={(e) =>
                replaceValueFn(e, onChangeImgUrl, newImgUrl, setShowImgUrlArea)
              }
            />
          </Card.Text>
        ) : (
          <Card.Img
            variant="top"
            src={displayedImgUrl}
            alt="articleImage"
            className="articleImage"
            onClick={() => setShowImgUrlArea(true)}
          />
        )}
        {showPriceInput ? (
          <Card.Text>
            <input
              autoFocus
              type="number"
              step={1}
              min={0}
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              onKeyDown={(e) =>
                replaceValueFn(e, onChangePrice, newPrice, setShowPriceInput)
              }
            />
          </Card.Text>
        ) : (
          <Card.Footer
            className="text-muted articlePriceLine"
            onClick={() => setShowPriceInput(true)}
          >
            <span>Ціна: {price} ₴</span>
            {articleIncome - articleExpense > 0 ? (
              <BookmarkStar
                color={"gold"}
                className="d-inline-block starArticle"
                title={"Прибутковий товар"}
                size={"18px"}
              />
            ) : null}
          </Card.Footer>
        )}
        <Card.Footer>
          <CardText
            size={"42px"}
            className="d-inline-block"
            color={"cornflowerblue"}
            title={description ? description : "Додати опис товару"}
            style={{
              cursor: "pointer",
              margin: "5px 10px 5px 5px",
            }}
            onClick={() => setShowDescriptionModal(true)}
          />
          <InfoSquare
            size={32}
            className="d-inline-block"
            color={"dimgray"}
            title={"Деталі"}
            style={{
              cursor: "pointer",
              margin: "5px 15px 5px 5px",
            }}
            onClick={() => setShowInfoModal(true)}
          />
          <input
            className="orderItemAmount"
            type="number"
            min={0}
            max={amount}
            value={orderAmount}
            onChange={(e) => {
              setOrderAmount(+e.target.value);
            }}
            onInput={(e) => {
              if (e.target.value > amount) {
                e.target.value = amount;
              }
            }}
          />
          <Button
            variant="outline-success"
            disabled={!orderAmount}
            onClick={sendNewOrder}
          >
            В кошик
          </Button>
        </Card.Footer>
        <Card.Footer className="btnFooter">
          <Button
            variant="outline-primary"
            onClick={() => setShowRebuyModal(true)}
          >
            Докупити
          </Button>
          <Button
            variant="outline-warning"
            onClick={() => setShowWriteOffModal(true)}
          >
            Списати
          </Button>
        </Card.Footer>
      </Card>
      <Modal open={showRebuyModal}>
        <RebuyForm
          article={article}
          closeModal={() => setShowRebuyModal(false)}
          onRebuyArticle={onRebuyArticle}
          onAddExpense={onAddExpense}
          displayAlert={displayAlert}
        />
      </Modal>
      <Modal open={showWriteOffModal}>
        <WriteOffCard
          article={article}
          closeModal={() => setShowWriteOffModal(false)}
          onWriteOffArticle={onWriteOffArticle}
          displayAlert={displayAlert}
        />
      </Modal>
      <Modal open={showDescriptionModal}>
        <ChangeDescBox
          article={article}
          onChangeDescription={onChangeDescription}
          closeModal={() => setShowDescriptionModal(false)}
        />
      </Modal>
      <Modal open={showInfoModal}>
        <InfoCard
          article={article}
          closeModal={() => setShowInfoModal(false)}
        />
      </Modal>
    </div>
  );
};
