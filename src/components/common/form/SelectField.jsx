import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  defaultOption,
  onChange,
  error,
  options,
  name
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
    console.log({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return `form-select ${error ? "is-invalid" : ""}`;
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  value: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string
};
export default SelectField;
