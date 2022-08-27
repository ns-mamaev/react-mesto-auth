import { useEffect } from 'react';
import useFormWithValidation from 'utills/hooks/useFormWithValidation';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
  const { values, setValues, resetValidation, isErrors, errorMessages, isFormNotValid, onChange } =
    useFormWithValidation(['avatar']);

  useEffect(() => {
    resetValidation();
    setValues({ avatar: '' });
  }, [isOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      isFormNotValid={isFormNotValid}
      defaultButtonText="Сохранить"
    >
      <label className="form__field">
        <input
          type="url"
          className={`form__item ${isErrors?.avatar ? 'form__item_type_error' : ''} `}
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          minLength="7"
          value={values?.avatar}
          onChange={onChange}
        />
        <span className={`form__error ${isErrors?.avatar ? 'form__error_visible' : ''}`}>{errorMessages?.avatar}</span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
