import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import Loader from "../../UI/loader/Loader";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          ...options[optionName],
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;
  const handleChange = (value) => {
    onChange({ name, value });
  };

  return (
    <>
      {options ? (
        <div className="mb-4">
          <label className="mb-2">{label}</label>
          <Select
            defaultValue={defaultValue}
            closeMenuOnSelect={false}
            isMulti
            options={optionsArray}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
            name={name}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array
};
export default MultiSelectField;
