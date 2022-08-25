import { LoginStatusContext } from 'contexts/LoginStatusContext';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import burgerImg from '../images/burger.svg';
import closeImg from '../images/close-button.svg';
import pageLogo from '../images/logo.svg';

function Header({ onSignOut, userProfile }) {
  const { pathname } = useLocation();
  const loggedIn = useContext(LoginStatusContext);
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened((state) => !state);
  };

  return (
    <header className="header">
      <div className="header__mobile-container">
        <img src={pageLogo} alt="Место" className="header__logo" />
        <button
          type="button"
          className="header__burger-button"
          style={{ backgroundImage: `url(${menuOpened ? closeImg : burgerImg})` }}
          onClick={toggleMenu}
        />
      </div>
      <div className={`header__auth ${menuOpened ? '' : 'header__auth_hidden'}`}>
        {userProfile && <span className="header__auth-profile">{userProfile}</span>}
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
        {loggedIn && (
          <button className="header__auth-action" onClick={onSignOut}>
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
