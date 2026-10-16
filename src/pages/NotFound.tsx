import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18n';
import './pages.css';

export default function NotFound() {
  const { t, path } = useI18n();
  return (
    <div className="container notfound">
      <h1>404</h1>
      <p>{t.notFound.text}</p>
      <Link to={path('/catalog')} className="btn btn--lime">{t.notFound.button}</Link>
    </div>
  );
}
