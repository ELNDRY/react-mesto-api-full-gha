import React from 'react'

export const ImagePopup = ({ card, onClose }) => {
    let className = 'popup popup_type_image';
    if (card) {
        className += ' popup_active';
    }

    return (
        <div className={className}>
            <div className="popup__container">
                <button className="popup__close-cross" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <figure className="img-figure">
                    <img className="img-figure__image" src={card?.link} alt={`Фотография: ${card?.name}.`} />
                    <figcaption className="img-figure__caption">
                        <h2 className="img-figure__description">{card?.name}</h2>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}