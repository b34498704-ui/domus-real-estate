import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { CITIES, DEFAULT_IMAGE, TYPE_KEYS } from '../data/properties.js';

const INITIAL = {
  title: '',
  city: CITIES[0],
  type: 'apartment',
  deal: 'sale',
  price: '',
  rooms: '2',
  bedrooms: '1',
  area: '',
  address: '',
  description: '',
  image: '',
  phone: '',
};

export default function AddProperty() {
  const { t, addListing } = useApp();
  const navigate = useNavigate();
  const [f, setF] = useState(INITIAL);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const image = f.image.trim() || DEFAULT_IMAGE;
    const id = addListing({
      title: f.title.trim(),
      city: f.city,
      district: f.address.trim() || f.city,
      address: `${f.city}, ${f.address.trim()}`,
      type: f.type,
      deal: f.deal,
      price: Number(f.price),
      rooms: Number(f.rooms),
      bedrooms: Number(f.bedrooms),
      bathrooms: 1,
      area: Number(f.area),
      description: f.description.trim(),
      image,
      gallery: [image],
      features: [],
      phone: f.phone.trim(),
    });
    navigate(`/property/${id}`);
  };

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>{t('add.title')}</h1>
          <p>{t('add.text')}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <form className="panel form" onSubmit={onSubmit}>
            <label className="field">
              <span>{t('add.name')}</span>
              <input required value={f.title} onChange={set('title')} />
            </label>

            <div className="form__row">
              <label className="field">
                <span>{t('add.deal')}</span>
                <select value={f.deal} onChange={set('deal')}>
                  <option value="sale">{t('search.buy')}</option>
                  <option value="rent">{t('search.rent')}</option>
                </select>
              </label>
              <label className="field">
                <span>{t('add.type')}</span>
                <select value={f.type} onChange={set('type')}>
                  {TYPE_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {t(`type.${k}`)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form__row">
              <label className="field">
                <span>{t('add.city')}</span>
                <select value={f.city} onChange={set('city')}>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>{t('add.address')}</span>
                <input required value={f.address} onChange={set('address')} />
              </label>
            </div>

            <div className="form__row form__row--3">
              <label className="field">
                <span>{t('add.price')}</span>
                <input required type="number" min="1" value={f.price} onChange={set('price')} />
              </label>
              <label className="field">
                <span>{t('add.area')}</span>
                <input required type="number" min="1" value={f.area} onChange={set('area')} />
              </label>
              <label className="field">
                <span>{t('add.rooms')}</span>
                <input required type="number" min="1" max="20" value={f.rooms} onChange={set('rooms')} />
              </label>
            </div>
            <p className="form__hint">{t('add.hint')}</p>

            <div className="form__row">
              <label className="field">
                <span>{t('add.bedrooms')}</span>
                <input required type="number" min="0" max="20" value={f.bedrooms} onChange={set('bedrooms')} />
              </label>
              <label className="field">
                <span>{t('add.phone')}</span>
                <input required type="tel" placeholder="+996" value={f.phone} onChange={set('phone')} />
              </label>
            </div>

            <label className="field">
              <span>{t('add.description')}</span>
              <textarea rows="5" required value={f.description} onChange={set('description')} />
            </label>

            <label className="field">
              <span>{t('add.image')}</span>
              <input type="url" placeholder="https://" value={f.image} onChange={set('image')} />
            </label>

            <button type="submit" className="btn btn--primary">
              {t('add.submit')}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
