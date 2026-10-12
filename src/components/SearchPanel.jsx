import { Search } from 'lucide-react';
import { CITIES, TYPE_KEYS } from '../data/properties.js';
import { useApp } from '../context/AppContext.jsx';

const DEALS = [
  ['', 'search.all'],
  ['sale', 'search.buy'],
  ['rent', 'search.rent'],
];

export default function SearchPanel({
  id,
  filters,
  onChange,
  onSubmit,
  onReset,
  hide = [],
  typeOptions = TYPE_KEYS,
}) {
  const { t } = useApp();
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <form
      className="search"
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="search__top">
        {!hide.includes('deal') ? (
          <div className="seg" role="group" aria-label={t('search.deal')}>
            {DEALS.map(([value, key]) => (
              <button
                key={value || 'all'}
                type="button"
                aria-pressed={filters.deal === value}
                className={filters.deal === value ? 'is-active' : ''}
                onClick={() => set('deal', value)}
              >
                {t(key)}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <button type="button" className="link-btn" onClick={onReset}>
          {t('search.reset')}
        </button>
      </div>

      <div className="search__grid">
        <label className="field">
          <span>{t('search.city')}</span>
          <select value={filters.city} onChange={(e) => set('city', e.target.value)}>
            <option value="">{t('search.allCities')}</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {!hide.includes('type') && (
          <label className="field">
            <span>{t('search.type')}</span>
            <select value={filters.type} onChange={(e) => set('type', e.target.value)}>
              <option value="">{t('search.allTypes')}</option>
              {typeOptions.map((k) => (
                <option key={k} value={k}>
                  {t(`type.${k}`)}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="field">
          <span>{t('search.min')}</span>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            step="1000"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => set('minPrice', e.target.value)}
          />
        </label>

        <label className="field">
          <span>{t('search.max')}</span>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            step="1000"
            placeholder="∞"
            value={filters.maxPrice}
            onChange={(e) => set('maxPrice', e.target.value)}
          />
        </label>

        <label className="field">
          <span>{t('search.rooms')}</span>
          <select value={filters.rooms} onChange={(e) => set('rooms', e.target.value)}>
            <option value="">{t('search.any')}</option>
            {['1', '2', '3', '4', '5'].map((n) => (
              <option key={n} value={n}>
                {n === '5' ? '5+' : n}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn btn--primary search__submit">
          <Search size={18} /> {t('search.submit')}
        </button>
      </div>
    </form>
  );
}
