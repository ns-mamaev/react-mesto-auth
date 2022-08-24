import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { LoginStatusContext } from 'contexts/LoginStatusContext';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from 'utills/api';
import * as auth from '../utills/auth/mestoAuth';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ErrorPopup from './ErrorPopup';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import RemoveCardPopup from './RemoveCardPopup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [userProfile, setUserProfile] = useState('');

  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isLoadingAddPlace, setIsLoadingAddPlace] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [isRemoveCardPopupOpened, setIsRemoveCardPopupOpened] = useState(false);
  const [isLoadingRemoveCard, setIsLoadingRemoveCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardTodelete] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpened(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleClickOnPopup = (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
      //реализация закрытия по клику на оверлей либо по клику на крестик
      closeAllPopups();
    }
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpened(false);
    setIsRemoveCardPopupOpened(false);
    setIsInfoTooltipOpened(false);
    if (selectedCard.link) {
      setTimeout(() => setSelectedCard({}), 500); //не убираю картинку пока показывается анимация закрытия попапа
    }
  };

  const handleCloseErrorMessage = (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
      //реализация закрытия по клику на оверлей либо по клику на крестик
      setErrorMessage('');
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((updatedCard) => {
        setCards((state) => state.map((oldCard) => (oldCard._id === card._id ? updatedCard : oldCard)));
      })
      .catch(({ message }) => setErrorMessage(message));
  };

  const handleCardDelete = (card) => {
    setIsRemoveCardPopupOpened(true);
    setCardTodelete(card);
  };

  const handleUpdateUser = (userData) => {
    setIsLoadingProfile(true);
    api
      .setUserInfo(userData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .finally(() => setIsLoadingProfile(false))
      .catch(({ message }) => setErrorMessage(message));
  };

  const handleUpdateAvatar = (avatarData) => {
    setIsLoadingAvatar(true);
    api
      .setAvatar(avatarData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .finally(() => setIsLoadingAvatar(false))
      .catch(({ message }) => setErrorMessage(message));
  };

  const handleAddPlaceSubmit = (cardData) => {
    setIsLoadingAddPlace(true);
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards((cards) => [newCard, ...cards]);
        closeAllPopups();
      })
      .finally(() => setIsLoadingAddPlace(false))
      .catch(({ message }) => setErrorMessage(message));
  };

  const handleConfirmRemove = () => {
    setIsLoadingRemoveCard(true);
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardToDelete._id));
        closeAllPopups();
      })
      .finally(() => setIsLoadingRemoveCard(false))
      .catch(({ message }) => setErrorMessage(message));
  };

  //*******************************************
  const handleLogin = (profile) => {
    setLoggedIn(true);
    setUserProfile(profile);
    history.push('./');
  };

  //**************************
  const tokenCheck = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await auth.getContent(token);
      if (res.data) {
        setLoggedIn(true);
        setUserProfile(res.data.email);
        history.push('./');
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    history.push('./sign-in');
    setLoggedIn(false);
    setUserProfile('');
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(({ message }) => setErrorMessage(message));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(({ message }) => setErrorMessage(message));
  }, []);

  const closeByEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  useEffect(() => {
    if (isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpened || isImagePopupOpened) {
      document.addEventListener('keydown', closeByEsc);
    }
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpened, isImagePopupOpened]);

  return (
    <LoginStatusContext.Provider value={loggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          {/* <div className="loading-screen loading-screen_disabled"></div> */}
          <Header onSignOut={signOut} userProfile={userProfile} />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              component={Main}
            />
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpened}
            isLoading={isLoadingProfile}
            onClose={handleClickOnPopup}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            isLoading={isLoadingAvatar}
            onClose={handleClickOnPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            isLoading={isLoadingAddPlace}
            onClose={handleClickOnPopup}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup isOpen={isImagePopupOpened} card={selectedCard} onClose={handleClickOnPopup} />
          <RemoveCardPopup
            isOpen={isRemoveCardPopupOpened}
            isLoading={isLoadingRemoveCard}
            onClose={handleClickOnPopup}
            onConfirmRemove={handleConfirmRemove}
          />
          <ErrorPopup errorMessage={errorMessage} onClose={handleCloseErrorMessage} />
          <InfoTooltip isOpen={isInfoTooltipOpened} onClose={handleClickOnPopup} />
        </div>
      </CurrentUserContext.Provider>
    </LoginStatusContext.Provider>
  );
}

export default App;
