import React from "react";
import PropTypes from "prop-types";

const QualitiesList = ({ user }) => {
  return (
    <>
      {user.qualities.map((quality) => (
        <div key={quality._id} className={`badge bg-${quality.color} m-1`}>
          {quality.name}
        </div>
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  user: PropTypes.object.isRequired
};
export default QualitiesList;
