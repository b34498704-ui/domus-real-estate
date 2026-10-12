import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BedDouble,
  Bath,
  CalendarDays,
  Check,
  ChevronLeft,
  DoorOpen,
  Heart,
  Layers,
  MapPin,
  Maximize,
  Phone,
  Trees,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { AGENTS } from '../data/properties.js';
import { formatPrice } from '../utils/format.js';
import Gallery from '../components/Gallery.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import NotFound from './NotFound.jsx';

export default function PropertyDetails() {
  const { id } = useParams();
  const { t, allProperties, isFavorite, toggleFavorite } = useApp();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: t('details.messageDefault') });

  useEffect(() => setSent(false), [id]);

  const p = allProperties.find((x) => String(x.id) === id);
  if (!p) return <NotFound />;

  const images = p.gallery?.length ? p.gallery : [p.image];
  const agent = AGENTS[p.agent] || { name: 'DOMUS', role: 'DOMUS агенти', phone: p.phone || '+996 555 12 34 56' };
  const fav = isFavorite(p.id);

  const facts = [
    { icon: DoorOpen, label: t('details.rooms'), value: p.rooms },
    { icon: BedDouble, label: t('details.bedrooms'), value: p.bedrooms },
    p.bathrooms && { icon: Bath, label: t('details.bathrooms'), value: p.bathrooms },
    { icon: Maximize, label: t('details.area'), value: `${p.area} м²` },
    p.floor && { icon: Layers, label: t('details.floor'), value: p.floor },
    p.land && { icon: Trees, label: t('details.land'), value: `${p.land} ${t('details.sotka')}` },
    p.year && { icon: CalendarDays, label: t('details.year'), value: p.year },
  ].filter(Boolean);

  const similar = allProperties
    .filter((x) => x.id !== p.id && (x.city === p.city || x.deal === p.deal))
    .sort((a, b) => Number(b.city === p.city) - Number(a.city === p.city))
    .slice(0, 3);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <article className="details">
      <div className="container">
        <Link to="/all" className="back-link">
          <ChevronLeft size={18} /> {t('details.back')}
        </Link>

        <header className="details__head">
          <div>
            <span className={`badge ${p.deal === 'sale' ? 'badge--sale' : 'badge--rent'}`}>
              {p.deal === 'sale' ? t('card.sale') : t('card.rent')}
            </span>
            <h1>{p.title}</h1>
            <p className="details__addr">
              <MapPin size={16} /> {p.address || `${p.city}, ${p.district}`}
            </p>
          </div>
          <div className="details__price">
            <strong>{formatPrice(p, t)}</strong>
            <button
              type="button"
              className={`btn btn--outline btn--sm${fav ? ' is-fav' : ''}`}
              aria-pressed={fav}
              onClick={() => toggleFavorite(p.id)}
            >
              <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
              {fav ? t('card.removeFav') : t('card.addFav')}
            </button>
          </div>
        </header>

        <Gallery images={images} title={p.title} />

        <div className="details__layout">
          <div className="details__main">
            <ul className="facts">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label}>
                  <Icon size={20} strokeWidth={1.5} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <section>
              <h2>{t('details.about')}</h2>
              <p className="details__text">{p.description}</p>
            </section>

            {p.features?.length > 0 && (
              <section>
                <h2>{t('details.features')}</h2>
                <ul className="features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={16} /> {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2>{t('details.address')}</h2>
              <p className="details__text">
                {p.address || `${p.city}, ${p.district}`}
              </p>
            </section>
          </div>

          <aside className="agent">
            <div className="agent__who">
              <span className="agent__avatar">{agent.name.charAt(0)}</span>
              <div>
                <strong>{agent.name}</strong>
                <small>{agent.role}</small>
              </div>
            </div>
            <a className="agent__phone" href={`tel:${agent.phone.replace(/\s/g, '')}`}>
              <Phone size={16} /> {agent.phone}
            </a>

            {sent ? (
              <p className="notice" role="status">
                {t('details.sent')}
              </p>
            ) : (
              <form onSubmit={onSubmit} className="form">
                <h3>{t('details.contact')}</h3>
                <label className="field">
                  <span>{t('details.name')}</span>
                  <input required value={form.name} onChange={set('name')} autoComplete="name" />
                </label>
                <label className="field">
                  <span>{t('details.phone')}</span>
                  <input required type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+996" />
                </label>
                <label className="field">
                  <span>{t('details.message')}</span>
                  <textarea rows="4" value={form.message} onChange={set('message')} />
                </label>
                <button type="submit" className="btn btn--primary">
                  {t('details.send')}
                </button>
              </form>
            )}
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="similar">
            <h2>{t('details.similar')}</h2>
            <div className="grid grid--3">
              {similar.map((x) => (
                <PropertyCard key={x.id} property={x} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
