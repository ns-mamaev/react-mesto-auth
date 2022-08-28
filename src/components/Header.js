import { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import burgerImg from '../images/burger.svg';
import closeImg from '../images/close-button.svg';
import pageLogo from '../images/logo.svg';

function Header({ loggedIn, onSignOut, userProfile }) {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened((state) => !state);
  };

  const handleSignOut = () => {
    setMenuOpened(false);
    onSignOut();
  };

  return (
    <header className="header">
      <div className="header__container">
        <img src={pageLogo} alt="Место" className="header__logo" />
        <Switch>
          <Route path="/sign-in">
            <Link className="header__auth-action" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link className="header__auth-action" to="/sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/">
            {loggedIn && (
              <button
                type="button"
                className="header__burger-button"
                style={{ backgroundImage: `url(${menuOpened ? closeImg : burgerImg})` }}
                onClick={toggleMenu}
              />
            )}
          </Route>
        </Switch>
      </div>
      <div className={`header__auth ${!menuOpened && 'header__auth_hidden'}`}>
        {userProfile && <span className="header__auth-profile">{userProfile}</span>}
        {loggedIn && (
          <button className="header__auth-action header__auth-action_type_exit" onClick={handleSignOut}>
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
