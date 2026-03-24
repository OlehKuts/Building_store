import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
export const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, []);
  return (
    <>
      <Alert variant="danger" className="text-center">
        Такої сторінки не існує! <br />
        Зараз Вас буде перенаправлено на головну.
      </Alert>
    </>
  );
};
