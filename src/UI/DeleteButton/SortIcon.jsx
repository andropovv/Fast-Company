import React from "react";
import PropTypes from "prop-types";

const SortIcon = ({ order }) => {
  const downArrow = <i className="bi bi-caret-down-fill"></i>;
  const upArrow = <i className="bi bi-caret-up-fill"></i>;

  return <span>{order === "asc" ? upArrow : downArrow}</span>;
};

SortIcon.propTypes = {
  order: PropTypes.string
};
export default SortIcon;
