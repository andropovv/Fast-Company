import React from "react";
import classes from "./MyButton.module.css";
import PropTypes from "prop-types";

const MyButton = ({ children, ...props }) => {
  return (
    <button className={classes.myButton} {...props}>
      {children}
    </button>
  );
};

MyButton.propTypes = {
  children: PropTypes.string
};

export default MyButton;
