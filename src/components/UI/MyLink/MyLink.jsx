import React from "react";
import { Link } from "react-router-dom";
import PropTypes, { arrayOf, oneOfType } from "prop-types";
import styles from "./MyLink.module.css";

const MyLink = ({ to, children }) => {
  return (
    <Link className={styles.myLink} to={to}>
      {children}
    </Link>
  );
};

MyLink.propTypes = {
  to: PropTypes.string,
  children: oneOfType([PropTypes.node, arrayOf(PropTypes.node)])
};

export default MyLink;
