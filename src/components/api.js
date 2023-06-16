export default class Api {
  constructor(options) {
    console.log(options.headers);

    this._url = options.url;
    this._headers = options.headers;
    this._authorization = options.headers.authorization; 
  }


  _checkStatusRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }
  }
//выгрузим карточки из массива на севере
  getInitial() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatusRes);
  }
//загрузим карточку на сервер
  addApiCard({ name, link }) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/cards`, {
      method: "POST",
      headers: {
        authorization: "e30f2210-af8c-475a-a1c3-a51d57fda811",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
//удалим карточку с сервера
  deleteApiCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatusRes);
  }
//лайк на сервер
  likeApiCard(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkStatusRes);
  }
//дизлайк на сервер
  dislikeApiCard(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatusRes);
  }
//данные в профиль
  getUserApiData() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatusRes);
  }

  //данные из профиля
  setUserApiData(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "e30f2210-af8c-475a-a1c3-a51d57fda811",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      })
    })
      .then(this._checkStatusRes);
  }

  //аватарка
  editUserApiAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ avatar }),
    }).then(this._checkStatusRes);
  }
}