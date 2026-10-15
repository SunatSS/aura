import { Link } from 'react-router-dom';
import './pages.css';

export default function NotFound() {
  return (
    <div className="container notfound">
      <h1>404</h1>
      <p>Такой страницы нет — но гранты есть.</p>
      <Link to="/catalog" className="btn btn--lime">В каталог</Link>
    </div>
  );
}
