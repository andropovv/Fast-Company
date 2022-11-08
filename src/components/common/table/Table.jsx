import React from "react";
import TableBody from "./TableBody";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  children: PropTypes.array
};
export default Table;
