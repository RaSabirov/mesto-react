import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  // Переменные состояния, отвечающие за состояние профиля
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  // Переменная состояния отвечающая за состояние cards
  const [cards, setCards] = React.useState([]);

  // Эффект который будет совершать запрос в API за отображением данных пользователя
  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => alert('Ошибка загрузки данных с сервера:', err));
  }, []);

  // Эффект который будет совершать запрос в API за отображением карточек
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            id: item._id,
            name: item.name,
            link: item.link,
            likes: item.likes.length,
          }))
        );
      })
      .catch((err) => alert('Ошибка загрузки данных с сервера:', err));
  }, []);

  return (
    <>
      <main className="content">
        <section className="profile page__container">
          <div className="profile__container">
            <div className="profile__avatar-container">
              <button className="profile__change-avatar" type="button" onClick={onEditAvatar}></button>
              <img className="profile__image" src={userAvatar} alt="Аватарка профиля" />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__edit-btn link"
                type="button"
                aria-label="Кнопка изменить"
                onClick={onEditProfile}
              ></button>
              <p className="profile__job">{userDescription}</p>
            </div>
          </div>
          <button
            className="profile__add-btn link"
            type="button"
            aria-label="Кнопка добавить"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="places page__container">
          <ul className="places__card">
            {cards.map(({ id, ...props }) => (
              <Card key={id} {...props} onCardClick={onCardClick} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
