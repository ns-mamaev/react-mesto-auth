function PopupWithForm({
  name,
  defaultButtonText,
  isLoading,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  isFormNotValid,
}) {
  const buttonText = isLoading ? 'Выполнение...' : defaultButtonText;
  const isButtonDisabled = isLoading || isFormNotValid;

  return (
    <div className={`popup popup_content_${name}${isOpen ? ' popup_opened' : ''}`} onMouseDown={onClose} noValidate>
      <div className="popup__container">
        <button aria-label="закрыть" className="popup__close-button" />
        <form className="form form_content_edit-profile" name={name} onSubmit={onSubmit}>
          <h3 className="form__title">{title}</h3>
          {children}
          <button type="submit" name="profile-save" className="form__button" disabled={isButtonDisabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
