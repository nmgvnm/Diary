import React from "react";
import formatDate from "../utils/formatDate";

const FormattedDate = ({ date, format }) => {
  const formattedDate = formatDate(new Date(date), format);
  return <span>{formattedDate}</span>;
};

export default FormattedDate;
