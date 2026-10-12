import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { EMPTY_FILTERS, filterProperties } from '../utils/format.js';
import SearchPanel from '../components/SearchPanel.jsx';
import PropertyGrid from '../components/PropertyGrid.jsx';

const SCOPES = {
  houses: {
    base: (p) => p.type !== 'apartment',
    typeOptions: ['house', 'villa', 'townhouse'],
    hide: [],
  },
  apartments: { base: (p) => p.type === 'apartment', typeOptions: undefined, hide: ['type'] },
  rent: { base: (p) => p.deal === 'rent', typeOptions: undefined, hide: ['deal'] },
  all: { base: () => true, typeOptions: undefined, hide: [] },
};

export default function Listings({ scope = 'all' }) {
  const { t, allProperties } = useApp();
  const cfg = SCOPES[scope] || SCOPES.all;
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [applied, setApplied] = useState(EMPTY_FILTERS);

  const list = useMemo(
    () => filterProperties(allProperties.filter(cfg.base), applied),
    [allProperties, applied, cfg]
  );

  const reset = () => {
    setFilters(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
  };

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>{t(`listings.${scope}.title`)}</h1>
          <p>{t(`listings.${scope}.text`)}</p>
        </div>
      </section>

      <div className="container search-wrap search-wrap--page">
        <SearchPanel
          filters={filters}
          onChange={setFilters}
          onSubmit={() => setApplied(filters)}
          onReset={reset}
          hide={cfg.hide}
          typeOptions={cfg.typeOptions}
        />
      </div>

      <section className="section section--tight">
        <div className="container">
          <p className="results-count">{t('featured.found', { n: list.length })}</p>
          <PropertyGrid items={list} empty={t('featured.empty')} />
        </div>
      </section>
    </>
  );
}
