import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const TotalClearanceBox = ({
  deleteSubject,
  removeFn,
  displayAlert,
  closeModal,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <div>
          <Alert variant="danger" className="text-center">
            Видалення є незворотньою дією! <br />
            Ви впевнені, що хочете очистити історію {deleteSubject}?
          </Alert>
        </div>
        <div className="modalBtnsLine">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              dispatch(removeFn());
              closeModal();
              displayAlert(`Очищено історію ${deleteSubject}!`, "info");
            }}
          >
            Очистити
          </button>
          <button className="btn btn-warning" onClick={closeModal}>
            Відміна
          </button>
        </div>
      </div>
    </>
  );
};
