const nf = new Intl.NumberFormat('ru-RU');

export const formatNumber = (n) => nf.format(n);

export const formatPrice = (p, t) =>
  `${nf.format(p.price)} ${t('card.currency')}` + (p.deal === 'rent' ? ` ${t('card.perMonth')}` : '');

export const EMPTY_FILTERS = {
  city: '',
  type: '',
  deal: '',
  minPrice: '',
  maxPrice: '',
  rooms: '',
};

export function filterProperties(list, f) {
  return list.filter((p) => {
    if (f.city && p.city !== f.city) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.deal && p.deal !== f.deal) return false;
    if (f.minPrice !== '' && p.price < Number(f.minPrice)) return false;
    if (f.maxPrice !== '' && p.price > Number(f.maxPrice)) return false;
    if (f.rooms) {
      if (f.rooms === '5' ? p.rooms < 5 : p.rooms !== Number(f.rooms)) return false;
    }
    return true;
  });
}
