import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState('');

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([profile, initialCards]) => {
        setCurrentUser(profile);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleUpdateAvatar(userInfo) {
    setIsLoading(true);
    api.editAvatar(userInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
    });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api.editUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
    });
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
    });
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  function handleDeletePopupClick(card){
    setDeletedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(isLiked) {
        api.deleteLike(card._id).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    } else {
        api.addLike(card._id).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
        });
    }
}

function handleCardDelete(e) {
  e.preventDefault();
  setIsLoading(true);
  api.deleteCard(deletedCard._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== deletedCard._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
  });
}

function handleOverlayClose(e){
  if(e.target.classList.contains('popup')){
    closeAllPopups();
  }
}

React.useEffect(() => {
  function handleEscapeKey(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  document.addEventListener('keydown', handleEscapeKey)
  return () => document.removeEventListener('keydown', handleEscapeKey)
}, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeletePopupClick}
        />

        <Footer />
          
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
        />

        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
          handleOverlayClose={handleOverlayClose}
        />

        <PopupWithForm 
          onClose={closeAllPopups}
          name="confirmDelete"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isConfirmationPopupOpen}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
          handleOverlayClose={handleOverlayClose}
          formValid={true}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;