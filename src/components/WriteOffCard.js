import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { cutBigString } from "../utils/cutBigString";

const WriteOffCard = ({
  article,
  closeModal,
  onWriteOffArticle,
  displayAlert,
}) => {
  const { id, amount, title } = article;
  const [newAmount, setNewAmount] = useState(amount);
  const submitWriteOff = () => {
    if (amount === newAmount || !Number.isInteger(Number(newAmount))) return;
    onWriteOffArticle(+newAmount, id);
    closeModal();
    window.scrollTo(0, 0);
    displayAlert(
      `Було списано ${amount - newAmount} од. товару "${title}"`,
      "warning",
      4000,
    );
  };
  return (
    <div className="writeOffCard">
      <Card>
        <Card.Header>Списання товару</Card.Header>
        <Card.Body>
          <Card.Title title={title}>{cutBigString(title, 40)}</Card.Title>
          <Card.Text>
            Кількість на залишку
            <input
              type="number"
              value={newAmount}
              onChange={(e) => {
                if (e.target.value > amount) return;
                setNewAmount(e.target.value);
              }}
              max={amount}
              min={0}
              step={1}
              style={{ marginLeft: "10px", padding: "3px" }}
            />
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          Буде списано {Math.round(amount - newAmount)} одиниць товару
        </Card.Footer>
        <Card.Footer className="modalBtnsLine">
          <Button variant="success" onClick={submitWriteOff}>
            Підтвердити
          </Button>
          <Button variant="warning" onClick={closeModal}>
            Відмінити
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default WriteOffCard;
