import React from "react";
import PropTypes from "prop-types";
import SortIcon from "../SortIcon";

const TableHeader = ({ selectedSort, onSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({
        path: item,
        order: "asc"
      });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            role={columns[column].path && "button"}
          >
            {selectedSort.path === columns[column].path && (
              <SortIcon order={selectedSort.order} />
            )}

            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
