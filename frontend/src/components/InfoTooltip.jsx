import React from 'react';

export const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
    let popupClassName = `popup popup_type_tooltip`

    if (isOpen) {
        popupClassName += ' popup_active';
    }

    const iconClassName = `popup__icon ${isSuccess ? 'popup__icon_type_success' : 'popup__icon_type_error'}`;

    return (
        <div className={popupClassName}>
            <div className='popup__container'>
                <div className='popup__form popup__form_type_tooltip'>
                    <button className='popup__close-cross' type='button' onClick={onClose} aria-label='Закрыть'></button>
                    <div className={iconClassName}></div>
                    <p className='popup__message'>{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
                </div>
            </div>
        </div>
    )
}