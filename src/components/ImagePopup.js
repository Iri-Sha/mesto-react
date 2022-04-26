function ImagePopup(props) {
    return (
        <div className={`popup popup_view-image ${props.card.link && 'popup_opened'}`}>
            <figure className="popup__figure">
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
                <img className="popup__image" alt={props.card.name} src={props.card.link}/>
                <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup
