function PopupWithForm({isOpen, onClose, name, title, buttonText, children}) {
    return (
      <div className={`popup popup__type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          <form className={`popup__form popup__form_${name}`} name={name} noValidate>
            {children}
            <button className={`popup__button popup__button_${name}`} type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm