import React from 'react'

export const PopupWithForm = ({ formName, formTitle, isOpen, onClose, buttonText, children, onSubmit }) => {
    const className = `popup popup_type_${formName}`

    if (isOpen) {
        className += ' popup_active';
    }

    const handleSubmit = (evt) => {
       evt.preventDefault();
       onSubmit();
    }

    return (
        <div className={className}>
            <div className="popup__container">
                <button className="popup__close-cross" type="button" aria-label="Закрыть" onClick={onClose} />
                <form name={formName} className={`popup__form popup__form_${formName}`} onSubmit={handleSubmit}>
                    <h2 className="popup__title">{formTitle}</h2>
                    {children}
                    <button aria-label={buttonText} className="popup__submit-button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}