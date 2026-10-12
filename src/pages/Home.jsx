import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { CITIES } from '../data/properties.js';
import { EMPTY_FILTERS, filterProperties } from '../utils/format.js';
import Hero from '../components/Hero.jsx';
import SearchPanel from '../components/SearchPanel.jsx';
import PropertyGrid from '../components/PropertyGrid.jsx';
import SafeImage from '../components/SafeImage.jsx';

export default function Home() {
  const { t, allProperties } = useApp();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [applied, setApplied] = useState(null);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  const scrollTo = (ref) =>
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);

  const submit = () => {
    setApplied(filters);
    scrollTo(resultsRef);
  };
  const reset = () => {
    setFilters(EMPTY_FILTERS);
    setApplied(null);
  };
  const pickCity = (city) => {
    const next = { ...EMPTY_FILTERS, city };
    setFilters(next);
    setApplied(next);
    scrollTo(resultsRef);
  };

  const list = useMemo(
    () =>
      applied
        ? filterProperties(allProperties, applied)
        : allProperties.filter((p) => p.featured).slice(0, 8),
    [applied, allProperties]
  );

  const cityTiles = CITIES.slice(0, 5).map((name) => {
    const items = allProperties.filter((p) => p.city === name);
    return { name, count: items.length, image: items[0]?.image };
  });

  const why = [
    { icon: ShieldCheck, k: 'why.1' },
    { icon: UserCheck, k: 'why.2' },
    { icon: Eye, k: 'why.3' },
  ];

  return (
    <>
      <Hero onFind={() => scrollTo(searchRef)} />

      <div className="container search-wrap" ref={searchRef} style={{ scrollMarginTop: 96 }}>
        <SearchPanel
          id="search"
          filters={filters}
          onChange={setFilters}
          onSubmit={submit}
          onReset={reset}
        />
      </div>

      <section className="section" ref={resultsRef} style={{ scrollMarginTop: 90 }}>
        <div className="container">
          <div className="section__head">
            <div>
              <h2>{t('featured.title')}</h2>
              <p className="section__sub">
                {applied ? t('featured.found', { n: list.length }) : t('featured.sub')}
              </p>
            </div>
            <Link to="/all" className="btn btn--outline">
              {t('featured.all')}
            </Link>
          </div>
          <PropertyGrid items={list} empty={t('featured.empty')} />
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section__head section__head--center">
            <h2>{t('why.title')}</h2>
          </div>
          <div className="why">
            {why.map(({ icon: Icon, k }) => (
              <div className="why__item" key={k}>
                <span className="why__icon">
                  <Icon size={24} strokeWidth={1.5} />
                </span>
                <h3>{t(`${k}.title`)}</h3>
                <p>{t(`${k}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2>{t('cities.title')}</h2>
          </div>
          <div className="cities">
            {cityTiles.map((c) => (
              <button type="button" key={c.name} className="city" onClick={() => pickCity(c.name)}>
                <SafeImage src={c.image} alt="" />
                <span className="city__shade" />
                <span className="city__text">
                  <strong>{c.name}</strong>
                  <small>{t('cities.count', { n: c.count })}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta">
            <div className="cta__arch" aria-hidden="true" />
            <div className="cta__copy">
              <h2>{t('cta.title')}</h2>
              <p>{t('cta.text')}</p>
              <Link to="/add" className="btn btn--gold">
                {t('nav.list')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
