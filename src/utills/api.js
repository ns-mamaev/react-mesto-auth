class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json();
    return Promise.reject(err); //обработка ответа от сервера повторяется, решил выделить в отдельный метод
  }

  _getData(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => this._handleResponse(res));
  }

  getUserInfo() {
    return this._getData('/users/me');
  }

  getInitialCards() {
    return this._getData('/cards');
  }

  _changeData(data, path) {
    return fetch(`${this._baseUrl}${path}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo(data) {
    return this._changeData(data, '/users/me');
  }

  setAvatar(data) {
    return this._changeData(data, '/users/me/avatar');
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._handleResponse(res));
  }

  _handleLike(method, id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this._handleLike('DELETE', id) : this._handleLike('PUT', id);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: 'c057a3e7-5ee0-421c-b032-822b62f6abd9',
    'Content-Type': 'application/json',
  },
});

export default api;
