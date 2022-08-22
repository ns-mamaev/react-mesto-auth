function Login({ onSubmit }) {
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
          type="text"
          className="form__item form__item_content_profile-name form__item_place_start-screen"
          name="name"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__error">Текст ошибки</span>
      </label>
      <label className="form__field">
        <input
          type="text"
          className="form__item form__item_content_profile-name form__item_place_start-screen"
          name="name"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
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
