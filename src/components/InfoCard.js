import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { cutBigString } from "../utils/cutBigString";

const InfoCard = ({ article, closeModal }) => {
  const {
    title,
    description,
    amount,
    purchasePrice,
    articleExpense,
    articleIncome,
  } = article;
  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <strong title={title}>{cutBigString(title, 40)}</strong>
          <small className="muted"> ({amount})</small>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Остання закупівельна ціна: {purchasePrice} грн/шт
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          Витрати: {articleExpense} грн
        </Card.Footer>
        <Card.Footer className="text-muted">
          Прибуток: {articleIncome} грн
        </Card.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Закрити
        </Button>
      </Card>
    </>
  );
};

export default InfoCard;
