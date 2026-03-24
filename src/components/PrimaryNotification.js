import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSavedArticles } from "../store/articleSlice";
import savedCatalog from "../temporaryData/savedCatalog.json" with { type: "json" };

export const PrimaryNotification = ({ displayAlert, closeModal }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <div>
          <Alert variant="danger" className="text-center">
            Каталог товарів пустий! <br />
            Хочете використати базовий каталог товарів <br />
            для ознайомлення з функціоналом застосунку?
          </Alert>
        </div>
        <div className="modalBtnsLine">
          <button
            className="btn btn-outline-success"
            onClick={() => {
              dispatch(getSavedArticles(savedCatalog));
              closeModal();
              displayAlert(`Базовий каталог товарів збережено!`, "info", 5000);
            }}
          >
            Погоджуюсь
          </button>
          <button className="btn btn-outline-warning" onClick={closeModal}>
            Додам власноруч
          </button>
        </div>
      </div>
    </>
  );
};
