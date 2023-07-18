import React, { useEffect, useState } from "react";

import { PopupWithForm } from "./PopupWithForm";

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {

    const [name, setName] = useState(null)
    const [link, setLink] = useState(null)

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleLinkChange = (evt) => {
        setLink(evt.target.value);
    }

    useEffect(() => {
        if (!isOpen) {
            setName(null);
            setLink(null);
        }
    }, [isOpen])

    const handleSubmit = () => {
        onAddPlace({ name, link });
    }



    return (<PopupWithForm
        formName={'add-card'}
        formTitle={'Новое место'}
        isOpen={isOpen}
        onClose={onClose}
        buttonText={'Создать'}
        onSubmit={handleSubmit}
    >
        <input id="card-name" name="name" className="popup__input popup__input_type_card-name" placeholder="Название"
            required minLength="2" maxLength="30" onChange={handleNameChange} value={name || ''} />
        <span className="popup__input-error card-name-error"></span>
        <input id="card-link" type="url" name="link" className="popup__input popup__input_type_card-link"
            placeholder="Ссылка на картинку" required onChange={handleLinkChange} value={link || ''} />
        <span className="popup__input-error card-link-error"></span>
    </PopupWithForm>)
}