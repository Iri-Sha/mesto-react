import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading, handleOverlayClose}) {
    const avatarRef = React.useRef('')
    const [avatarValid, setAvatarValid] = React.useState(false);
    const [errorAvatarMessage, setErrorAvatarMessage] = React.useState('');

    React.useEffect(() => {
        avatarRef.current.value = '';
        setAvatarValid(false);
        setErrorAvatarMessage('');
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        })
    }

    function handleChangeAvatar(e){
        setAvatarValid(e.target.validity.valid);
        setErrorAvatarMessage(e.target.validationMessage);
    }

    return (
        <PopupWithForm 
          isOpen={isOpen}
          onClose={onClose}
          name="editAvatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
          formValid={avatarValid}
        >
          <input
            id="inputAvatarLink"
            name="avatarLink"
            className={`popup__input popup__input_avatar_link ${errorAvatarMessage==='' ? "" : "popup__input_type_error"}`}
            type="url"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
            onChange={handleChangeAvatar}
          />
          <span id="inputAvatarLink-error" className={`popup__error ${avatarValid ? "" : "popup__error_visible"}`}>{errorAvatarMessage}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup