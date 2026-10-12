import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function NotFound() {
  const { t } = useApp();
  return (
    <section className="page-head page-head--center">
      <div className="container">
        <h1>{t('notfound.title')}</h1>
        <p>{t('notfound.text')}</p>
        <Link to="/" className="btn btn--primary">
          {t('notfound.home')}
        </Link>
      </div>
    </section>
  );
}
