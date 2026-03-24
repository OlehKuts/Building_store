import { useState } from "react";
import Card from "react-bootstrap/Card";
import { cutBigString } from "../utils/cutBigString";

export const ChangeDescBox = ({ article, closeModal, onChangeDescription }) => {
  const { id, description, title } = article;
  const [newDescription, setNewDescription] = useState(description);

  return (
    <Card>
      <Card.Header className="text-center">
        <strong title={title}>{cutBigString(title, 40)}</strong>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <textarea
            autofocus
            cols={80}
            rows={5}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="modalBtnsLine">
          {" "}
          <button
            className="btn btn-success"
            onClick={() => {
              if (newDescription.length > 300) {
                alert("Не більше 300 символів у описі!");
              }
              onChangeDescription(newDescription, id);
              closeModal();
            }}
          >
            Змінити опис
          </button>
          <button className="btn btn-danger" onClick={closeModal}>
            Назад до товарів
          </button>
        </div>
      </Card.Footer>
    </Card>
  );
};
