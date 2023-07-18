import React, { useState, useEffect, useContext } from "react";

import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    const currentUser = useContext(CurrentUserContext);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
    }

    useEffect(() => {
        if (!isOpen) {
            setName(currentUser?.name);
            setDescription(currentUser?.about);
        }
    }, [isOpen, currentUser]);

    const handleSubmit = () => {
        onUpdateUser({ name, about: description });
    }

    return (<PopupWithForm
        formName={'profile'}
        formTitle={'Редактировать профиль'}
        isOpen={isOpen}
        onClose={onClose}
        buttonText={'Сохранить'}
        onSubmit={handleSubmit}
    >
        <input id="name" name="name" className="popup__input popup__input_type_name" placeholder="Ваше имя" required
            minLength="2" maxLength="40" onChange={handleNameChange} value={name || ''} />
        <span className="popup__input-error name-error"></span>
        <input id="about" name="about" className="popup__input popup__input_type_description" placeholder="О себе" required
            minLength="2" maxLength="200" onChange={handleDescriptionChange} value={description || ''} />
        <span className="popup__input-error about-error"></span>
    </PopupWithForm>)
}