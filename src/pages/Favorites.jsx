import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import PropertyGrid from '../components/PropertyGrid.jsx';

export default function Favorites() {
  const { t, allProperties, favorites } = useApp();
  const items = allProperties.filter((p) => favorites.includes(String(p.id)));

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>{t('fav.title')}</h1>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          {items.length ? (
            <PropertyGrid items={items} empty="" />
          ) : (
            <div className="empty">
              <Heart size={28} strokeWidth={1.4} />
              <p>{t('fav.empty')}</p>
              <Link to="/all" className="btn btn--primary">
                {t('fav.browse')}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
