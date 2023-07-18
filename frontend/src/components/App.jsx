import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'
import { PopupWithForm } from './PopupWithForm'
import { ImagePopup } from './ImagePopup'
import { api } from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { EditProfilePopup } from './EditProfilePopup'
import { EditAvatarPopup } from './EditAvatarPopup'
import { AddPlacePopup } from './AddPlacePopup'
import { Login } from './Login'
import { Register } from './Register'
import { ProtectedRoute } from './ProtectedRoute'
import { auth } from '../utils/auth'
import { InfoTooltip } from './InfoTooltip'

export const App = () => {

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null);

    const handleEditAvatarClick = () => setisEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
    const handleCardClick = (card) => setSelectedCard(card);

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([userInfo, initialCards]) => {
                    setCurrentUser(user => ({ ...user, ...userInfo }));
                    setCards(initialCards);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [isLoggedIn]);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                const updateCards = cards.map(c => c._id === newCard._id ? newCard : c)
                setCards(updateCards);
            })
            .catch((err) => {
                console.error(err);
            })

    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                const updateCards = cards.filter((c) => card._id !== c._id);
                setCards(updateCards);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setisEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsTooltipOpen(false);
    }

    const handleUpdateUser = (user) => {
        api.editUserInfo(user)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                setIsEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleUpdateAvatar = (avatar) => {
        api.editUserAvatar(avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                setisEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleAddPlace = (card) => {
        api.addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleLogin = ({ email, password }) => {
        auth.login(email, password)
            .then((response) => {
                if (response.token) {
                    setIsLoggedIn(true);
                    setCurrentUser({ email: email });
                    navigate("/", { replace: true })
                }
            })
            .catch(err => {
                setIsSuccess(false);
                setIsTooltipOpen(true);
            })
    }

    const handleRegister = ({ email, password }) => {
        auth.register(email, password)
            .then(() => {
                setIsSuccess(true);
                navigate("/sign-in", { replace: true });
            })
            .catch(err => {
                setIsSuccess(false);
            })
            .finally(() => {
                setIsTooltipOpen(true);
            })
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        setCurrentUser(null);
        setCards([]);
        navigate("/sign-in", { replace: true });
    }

    useEffect(() => {
        if (!isLoggedIn) {
            const token = localStorage.getItem('token');
            auth.checkToken(token)
                .then(data => {
                    if (data.data.email) {
                        setIsLoggedIn(true);
                        setCurrentUser(user => ({ ...user, email: data.data.email }));
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="page">
            <div className="content">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header onLogout={handleLogout} />
                    <Routes>
                        <Route path="/sign-up" element={<Register onClose={closeAllPopups} onRegister={handleRegister} />} />
                        <Route path="/sign-in" element={<Login onClose={closeAllPopups} onLogin={handleLogin} />} />
                        <Route path="/" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Main cards={cards}
                                    onEditProfile={handleEditProfileClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                            </ProtectedRoute>}>
                        </Route>
                    </Routes>
                    <Footer />
                    <PopupWithForm
                        formName={'confirm'}
                        formTitle={'Вы уверены?'}
                        onClose={closeAllPopups}
                        buttonText={'Да'}
                    >
                    </PopupWithForm>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                    <InfoTooltip isOpen={isTooltipOpen} isSuccess={isSuccess} onClose={closeAllPopups} />
                </CurrentUserContext.Provider>
            </div>
        </div>
    )
}