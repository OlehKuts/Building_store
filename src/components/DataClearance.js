import { useState } from "react";
import { Modal } from "./Modal";
import { TotalClearanceBox } from "./TotalClearanceBox";
import { removeAllIncomes } from "../store/incomeSlice";
import { removeAllExpenses } from "../store/expenseSlice";

export const DataClearance = ({ displayAlert }) => {
  const [showClearanceModal, setShowClearanceModal] = useState(false);
  const [deleteSubject, setDeleteSubject] = useState("");
  const [removeFn, setRemoveFn] = useState(null);
  return (
    <>
      <div className="settings">
        <h5>Тотальне видалення даних</h5>
        <hr />
        <div>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              setDeleteSubject("витрат");
              setRemoveFn(() => {
                return removeAllExpenses;
              });
              setShowClearanceModal(true);
            }}
          >
            Очистити історію витрат
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              setDeleteSubject("доходів");
              setRemoveFn(() => {
                return removeAllIncomes;
              });
              setShowClearanceModal(true);
            }}
          >
            Очистити історію доходів
          </button>
        </div>
      </div>
      {setShowClearanceModal ? (
        <>
          <Modal open={showClearanceModal}>
            <TotalClearanceBox
              displayAlert={displayAlert}
              deleteSubject={deleteSubject}
              removeFn={removeFn}
              closeModal={() => setShowClearanceModal(false)}
            />
          </Modal>
        </>
      ) : null}
    </>
  );
};
