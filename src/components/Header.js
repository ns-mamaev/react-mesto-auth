import { LoginStatusContext } from 'contexts/LoginStatusContext';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import pageLogo from '../images/logo.svg';

function Header({ onSignOut, userProfile }) {
  const { pathname } = useLocation();
  const loggedIn = useContext(LoginStatusContext);

  return (
    <header className="header">
      <img src={pageLogo} alt="Место" className="header__logo" />
      <div className="header__auth">
        {userProfile && <span className="header__auth-profile">{userProfile}</span>}
        {pathname === '/sign-in' && (
          <Link className="header__auth-action" to="./sign-up">
            Зарегистрироваться
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
