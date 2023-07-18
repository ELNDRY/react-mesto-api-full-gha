import React, { useState } from 'react';

export const Login = ({ onLogin }) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(formValue);
    }

    return (
        <main className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title">Войти</h2>
                <input className="auth__input" name="email" type="email" placeholder="Email"
                    onChange={handleChange}
                    value={formValue.email} required />
                <input className="auth__input" name="password" type="password" placeholder="Пароль"
                    onChange={handleChange}
                    value={formValue.password} required />
                <button className="auth__submit-button" type="submit">Войти</button>
            </form>
        </main>
    )
}

