import React from "react";
import classes from "./DeleteButtom.module.css";

const DeleteButton = ({ children, ...props }) => {
  return (
    <button className={classes.delBtn} {...props}>
      {children}
    </button>
  );
};

export default DeleteButton;
