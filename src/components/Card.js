import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="card" key={props.card._id}>
            <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <button className="card__delete-button" type="button" aria-label="Кнопка удаления места"></button>
            <div className="card__item">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like-wrap">
                    <button className="card__like-button" type="button" aria-label="Кнопка нравится место"></button>
                    <span className="card__like-count">{props.card.likes.length}</span>  
                </div>
            </div>
        </li>
    )
}
  
export default Card