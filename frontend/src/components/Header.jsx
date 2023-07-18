import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import logo from '../images/logo.svg'

export const Header = ({ onLogout }) => {

    const currentUser = useContext(CurrentUserContext);

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
            <Routes>
                <Route path="/" element={
                    <div className="header__container">
                        <p className="header__email">{currentUser?.email}</p>
                        <button className="header__button" onClick={onLogout}>Выйти</button>
                    </div>
                } />
                <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
                <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
            </Routes>
        </header>
    )
}