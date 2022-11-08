import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/TextField";
import MyButton from "./MyButton/MyButton";
import api from "../../api";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import MultiSelectField from "../common/form/MultiSelectField";
import CheckBoxField from "../common/form/CheckBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  });
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  useEffect(() => {}, [professions]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Поле электронной почты обязательно для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Поле пароля обязательно для заполнения"
      },
      isCapital: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: { message: "Пароль должен состоять минимум из 8 символов", value: 8 }
    },
    profession: {
      isRequired: { message: "Обязательно выберите вашу профессию" }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        onChange={handleChange}
        value={data.email}
        label="Электронная почта"
        error={errors.email}
      />
      <TextField
        name="password"
        onChange={handleChange}
        value={data.password}
        label="Пароль"
        type="password"
        error={errors.password}
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
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <MyButton type="submit" disabled={!isValid}>
        Submit
      </MyButton>
    </form>
  );
};

export default RegisterForm;
