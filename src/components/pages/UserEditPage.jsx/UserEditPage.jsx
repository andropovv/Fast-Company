import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../../api";
import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import MyButton from "../../UI/MyButton/MyButton";
import * as yup from "yup";

const UserEditPage = () => {
  const [user, setUser] = useState();
  const params = useParams();
  const [errors, setErrors] = useState({});
  const { userId } = params;
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const history = useHistory();

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
    API.professions.fetchAll().then((data) => setProfessions(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });
  useEffect(() => {}, [professions]);
  useEffect(() => {
    if (user && user.qualities.length) {
      setData({
        name: user.name,
        email: user.email,
        profession: user.profession._id,
        sex: user.sex,
        qualities: fixQualitiesFormat(user.qualities)
      });
    }
  }, [user]);

  const validateScheme = yup.object().shape({
    profession: yup.string().required("Обязательно выберите профессию"),
    email: yup
      .string()
      .required("Поле электронной почты обязательно для заполнения")
      .email("Email введен некорректно"),
    name: yup
      .string()
      .required("Обязательно введите имя")
      .matches(/(?=.{2,})/, "Имя должно состоять минимум из двух букв")
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

  function fixQualitiesFormat(qualities) {
    return qualities.map((quality) => ({
      label: quality.name,
      value: quality._id,
      color: quality.color
    }));
  }

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const chosenProfession =
      professions[
        Object.keys(professions).find(
          (profession) => professions[profession]._id === data.profession
        )
      ];
    const fixedQualities = data.qualities.map((quality) => ({
      _id: quality.value,
      name: quality.label,
      color: quality.color
    }));

    API.users.update(userId, {
      ...data,
      profession: chosenProfession,
      qualities: fixedQualities
    });
    history.push(`/users/${userId}`);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {user && user.profession && (
            <form onSubmit={handleUpdateUser}>
              <h3 className="mb-4">Редактировать пользователя</h3>
              <TextField
                name="name"
                onChange={handleChange}
                value={data.name}
                label="Имя пользователя"
                error={errors.name}
              />
              <TextField
                name="email"
                onChange={handleChange}
                value={data.email}
                label="Электронная почта"
                error={errors.email}
              />
              <SelectField
                options={professions}
                label="Ваша профессия"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Выберите..."
                error={errors.profession}
                name="profession"
              />
              <RadioField
                value={data.sex}
                label="Выберите пол: "
                name="sex"
                onChange={handleChange}
                options={[
                  { name: "Мужской", value: "male" },
                  { name: "Женский", value: "female" }
                ]}
              />
              <MultiSelectField
                defaultValue={data.qualities}
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
              />
              <MyButton type="submit" disabled={!isValid}>
                Submit
              </MyButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
