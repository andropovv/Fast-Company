import React from "react";
import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { QualitiesCard } from "../qualities";
import MeetingsCard from "../MeetingsCard";
import { Comments } from "../comments";

const User = ({ user }) => {
  return (
    <div className="container pt-5">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard user={user} />
          <MeetingsCard meetings={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <Comments user={user} />
        </div>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
};
export default User;
