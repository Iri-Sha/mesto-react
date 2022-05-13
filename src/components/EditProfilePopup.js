import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateUser({
          name: name,
          about: description,
        })
    }

    function handleNameChange(e) {
        setName(e.target.value)
    }
    
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }    

    return (
        <PopupWithForm 
          isOpen={isOpen}
          onClose={onClose}
          name="editProfile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        >
          <input 
            id="inputProfileName"
            value={name || ''}
            onChange={handleNameChange}
            name="profileName"
            className="popup__input popup__input_profile_name"
            placeholder="Имя"
            type="text"
            minLength="2"
            maxLength="40"
            required/>
          <span id="inputProfileName-error" className="popup__error"></span>
          <input
            id="inputProfileAbout"
            value={description || ''}
            onChange={handleDescriptionChange}
            name="profileAbout"
            className="popup__input popup__input_profile_about-me"
            placeholder="О себе"
            type="text"
            minLength="2"
            maxLength="200"
            required/>
          <span id="inputProfileAbout-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup