import React from "react";
import PropTypes from "prop-types";

const QualitiesList = ({ user }) => {
  return (
    <>
      {user.qualities.map((quality) => (
        <span key={quality._id} className={`badge bg-${quality.color} m-1`}>
          {quality.name}
        </span>
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  user: PropTypes.object.isRequired
};
export default QualitiesList;
