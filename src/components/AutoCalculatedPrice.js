import { useFormikContext } from "formik";
import { useEffect } from "react";

export const AutoCalculatedPrice = ({ profitCoefficient }) => {
  const { values, setFieldValue } = useFormikContext();
  // console.log(profitCoefficient);
  useEffect(() => {
    // Calculate new value based on other fields
    const approxPrice = Math.ceil(profitCoefficient * values.purchasePrice);
    setFieldValue("price", approxPrice || 0, false); // Set the dependent field
  }, [values.purchasePrice, values.recommendendPrice, setFieldValue]);
  return null;
};
