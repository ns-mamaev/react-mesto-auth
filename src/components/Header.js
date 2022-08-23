import { Link, useLocation } from 'react-router-dom';
import pageLogo from '../images/logo.svg';

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <img src={pageLogo} alt="Место" className="header__logo" />
      {pathname === '/sign-up' ? <Link to="/sign-in">Войти</Link> : <Link to="/sign-up">Регистрация</Link>}
    </header>
  );
}

export default Header;
