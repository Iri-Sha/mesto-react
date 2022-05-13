import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({
            name: name,
            link: link,
        })
    }

    function handleNameChange(e) {
        setName(e.target.value)
    }
    
    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    return (
        <PopupWithForm 
          isOpen={isOpen}
          onClose={onClose}
          name="addPlace"
          title="Новое место"
          buttonText="Создать"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        >
          <input
            id="inputMestoName"
            name="mestoName"
            className="popup__input popup__input_mesto_name"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            onChange={handleNameChange}
            value={name}
          />
          <span id="inputMestoName-error" className="popup__error"></span>
          <input
            id="inputMestoLink"
            name="mestoLink"
            className="popup__input popup__input_mesto_link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            onChange={handleLinkChange}
            value={link}
          />
          <span id="inputMestoLink-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup