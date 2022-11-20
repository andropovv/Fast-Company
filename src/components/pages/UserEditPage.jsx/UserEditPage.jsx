import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import MyButton from "../../UI/MyButton/MyButton";
import * as yup from "yup";
import Loader from "../../UI/loader/Loader";

const UserEditPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`));
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
  };

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id
      }))
    );
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

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

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  return (
    <>
      {!isLoading && Object.keys(professions).length > 0 ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <form onSubmit={handleSubmit}>
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
                <div className="d-flex justify-content-around">
                  <MyButton type="submit" disabled={!isValid}>
                    Submit
                  </MyButton>
                  <MyButton onClick={() => history.goBack()}>Назад</MyButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserEditPage;
