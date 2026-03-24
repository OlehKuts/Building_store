import { useState } from "react";
import Card from "react-bootstrap/Card";
import { defaultImgUrl } from "../temporaryData/temporaryData";
import ListGroup from "react-bootstrap/ListGroup";
import { getAreaRowsCount } from "../utils/getAreaRowsCount";

export const BasicParams = ({ settings, handleNewSettings, displayAlert }) => {
  const [newSettings, setNewSettings] = useState({
    profitCoefficient: settings.profitCoefficient,
    sections: settings.sections.join(","),
    basicImgUrl: settings.basicImgUrl || defaultImgUrl,
  });

  return (
    <>
      <Card className="settings">
        <Card.Header style={{ width: "100%" }}>
          <strong>Базові параметри</strong>
        </Card.Header>
        <ListGroup className="text-center" style={{ width: "500px" }}>
          <ListGroup.Item className="justify-content-center text-center">
            <label htmlFor="profitCoefficient">Прибутковий коефіцієнт</label>
            <input
              style={{ margin: "0 auto", width: "50px" }}
              type="number"
              min={0}
              step={0.1}
              name="profitCoefficient"
              value={newSettings.profitCoefficient}
              onChange={(e) =>
                setNewSettings((prev) => ({
                  ...prev,
                  profitCoefficient: +e.target.value,
                }))
              }
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <label htmlFor="sectionsArea">Розділи товарів</label>
            <textarea
              rows={getAreaRowsCount(newSettings.sections.length)}
              name="sectionsArea"
              value={newSettings.sections}
              onChange={(e) =>
                setNewSettings((prev) => ({
                  ...prev,
                  sections: e.target.value,
                }))
              }
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <label htmlFor="basicImgUrl">Базове зображення товару</label>
            <textarea
              rows={Math.ceil(getAreaRowsCount(newSettings.basicImgUrl.length))}
              name="basicImgUrl"
              value={newSettings.basicImgUrl}
              onChange={(e) =>
                setNewSettings((prev) => ({
                  ...prev,
                  basicImgUrl: e.target.value,
                }))
              }
            />
          </ListGroup.Item>
        </ListGroup>
        <Card.Footer style={{ width: "100%" }}>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              handleNewSettings(newSettings);
              displayAlert("Налаштування успішно змінено!", "success");
            }}
          >
            Змінити налаштування
          </button>
        </Card.Footer>
      </Card>
    </>
  );
};
