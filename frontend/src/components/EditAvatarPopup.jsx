import React, { useEffect, useRef } from "react";

import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {

    const avatar = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            avatar.current.value = null;
        }
    }, [isOpen])

    const handleSubmit = () => {
        onUpdateAvatar({
            avatar: avatar.current.value
        });
    }

    return (<PopupWithForm
        formName={'avatar'}
        formTitle={'Обновить аватар'}
        isOpen={isOpen}
        onClose={onClose}
        buttonText={'Сохранить'}
        onSubmit={handleSubmit}
    >
        <input id="avatar" type="url" name="avatar" className="popup__input popup__input_type_avatar-link"
            placeholder="Ссылка на картинку" required ref={avatar}/>
        <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>)
}