class Api {
    constructor({ headers }) {
        this._url = this._url = process.env.NODE_ENV === 'production' ? 'https://api.elndry.students.nomoredomains.xyz' : 'http//localhost:3000';;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, { headers: this._headers, credentials: 'include', })
            .then(res => this._checkResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, { headers: this._headers, credentials: 'include', })
            .then(res => this._checkResponse(res));
    }

    editUserInfo(userInfo) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(userInfo),
        })
            .then(res => this._checkResponse(res));
    }

    editUserAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(avatar)
        })
            .then(res => this._checkResponse(res));
    }

    addCard(card) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(card),
        })
            .then(res => this._checkResponse(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.deleteLike(cardId) : this.addLike(cardId);
    }
}

export const api = new Api({
    headers: {
        "Content-Type": "application/json",
    }
});
