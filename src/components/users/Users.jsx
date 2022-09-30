import React, { useEffect, useState } from "react";
import api from "../../api";
import { paginate } from "../../utils/paginate";
import GroupList from "./GroupList";
import Pagination from "./Pagination";
import UserCapture from "./UserCapture";
import UserItem from "./UserItem";

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

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
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => selectedProf._id === user.profession._id)
    : users;
  const userCrop = filteredUsers
    ? paginate(filteredUsers, pageSize, currentPage)
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
            Очистить
          </button>
        </div>
      )}
      {filteredUsers && (
        <div className="d-flex flex-column">
          <UserCapture usersCount={filteredUsers.length} />
          {filteredUsers.length !== 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Качества</th>
                  <th>Профессия</th>
                  <th>Встретился, раз</th>
                  <th>Оценка</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userCrop.map((user) => (
                  <UserItem
                    user={user}
                    key={user._id}
                    handleDelete={handleDelete}
                    onBookmarkToggle={handleChangeBookmark}
                  />
                ))}
              </tbody>
            </table>
          )}{" "}
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
};

export default Users;
