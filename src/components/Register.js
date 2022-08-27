import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [values, setValues] = useState({ email: '', password: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <section className="auth-screen">
      <form
        className="form form_content_edit-profile form_place_auth-screen"
        name="login"
        onSubmit={onSubmit}
        noValidate
      >
        <h3 className="form__title form__title_place_auth-screen">Регистрация</h3>
        <label className="form__field">
          <input
            type="email"
            className="form__item form__item_content_profile-name form__item_place_auth-screen"
            name="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            onChange={onChange}
            value={values.email}
          />
          <span className="form__error form__error_visible">Текст ошибки</span>
        </label>
        <label className="form__field">
          <input
            type="password"
            className="form__item form__item_content_profile-name form__item_place_auth-screen"
            name="password"
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="40"
            onChange={onChange}
            value={values.password}
          />
          <span className="form__error form__error_visible">Текст ошибки</span>
        </label>
        <button type="submit" name="login" className="form__button form__button_place_auth-screen">
          Зарегистрироваться
        </button>
        <Link className="form__bottom-link" to="/sign-in">
          Уже зарегистированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default Register;
