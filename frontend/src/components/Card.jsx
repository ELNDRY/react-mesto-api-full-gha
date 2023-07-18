import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {

    const currentUser = useContext(CurrentUserContext);

    const handleCardClick = () => onCardClick(card);
    const handleCardLike = () => onCardLike(card);
    const handleCardDelete = () => onCardDelete(card);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    )

    return (
        <li className="element">
            {isOwn && <button className="element__delete" type="button" aria-label="Удалить" onClick={handleCardDelete} />}
            <img className="element__image" src={card?.link} alt={`Фотография: ${card?.name}.`} onClick={handleCardClick} />
            <div className="element__container">
                <h2 className="element__text">{card?.name}</h2>
                <div className="element__wrapper">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleCardLike} />
                    <span className="element__counter">{card?.likes.length}</span>
                </div>
            </div>
        </li>
    )
}