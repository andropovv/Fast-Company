import React from "react";
import classes from "./UserCapture.module.css";

function UserCapture({ children, isUsers }) {
  return (
    <div className={`${classes.capture} ${isUsers ? classes.red : ""}`}>
      {children}
    </div>
  );
}

export default UserCapture;
