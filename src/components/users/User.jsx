import React from "react";
import PropTypes from "prop-types";
import MyButton from "../../UI/MyButton/MyButton";
import { useHistory } from "react-router-dom";
import QualitiesList from "./QualitiesList";
import "../styles/UserPage.css";

const User = ({ user }) => {
  const history = useHistory();

  const backToUsers = () => {
    history.push("/users");
  };

  return (
    <div className="user-block">
      <div className="user-block__title">Страница пользователя {user.name}</div>
      <ul className="user-block__info">
        <li className="user-block__item">Профессия: {user.profession.name}</li>
        <li className="user-block__item">
          Качества:
          <QualitiesList user={user} />
        </li>
        <li className="user-block__item">
          Встретился, раз: {user.completedMeetings}
        </li>
        <li className="user-block__item">Рейтинг: {user.rate}</li>
      </ul>
      <MyButton onClick={() => backToUsers()}>Вернуться</MyButton>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
};
export default User;
