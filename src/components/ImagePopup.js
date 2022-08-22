function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_content_zoomed-card-image${isOpen ? ' popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__img-wrapper">
        <button aria-label="close popup" className="popup__close-button" onClick={onClose}></button>
        <img className="popup__zoomed-image" src={card.link} alt={card.name} />
        <h3 className="popup__zoomed-image-caption">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
