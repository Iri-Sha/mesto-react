function PopupWithForm(props) {
    return (
      <div className={`popup popup__type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
          <h2 className="popup__title">{props.title}</h2>
          <form className={`popup__form popup__form_${props.name}`} name={props.name} noValidate>
            {props.children}
            <button className={`popup__button popup__button_${props.name}`} type="submit">{props.buttonText}</button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm