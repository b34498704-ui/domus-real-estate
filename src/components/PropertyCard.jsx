import { Link } from 'react-router-dom';
import { BedDouble, DoorOpen, Heart, MapPin, Maximize } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { formatPrice } from '../utils/format.js';
import SafeImage from './SafeImage.jsx';

export default function PropertyCard({ property: p }) {
  const { t, isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(p.id);

  return (
    <article className="card">
      <div className="card__media">
        <Link to={`/property/${p.id}`} tabIndex={-1} aria-hidden="true" className="card__imglink">
          <SafeImage src={p.image} alt={p.title} />
        </Link>
        <span className={`badge ${p.deal === 'sale' ? 'badge--sale' : 'badge--rent'}`}>
          {p.deal === 'sale' ? t('card.sale') : t('card.rent')}
        </span>
        <button
          type="button"
          className={`heart${fav ? ' is-active' : ''}`}
          aria-pressed={fav}
          aria-label={fav ? t('card.removeFav') : t('card.addFav')}
          onClick={() => toggleFavorite(p.id)}
        >
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="card__body">
        <h3 className="card__title">{p.title}</h3>
        <p className="card__loc">
          <MapPin size={15} /> {p.city}, {p.district}
        </p>

        <ul className="card__specs">
          <li>
            <span className="card__spec-top">
              <DoorOpen size={16} /> {p.rooms}
            </span>
            <small>{t('card.rooms')}</small>
          </li>
          <li>
            <span className="card__spec-top">
              <BedDouble size={16} /> {p.bedrooms}
            </span>
            <small>{t('card.bedrooms')}</small>
          </li>
          <li>
            <span className="card__spec-top">
              <Maximize size={16} /> {p.area} м²
            </span>
            <small>{t('card.area')}</small>
          </li>
        </ul>

        <div className="card__foot">
          <strong className="card__price">{formatPrice(p, t)}</strong>
          <Link to={`/property/${p.id}`} className="btn btn--outline btn--sm">
            {t('card.details')}
          </Link>
        </div>
      </div>
    </article>
  );
}
