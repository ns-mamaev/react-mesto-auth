import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found content">
      <div className="page-not-found__inner">
        <h2 className="page-not-found__title">404</h2>
        <p className="page-not-found__subtitle">Такой страницы не существует существует</p>
        <Link className="page-not-found__link-home" to="/">
          Вернуться на главную &#10230;
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
