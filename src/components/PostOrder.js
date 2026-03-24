import ListGroup from "react-bootstrap/ListGroup";
import { cutBigString } from "../utils/cutBigString";

export const PostOrder = ({ postOrder }) => {
  const { articleTitle, orderAmount, articlePrice, orderPrice } = postOrder;
  return (
    <>
      <ListGroup.Item className="postOrder">
        <strong title={articleTitle}>{cutBigString(articleTitle, 40)} :</strong>
        <div>
          {articlePrice} грн * {orderAmount} шт.{" "}
        </div>
        <div> {orderPrice} грн</div>
      </ListGroup.Item>
    </>
  );
};
