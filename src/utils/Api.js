const API_KEY = '010caeb4-70a3-4d0b-af59-4d5b702fcb93';

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _errorHandler = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка: ${res.status}`);
  };

  // Получаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._errorHandler);
  }

  // Получаем информацию о пользователе
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._errorHandler);
  }

  // Метод для одновременного получения всех данных для приложения
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: API_KEY,
    'content-type': 'application/json',
  },
});
