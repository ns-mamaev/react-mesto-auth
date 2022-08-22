import pageLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={pageLogo} alt="Место" className="header__logo" />
    </header>
  );
}

export default Header;