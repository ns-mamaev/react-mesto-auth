import { Link } from 'react-router-dom';
import useFormWithValidation from 'utills/hooks/useFormWithValidation';

function Register({ onRegister, isLoading }) {
  const { values, isErrors, errorMessages, isFormNotValid, onChange } = useFormWithValidation(['email', 'password']);

  const buttonText = isLoading ? 'Выполнение...' : 'Зарегистрироваться';
  const isButtonDisabled = isLoading || isFormNotValid;
  const buttonClass = `form__button form__button_place_auth-screen ${isButtonDisabled ? 'form__button_disabled' : ''}`;

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
            className={`form__item form__item_place_auth-screen ${isErrors?.email ? 'form__item_type_error' : ''} `}
            name="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="60"
            onChange={onChange}
            value={values.email}
          />
          <span className={`form__error ${isErrors?.email ? 'form__error_visible' : ''}`}>{errorMessages?.email}</span>
        </label>
        <label className="form__field">
          <input
            type="password"
            className={`form__item form__item_place_auth-screen ${isErrors?.password ? 'form__item_type_error' : ''} `}
            name="password"
            placeholder="Пароль"
            required
            minLength="8"
            onChange={onChange}
            value={values.password}
          />
          <span className={`form__error ${isErrors?.password ? 'form__error_visible' : ''}`}>
            {errorMessages?.password}
          </span>
        </label>
        <button type="submit" name="login" className={buttonClass} disabled={isButtonDisabled}>
          {buttonText}
        </button>
        <Link className="form__bottom-link" to="/sign-in">
          Уже зарегистированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default Register;
