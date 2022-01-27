import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  // Переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  // Переменная состояния, отвечающая за выбранную карточку(при клике на картинку)
  const [selectedCard, setSelectedCard] = React.useState({});

  // Функции-обработчики для открытия попапов
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // Функция-обработчик для закрытия всех попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
      <Header />

      <Main /* Обработчики на открытие форм при клике на элементы */
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />
      <PopupWithForm /* Форма редактирования профиля */
        namePopup="profile-edit"
        title="Редактировать профиль"
        formName="form-edit-profile"
        buttonName="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            type="text"
            placeholder="Название"
            className="popup__input popup__input_type_title"
            name="name"
            minLength="2"
            maxLength="30"
            required
            autoComplete="off"
            id="title-input"
          />
          <span className="popup__input-error" id="title-input-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            name="link"
            required
            autoComplete="off"
            id="link-input"
          />
          <span className="popup__input-error" id="link-input-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm /* Форма добавления картинок */
        namePopup="places-add"
        title="Новое место"
        formName="form-add-places"
        buttonName="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            type="text"
            placeholder="Название"
            className="popup__input popup__input_type_title"
            name="name"
            minLength="2"
            maxLength="30"
            required
            autoComplete="off"
            id="title-input"
          />
          <span className="popup__input-error" id="title-input-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            name="link"
            required
            autoComplete="off"
            id="link-input"
          />
          <span className="popup__input-error" id="link-input-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm /* Форма смены аватара */
        namePopup="avatar"
        title="Обновить аватар"
        formName="form-new-photo"
        buttonName="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_title"
            name="link"
            required
            autoComplete="off"
            id="linkImg-input"
          />
          <span className="popup__input-error" id="linkImg-input-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm /* Форма запрос на удаление "Вы уверены?" */
        namePopup="del-request"
        title="Вы уверены?"
        formName="form-del-request"
        buttonName="Да"
      />

      <ImagePopup /* Форма открытия попапа картинки-превью */
        namePopup="image"
        isOpen={!!selectedCard.name && !!selectedCard.link}
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
