import React from "react";
import classes from "./UserCapture.module.css";
import PropTypes from "prop-types";

function UserCapture({ usersCount }) {
  const renderPhrase = (number) => {
    let phrase;

    if (number === 0) {
      phrase = "Никто с тобой не затусит(";
    } else if (number === 1) phrase = `С тобой затусит сегодня 1 человек`;
    else if (number < 5) phrase = `С тобой затусят сегодня ${number} человека`;
    else phrase = `С тобой затусят сегодня ${number} человек`;

    return phrase;
  };

  return (
    <div className={`${classes.capture} ${usersCount ? "" : classes.red}`}>
      {renderPhrase(usersCount)}
    </div>
  );
}

UserCapture.propTypes = {
  usersCount: PropTypes.number.isRequired
};

export default UserCapture;
