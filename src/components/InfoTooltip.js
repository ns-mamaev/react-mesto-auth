import successImg from '../images/success.svg';

function InfoTooltip({ isOpen, onClose }) {
  return (
    <div className={`popup popup_content_info-tooltip${isOpen ? ' popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__container">
        <button aria-label="закрыть" className="popup__close-button" />
        <div className="popup__tooltip-img" style={{ backgroundImage: `url(${successImg})` }} />
        <p className="popup__tooltip-message">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
