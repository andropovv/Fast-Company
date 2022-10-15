import React from "react";
import { useParams } from "react-router-dom";
import Users from "../users/Users";
import UserPage from "./UserPage";

const UsersPage = () => {
  const params = useParams();
  const { userId } = params;

  return <>{userId ? <UserPage id={userId} /> : <Users />}</>;
};

export default UsersPage;
