import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
  // не использую валидацию, т.к. по заданию нужен неуправляемый компонент с рефом
  const avatarRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      defaultButtonText="Сохранить"
    >
      <label className="form__field">
        <input
          type="url"
          className="form__item form__item_content_avatar-link"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          minLength="7"
          ref={avatarRef}
        />
        <span className="form__error form__error_field_avatar-link"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
