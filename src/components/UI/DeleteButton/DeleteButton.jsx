import React from "react";
import classes from "./DeleteButtom.module.css";
import PropTypes from "prop-types";

const DeleteButton = ({ children, ...props }) => {
  return (
    <button className={classes.delBtn} {...props}>
      {children}
    </button>
  );
};

DeleteButton.propTypes = {
  children: PropTypes.string
};

export default DeleteButton;
