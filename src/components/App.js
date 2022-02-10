import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
  // =================================================
  // ===== СТЕЙТЫ
  // =================================================
  // Переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // Переменная состояния, отвечающая за выбранную карточку(при клике на картинку)
  const [selectedCard, setSelectedCard] = React.useState({});
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // Переменная состояния отвечающая за состояние cards
  const [cards, setCards] = React.useState([]);
  // Стейт, отвечающий за подготовку к удалении карточки. Передаем карту в api и при открытии попапа
  const [toDeleteCard, setToDeleteCard] = React.useState({});

  // Стейты прелоудеров загрузки
  const [isLoadingAddPopup, setIsLoadingAddPopup] = React.useState(false);
  const [isLoadingEditPopup, setIsLoadingEditPopup] = React.useState(false);
  const [isLoadingAvatarPopup, setIsLoadingAvatarPopup] = React.useState(false);
  const [isLoadingDeletePopup, setIsLoadingDeletePopup] = React.useState(false);

  // =================================================
  // ===== РАБОТА С API ЗАПРОСАМИ
  // =================================================
  // Эффект который будет совершать запрос в API за отображением карточек
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => alert(`Ошибка загрузки данных с сервера: ${err}`));
  }, []);

  // Отображаем информацию о пользователе из API
  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => alert('Ошибка загрузки данных с сервера:', err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => alert('Ошибка лайка/дизлайка карточки:', err));
  }

  function handleDeleteCardSubmit() {
    setIsLoadingDeletePopup(true);
    api
      .deleteCard(toDeleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== toDeleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка удаления карточки:', err))
      .finally(() => {
        setIsLoadingDeletePopup(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoadingEditPopup(true);
    api
      .setUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка загрузки данных пользователя:', err))
      .finally(() => {
        setIsLoadingEditPopup(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatarPopup(true);
    api
      .setUserAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка обновления аватара:', err))
      .finally(() => {
        setIsLoadingAvatarPopup(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadingAddPopup(true);
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка добавления карточки:', err))
      .finally(() => {
        setIsLoadingAddPopup(false);
      });
  }

  // =================================================
  // ===== Функции-обработчики для открытия попапов
  // =================================================
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardDeleteClick(toDeleteCard) {
    // Отмечаем выбранную id карточки
    setToDeleteCard(toDeleteCard);
    // Передаем открытие попапа
    setIsDeleteCardPopupOpen(true);
  }
  // =================================================
  // ===== Функция-обработчик для закрытия всех попапов
  // =================================================
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  // =================================================
  // ===== РЕНДЕР КОМПОНЕНТОВ
  // =================================================
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main /* Обработчики на открытие форм при клике на элементы */
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteClick}
        cards={cards}
      />

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoadingEditPopup}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoadingAvatarPopup}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoadingAddPopup}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleDeleteCardSubmit}
        isLoading={isLoadingDeletePopup}
      />

      <ImagePopup /* Форма открытия попапа картинки-превью */
        namePopup="image"
        isOpen={!!selectedCard.name && !!selectedCard.link}
        card={selectedCard}
        onClose={closeAllPopups}
        isImagePopup={selectedCard}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
