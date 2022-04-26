import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header />

      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}

        onCardClick={handleCardClick}
      />

      <Footer />
        
      <PopupWithForm 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="editProfile"
        title="Редактировать профиль"
        buttonText="Сохранить"
      >
        <input id="inputProfileName" name="profileName" className="popup__input popup__input_profile_name" placeholder="Имя" type="text" minLength="2" maxLength="40" required/>
        <span id="inputProfileName-error" className="popup__error"></span>
        <input id="inputProfileAbout" name="profileAbout" className="popup__input popup__input_profile_about-me" placeholder="О себе" type="text" minLength="2" maxLength="200" required/>
        <span id="inputProfileAbout-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="addPlace"
        title="Новое место"
        buttonText="Создать"
      >
        <input id="inputMestoName" name="mestoName" className="popup__input popup__input_mesto_name" type="text" placeholder="Название" minLength="2" maxLength="30" required/>
        <span id="inputMestoName-error" className="popup__error"></span>
        <input id="inputMestoLink" name="mestoLink" className="popup__input popup__input_mesto_link" type="url" placeholder="Ссылка на картинку" required/>
        <span id="inputMestoLink-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="editAvatar"
        title="Обновить аватар"
        buttonText="Сохранить"
      >
        <input id="inputAvatarLink" name="avatarLink" className="popup__input popup__input_avatar_link" type="url" placeholder="Ссылка на картинку" required/>
        <span id="inputAvatarLink-error" className="popup__error"></span>
      </PopupWithForm>

      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <PopupWithForm 
        onClose={closeAllPopups}
        name="confirmDelete"
        title="Вы уверены?"
        buttonText="Да"
      />

    </div>
  );
}

export default App;