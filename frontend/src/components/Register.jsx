import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = ({ onRegister }) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister(formValue);
    }

    return (
        <main className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title">Регистрация</h2>
                <input className="auth__input" name="email" type="email" placeholder="Email"
                    onChange={handleChange}
                    value={formValue.email} required />
                <input className="auth__input" name="password" type="password" placeholder="Пароль"
                    onChange={handleChange}
                    value={formValue.password} required />
                <button className="auth__submit-button" type="submit">Зарегистрироваться</button>
                <p className="auth__text">Уже зарегистрированы?&nbsp;
                    <Link className="auth__link" to="/sign-in">Войти</Link>
                </p>
            </form>
        </main>
    )
}