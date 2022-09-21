import React from "react";
import classes from "./UserCapture.module.css";
import PropTypes from "prop-types";

function UserCapture({ children, isUsers }) {
  return (
    <div className={`${classes.capture} ${isUsers ? classes.red : ""}`}>
      {children}
    </div>
  );
}

UserCapture.propTypes = {
  children: PropTypes.string.isRequired,
  isUsers: PropTypes.bool.isRequired
};

export default UserCapture;
