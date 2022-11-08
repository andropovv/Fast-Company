import React from "react";
import { useParams } from "react-router-dom";
import UsersPage from "../components/pages/UsersPage";
import UserPage from "../components/pages/UserPage";

const Users = () => {
  const params = useParams();
  const { userId } = params;

  return <>{userId ? <UserPage id={userId} /> : <UsersPage />}</>;
};

export default Users;
