import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import User from "../../UI/users/User";
import "../../styles/UserPage.css";

const UserPage = ({ id }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  return <div>{user.name ? <User user={user} /> : "loading"}</div>;
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
