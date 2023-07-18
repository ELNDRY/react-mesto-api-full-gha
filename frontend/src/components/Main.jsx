import React, { useContext } from 'react'
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Main = ({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) => {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar-overlay" onClick={onEditAvatar}>
                        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser?.avatar})` }} />
                    </div>
                    <div className="profile__info">
                        <div className="profile__name-container">
                            <h1 className="profile__name">{currentUser?.name}</h1>
                            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile} />
                        </div>
                        <p className="profile__description">{currentUser?.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace} />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}
                </ul>
            </section>
        </main>
    )
}

