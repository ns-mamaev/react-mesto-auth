import failureImg from '../images/fail.svg';
import successImg from '../images/success.svg';

function InfoTooltip({ isOpen, onClose, message, isError }) {
  const infoMessage = isError
    ? message || 'Что-то пошло не так! Попробуйте ещё раз.'
    : 'Вы успешно зарегистрировались!';
  const imgStyle = { backgroundImage: `url(${isError ? failureImg : successImg})` };

  return (
    <div className={`popup popup_content_info-tooltip${isOpen ? ' popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__container">
        <button aria-label="закрыть" className="popup__close-button" />
        <div className="popup__tooltip-img" style={imgStyle} />
        <p className="popup__tooltip-message">{infoMessage}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
