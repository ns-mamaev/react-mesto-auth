import { Link, useHistory, useLocation } from 'react-router-dom';
import pageLogo from '../images/logo.svg';

function Header() {
  const { pathname } = useLocation();
  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem('token');
    history.push('./sign-in');
  };

  return (
    <header className="header">
      <img src={pageLogo} alt="Место" className="header__logo" />
      {pathname === '/sign-up' ? <Link to="/sign-in">Войти</Link> : <Link to="/sign-up">Регистрация</Link>}
      <button onClick={signOut}>Порошок уходи!</button>
    </header>
  );
}

export default Header;
