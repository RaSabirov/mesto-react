import React from 'react';

function ImagePopup({ namePopup, isOpen, onClose, card }) {
  return (
    <div className={`popup popup_type_${namePopup} ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__img-container">
        <button className="popup__close-btn link" type="button" aria-label="Кнопка закрыть" onClick={onClose}></button>
        <figure className="popup__figure">
          <img className="popup__modal-img" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
