import PopupWithForm from './PopupWithForm';

const RemoveCardPopup = ({ isOpen, isLoading, onClose, onConfirmRemove }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onConfirmRemove()
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      defaultButtonText="Да"
      onSubmit={onSubmit}
      isFormNotValid={false}
    />
  );
};

export default RemoveCardPopup;
