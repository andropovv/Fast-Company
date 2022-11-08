import React from "react";
import PropTypes from "prop-types";
import styles from "./UsersSearch.module.css";

const UsersSearch = ({ onSearch, value }) => {
  return (
    <input
      className={styles.usersSearch}
      value={value}
      placeholder="Search"
      onChange={onSearch}
    />
  );
};

UsersSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
export default UsersSearch;
