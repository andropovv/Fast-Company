import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "../../UI/DeleteButton/DeleteButton";
import QualitiesList from "../QualitiesList";
import Bookmark from "../../common/BookMark";
import Table, { TableBody, TableHeader } from "../../common/table";
import { Link } from "react-router-dom";

const UsersTable = ({
  users,
  handleDelete,
  onSort,
  selectedSort,
  onBookmarkToggle
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качество",
      component: (user) => <QualitiesList user={user} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          onClick={() => onBookmarkToggle(user._id)}
          bookmark={user.bookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <DeleteButton onClick={() => handleDelete(user)}>Удалить</DeleteButton>
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    >
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
    </Table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onBookmarkToggle: PropTypes.func.isRequired
};

export default UsersTable;
