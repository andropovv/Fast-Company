import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/CheckBoxField";
import TextField from "../common/form/TextField";
import MyButton from "./MyButton/MyButton";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Поле электронной почты обязательно для заполнения"
      },
      isEmail: {
        message: "Email вводен некорректно"
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <MyButton type="submit" disabled={!isValid}>
        Submit
      </MyButton>
    </form>
  );
};

export default LoginForm;
