import _ from "lodash";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/GroupList";
import Pagination from "../../common/Pagination";
import Loader from "../../UI/loader/Loader";
import UserCapture from "../../UI/users/UserCapture";
import UsersSearch from "../../UI/users/UsersSearch";
import UsersTable from "../../UI/users/UsersTable";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchBy, setSearchBy] = useState("");

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleDelete = (user) => {
    setUsers(users.filter((cur) => cur._id !== user._id));
  };

  const handleChangeBookmark = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    );
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setCurrentPage(1);
    setSearchBy("");
  };

  const handleSearch = ({ target }) => {
    setSelectedProf(undefined);
    setSearchBy(target.value.toLowerCase());
  };

  const onSort = (item) => {
    setSortBy(item);
  };
  if (users.length) {
    let filteredUsers = selectedProf
      ? users.filter((user) => selectedProf._id === user.profession._id)
      : users;
    if (searchBy) {
      const searchRegExp = new RegExp(`${searchBy}`, "g");
      filteredUsers = users.filter((user) =>
        searchRegExp.test(user.name.toLowerCase())
      );
    }
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = filteredUsers
      ? paginate(sortedUsers, pageSize, currentPage)
      : undefined;

    const clearFilter = () => {
      setSelectedProf(undefined);
    };

    return (
      <div className="d-flex justify-content-center mt-5">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
              valueProperty="_id"
              contentProperty="name"
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              ????????????????
            </button>
          </div>
        )}
        {userCrop && (
          <div className="d-flex flex-column">
            <UserCapture usersCount={filteredUsers.length} />
            <UsersSearch onSearch={handleSearch} value={searchBy} />
            {filteredUsers.length !== 0 && (
              <UsersTable
                users={userCrop}
                onBookmarkToggle={handleChangeBookmark}
                handleDelete={handleDelete}
                onSort={onSort}
                selectedSort={sortBy}
              />
            )}
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={filteredUsers.length}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        )}
      </div>
    );
  } else return <Loader />;
};

export default UsersPage;
