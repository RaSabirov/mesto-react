import React from 'react';

function Card({ onCardClick, name, link, likes }) {
  function handleClick() {
    onCardClick({ name, link });
  }

  return (
    <li className="places__card-item">
      <button className="places__del-btn" type="button" aria-label="Кнопка удалить"></button>
      <img className="places__photo" src={link} alt={name} onClick={handleClick} />
      <div className="places__text-container">
        <h2 className="places__text">{name}</h2>
        <div className="places__like-container">
          <button className="places__like-btn" type="button" aria-label="Кнопка лайк"></button>
          <span className="places__like-counter">{likes}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
