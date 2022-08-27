import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import burgerImg from '../images/burger.svg';
import closeImg from '../images/close-button.svg';
import pageLogo from '../images/logo.svg';

function Header({ loggedIn, onSignOut, userProfile }) {
  const { pathname } = useLocation();
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
        {loggedIn && (
          <button
            type="button"
            className="header__burger-button"
            style={{ backgroundImage: `url(${menuOpened ? closeImg : burgerImg})` }}
            onClick={toggleMenu}
          />
        )}
        {pathname === '/sign-in' && (
          <Link className="header__auth-action" to="./sign-up">
            Регистрация
          </Link>
        )}
        {pathname === '/sign-up' && (
          <Link className="header__auth-action" to="./sign-in">
            Войти
          </Link>
        )}
      </div>
      <div className={`header__auth ${menuOpened && loggedIn ? '' : 'header__auth_hidden'}`}>
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
