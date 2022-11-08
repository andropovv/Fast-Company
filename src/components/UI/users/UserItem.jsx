import React from "react";
import DeleteButton from "../../UI/DeleteButton/DeleteButton.jsx";
import Bookmark from "./Bookmark.jsx";
import PropTypes from "prop-types";

const UserItem = ({ user, handleDelete, onBookmarkToggle }) => {
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
          <Bookmark
            onClick={() => onBookmarkToggle(user._id)}
            bookmark={user.bookmark}
          />
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
  handleDelete: PropTypes.func.isRequired,
  onBookmarkToggle: PropTypes.func.isRequired
};

export default UserItem;
