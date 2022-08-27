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
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import Popup from './Popup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import RemoveCardPopup from './RemoveCardPopup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [userProfile, setUserProfile] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

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
  const [isErrorMessagePopupOpen, setIsErrorMessagePopupOpen] = useState(false);
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

  //выделено в отдельную функцию, при закрытии сообщения, попап, в котором произошла ошибка - не закроется
  const closeErrorMessage = () => {
    setIsErrorMessagePopupOpen(false);
    setTimeout(() => setErrorMessage(''), 500); //не очищаю сообщение пока показывается анимация закрытия попапа
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
      .catch(showErrorPopup);
  };

  const showErrorPopup = ({ message }) => {
    setErrorMessage(message);
    setIsErrorMessagePopupOpen(true);
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
      .catch(showErrorPopup);
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
      .catch(showErrorPopup);
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
      .catch(showErrorPopup);
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
      .catch(showErrorPopup);
  };

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
    setIsPageLoading(false);
  };

  const onRegister = ({ email, password }) => {
    setIsRegisterLoading(true);
    auth
      .register(email, password)
      .then((res) => {
        setUserProfile(res.data.email);
        setLoggedIn(true);
        history.push('./');
      })
      .catch(({ error }) => setInfoTooltipMessage(error))
      .finally(() => {
        setIsRegisterLoading(false);
        setIsInfoTooltipOpened(true);
      });
  };

  const onLogin = ({ email, password }) => {
    setIsLoginLoading(true);
    auth
      .login(email, password)
      .then(() => {
        setUserProfile(email);
        setLoggedIn(true);
        history.push('./');
        setIsPageLoading(true);
      })
      .catch(({ message }) => {
        setInfoTooltipMessage(message);
        setIsInfoTooltipOpened(true);
      })
      .finally(() => {
        setIsLoginLoading(false);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem('token');
    history.push('./sign-in');
    setLoggedIn(false);
    setUserProfile('');
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const loadMainContent = () => {
    if (loggedIn) {
      setIsPageLoading(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
          setIsPageLoading(false);
        })
        .catch(showErrorPopup);
    }
  };

  useEffect(() => {
    loadMainContent();
  }, [loggedIn]);

  return (
    <LoginStatusContext.Provider value={loggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          {isPageLoading && <div className="loading-screen" />}
          <Header onSignOut={onSignOut} userProfile={userProfile} />
          <main className="main">
            <Switch>
              <Route path="/sign-in">
                <Login onLogin={onLogin} isLoading={isLoginLoading} />
              </Route>
              <Route path="/sign-up">
                <Register onRegister={onRegister} isLoading={isRegisterLoading} />
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
          </main>
          <Footer />
          <Popup
            component={EditProfilePopup}
            isOpen={isEditProfilePopupOpened}
            isLoading={isLoadingProfile}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <Popup
            component={EditAvatarPopup}
            isOpen={isEditAvatarPopupOpen}
            isLoading={isLoadingAvatar}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <Popup
            component={AddPlacePopup}
            isOpen={isAddPlacePopupOpen}
            isLoading={isLoadingAddPlace}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <Popup component={ImagePopup} isOpen={isImagePopupOpened} card={selectedCard} onClose={closeAllPopups} />
          <Popup
            component={RemoveCardPopup}
            isOpen={isRemoveCardPopupOpened}
            isLoading={isLoadingRemoveCard}
            onClose={closeAllPopups}
            onConfirmRemove={handleConfirmRemove}
          />
          <Popup
            component={ErrorPopup}
            isOpen={isErrorMessagePopupOpen}
            errorMessage={errorMessage}
            onClose={closeErrorMessage}
          />
          <Popup
            component={InfoTooltip}
            isOpen={isInfoTooltipOpened}
            onClose={closeAllPopups}
            message={infoTooltipMessage}
            isError={!loggedIn}
          />
        </div>
      </CurrentUserContext.Provider>
    </LoginStatusContext.Provider>
  );
}

export default App;
