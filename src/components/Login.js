import { useState } from 'react';
import * as auth from '../utills/auth/mestoAuth';

function Login({ onLogin }) {
  const [values, setValues] = useState({ email: '', password: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    auth
      .login(email, password)
      .then(onLogin)
      .catch((err) => console.log(err));
  };

  return (
    <form
      className="form form_content_edit-profile form_place_start-screen"
      name="login"
      onSubmit={onSubmit}
      noValidate
    >
      <h3 className="form__title form__title_place_start-screen">Вход</h3>
      <label className="form__field">
        <input
          type="email"
          className="form__item form__item_content_profile-name form__item_place_start-screen"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          onChange={onChange}
          value={values.email}
        />
        <span className="form__error">Текст ошибки</span>
      </label>
      <label className="form__field">
        <input
          type="password"
          className="form__item form__item_content_profile-name form__item_place_start-screen"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
          onChange={onChange}
          value={values.password}
        />
        <span className="form__error">Текст ошибки</span>
      </label>
      <button type="submit" name="login" className="form__button form__button_place_start-screen">
        Войти
      </button>
    </form>
  );
}

export default Login;
