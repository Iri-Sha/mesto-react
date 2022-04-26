import React from 'react';

function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="card" key={card._id}>
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <button className="card__delete-button" type="button" aria-label="Кнопка удаления места"></button>
            <div className="card__item">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-wrap">
                    <button className="card__like-button" type="button" aria-label="Кнопка нравится место"></button>
                    <span className="card__like-count">{card.likes.length}</span>  
                </div>
            </div>
        </li>
    )
}
  
export default Card