import React, { useState } from "react";
import api from "../../api";
import UserCapture from "./UserCapture";
import UserItem from "./UserItem";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (user) => {
    setUsers(users.filter((cur) => cur._id !== user._id));
  };

  const renderPhrase = (number) => {
    let phrase;
    let isUsers = false;

    if (number === 0) {
      phrase = "Никто с тобой не затусит(";
      isUsers = true;
    } else if (number === 1) phrase = `С тобой затусит сегодня 1 человек`;
    else if (number < 5) phrase = `С тобой затусят сегодня ${number} человека`;
    else phrase = `С тобой затусят сегодня ${number} человек`;

    return <UserCapture isUsers={isUsers}>{phrase}</UserCapture>;
  };

  return (
    <div>
      {renderPhrase(users.length)}
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Профессия</th>
              <th>Встретился, раз</th>
              <th>Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
