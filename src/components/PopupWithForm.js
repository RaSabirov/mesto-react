import React from 'react';

function PopupWithForm({ namePopup, isOpen, onClose, title, formName, children, buttonName }) {
  return (
    <div className={`popup popup_type_${namePopup} ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn link" type="button" aria-label="Кнопка закрыть" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={formName} noValidate>
          {children}
          <button className="popup__submit-btn" type="submit">
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
