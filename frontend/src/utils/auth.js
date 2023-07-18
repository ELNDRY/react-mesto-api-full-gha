class Auth {
    constructor({ baseUrl }) {
        this._url = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
            .then(res => this._checkResponse(res));
    };

    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
            .then(res => this._checkResponse(res))
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                return data;
            })
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }
}

export const auth = new Auth({ baseUrl: 'https://api.elndry.students.nomoredomains.xyz' });