import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { properties as seed } from '../data/properties.js';
import { translations } from '../i18n/translations.js';

const Ctx = createContext(null);

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* сактоо мүмкүн болбосо — унчукпай өтөбүз */
  }
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => read('domus-lang', 'ky'));
  const [favorites, setFavorites] = useState(() => read('domus-fav', []));
  const [userListings, setUserListings] = useState(() => read('domus-listings', []));

  useEffect(() => {
    write('domus-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => write('domus-fav', favorites), [favorites]);
  useEffect(() => write('domus-listings', userListings), [userListings]);

  const t = useCallback(
    (key, vars) => {
      let str = translations[lang]?.[key] ?? translations.ky[key] ?? key;
      if (vars) Object.entries(vars).forEach(([k, v]) => (str = str.replace(`{${k}}`, v)));
      return str;
    },
    [lang]
  );

  const toggleFavorite = useCallback(
    (id) =>
      setFavorites((f) => (f.includes(String(id)) ? f.filter((x) => x !== String(id)) : [...f, String(id)])),
    []
  );
  const isFavorite = useCallback((id) => favorites.includes(String(id)), [favorites]);

  const addListing = useCallback((data) => {
    const id = `u${Date.now()}`;
    setUserListings((list) => [{ ...data, id }, ...list]);
    return id;
  }, []);

  const allProperties = useMemo(() => [...userListings, ...seed], [userListings]);

  const value = useMemo(
    () => ({ lang, setLang, t, favorites, toggleFavorite, isFavorite, allProperties, addListing }),
    [lang, t, favorites, toggleFavorite, isFavorite, allProperties, addListing]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
