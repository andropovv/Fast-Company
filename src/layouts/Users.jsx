import React from "react";
import { useParams } from "react-router-dom";
import UsersPage from "../components/pages/UsersPage";
import UserPage from "../components/pages/UserPage";
import UserEditPage from "../components/pages/UserEditPage.jsx/UserEditPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      {userId ? (
        edit ? (
          <UserEditPage />
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersPage />
      )}
    </>
  );
};

export default Users;
