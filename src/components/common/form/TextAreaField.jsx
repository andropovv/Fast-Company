import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error, rows }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
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
        <textarea
          className={getInputClasses()}
          rows={rows}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        ></textarea>

        {error && <div className={"invalid-feedback"}>{error}</div>}
      </div>
    </div>
  );
};
TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  rows: PropTypes.number
};
export default TextAreaField;
