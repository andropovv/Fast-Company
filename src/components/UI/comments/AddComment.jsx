import React, { useEffect, useState } from "react";
import API from "../../../api";
import SelectField from "../../common/form/SelectField";
import TextAreaField from "../../common/form/TextAreaField";
import Loader from "../loader/Loader";
import * as yup from "yup";
import MyButton from "../MyButton/MyButton";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
const initialValue = { userId: "", content: "" };

const AddComment = ({ onSubmit }) => {
  const [data, setData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    setIsLoading(true);
    API.users
      .fetchAll()
      .then((data) => {
        const usersList = Object.keys(data).map((userName) => ({
          label: data[userName].name,
          value: data[userName]._id
        }));
        setUsers(usersList);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const validateScheme = yup.object().shape({
    userId: yup.string().required("Обязательно выберите профессию"),
    content: yup.string().required("Обязательно введите отзыв")
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    onSubmit(isValid, data, userId);
    setData(initialValue);
  };

  return (
    <div className="card-body">
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          <h2>New comment</h2>
          {!isLoading ? (
            <>
              <div className="mb-4">
                <SelectField
                  options={users}
                  label="Ваша профессия"
                  value={data.userId}
                  onChange={handleChange}
                  defaultOption="Выберите..."
                  error={errors.userId}
                  name="userId"
                />
              </div>

              <div className="mb-4">
                <TextAreaField
                  name="content"
                  rows={3}
                  onChange={handleChange}
                  value={data.content}
                  label="Комментарий"
                  error={errors.content}
                />
              </div>
              <MyButton type="submit" disabled={!isValid}>
                Submit
              </MyButton>
            </>
          ) : (
            <Loader />
          )}
        </form>
      </div>
    </div>
  );
};

AddComment.propTypes = { onSubmit: PropTypes.func };

export default AddComment;
