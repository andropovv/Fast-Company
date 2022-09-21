import React from "react";
import DeleteButton from "../../UI/DeleteButton/DeleteButton.jsx";
import Bookmark from "./Bookmark.jsx";
import PropTypes from "prop-types";

const UserItem = ({ user, handleDelete }) => {
  return (
    <>
      <tr>
        <th>{user.name}</th>
        <th>
          {user.qualities.map((quality) => (
            <div key={quality._id} className={`badge bg-${quality.color} m-1`}>
              {quality.name}
            </div>
          ))}
        </th>
        <th>{user.profession.name}</th>
        <th>{user.completedMeetings}</th>
        <th>{user.rate}</th>
        <th>
          <Bookmark />
        </th>
        <th>
          <DeleteButton onClick={() => handleDelete(user)}>
            Удалить
          </DeleteButton>
        </th>
      </tr>
    </>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default UserItem;
