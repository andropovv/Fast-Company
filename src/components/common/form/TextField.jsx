import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const getInputClasses = () => {
    return `form-control ${error ? "is-invalid" : ""}`;
  };
  return (
    <div className="mb-4">
      <label className="mb-2" htmlFor={name}>
        {label}
      </label>{" "}
      <div className="input-group">
        <input
          className={getInputClasses()}
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        ></input>
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")} />
          </button>
        )}

        {error && <div className={"invalid-feedback"}>{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text"
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};
export default TextField;
