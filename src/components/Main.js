import avatar from '../images/Jacques_Yves_Cousteau.jpg';
import React from 'react';
import {api} from '../utils/Api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = React.useState('Жак Ив Кусто');
    const [userDescription, setUserDescription] = React.useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = React.useState(avatar);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([profile, initialCards]) => {
                setUserName(profile.name);
                setUserDescription(profile.about);
                setUserAvatar(profile.avatar);

                setCards(initialCards);
            })
            .catch((err) => {
                console.log(err);
        });
    }, []);

    return (
      <main className="content">
        <section className="profile">
          <img className="profile__avatar" src={userAvatar} alt="Фото профиля"/>
          <div className="profile__edit-avatar" onClick={onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__location">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" type="button" aria-label="Кнопка редактирования профиля" onClick={onEditProfile}></button>
            </div>
            <p className="profile__about-me">{userDescription}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Кнопка добавления фото" onClick={onAddPlace}></button>
        </section>

        <section className="elements" aria-label="Фотографии">
          <ul className="elements__cards">
            {cards.map((card) => (
                <Card 
                    card={card}
                    key={card._id}
                    onCardClick={onCardClick}
                />
            ))}
          </ul>
        </section>
      </main>
    )
}
  
export default Main