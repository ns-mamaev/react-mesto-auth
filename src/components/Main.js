import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useContext } from 'react';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-wrapper" onClick={onEditAvatar} type="button">
          <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" aria-label="edit profile" onClick={onEditProfile} />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="add card" onClick={onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
