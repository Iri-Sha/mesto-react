import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const avatarRef = React.useRef('')

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        })
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
        >
          <input
            id="inputAvatarLink"
            name="avatarLink"
            className="popup__input popup__input_avatar_link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
          />
          <span id="inputAvatarLink-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup